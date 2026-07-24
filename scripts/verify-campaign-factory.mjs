#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  buildCatalog,
  loadCampaign,
  loadFactoryDefinitions,
  placeholderPattern,
  root,
  summarizeCatalog,
  validateCatalog,
} from "./campaign-system.mjs";

const { campaign } = loadCampaign();
const definitions = loadFactoryDefinitions();
const errors = [];
const schemaText = readFileSync(resolve(root, "schemas/visual-template-manifest.schema.json"), "utf8");
JSON.parse(schemaText);

const catalog = buildCatalog(campaign, definitions);
const summary = summarizeCatalog(catalog);
errors.push(...validateCatalog(campaign, catalog));

if (summary.families !== 14) errors.push(`expected 14 public-safe families, received ${summary.families}`);
if (summary.assets !== 3528) errors.push(`expected 3528 public-safe variants, received ${summary.assets}`);
if (catalog.some((asset) => asset.family === "funding-announcement")) {
  errors.push("restricted funding family entered the default catalog");
}

const restrictedCatalog = buildCatalog(campaign, definitions, { includeRestricted: true });
if (restrictedCatalog.length !== 3780) {
  errors.push(`expected 3780 restricted variants, received ${restrictedCatalog.length}`);
}
if (!restrictedCatalog.some((asset) => asset.family === "funding-announcement")) {
  errors.push("restricted catalog lacks the funding announcement family");
}

const exportCandidate = structuredClone(restrictedCatalog);
exportCandidate[0].content.headline = "[UNRESOLVED HEADLINE]";
const exportErrors = validateCatalog(campaign, exportCandidate, {
  includeRestricted: true,
  exporting: true,
});
if (!exportErrors.some((error) => error.includes("unresolved placeholder"))) {
  errors.push("export self-test did not reject unresolved placeholders");
}
if (!exportErrors.some((error) => error.includes("export requires approved or public content"))) {
  errors.push("export self-test did not reject unapproved content");
}

const sample = catalog[0];
if (!sample.exportFilename.includes("__v0_1_0__1x.png")) {
  errors.push("deterministic filename does not contain normalized campaign version and scale");
}
if (!sample.safeZones.length || sample.slots.some((slot) => !slot.limits)) {
  errors.push("manifest lacks safe zones or slot limits");
}
const parityGroups = new Map();
for (const asset of catalog) {
  const key = [
    asset.family,
    asset.platform,
    asset.placement,
    asset.composition,
    asset.copyMode,
  ].join("/");
  if (!parityGroups.has(key)) parityGroups.set(key, new Set());
  parityGroups.get(key).add(asset.theme);
}
for (const [key, themes] of parityGroups) {
  if (!themes.has("light") || !themes.has("dark") || themes.size !== 2) {
    errors.push(`${key}: light and dark parity failed`);
  }
}
if (!placeholderPattern.test(campaign.messaging.headlines.primary.value)) {
  errors.push("draft fixture lost its visible placeholder");
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Verified ${summary.assets} default variants and ${restrictedCatalog.length} restricted variants.`);
