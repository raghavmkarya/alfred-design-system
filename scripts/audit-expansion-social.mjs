import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { basename, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const outputPath = resolve(root, "data/expansion-social-audit.csv");
const checkOnly = process.argv.includes("--check");

const trackedFiles = execFileSync("git", ["ls-files", "-z", "social/*.html"], {
  cwd: root,
  encoding: "utf8",
})
  .split("\0")
  .filter(
    (file) =>
      /^social\/[^/]+\.html$/.test(file) &&
      file !== "social/index.html",
  )
  .sort();

function platformFor(name) {
  const baseName = name.endsWith("-light") ? name.slice(0, -6) : name;
  if (baseName.startsWith("linkedin-") || baseName.startsWith("carousel-") || baseName === "brief-of-the-day" || baseName === "organisation-brain-01") return "LinkedIn";
  if (baseName.startsWith("facebook-")) return "Facebook";
  if (baseName.startsWith("instagram-")) return "Instagram";
  if (baseName.startsWith("youtube-")) return "YouTube";
  if (baseName.startsWith("profile-banner-linkedin")) return "LinkedIn";
  if (baseName.startsWith("profile-banner-x") || baseName === "x-post") return "X";
  if (baseName === "profile-avatar") return "Cross-platform profile";
  if (baseName.startsWith("og-") || baseName.startsWith("blog-")) return "Open Graph and blog";
  return "Cross-platform feed";
}

function dimensionsFor(source, name) {
  const width = source.match(/--frame-w:\s*(\d+)px/)?.[1];
  const height = source.match(/--frame-h:\s*(\d+)px/)?.[1];
  if (width && height) return [Number(width), Number(height)];
  const titleDimensions = source.match(/<title>[^<]*?(\d+)\s*[x×]\s*(\d+)[^<]*<\/title>/i);
  if (titleDimensions) return [Number(titleDimensions[1]), Number(titleDimensions[2])];
  if (name === "profile-avatar") return [400, 400];
  throw new Error(`Could not determine dimensions for ${name}`);
}

function dimensionAudit(name, width, height) {
  const size = `${width}x${height}`;
  const baseName = name.endsWith("-light") ? name.slice(0, -6) : name;

  if (name.startsWith("profile-banner-linkedin")) {
    return size === "1584x396"
      ? ["revision required", "Company Page cover is documented by LinkedIn at 4200x700. Existing size matches a personal profile cover."]
      : ["review required", "Compare with current LinkedIn Page and profile cover specifications."];
  }
  if (name.startsWith("profile-banner-x")) {
    return size === "1500x500"
      ? ["current", "Matches X recommended header dimensions."]
      : ["revision required", "X recommends 1500x500 for profile headers."];
  }
  if (name === "profile-avatar") {
    return size === "400x400"
      ? ["current", "Square source supports circular profile crops and current LinkedIn Page logo guidance."]
      : ["revision required", "Profile source should remain square and at least 400x400."];
  }
  if (name === "youtube-banner" || name === "youtube-banner-light") {
    return size === "2560x1440"
      ? ["current", "Matches YouTube recommended channel banner dimensions."]
      : ["revision required", "YouTube recommends 2560x1440 for channel banners."];
  }
  if (name.startsWith("youtube-thumb-")) {
    return width / height === 16 / 9
      ? ["compatible, not recommended", "Aspect ratio is current, but YouTube now recommends 3840x2160 custom thumbnails."]
      : ["revision required", "YouTube recommends a 16:9 custom thumbnail."];
  }
  if (name === "facebook-cover" || name === "facebook-cover-light") {
    return ["compatible, not recommended", "Exceeds Facebook minimum, but current guidance favors a 16:9 Page cover and cites 851x315 for fast loading."];
  }
  if (name === "facebook-event-cover" || name === "facebook-event-cover-light") {
    return ["review required", "No current first-party event-cover pixel recommendation was located in this audit."];
  }
  if (name === "facebook-link" || name === "facebook-link-light") {
    return width === 1200 && height === 630
      ? ["current", "Compatible with the current 1.91:1 horizontal link-image family."]
      : ["revision required", "Expected a current horizontal link-image ratio."];
  }
  if (name === "facebook-square" || name === "facebook-square-light") {
    return width === height
      ? ["current", "Square placement remains supported."]
      : ["revision required", "Expected a square placement."];
  }
  if (name === "facebook-story" || name === "facebook-story-light") {
    return width === 1080 && height === 1920
      ? ["current", "Uses the current full-screen 9:16 story family."]
      : ["revision required", "Expected a 9:16 story master."];
  }
  if (name.startsWith("instagram-story")) {
    return width === 1080 && height === 1920
      ? ["current", "Uses the current full-screen 9:16 story and reel family."]
      : ["revision required", "Expected a 9:16 story or reel master."];
  }
  if (name.startsWith("instagram-")) {
    const ratio = width / height;
    return width <= 1080 && ratio >= 0.75 && ratio <= 1.91
      ? ["current", "Within Instagram's current supported feed width and aspect-ratio range."]
      : ["revision required", "Outside Instagram's current supported feed dimensions or ratio."];
  }
  if (name.startsWith("carousel-")) {
    return width === 1080 && height === 1350
      ? ["review required", "Valid portrait document-page shape, but LinkedIn paid carousel guidance recommends 1080x1080 cards."]
      : ["review required", "Confirm against the intended LinkedIn organic document or paid carousel placement."];
  }
  if (name.startsWith("linkedin-")) {
    if (width === 1200 && height === 1350) {
      return ["compatible, not recommended", "Within LinkedIn upload bounds, but current vertical single-image guidance recommends 4:5 rather than 8:9."];
    }
    return ["review required", "Confirm against the intended LinkedIn organic or paid placement."];
  }
  if (baseName === "organisation-brain-01" || baseName === "brief-of-the-day") {
    return width / height === 0.8
      ? ["current", "Matches LinkedIn's current recommended 4:5 vertical ratio."]
      : ["review required", "Confirm against current LinkedIn vertical guidance."];
  }
  if (name === "x-post" || name === "x-post-light") {
    return ["review required", "No current first-party X feed-image pixel recommendation was located in this audit."];
  }
  if (name.startsWith("og-")) {
    return width === 1200 && height === 630
      ? ["current", "Matches the established 1.91:1 Open Graph image shape."]
      : ["revision required", "Expected the established Open Graph image shape."];
  }
  if (name === "blog-hero" || name === "blog-hero-light") {
    return width / height === 16 / 9
      ? ["current", "Current 16:9 source with a documented Open Graph crop."]
      : ["review required", "Confirm the blog and Open Graph crop behavior."];
  }

  const ratio = width / height;
  if (width === 1080 && ratio >= 0.75 && ratio <= 1) {
    return ["current", "Compatible with current square or portrait feed families."];
  }
  return ["review required", "Placement requires a current first-party dimension reference."];
}

function uniqueMatches(source, pattern) {
  return [...new Set([...source.matchAll(pattern)].map((match) => match[1]))].sort();
}

function csvCell(value) {
  const stringValue = String(value);
  return /[",\n]/.test(stringValue)
    ? `"${stringValue.replaceAll('"', '""')}"`
    : stringValue;
}

const names = new Set(trackedFiles.map((file) => basename(file, ".html")));
const rows = trackedFiles.map((sourcePath) => {
  const source = readFileSync(resolve(root, sourcePath), "utf8");
  const name = basename(sourcePath, ".html");
  const [width, height] = dimensionsFor(source, name);
  const [dimensionStatus, dimensionNote] = dimensionAudit(name, width, height);
  const slotNames = uniqueMatches(source, /data-slot="([^"]+)"/g);
  const renderedSource = source
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "");
  const placeholderMatches = [
    ...new Set(renderedSource.match(/\[[A-Z][A-Z0-9 _/-]*\]/g) || []),
  ];
  const hasSafeZoneEvidence = /safe[ -]?zone|crops?|cropped|circular crop|circle:/i.test(source);
  const hasVisibleCitation = /Source:\s*<[^>]*>[^<]*<[^>]*data-slot="source"|data-slot="source"[^>]*>[^<]+/i.test(renderedSource);
  const hasDemoFraming = /Northwind|demo data|demo scenario|sample data/i.test(renderedSource);
  const isLight = name.endsWith("-light");
  const baseName = isLight ? name.slice(0, -6) : name;
  const lightName = `${baseName}-light`;

  let lightParity;
  if (name === "profile-avatar") lightParity = "embedded";
  else if (name === "organisation-brain-01") lightParity = "campaign-specific exception";
  else if (isLight) lightParity = names.has(baseName) ? "paired" : "missing dark";
  else lightParity = names.has(lightName) ? "paired" : "missing light";

  let slotStatus;
  if (slotNames.length) slotStatus = "declared";
  else if (/No slots|ships as-is|mark only|shipped post/i.test(source)) slotStatus = "static or campaign-specific";
  else slotStatus = "missing metadata";

  let claimStatus = "not applicable";
  if (hasVisibleCitation) claimStatus = "visible citation";
  else if (hasDemoFraming) claimStatus = "Northwind demo framed";
  else if (placeholderMatches.length) claimStatus = "unresolved placeholder guard";
  else if (/stat|metric|insight|brief-of-the-day|facebook-square|milestone/.test(name)) claimStatus = "claim review required";

  return {
    master: sourcePath,
    platform: platformFor(name),
    width,
    height,
    aspectRatio: `${width}:${height}`,
    dimensionStatus,
    dimensionNote,
    slotStatus,
    slots: slotNames.join("|"),
    safeZoneStatus: hasSafeZoneEvidence ? "documented" : "missing explicit metadata",
    claimStatus,
    placeholderCount: placeholderMatches.length,
    lightParity,
  };
});

if (rows.length !== 102) {
  throw new Error(`Expected 102 social masters, found ${rows.length}`);
}

const columns = [
  ["master", "master"],
  ["platform", "platform"],
  ["width", "width"],
  ["height", "height"],
  ["aspect_ratio", "aspectRatio"],
  ["dimension_status", "dimensionStatus"],
  ["dimension_note", "dimensionNote"],
  ["slot_status", "slotStatus"],
  ["slots", "slots"],
  ["safe_zone_status", "safeZoneStatus"],
  ["claim_status", "claimStatus"],
  ["placeholder_count", "placeholderCount"],
  ["light_parity", "lightParity"],
];

const output = [
  columns.map(([header]) => header).join(","),
  ...rows.map((row) => columns.map(([, key]) => csvCell(row[key])).join(",")),
  "",
].join("\n");

if (checkOnly) {
  const current = readFileSync(outputPath, "utf8");
  if (current !== output) {
    console.error("Expansion social audit is stale. Run: npm run expansion:audit-social");
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

console.log(`${checkOnly ? "Verified" : "Generated"} ${rows.length} social audit rows.`);
console.log("Dimensions:", countBy("dimensionStatus"));
console.log("Slots:", countBy("slotStatus"));
console.log("Safe zones:", countBy("safeZoneStatus"));
console.log("Claims:", countBy("claimStatus"));
console.log("Light parity:", countBy("lightParity"));
