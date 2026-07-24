#!/usr/bin/env node
import { createHash } from "node:crypto";
import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { relative, resolve } from "node:path";
import {
  collectContent,
  generatedDirectory,
  loadCampaign,
  placeholderPattern,
  readJson,
} from "./campaign-system.mjs";

const check = process.argv.includes("--check");
const campaignId = "alfred-flagship-launch";
const outputDirectory = resolve(generatedDirectory, campaignId);
const catalogPath = resolve(outputDirectory, "catalog.json");
const manifestPath = resolve(outputDirectory, "export-manifest.json");
const warningsPath = resolve(outputDirectory, "release-warnings.json");
const signoffPath = resolve(outputDirectory, "review-signoff.json");
const { campaign } = loadCampaign();
const catalog = readJson(catalogPath);

function hash(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

function dimensions(path, buffer) {
  if (path.endsWith(".png") && buffer.length >= 24) {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }
  if (path.endsWith(".svg")) {
    const match = buffer.toString("utf8").match(/viewBox="[^"]*?([0-9.]+)\s+([0-9.]+)"/);
    if (match) return { width: Number(match[1]), height: Number(match[2]) };
  }
  return { width: null, height: null };
}

const files = readdirSync(outputDirectory, { recursive: true })
  .map((entry) => resolve(outputDirectory, entry))
  .filter((path) => statSync(path).isFile())
  .filter((path) => !path.endsWith("export-manifest.json"))
  .filter((path) => !path.endsWith("release-warnings.json"))
  .filter((path) => !path.endsWith("review-signoff.json"))
  .filter((path) => !path.endsWith(".DS_Store"))
  .sort();
const exports = files.map((path) => {
  const buffer = readFileSync(path);
  return {
    path: relative(outputDirectory, path),
    bytes: buffer.length,
    sha256: hash(buffer),
    ...dimensions(path, buffer),
  };
});

const contentRecords = [...collectContent(campaign).values()];
const placeholderCount = contentRecords.filter((record) =>
  placeholderPattern.test(
    record.value || record.label || record.statement || record.text || "",
  ),
).length;
const warnings = [];
if (campaign.lifecycle !== "public") warnings.push("campaign-content-not-public");
if (!campaign.release?.releaseAt) warnings.push("release-date-missing");
if (campaign.funding?.visibility !== "public") warnings.push("funding-remains-restricted");
if (campaign.owners.some((owner) => !owner.assignee)) warnings.push("approval-owner-missing");
if (placeholderCount) warnings.push(`unresolved-placeholders:${placeholderCount}`);

const sourceFingerprint = hash(
  Buffer.from(
    `${readFileSync(catalogPath, "utf8")}${JSON.stringify(campaign)}`,
  ),
);
const manifest = {
  campaignId,
  campaignVersion: campaign.version,
  campaignLifecycle: campaign.lifecycle,
  generatedAt: new Date().toISOString(),
  sourceFingerprint,
  catalogAssets: catalog.assets.length,
  files: exports,
};
const warningReport = {
  campaignId,
  blocking: warnings.length > 0,
  warnings,
};

if (check) {
  const errors = [];
  if (!existsSync(manifestPath)) errors.push("export manifest is missing");
  if (!existsSync(warningsPath)) errors.push("release warning report is missing");
  if (!existsSync(signoffPath)) errors.push("five-critic signoff file is missing");
  if (!errors.length) {
    const existing = readJson(manifestPath);
    if (existing.sourceFingerprint !== sourceFingerprint) errors.push("export manifest is stale");
    if (existing.catalogAssets !== catalog.assets.length) errors.push("export manifest catalog count differs");
    const currentFiles = new Map(exports.map((file) => [file.path, file]));
    if (existing.files.length !== exports.length) errors.push("export manifest file count differs");
    for (const file of existing.files) {
      const current = currentFiles.get(file.path);
      if (!current) errors.push(`${file.path}: recorded file is missing`);
      else if (current.sha256 !== file.sha256 || current.bytes !== file.bytes) {
        errors.push(`${file.path}: recorded hash or file size is stale`);
      }
    }
    for (const file of existing.files.filter((item) => item.path.endsWith(".png"))) {
      if (!file.width || !file.height || !file.bytes) errors.push(`${file.path}: missing dimension or size report`);
    }
    const signoff = readJson(signoffPath);
    const critics = ["brand", "editorial", "product", "accessibility", "legal"];
    if (critics.some((critic) => !signoff.critics.some((item) => item.critic === critic))) {
      errors.push("five-critic signoff roles are incomplete");
    }
  }
  if (errors.length) {
    console.error(errors.join("\n"));
    process.exit(1);
  }
  console.log(`Verified release manifest with ${exports.length} files and ${warnings.length} active warnings.`);
  process.exit(0);
}

writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
writeFileSync(warningsPath, `${JSON.stringify(warningReport, null, 2)}\n`);
if (!existsSync(signoffPath)) {
  writeFileSync(
    signoffPath,
    `${JSON.stringify(
      {
        campaignId,
        requiredStatus: "approved",
        critics: ["brand", "editorial", "product", "accessibility", "legal"].map(
          (critic) => ({
            critic,
            status: "pending",
            reviewer: null,
            reviewedAt: null,
            evidence: null,
          }),
        ),
      },
      null,
      2,
    )}\n`,
  );
}
console.log(`Generated release manifest for ${exports.length} files with ${warnings.length} active warnings.`);
