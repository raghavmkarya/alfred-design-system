#!/usr/bin/env node
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "@playwright/test";
import {
  buildCatalog,
  generatedDirectory,
  loadCampaign,
  loadFactoryDefinitions,
  renderFilename,
  root,
  validateCatalog,
} from "./campaign-system.mjs";

function parseArgs(argv) {
  const options = {
    scale: 1,
    format: "png",
    includeRestricted: false,
    acknowledgeEmbargo: false,
    preview: false,
    complete: false,
    filters: {},
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--include-restricted") options.includeRestricted = true;
    else if (arg === "--acknowledge-embargo") options.acknowledgeEmbargo = true;
    else if (arg === "--preview") options.preview = true;
    else if (arg === "--complete") options.complete = true;
    else if (arg === "--scale") options.scale = Number(argv[++index]);
    else if (arg === "--format") options.format = argv[++index];
    else if (arg.startsWith("--")) options.filters[arg.slice(2)] = argv[++index];
  }
  return options;
}

const options = parseArgs(process.argv.slice(2));
if (![1, 2].includes(options.scale)) {
  console.error("Scale must be 1 or 2.");
  process.exit(1);
}
if (!["png", "jpg"].includes(options.format)) {
  console.error("Format must be png or jpg.");
  process.exit(1);
}
if (options.includeRestricted && !options.acknowledgeEmbargo) {
  console.error("Restricted export requires --acknowledge-embargo.");
  process.exit(1);
}
if (!options.complete && Object.keys(options.filters).length === 0) {
  console.error("Choose a filter such as --family product-proof, or pass --complete.");
  process.exit(1);
}

const { campaign } = loadCampaign();
const definitions = loadFactoryDefinitions();
const catalog = buildCatalog(campaign, definitions, {
  includeRestricted: options.includeRestricted,
});
const selected = catalog.filter((asset) =>
  Object.entries(options.filters).every(([key, value]) => asset[key] === value),
);
if (!selected.length) {
  console.error("No campaign assets matched the requested filters.");
  process.exit(1);
}

const validationErrors = validateCatalog(campaign, selected, {
  includeRestricted: options.includeRestricted,
  exporting: !options.preview,
});
if (validationErrors.length) {
  console.error(validationErrors.slice(0, 30).join("\n"));
  if (validationErrors.length > 30) console.error(`And ${validationErrors.length - 30} more errors.`);
  process.exit(1);
}

const outputDirectory = resolve(generatedDirectory, campaign.campaignId, options.preview ? "previews" : "exports");
mkdirSync(outputDirectory, { recursive: true });
const renderFile = options.includeRestricted ? "render-restricted.html" : "render.html";
const renderUrl = pathToFileURL(resolve(root, "campaign", renderFile)).href;
const browser = await chromium.launch({ headless: true });
let exported = 0;
try {
  for (const asset of selected) {
    const page = await browser.newPage({
      viewport: {
        width: asset.dimensions.width,
        height: asset.dimensions.height,
      },
      deviceScaleFactor: options.scale,
    });
    await page.goto(`${renderUrl}?asset=${encodeURIComponent(asset.assetId)}`);
    await page.waitForFunction(() => document.body.dataset.ready === "1");
    await page.evaluate(() => document.fonts.ready);
    const outputPath = resolve(
      outputDirectory,
      renderFilename(asset, options.scale, options.format),
    );
    await page.screenshot({
      path: outputPath,
      type: options.format === "jpg" ? "jpeg" : "png",
      quality: options.format === "jpg" ? 92 : undefined,
    });
    await page.close();
    exported += 1;
  }
} finally {
  await browser.close();
}
console.log(`Exported ${exported} campaign assets to ${outputDirectory}.`);
