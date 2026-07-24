import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { basename, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const outputPath = resolve(root, "data/expansion-positioning-audit.csv");
const checkOnly = process.argv.includes("--check");

const trackedFiles = execFileSync(
  "git",
  [
    "ls-files",
    "-z",
    "templates/pages/*.html",
    "templates/email/*.email.html",
    "templates/decks/*.html",
    "templates/collateral/*.html",
  ],
  { cwd: root, encoding: "utf8" },
)
  .split("\0")
  .filter(Boolean)
  .filter((file) => file !== "templates/decks/index.html")
  .sort();

function familyFor(sourcePath) {
  if (sourcePath.startsWith("templates/pages/")) return "page";
  if (sourcePath.startsWith("templates/email/")) return "email";
  if (sourcePath.startsWith("templates/decks/")) return "deck";
  if (sourcePath.startsWith("templates/collateral/")) return "collateral";
  throw new Error(`Unknown positioning-audit family: ${sourcePath}`);
}

function renderedSource(source) {
  return source
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*src="[^"]*"[^>]*><\/script>/gi, "");
}

function countMatches(source, pattern) {
  return [...source.matchAll(pattern)].length;
}

function csvCell(value) {
  const stringValue = String(value);
  return /[",\n]/.test(stringValue)
    ? `"${stringValue.replaceAll('"', '""')}"`
    : stringValue;
}

const highRiskProofPattern =
  /design.partner|85%\s+of\s+(?:marketing\s+)?questions|70%\s+(?:faster|less|time)|12%\s+(?:less|reclaimed|wasted)|15\+\s*hours|under[\s-](?:2|two)[\s-]hours|3(?:\s*-\s*|\s*\u2013\s*)5\s+days|time-to-decision|resolution\s+(?:cut|drops?|fell)|benchmark\s+of/i;

const rows = trackedFiles.map((sourcePath) => {
  const family = familyFor(sourcePath);
  const source = readFileSync(resolve(root, sourcePath), "utf8");
  const rendered = renderedSource(source);
  const lower = rendered.toLowerCase();
  const issues = [];

  const decisionIntelligenceCount = countMatches(rendered, /decision intelligence/gi);
  const retiredTermCount = countMatches(rendered, /(?:ai\s+)?chief[ -]of[ -]staff/gi);
  const placeholderValues = [
    ...new Set(rendered.match(/\[[A-Z][A-Z0-9 _/-]*\]/g) || []),
  ].sort();
  const usesCanonicalDemo = /Northwind Labs/i.test(rendered);
  const usesNoncanonicalDemo = /Northwind Co\./i.test(rendered);
  const highRiskProof = highRiskProofPattern.test(rendered);
  const hardcodedLaunchOffer = /50%\s+(?:launch offer|off)|launch offer/i.test(rendered);
  const timeSensitiveState = /now live|live today|waitlist|launch offer/i.test(rendered);
  const fundingTerms = countMatches(
    rendered,
    /\b(?:funding|fundraise|fundraising|investor|embargo|series\s+[a-z]|raised)\b/gi,
  );

  let categoryStatus = "neutral";
  if (decisionIntelligenceCount) categoryStatus = "aligned";
  if (retiredTermCount) {
    if (/never[^.]{0,80}(?:ai\s+)?chief[ -]of[ -]staff|(?:ai\s+)?chief[ -]of[ -]staff[^.]{0,80}retired/i.test(rendered)) {
      categoryStatus = "retired term documented as a guardrail";
    } else {
      categoryStatus = "retired term context review";
      issues.push("Retired chief-of-staff language appears outside an explicit naming guardrail.");
    }
  }

  let demoStatus = "none";
  if (usesCanonicalDemo) demoStatus = "canonical Northwind Labs";
  if (usesNoncanonicalDemo) {
    demoStatus = usesCanonicalDemo
      ? "mixed canonical and noncanonical demo names"
      : "noncanonical Northwind Co.";
    issues.push("Uses Northwind Co. instead of the canonical Northwind Labs demo company.");
  }

  let proofStatus = "no high-risk outcome pattern";
  if (highRiskProof) {
    proofStatus = "unsupported outcome review";
    issues.push("Contains an Alfred outcome pattern that is not approved public proof.");
  } else if (/Source:|Sources:|PwC|NIQ|CMO Survey|demo dataset|demo data|illustrative/i.test(rendered)) {
    proofStatus = "source or demo framing present";
  }

  if (placeholderValues.length) {
    issues.push("Contains unresolved rendered placeholders.");
  }
  if (hardcodedLaunchOffer) {
    issues.push("Launch pricing or offer state is hardcoded instead of campaign-bound.");
  }
  if (fundingTerms) {
    issues.push("Contains funding, investor, or embargo vocabulary requiring launch-state review.");
  }

  const overallStatus = issues.length ? "review required" : "aligned or neutral";

  return {
    master: sourcePath,
    family,
    assetName: basename(sourcePath).replace(/\.email\.html$|\.html$/g, ""),
    overallStatus,
    categoryStatus,
    decisionIntelligenceCount,
    retiredTermCount,
    demoStatus,
    proofStatus,
    placeholderCount: placeholderValues.length,
    placeholders: placeholderValues.join("|"),
    hardcodedLaunchOffer: hardcodedLaunchOffer ? "yes" : "no",
    timeSensitiveState: timeSensitiveState ? "yes" : "no",
    fundingTermCount: fundingTerms,
    issues: issues.join(" "),
  };
});

const expectedCounts = {
  page: 13,
  email: 19,
  deck: 17,
  collateral: 12,
};
for (const [family, expected] of Object.entries(expectedCounts)) {
  const actual = rows.filter((row) => row.family === family).length;
  if (actual !== expected) {
    throw new Error(`Expected ${expected} ${family} masters, found ${actual}`);
  }
}
if (rows.length !== 61) {
  throw new Error(`Expected 61 positioning masters, found ${rows.length}`);
}

const columns = [
  ["master", "master"],
  ["family", "family"],
  ["asset_name", "assetName"],
  ["overall_status", "overallStatus"],
  ["category_status", "categoryStatus"],
  ["decision_intelligence_count", "decisionIntelligenceCount"],
  ["retired_term_count", "retiredTermCount"],
  ["demo_status", "demoStatus"],
  ["proof_status", "proofStatus"],
  ["placeholder_count", "placeholderCount"],
  ["placeholders", "placeholders"],
  ["hardcoded_launch_offer", "hardcodedLaunchOffer"],
  ["time_sensitive_state", "timeSensitiveState"],
  ["funding_term_count", "fundingTermCount"],
  ["issues", "issues"],
];

const output = [
  columns.map(([header]) => header).join(","),
  ...rows.map((row) => columns.map(([, key]) => csvCell(row[key])).join(",")),
  "",
].join("\n");

if (checkOnly) {
  const current = readFileSync(outputPath, "utf8");
  if (current !== output) {
    console.error("Expansion positioning audit is stale. Run: npm run expansion:audit-positioning");
    process.exit(1);
  }
} else {
  writeFileSync(outputPath, output);
}

const countBy = (key) =>
  rows.reduce((summary, row) => {
    summary[row[key]] = (summary[row[key]] || 0) + 1;
    return summary;
  }, {});

console.log(`${checkOnly ? "Verified" : "Generated"} ${rows.length} positioning audit rows.`);
console.log("Families:", countBy("family"));
console.log("Overall:", countBy("overallStatus"));
console.log("Categories:", countBy("categoryStatus"));
console.log("Demo names:", countBy("demoStatus"));
console.log("Proof:", countBy("proofStatus"));
console.log("Hardcoded launch offer:", countBy("hardcodedLaunchOffer"));
console.log("Time-sensitive state:", countBy("timeSensitiveState"));
console.log("Funding vocabulary:", rows.reduce((total, row) => total + row.fundingTermCount, 0));
