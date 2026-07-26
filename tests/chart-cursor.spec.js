import { test, expect } from "@playwright/test";

/* The chart cursor (Phase 4.4). SSR can prove the markup exists; only a browser
   can prove hover moves it, arrows walk it, and Escape dismisses it. */
test.beforeEach(async ({ page }) => {
  await page.goto("/tests/harness.html");
  await page.waitForSelector("body[data-ready='1']", { timeout: 15000 });
});

const chart = (page) => page.locator("[data-testid='cursor-line'] [role='group']");
const tip = (page) => page.locator("[data-testid='cursor-line'] [aria-hidden='true']").filter({ hasText: ":" });

test("the chart is one tab stop, not one per data point", async ({ page }) => {
  const stops = await page.locator("[data-testid='cursor-line'] [tabindex='0']").count();
  expect(stops).toBe(1);
});

test("arrow keys walk the points and announce through the live region", async ({ page }) => {
  const c = chart(page);
  await c.focus();
  await page.keyboard.press("ArrowRight");
  const live = page.locator("[data-testid='cursor-line'] [aria-live='polite']");
  await expect(live).toHaveText("W1: 12");
  await page.keyboard.press("ArrowRight");
  await expect(live).toHaveText("W2: 18");
  await page.keyboard.press("End");
  await expect(live).toHaveText("W4: 24");
  await page.keyboard.press("Home");
  await expect(live).toHaveText("W1: 12");
});

test("Escape dismisses the cursor", async ({ page }) => {
  const c = chart(page);
  await c.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator("[data-testid='cursor-line'] [aria-live='polite']")).toHaveText("W1: 12");
  await page.keyboard.press("Escape");
  await expect(page.locator("[data-testid='cursor-line'] [aria-live='polite']")).toHaveText("");
});

test("hover shows the readout and moves it across the chart", async ({ page }) => {
  const c = chart(page);
  // mouse.move takes VIEWPORT coordinates — the chart sits far down the harness,
  // so hovering its document position would land on empty space off-screen
  await c.scrollIntoViewIfNeeded();
  const box = await c.boundingBox();
  await page.mouse.move(box.x + box.width * 0.02, box.y + box.height / 2);
  await expect(tip(page)).toContainText("W1: 12");
  await page.mouse.move(box.x + box.width * 0.98, box.y + box.height / 2);
  await expect(tip(page)).toContainText("W4: 24");
  // leaving clears it
  await page.mouse.move(box.x + box.width / 2, box.y - 60);
  await expect(tip(page)).toHaveCount(0);
});

test("the readout is hidden from assistive tech (the live region already says it)", async ({ page }) => {
  await chart(page).focus();
  await page.keyboard.press("ArrowRight");
  const t = page.locator("[data-testid='cursor-line'] [role='group'] > div[aria-hidden='true']").first();
  await expect(t).toHaveAttribute("aria-hidden", "true");
});

/* Legend toggling (4.4). Hiding a series must also RESCALE the chart — the
   failure mode is a y-axis that keeps its old ceiling, leaving the remaining
   bars mysteriously short. Only a browser can show that. */
const legend = (page) => page.locator("[data-testid='legend-chart'] [role='list']");

test("legend series toggle off and on, and announce their state", async ({ page }) => {
  const btn = legend(page).getByRole("button", { name: /search/ });
  await expect(btn).toHaveAttribute("aria-pressed", "true");
  await btn.click();
  await expect(btn).toHaveAttribute("aria-pressed", "false");
  await btn.click();
  await expect(btn).toHaveAttribute("aria-pressed", "true");
});

test("hiding a series rescales the chart instead of leaving a gap", async ({ page }) => {
  // the y-axis ticks are the chart's own statement of its scale, so they are the
  // unambiguous assertion — bar geometry alone can look plausible either way
  const ticks = async () =>
    (await page.locator("[data-testid='legend-chart'] svg text").allTextContents())
      .map(Number).filter((n) => !Number.isNaN(n));
  const before = Math.max(...(await ticks()));
  await legend(page).getByRole("button", { name: /search/ }).click();
  const after = Math.max(...(await ticks()));
  expect(before).toBe(100);   // search 40 + social 20, rounded up
  expect(after).toBe(20);     // social alone — the axis followed it down
  expect(after).toBeLessThan(before);
});

test("the hidden state is not signalled by colour alone", async ({ page }) => {
  const btn = legend(page).getByRole("button", { name: /social/ });
  await btn.click();
  await expect(btn.locator("span").nth(1)).toHaveCSS("text-decoration-line", "line-through");
});
