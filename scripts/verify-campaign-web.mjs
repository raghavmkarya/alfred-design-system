#!/usr/bin/env node
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "@playwright/test";
import { root } from "./campaign-system.mjs";

const pageUrl = pathToFileURL(resolve(root, "campaign/web/launch.html")).href;
const outputDirectory = mkdtempSync(resolve(tmpdir(), "alfred-campaign-web-"));
const cases = [
  { name: "mobile", width: 390, height: 844, query: "" },
  { name: "tablet", width: 768, height: 1024, query: "?missing=1" },
  { name: "desktop", width: 1440, height: 1000, query: "" },
  { name: "wide", width: 1920, height: 1080, query: "?stress=long" },
  { name: "embargoed", width: 1440, height: 1000, query: "?embargoed=1" },
];
const errors = [];
const browser = await chromium.launch({ headless: true });
try {
  for (const testCase of cases) {
    const pageErrors = [];
    const page = await browser.newPage({
      viewport: { width: testCase.width, height: testCase.height },
      reducedMotion: testCase.name === "mobile" ? "reduce" : "no-preference",
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") pageErrors.push(message.text());
    });
    await page.goto(`${pageUrl}${testCase.query}`);
    await page.waitForFunction(() => document.body.dataset.ready === "1");
    await page.evaluate(() => document.fonts.ready);
    const state = await page.evaluate(() => {
      const headline = document.querySelector("#hero-headline");
      const headlineRect = headline.getBoundingClientRect();
      const recognition = document.querySelector("#recognition");
      return {
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: innerWidth,
        headlineVisible:
          headlineRect.width > 0 &&
          headlineRect.height > 0 &&
          headlineRect.left >= 0 &&
          headlineRect.right <= innerWidth,
        bracketedPlaceholder: /\[[A-Z0-9][A-Z0-9 _:/.-]*\]/.test(document.body.textContent),
        embargoLeak: document.body.dataset.embargoLeak === "1",
        recognitionHidden: recognition.hidden,
        productProof: Boolean(document.querySelector(".product-stage .proof-window")),
        coreMap: Boolean(document.querySelector(".core-map")),
        emptyState: document.body.textContent.includes("Optional content absent"),
        scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
        overflowing: [...document.querySelectorAll("body *")]
          .map((element) => ({
            tag: element.tagName.toLowerCase(),
            className: typeof element.className === "string" ? element.className : "",
            left: element.getBoundingClientRect().left,
            right: element.getBoundingClientRect().right,
          }))
          .filter((item) => item.left < -1 || item.right > innerWidth + 1)
          .slice(0, 8),
      };
    });
    if (state.documentWidth !== state.viewportWidth) {
      errors.push(`${testCase.name}: horizontal page overflow ${JSON.stringify(state.overflowing)}`);
    }
    if (!state.headlineVisible) errors.push(`${testCase.name}: hero headline is clipped`);
    if (state.bracketedPlaceholder) errors.push(`${testCase.name}: unresolved placeholder is visible`);
    if (state.embargoLeak) errors.push(`${testCase.name}: embargoed funding leaked`);
    if (!state.recognitionHidden) errors.push(`${testCase.name}: restricted recognition section is visible`);
    if (!state.productProof) errors.push(`${testCase.name}: product proof is missing`);
    if (!state.coreMap) errors.push(`${testCase.name}: Alfred Core map is missing`);
    if (testCase.name === "tablet" && !state.emptyState) {
      errors.push("tablet: missing optional content fallback is absent");
    }
    if (testCase.name === "mobile" && state.scrollBehavior !== "auto") {
      errors.push("mobile: reduced-motion scroll fallback is missing");
    }
    for (const pageError of pageErrors) errors.push(`${testCase.name}: ${pageError}`);
    if (["mobile", "desktop"].includes(testCase.name)) {
      await page.screenshot({
        path: resolve(outputDirectory, `${testCase.name}.png`),
        fullPage: true,
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
console.log(`Verified campaign website at ${cases.length} responsive and content-stress states.`);
console.log(`Visual samples: ${outputDirectory}`);
