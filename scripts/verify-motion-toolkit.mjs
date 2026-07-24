#!/usr/bin/env node
import { mkdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "@playwright/test";
import { generatedDirectory, root } from "./campaign-system.mjs";

const data = JSON.parse(
  readFileSync(resolve(root, "data/campaigns/motion-timelines.json"), "utf8"),
);
const errors = [];
const requiredSequences = [
  "logo-reveal",
  "category-reveal",
  "kinetic-headline",
  "decision-flow",
  "alfred-core-memory",
  "product-window",
  "metric-reveal",
  "founder-quote",
  "press-quote",
  "funding-end-card",
  "story-title",
];
for (const sequence of requiredSequences) {
  if (!data.sequences.some((item) => item.id === sequence)) errors.push(`missing motion sequence ${sequence}`);
}
for (const duration of [6, 10, 15, 30]) {
  if (!data.timelines.some((item) => item.duration === duration)) errors.push(`missing ${duration}-second timeline`);
}
for (const ratio of ["horizontal", "square", "portrait", "vertical"]) {
  if (!data.ratios.some((item) => item.id === ratio)) errors.push(`missing ${ratio} motion master`);
}
if (data.personality.loops !== false) errors.push("motion toolkit permits looping");
if (data.personality.flashes !== false) errors.push("motion toolkit permits flashes");
if (data.personality.defaultDamping < 1) errors.push("default motion is not critically damped");
for (const timeline of data.timelines) {
  if (timeline.cues.some((cue) => cue.at < 0 || cue.at >= timeline.duration)) {
    errors.push(`${timeline.duration}-second timeline has a cue outside its duration`);
  }
}

const pageUrl = pathToFileURL(resolve(root, "campaign/motion/index.html")).href;
const posterDirectory = resolve(
  generatedDirectory,
  "alfred-flagship-launch",
  "motion-posters",
);
mkdirSync(posterDirectory, { recursive: true });
const browser = await chromium.launch({ headless: true });
try {
  for (const ratio of data.ratios) {
    const page = await browser.newPage({
      viewport: { width: ratio.width, height: ratio.height },
    });
    await page.goto(`${pageUrl}?poster=1&ratio=${ratio.id}&duration=15`);
    await page.waitForFunction(() => document.body.dataset.ready === "1");
    await page.evaluate(() => document.fonts.ready);
    const state = await page.evaluate(() => {
      const stage = document.querySelector(".motion-stage").getBoundingClientRect();
      return {
        stageWidth: stage.width,
        stageHeight: stage.height,
        poster: document.body.dataset.poster === "1",
        completeMessage:
          document.querySelector(".motion-end strong")?.textContent.trim() === "Seek Alfred",
        restrictedFunding:
          document.querySelector(".motion-end span")?.textContent.includes("restricted"),
      };
    });
    if (state.stageWidth !== ratio.width || state.stageHeight !== ratio.height) {
      errors.push(`${ratio.id}: poster dimensions do not match`);
    }
    if (!state.poster || !state.completeMessage || !state.restrictedFunding) {
      errors.push(`${ratio.id}: static poster is incomplete`);
    }
    await page.screenshot({
      path: resolve(posterDirectory, `${ratio.id}.png`),
    });
    await page.close();
  }

  const page = await browser.newPage({
    viewport: { width: 1280, height: 900 },
    reducedMotion: "reduce",
  });
  await page.goto(`${pageUrl}?ratio=horizontal&duration=15&speed=0.25`);
  await page.waitForFunction(() => document.body.dataset.ready === "1");
  const before = await page.locator("#motion-scrubber").inputValue();
  await page.locator("#motion-play").click();
  await page.waitForTimeout(250);
  const after = await page.locator("#motion-scrubber").inputValue();
  await page.locator("#motion-scrubber").fill("9");
  await page.locator("#motion-scrubber").dispatchEvent("input");
  const state = await page.evaluate(() => ({
    sequence: document.querySelector("#motion-stage").dataset.sequence,
    transition: getComputedStyle(document.querySelector(".motion-copy")).transition,
    playingLabel: document.querySelector("#motion-play").textContent,
  }));
  if (Number(after) <= Number(before)) errors.push("interactive timeline did not advance");
  if (Number(after) >= 0.2) errors.push("quarter-speed review mode did not slow playback");
  if (state.sequence !== "alfred-core-memory") errors.push("scrubber did not retarget from the current time");
  if (!state.transition.includes("opacity")) errors.push("reduced-motion cross-fade is missing");
  if (state.transition.includes("transform")) errors.push("reduced-motion mode still transitions transforms");
  if (state.playingLabel !== "Play") errors.push("scrubbing did not interrupt playback");
  await page.close();
} finally {
  await browser.close();
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Verified ${data.sequences.length} sequences, 4 timelines, 4 ratios, interruption, and reduced motion.`);
console.log(`Poster frames: ${posterDirectory}`);
