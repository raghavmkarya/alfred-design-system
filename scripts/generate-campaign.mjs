#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  buildCatalog,
  generatedDirectory,
  loadCampaign,
  loadFactoryDefinitions,
  summarizeCatalog,
  validateCatalog,
  root,
} from "./campaign-system.mjs";

const args = new Set(process.argv.slice(2));
const includeRestricted = args.has("--include-restricted");
if (includeRestricted && !args.has("--acknowledge-embargo")) {
  console.error("Restricted generation requires --acknowledge-embargo.");
  process.exit(1);
}

const { campaign } = loadCampaign();
const definitions = loadFactoryDefinitions();
const catalog = buildCatalog(campaign, definitions, { includeRestricted });
const errors = validateCatalog(campaign, catalog, { includeRestricted, exporting: false });
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

const outputDirectory = resolve(generatedDirectory, campaign.campaignId);
mkdirSync(outputDirectory, { recursive: true });
const investorDeck = JSON.parse(
  readFileSync(resolve(root, "data/campaigns/investor-deck.json"), "utf8"),
);
const motionTimelines = JSON.parse(
  readFileSync(resolve(root, "data/campaigns/motion-timelines.json"), "utf8"),
);
const mediaKit = JSON.parse(
  readFileSync(resolve(root, "data/campaigns/media-kit.json"), "utf8"),
);
const productAssets = JSON.parse(
  readFileSync(resolve(root, "data/campaigns/product-assets.json"), "utf8"),
);
const illustrationSprite = readFileSync(
  resolve(root, "campaign/assets/illustrations.svg"),
  "utf8",
);
const payload = {
  generatedAt: new Date().toISOString(),
  restrictedBuild: includeRestricted,
  campaign: {
    campaignId: campaign.campaignId,
    campaignName: campaign.campaignName,
    version: campaign.version,
    lifecycle: campaign.lifecycle,
  },
  summary: summarizeCatalog(catalog),
  assets: catalog,
};
const catalogStem = includeRestricted ? "catalog.restricted" : "catalog";
const globalName = includeRestricted
  ? "ALFRED_CAMPAIGN_RESTRICTED_CATALOG"
  : "ALFRED_CAMPAIGN_CATALOG";
writeFileSync(resolve(outputDirectory, `${catalogStem}.json`), `${JSON.stringify(payload, null, 2)}\n`);
writeFileSync(
  resolve(outputDirectory, `${catalogStem}.js`),
  `window.${globalName} = ${JSON.stringify(payload)};\n`,
);
if (!includeRestricted) {
  writeFileSync(
    resolve(outputDirectory, "investor-deck.js"),
    `window.ALFRED_INVESTOR_DECK = ${JSON.stringify(investorDeck)};\n`,
  );
  writeFileSync(
    resolve(outputDirectory, "motion-timelines.js"),
    `window.ALFRED_MOTION_TIMELINES = ${JSON.stringify(motionTimelines)};\n`,
  );
  writeFileSync(
    resolve(outputDirectory, "media-kit.js"),
    `window.ALFRED_MEDIA_KIT = ${JSON.stringify(mediaKit)};\n`,
  );
  writeFileSync(
    resolve(outputDirectory, "product-assets.js"),
    `window.ALFRED_PRODUCT_ASSETS = ${JSON.stringify(productAssets)};\n`,
  );
  const illustrationDirectory = resolve(outputDirectory, "illustrations");
  mkdirSync(illustrationDirectory, { recursive: true });
  const sharedDefs = illustrationSprite.match(/<defs>([\s\S]*?)<\/defs>/)?.[1] || "";
  for (const illustration of productAssets.illustrations) {
    const pattern = new RegExp(
      `<symbol id="illustration-${illustration.id}" viewBox="([^"]+)">([\\s\\S]*?)<\\/symbol>`,
    );
    const match = illustrationSprite.match(pattern);
    if (!match) throw new Error(`Missing illustration symbol ${illustration.id}`);
    writeFileSync(
      resolve(illustrationDirectory, `${illustration.id}.svg`),
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${match[1]}" role="img" aria-label="${illustration.alt.replaceAll('"', "&quot;")}"><defs>${sharedDefs}</defs>${match[2]}</svg>\n`,
    );
  }
}

const csv = [
  [
    "asset_id",
    "family",
    "platform",
    "placement",
    "width",
    "height",
    "composition",
    "copy_mode",
    "theme",
    "approval_state",
    "sensitive",
    "export_filename",
  ],
  ...catalog.map((asset) => [
    asset.assetId,
    asset.family,
    asset.platform,
    asset.placement,
    asset.dimensions.width,
    asset.dimensions.height,
    asset.composition,
    asset.copyMode,
    asset.theme,
    asset.approvalState,
    asset.sensitive,
    asset.exportFilename,
  ]),
]
  .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","))
  .join("\n");
writeFileSync(resolve(outputDirectory, `${catalogStem}.csv`), `${csv}\n`);

if (!includeRestricted) {
  const sampleAssets = catalog.filter(
    (asset) =>
      asset.platform === "linkedin" &&
      asset.placement === "portrait" &&
      asset.copyMode === "short" &&
      asset.theme === "dark",
  );
  const cards = sampleAssets
    .map(
      (asset) => `
        <article>
          <iframe title="${asset.family}" src="../../render.html?asset=${encodeURIComponent(asset.assetId)}"></iframe>
          <h2>${asset.family.replaceAll("-", " ")}</h2>
          <p>${asset.composition} · ${asset.dimensions.width} × ${asset.dimensions.height}</p>
        </article>`,
    )
    .join("");
  writeFileSync(
    resolve(outputDirectory, "contact-sheet.html"),
    `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Alfred flagship launch contact sheet</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; padding: 36px; color: #fff; background: #08090b; font-family: Arial, sans-serif; }
    header { margin-bottom: 30px; }
    h1 { margin: 0 0 8px; font-size: 40px; }
    header p, article p { color: #9b9ca2; }
    main { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 24px; }
    article { overflow: hidden; border: 1px solid #292c32; border-radius: 14px; background: #111318; }
    iframe { width: 100%; aspect-ratio: 8/9; border: 0; pointer-events: none; }
    h2, article p { margin: 14px 16px; }
    h2 { font-size: 15px; text-transform: capitalize; }
    article p { font-size: 12px; }
  </style>
</head>
<body>
  <header><h1>Flagship launch contact sheet</h1><p>${sampleAssets.length} representative family and composition masters. Restricted funding is excluded.</p></header>
  <main>${cards}</main>
</body>
</html>\n`,
  );

  const carouselPages = [
    ["cover", "category-definition", "editorial-led"],
    ["narrative", "decision-intelligence-education", "illustration-led"],
    ["proof", "market-problem", "editorial-led"],
    ["product", "product-proof", "product-led"],
    ["quote", "founder-pov", "editorial-led"],
    ["cta", "launch-countdown", "editorial-led"],
  ].map(([role, family, composition], index) => {
    const asset = catalog.find(
      (candidate) =>
        candidate.family === family &&
        candidate.platform === "linkedin" &&
        candidate.placement === "portrait" &&
        candidate.composition === composition &&
        candidate.copyMode === "short" &&
        candidate.theme === "dark",
    );
    return {
      page: index + 1,
      role,
      assetId: asset.assetId,
      exportFilename: `${campaign.campaignId}__launch-carousel__${String(index + 1).padStart(2, "0")}-${role}__v${campaign.version.replaceAll(".", "_")}.png`,
    };
  });
  writeFileSync(
    resolve(outputDirectory, "linkedin-document-carousel.json"),
    `${JSON.stringify({ campaignId: campaign.campaignId, pages: carouselPages }, null, 2)}\n`,
  );
}
console.log(JSON.stringify(payload.summary));
