#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "@playwright/test";
import { generatedDirectory, root } from "./campaign-system.mjs";

const data = JSON.parse(
  readFileSync(resolve(root, "data/campaigns/product-assets.json"), "utf8"),
);
const svgText = readFileSync(resolve(root, "campaign/assets/illustrations.svg"), "utf8");
const errors = [];
if (data.productShots.length !== 12) errors.push(`expected 12 product shots, received ${data.productShots.length}`);
if (data.crops.length !== 4) errors.push(`expected 4 product crops, received ${data.crops.length}`);
if (data.illustrations.length < 20 || data.illustrations.length > 24) {
  errors.push(`expected 20 to 24 illustrations, received ${data.illustrations.length}`);
}
for (const product of data.productShots) {
  if (!product.alt || !product.focus || !product.name) errors.push(`${product.id}: incomplete product metadata`);
}
for (const illustration of data.illustrations) {
  if (!illustration.alt) errors.push(`${illustration.id}: missing alt text`);
  if (!svgText.includes(`id="illustration-${illustration.id}"`)) {
    errors.push(`${illustration.id}: missing vector symbol`);
  }
  const exportPath = resolve(
    generatedDirectory,
    "alfred-flagship-launch",
    "illustrations",
    `${illustration.id}.svg`,
  );
  if (!existsSync(exportPath)) errors.push(`${illustration.id}: missing standalone SVG export`);
}
const symbolCount = (svgText.match(/<symbol id="illustration-/g) || []).length;
if (symbolCount !== data.illustrations.length) {
  errors.push(`vector symbol count ${symbolCount} differs from illustration registry ${data.illustrations.length}`);
}
if (/\b(neural network|glowing orb|mesh gradient|artificial intelligence brain)\b/i.test(svgText)) {
  errors.push("illustration source contains a generic AI-art cliché");
}

const productUrl = pathToFileURL(resolve(root, "campaign/assets/product-shot.html")).href;
const galleryUrl = pathToFileURL(resolve(root, "campaign/assets/index.html")).href;
const previewDirectory = resolve(
  generatedDirectory,
  "alfred-flagship-launch",
  "asset-previews",
);
mkdirSync(previewDirectory, { recursive: true });
const browser = await chromium.launch({ headless: true });
try {
  for (const product of data.productShots) {
    for (const crop of data.crops) {
      const page = await browser.newPage({
        viewport: { width: crop.width, height: crop.height },
      });
      await page.goto(`${productUrl}?product=${product.id}&crop=${crop.id}`);
      await page.waitForFunction(() => document.body.dataset.ready === "1");
      await page.evaluate(() => document.fonts.ready);
      const state = await page.evaluate(() => {
        const canvas = document.querySelector(".product-canvas").getBoundingClientRect();
        return {
          canvasWidth: canvas.width,
          canvasHeight: canvas.height,
          documentWidth: document.documentElement.scrollWidth,
          documentHeight: document.documentElement.scrollHeight,
          name: document.querySelector("#product-name").textContent.trim(),
          demoLabel: document.body.textContent.includes("Northwind Labs demo"),
          alt: document.querySelector(".product-canvas").getAttribute("aria-label"),
          error: document.body.dataset.error || null,
        };
      });
      if (state.canvasWidth !== crop.width || state.canvasHeight !== crop.height) {
        errors.push(`${product.id}/${crop.id}: canvas dimensions do not match`);
      }
      if (state.documentWidth !== crop.width || state.documentHeight !== crop.height) {
        errors.push(`${product.id}/${crop.id}: document overflow`);
      }
      if (state.name !== product.name || state.alt !== product.alt || !state.demoLabel || state.error) {
        errors.push(`${product.id}/${crop.id}: content or accessibility metadata failed`);
      }
      if (product.id === "daily-brief" && crop.id === "desktop") {
        await page.screenshot({ path: resolve(previewDirectory, "daily-brief-desktop.png") });
      }
      await page.close();
    }
  }

  const transparent = await browser.newPage({
    viewport: { width: 1080, height: 1080 },
  });
  await transparent.goto(`${productUrl}?product=decision-fork&crop=square&transparent=1`);
  await transparent.waitForFunction(() => document.body.dataset.ready === "1");
  const transparentState = await transparent.evaluate(() => ({
    flag: document.body.dataset.transparent === "1",
    background: getComputedStyle(document.body).backgroundColor,
  }));
  if (!transparentState.flag || transparentState.background !== "rgba(0, 0, 0, 0)") {
    errors.push("transparent product cutout does not have a transparent canvas");
  }
  await transparent.screenshot({
    path: resolve(previewDirectory, "decision-fork-transparent.png"),
    omitBackground: true,
  });
  await transparent.close();

  const gallery = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await gallery.goto(galleryUrl);
  await gallery.waitForFunction(() => document.body.dataset.ready === "1");
  const galleryState = await gallery.evaluate(() => ({
    productCards: document.querySelectorAll(".product-gallery article").length,
    illustrationCards: document.querySelectorAll(".illustration-gallery article").length,
    accessibleIllustrations: document.querySelectorAll(".illustration-gallery img[alt]").length,
    loadedIllustrations: [...document.querySelectorAll(".illustration-gallery img")].filter(
      (image) => image.complete && image.naturalWidth > 0,
    ).length,
    overflow: document.documentElement.scrollWidth !== innerWidth,
  }));
  if (galleryState.productCards !== data.productShots.length) errors.push("asset gallery product count differs");
  if (galleryState.illustrationCards !== data.illustrations.length) errors.push("asset gallery illustration count differs");
  if (galleryState.accessibleIllustrations !== data.illustrations.length) errors.push("illustration gallery accessibility descriptions differ");
  if (galleryState.loadedIllustrations !== data.illustrations.length) errors.push("one or more illustration exports failed to paint");
  if (galleryState.overflow) errors.push("asset gallery has horizontal overflow");
  await gallery.locator(".illustration-gallery article").first().screenshot({
    path: resolve(previewDirectory, "connected-business-stack.png"),
  });
  await gallery.close();
} finally {
  await browser.close();
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Verified ${data.productShots.length} product shots across ${data.crops.length} crops and ${data.illustrations.length} vector illustrations.`);
console.log(`Asset previews: ${previewDirectory}`);
