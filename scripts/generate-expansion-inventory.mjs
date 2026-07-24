import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { basename, extname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const outputPath = resolve(root, "data/expansion-asset-inventory.csv");
const checkOnly = process.argv.includes("--check");
const dispositions = new Set([
  "reusable",
  "needs revision",
  "campaign-specific",
  "redundant",
  "deprecated",
]);

const trackedFiles = execFileSync("git", ["ls-files", "-z"], {
  cwd: root,
  encoding: "utf8",
})
  .split("\0")
  .filter(Boolean)
  .sort();

const rows = [];

function add(family, sourcePath, assetName, disposition, rationale) {
  rows.push({
    assetId: `${family}:${assetName}`,
    family,
    sourcePath,
    assetName,
    disposition,
    rationale,
    tracked: "yes",
  });
}

function matching(pattern) {
  return trackedFiles.filter(pattern);
}

for (const sourcePath of matching(
  (file) =>
    /^components\/[^/]+\/[^/]+\.jsx$/.test(file) &&
    !file.startsWith("components/hooks/"),
)) {
  const category = sourcePath.split("/")[1];
  const name = basename(sourcePath, ".jsx");
  add(
    "component",
    sourcePath,
    `${category}/${name}`,
    "reusable",
    "Typed design-system primitive available to launch compositions.",
  );
}

for (const sourcePath of matching(
  (file) => /^social\/[^/]+\.html$/.test(file) && file !== "social/index.html",
)) {
  const name = basename(sourcePath, ".html");
  add(
    "social master",
    sourcePath,
    name,
    "needs revision",
    "Existing master requires campaign manifest, approval state, and placement audit.",
  );
}

for (const sourcePath of matching((file) => /^social\/_variants\/.+\.(html|png)$/.test(file))) {
  const name = basename(sourcePath, extname(sourcePath));
  add(
    "social variant",
    sourcePath,
    `${name}${extname(sourcePath)}`,
    "campaign-specific",
    "Organisation-brain draft retained as campaign-specific working history.",
  );
}

for (const sourcePath of matching((file) => /^social\/[^/]+\.png$/.test(file))) {
  add(
    "social export",
    sourcePath,
    basename(sourcePath),
    "campaign-specific",
    "Tracked shipped export is not a reusable source master.",
  );
}

for (const sourcePath of matching((file) => /^templates\/email\/.+\.email\.html$/.test(file))) {
  const name = basename(sourcePath, ".email.html");
  add(
    "email template",
    sourcePath,
    name,
    "needs revision",
    "Template needs campaign-content binding and launch positioning review.",
  );
}

for (const sourcePath of matching((file) => /^templates\/pages\/[^/]+\.html$/.test(file))) {
  const name = basename(sourcePath, ".html");
  add(
    "page template",
    sourcePath,
    name,
    "needs revision",
    "Page needs launch narrative, content-source, and responsive-state review.",
  );
}

const sectionHelpers = new Set(["SecContainer", "SecEyebrow", "SecH2", "SecCheck"]);
for (const sourcePath of matching((file) => /^templates\/sections\/Sections[A-F]\.jsx$/.test(file))) {
  const source = readFileSync(resolve(root, sourcePath), "utf8");
  const registrations = [...source.matchAll(/^window\.(Sec[A-Za-z0-9]+)\s*=/gm)]
    .map((match) => match[1])
    .filter((name) => !sectionHelpers.has(name));

  for (const name of registrations) {
    add(
      "website section",
      `${sourcePath}#${name}`,
      name,
      "needs revision",
      "Section needs decision-intelligence positioning and campaign-slot review.",
    );
  }
}

for (const sourcePath of matching(
  (file) =>
    /^templates\/decks\/[^/]+\.html$/.test(file) &&
    file !== "templates/decks/index.html",
)) {
  const name = basename(sourcePath, ".html");
  add(
    "deck master",
    sourcePath,
    name,
    "needs revision",
    "Deck needs claim, citation, confidentiality, and current-positioning review.",
  );
}

for (const sourcePath of matching((file) => /^templates\/decks\/[^/]+\.pptx$/.test(file))) {
  add(
    "deck export",
    sourcePath,
    basename(sourcePath),
    "campaign-specific",
    "Tracked delivery artifact is not the reusable HTML master.",
  );
}

for (const sourcePath of matching(
  (file) => /^templates\/collateral\/[^/]+\.html$/.test(file),
)) {
  const name = basename(sourcePath, ".html");
  const isSpecimen = name === "_specimen";
  add(
    "collateral",
    sourcePath,
    name,
    isSpecimen ? "reusable" : "needs revision",
    isSpecimen
      ? "Reusable authoring specimen for the collateral system."
      : "Document needs claim, campaign-content, and positioning review.",
  );
}

for (const sourcePath of matching((file) => /^assets\/illustrations\/.+\.svg$/.test(file))) {
  add(
    "illustration",
    sourcePath,
    relative("assets/illustrations", sourcePath),
    "needs revision",
    "Existing character art needs expansion-family consistency and crop review.",
  );
}

for (const sourcePath of matching((file) => /^assets\/icons\/[^/]+\.svg$/.test(file))) {
  add(
    "icon",
    sourcePath,
    basename(sourcePath, ".svg"),
    "reusable",
    "Canonical design-system icon available to launch compositions.",
  );
}

for (const sourcePath of matching((file) => /^assets\/logos\/[^/]+\.(svg|png)$/.test(file))) {
  add(
    "logo",
    sourcePath,
    basename(sourcePath),
    "reusable",
    "Canonical Alfred brand asset.",
  );
}

for (const sourcePath of matching((file) => /^uploads\/[^/]+\.(svg|png)$/.test(file))) {
  add(
    "uploaded brand source",
    sourcePath,
    basename(sourcePath),
    "redundant",
    "Superseded by normalized canonical files under assets/logos.",
  );
}

for (const sourcePath of matching((file) => /^slides\/[^/]+\.slide\.html$/.test(file))) {
  add(
    "slide primitive",
    sourcePath,
    basename(sourcePath, ".slide.html"),
    "reusable",
    "Reusable base slide composition.",
  );
}

for (const sourcePath of matching((file) => /^ui_kits\/.+\.jsx$/.test(file))) {
  add(
    "UI kit",
    sourcePath,
    relative("ui_kits", sourcePath).replace(/\.jsx$/, ""),
    "needs revision",
    "Product-shot source needs current-product and responsive-crop review.",
  );
}

for (const sourcePath of matching((file) => /^templates\/social\/[^/]+\.html$/.test(file))) {
  add(
    "legacy social template",
    sourcePath,
    basename(sourcePath, ".html"),
    "redundant",
    "Superseded by the root social master and Open Graph system.",
  );
}

rows.sort((a, b) => a.assetId.localeCompare(b.assetId) || a.sourcePath.localeCompare(b.sourcePath));

const duplicateIds = rows
  .map((row) => row.assetId)
  .filter((id, index, all) => all.indexOf(id) !== index);
if (duplicateIds.length) {
  throw new Error(`Duplicate asset IDs: ${[...new Set(duplicateIds)].join(", ")}`);
}

for (const row of rows) {
  if (!dispositions.has(row.disposition)) {
    throw new Error(`Invalid disposition for ${row.assetId}: ${row.disposition}`);
  }
}

function csvCell(value) {
  const stringValue = String(value);
  return /[",\n]/.test(stringValue)
    ? `"${stringValue.replaceAll('"', '""')}"`
    : stringValue;
}

const columns = [
  ["asset_id", "assetId"],
  ["family", "family"],
  ["source_path", "sourcePath"],
  ["asset_name", "assetName"],
  ["disposition", "disposition"],
  ["rationale", "rationale"],
  ["tracked", "tracked"],
];

const output = [
  columns.map(([header]) => header).join(","),
  ...rows.map((row) => columns.map(([, key]) => csvCell(row[key])).join(",")),
  "",
].join("\n");

if (checkOnly) {
  const current = readFileSync(outputPath, "utf8");
  if (current !== output) {
    console.error("Expansion asset inventory is stale. Run: npm run expansion:inventory");
    process.exit(1);
  }
} else {
  writeFileSync(outputPath, output);
}

const counts = rows.reduce((summary, row) => {
  summary[row.disposition] = (summary[row.disposition] || 0) + 1;
  return summary;
}, {});

console.log(
  `${checkOnly ? "Verified" : "Generated"} ${rows.length} expansion inventory rows: ` +
    [...dispositions].map((name) => `${name}=${counts[name] || 0}`).join(", "),
);
