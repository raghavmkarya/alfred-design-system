#!/usr/bin/env node
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "@playwright/test";
import { root } from "./campaign-system.mjs";

const data = JSON.parse(
  readFileSync(resolve(root, "data/campaigns/investor-deck.json"), "utf8"),
);
const errors = [];
const requiredTypes = [
  "cover",
  "statement",
  "comparison",
  "category",
  "flow",
  "product",
  "workflow",
  "architecture",
  "market",
  "model",
  "gtm",
  "expansion",
  "competition",
  "moat",
  "chart",
  "team",
  "allocation",
  "vision",
  "appendix",
];
if (data.slides.length < 20 || data.slides.length > 24) {
  errors.push(`investor deck must contain 20 to 24 slides, received ${data.slides.length}`);
}
for (const type of requiredTypes) {
  if (!data.slides.some((slide) => slide.type === type)) errors.push(`missing slide type ${type}`);
}
for (const slide of data.slides.filter((item) => ["chart", "market", "model", "allocation", "competition"].includes(item.type))) {
  for (const field of ["source", "period", "unit", "proofStatus"]) {
    if (!slide[field]) errors.push(`${slide.id}: missing ${field}`);
  }
}
const forbiddenCompanyMetric = data.slides.some(
  (slide) =>
    slide.proofStatus === "Placeholder, not company proof" &&
    /\$[\d,.]+|\b\d+(?:\.\d+)?%/.test(`${slide.title} ${slide.body}`),
);
if (forbiddenCompanyMetric) errors.push("placeholder slide contains a metric that could be mistaken for company proof");

const pageUrl = pathToFileURL(resolve(root, "campaign/deck/investor.html")).href;
const outputDirectory = mkdtempSync(resolve(tmpdir(), "alfred-investor-deck-"));
const cases = [
  { name: "confidential", query: "?view=deck", expectedSlides: 22 },
  { name: "public", query: "?view=deck&mode=public", expectedSlides: 22 },
  { name: "teaser", query: "?view=teaser", expectedSlides: 0 },
  { name: "summary", query: "?view=summary", expectedSlides: 0 },
  { name: "data-room", query: "?view=data-room", expectedSlides: 0 },
];
const browser = await chromium.launch({ headless: true });
try {
  for (const testCase of cases) {
    const pageErrors = [];
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    page.on("pageerror", (error) => pageErrors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") pageErrors.push(message.text());
    });
    await page.goto(`${pageUrl}${testCase.query}`);
    await page.waitForFunction(() => document.body.dataset.ready === "1");
    await page.evaluate(() => document.fonts.ready);
    const state = await page.evaluate(() => ({
      slideCount: document.querySelectorAll(".investor-slide").length,
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: innerWidth,
      confidentialWatermarks: [...document.querySelectorAll(".deck-watermark")].filter((item) =>
        item.textContent.includes("Confidential"),
      ).length,
      publicWatermarks: [...document.querySelectorAll(".deck-watermark")].filter((item) =>
        item.textContent.includes("Public adaptation"),
      ).length,
      placeholderLabels: document.body.textContent.match(/Placeholder, not company proof/g)?.length || 0,
      compactDocument: Boolean(document.querySelector(".compact-document")),
      dataRoom: Boolean(document.querySelector(".data-room-document")),
    }));
    if (state.slideCount !== testCase.expectedSlides) {
      errors.push(`${testCase.name}: expected ${testCase.expectedSlides} slides, received ${state.slideCount}`);
    }
    if (state.documentWidth !== state.viewportWidth) errors.push(`${testCase.name}: horizontal overflow`);
    if (testCase.name === "confidential" && state.confidentialWatermarks !== 22) {
      errors.push("confidential: watermark missing from one or more slides");
    }
    if (testCase.name === "public" && state.publicWatermarks !== 22) {
      errors.push("public: public watermark missing from one or more slides");
    }
    if (testCase.name === "public" && state.confidentialWatermarks > 0) {
      errors.push("public: confidential watermark leaked");
    }
    if (["confidential", "public"].includes(testCase.name) && state.placeholderLabels < 6) {
      errors.push(`${testCase.name}: placeholder proof labels are incomplete`);
    }
    if (["teaser", "summary"].includes(testCase.name) && !state.compactDocument) {
      errors.push(`${testCase.name}: compact document is missing`);
    }
    if (testCase.name === "data-room" && !state.dataRoom) errors.push("data-room: cover and dividers are missing");
    for (const pageError of pageErrors) errors.push(`${testCase.name}: ${pageError}`);
    if (testCase.name === "confidential") {
      await page.locator(".investor-slide").first().screenshot({
        path: resolve(outputDirectory, "cover.png"),
      });
      await page.locator('[data-slide-id="traction"]').screenshot({
        path: resolve(outputDirectory, "traction.png"),
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
console.log(`Verified ${data.slides.length} investor slides, teaser, summary, public mode, and data-room system.`);
console.log(`Visual samples: ${outputDirectory}`);
