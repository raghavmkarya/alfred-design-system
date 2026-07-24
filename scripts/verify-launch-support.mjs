#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "@playwright/test";
import { root } from "./campaign-system.mjs";

const errors = [];
const mediaKit = JSON.parse(
  readFileSync(resolve(root, "data/campaigns/media-kit.json"), "utf8"),
);
for (const assetId of mediaKit.publicBundle) {
  const asset = mediaKit.assets.find((item) => item.assetId === assetId);
  if (!asset) errors.push(`public bundle references missing asset ${assetId}`);
  else if (asset.status !== "public") errors.push(`public bundle contains non-public asset ${assetId}`);
}
if (mediaKit.assets.some((asset) => asset.status !== "public" && mediaKit.publicBundle.includes(asset.assetId))) {
  errors.push("media kit public bundle contains draft or unavailable content");
}
const pressCss = readFileSync(resolve(root, "campaign/press/press.css"), "utf8");
if (!pressCss.includes("@media print")) errors.push("press release lacks a PDF print treatment");
const operationsText = readFileSync(resolve(root, "campaign/operations/index.html"), "utf8");
if (/\b(budget|bidding|targeting|attribution)\b/i.test(operationsText)) {
  errors.push("visual command center contains campaign operations configuration");
}

const browser = await chromium.launch({ headless: true });
try {
  const press = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await press.goto(pathToFileURL(resolve(root, "campaign/press/index.html")).href);
  await press.waitForFunction(() => document.body.dataset.ready === "1");
  const pressState = await press.evaluate(() => ({
    publicAssetCount: Number(document.body.dataset.publicAssetCount),
    cards: document.querySelectorAll("#media-assets article").length,
    bracketedPlaceholder: /\[[A-Z0-9][A-Z0-9 _:/.-]*\]/.test(document.body.textContent),
    restrictedFact:
      /Series [A-Z]|\$[\d,.]+\s?(?:M|million|B|billion)\b/i.test(document.body.textContent),
    overflow: document.documentElement.scrollWidth !== innerWidth,
  }));
  if (pressState.publicAssetCount !== mediaKit.publicBundle.length) errors.push("press media-kit count differs from public bundle");
  if (pressState.cards !== mediaKit.publicBundle.length) errors.push("press media-kit cards are incomplete");
  if (pressState.bracketedPlaceholder) errors.push("press page exposes bracketed placeholders");
  if (pressState.restrictedFact) errors.push("press page exposes restricted funding content");
  if (pressState.overflow) errors.push("press page has horizontal overflow");
  await press.close();

  for (const type of ["launch", "investor", "founder", "customer"]) {
    for (const colorScheme of ["light", "dark"]) {
      const page = await browser.newPage({
        viewport: { width: 720, height: 1000 },
        colorScheme,
      });
      await page.goto(
        `${pathToFileURL(resolve(root, "campaign/email/index.html")).href}?type=${type}`,
      );
      await page.waitForFunction(() => document.body.dataset.ready === "1");
      const state = await page.evaluate(() => ({
        title: document.querySelector("#email-title").textContent.trim(),
        body: document.querySelector("#email-body").textContent.trim(),
        cta: document.querySelector("#email-cta").textContent.trim(),
        textLogo: document.querySelector(".email-card header strong").textContent.trim(),
        images: document.querySelectorAll("img").length,
        overflow: document.documentElement.scrollWidth !== innerWidth,
      }));
      if (!state.title || !state.body || !state.cta || state.textLogo !== "Alfred") {
        errors.push(`${type}/${colorScheme}: email loses essential copy with images disabled`);
      }
      if (state.images !== 0) errors.push(`${type}/${colorScheme}: email requires an image`);
      if (state.overflow) errors.push(`${type}/${colorScheme}: email has horizontal overflow`);
      await page.close();
    }
  }

  const operations = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await operations.goto(pathToFileURL(resolve(root, "campaign/operations/index.html")).href);
  const operationsState = await operations.evaluate(() => ({
    gates: document.querySelectorAll("ol li").length,
    restricted: document.body.textContent.includes("Excluded from default surfaces"),
    overflow: document.documentElement.scrollWidth !== innerWidth,
  }));
  if (operationsState.gates !== 5 || !operationsState.restricted) {
    errors.push("launch visual command center is incomplete");
  }
  if (operationsState.overflow) errors.push("launch visual command center has horizontal overflow");
  await operations.close();
} finally {
  await browser.close();
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("Verified press, public media kit, 4 email audiences in light and dark, and visual command center.");
