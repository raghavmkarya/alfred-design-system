#!/usr/bin/env node
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "@playwright/test";
import { generatedDirectory, readJson, root } from "./campaign-system.mjs";

const catalogPath = resolve(generatedDirectory, "alfred-flagship-launch", "catalog.json");
const payload = readJson(catalogPath);
const errors = [];
const samples = [];
const seenPlacements = new Set();

for (const asset of payload.assets) {
  const key = `${asset.platform}/${asset.placement}`;
  if (
    !seenPlacements.has(key) &&
    asset.composition === "editorial-led" &&
    asset.copyMode === "short" &&
    asset.theme === "dark"
  ) {
    samples.push(asset);
    seenPlacements.add(key);
  }
}
const seenFamilies = new Set();
for (const asset of payload.assets) {
  if (
    !seenFamilies.has(asset.family) &&
    asset.platform === "linkedin" &&
    asset.placement === "square" &&
    asset.composition === "editorial-led" &&
    asset.copyMode === "short" &&
    asset.theme === "dark"
  ) {
    samples.push(asset);
    seenFamilies.add(asset.family);
  }
}
for (const composition of ["product-led", "illustration-led"]) {
  samples.push(
    payload.assets.find(
      (asset) =>
        asset.family === "product-proof" &&
        asset.platform === "instagram" &&
        asset.placement === "portrait" &&
        asset.composition === composition &&
        asset.copyMode === "medium" &&
        asset.theme === "light",
    ),
  );
}
samples.push(
  payload.assets.find(
    (asset) =>
      asset.family === "category-definition" &&
      asset.platform === "meta" &&
      asset.placement === "landscape" &&
      asset.composition === "editorial-led" &&
      asset.copyMode === "long" &&
      asset.theme === "light",
  ),
);

const outputDirectory = resolve(
  generatedDirectory,
  "alfred-flagship-launch",
  "render-baselines",
);
mkdirSync(outputDirectory, { recursive: true });
const browser = await chromium.launch({ headless: true });
const renderUrl = pathToFileURL(resolve(root, "campaign/render.html")).href;
try {
  for (const asset of samples.filter(Boolean)) {
    const pageErrors = [];
    const page = await browser.newPage({
      viewport: {
        width: asset.dimensions.width,
        height: asset.dimensions.height,
      },
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") pageErrors.push(message.text());
    });
    await page.goto(`${renderUrl}?asset=${encodeURIComponent(asset.assetId)}&safe=1`);
    await page.waitForFunction(() => document.body.dataset.ready === "1");
    await page.evaluate(() => document.fonts.ready);
    const state = await page.evaluate(() => {
      const frame = document.querySelector(".campaign-frame");
      const logo = document.querySelector(".campaign-header img");
      const headline = document.querySelector(".campaign-message h1");
      const footer = document.querySelector(".campaign-footer");
      const safeZone = document.querySelector(".safe-zone");
      const frameRect = frame?.getBoundingClientRect();
      const headlineRect = headline?.getBoundingClientRect();
      const footerRect = footer?.getBoundingClientRect();
      const logoRect = logo?.getBoundingClientRect();
      const safeRect = safeZone?.getBoundingClientRect();
      const inside = (rect, container) =>
        rect &&
        container &&
        rect.left >= container.left - 1 &&
        rect.right <= container.right + 1 &&
        rect.top >= container.top - 1 &&
        rect.bottom <= container.bottom + 1;
      return {
        documentWidth: document.documentElement.scrollWidth,
        documentHeight: document.documentElement.scrollHeight,
        bodyWidth: document.body.scrollWidth,
        bodyHeight: document.body.scrollHeight,
        frameWidth: frameRect?.width,
        frameHeight: frameRect?.height,
        logoLoaded: logo?.complete && logo?.naturalWidth > 0,
        logoInsideSafeZone: inside(logoRect, safeRect),
        headlineInsideSafeZone: inside(headlineRect, safeRect),
        footerInsideSafeZone: inside(footerRect, safeRect),
        primitiveCount: window.AlfredCampaignPrimitives?.ids?.length || 0,
        headlineVisible:
          headlineRect &&
          headlineRect.width > 0 &&
          headlineRect.height > 0 &&
          headlineRect.left >= 0 &&
          headlineRect.right <= innerWidth,
        footerVisible:
          footerRect &&
          footerRect.width > 0 &&
          footerRect.height > 0 &&
          footerRect.left >= 0 &&
          footerRect.right <= innerWidth &&
          footerRect.bottom <= innerHeight,
        footerRect: footerRect
          ? {
              left: footerRect.left,
              right: footerRect.right,
              top: footerRect.top,
              bottom: footerRect.bottom,
              width: footerRect.width,
              height: footerRect.height,
            }
          : null,
        safeRect: safeRect
          ? {
              left: safeRect.left,
              right: safeRect.right,
              top: safeRect.top,
              bottom: safeRect.bottom,
            }
          : null,
      };
    });
    if (state.documentWidth !== asset.dimensions.width || state.bodyWidth !== asset.dimensions.width) {
      errors.push(`${asset.assetId}: horizontal overflow`);
    }
    if (state.documentHeight !== asset.dimensions.height || state.bodyHeight !== asset.dimensions.height) {
      errors.push(`${asset.assetId}: vertical overflow`);
    }
    if (
      state.frameWidth !== asset.dimensions.width ||
      state.frameHeight !== asset.dimensions.height
    ) {
      errors.push(`${asset.assetId}: frame dimensions do not match manifest`);
    }
    if (!state.logoLoaded) errors.push(`${asset.assetId}: logo failed to load`);
    if (state.primitiveCount < 17) errors.push(`${asset.assetId}: primitive registry is incomplete`);
    if (!state.logoInsideSafeZone) errors.push(`${asset.assetId}: logo crosses the primary safe zone`);
    if (!state.headlineInsideSafeZone) errors.push(`${asset.assetId}: headline crosses the primary safe zone`);
    if (!state.footerInsideSafeZone) {
      errors.push(`${asset.assetId}: footer crosses the primary safe zone (${JSON.stringify(state)})`);
    }
    if (!state.headlineVisible) errors.push(`${asset.assetId}: headline is clipped`);
    if (!state.footerVisible) {
      errors.push(`${asset.assetId}: footer is clipped (${JSON.stringify(state)})`);
    }
    for (const pageError of pageErrors) errors.push(`${asset.assetId}: ${pageError}`);
    if (samples.indexOf(asset) < seenPlacements.size) {
      await page.screenshot({
        path: resolve(outputDirectory, `${asset.assetId}.png`),
      });
    }
    await page.close();
  }
} finally {
  await browser.close();
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Verified ${samples.filter(Boolean).length} exact-size renders across ${seenPlacements.size} placements and ${seenFamilies.size} families.`);
console.log(`Visual samples: ${outputDirectory}`);
