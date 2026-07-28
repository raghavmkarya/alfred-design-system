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

/* Non-x-indexed cursors. The x-indexed charts share one hit-test (round the x
   fraction to a column); these two do not, and a hit-test is precisely the kind
   of geometry that looks right in source and lands in the wrong place. */

const donut = (page) => page.locator("[data-testid='cursor-donut'] [role='group']");
// the donut's readout lives in the hole, not in a floating pill
const donutTip = (page) => page.locator("[data-testid='cursor-donut'] div[aria-hidden='true']");

test("donut: hover finds the segment by angle, and the hole selects nothing", async ({ page }) => {
  const d = donut(page);
  await d.scrollIntoViewIfNeeded();
  const box = await d.boundingBox();
  const cx = box.x + box.width / 2, cy = box.y + box.height / 2;
  // two equal segments: the first owns 12→6 o'clock (right half), the second 6→12
  const ringR = box.width * 0.4;   // between inner and outer edge of the ring
  await page.mouse.move(cx + ringR, cy);          // 3 o'clock — first segment
  await expect(donutTip(page)).toContainText("Search · 50%");
  await page.mouse.move(cx - ringR, cy);          // 9 o'clock — second segment
  await expect(donutTip(page)).toContainText("Social · 50%");
  // the centre is a hole, not a segment: it must clear rather than keep the last
  // one lit, or the centre label becomes a dead zone that lies about the data
  await page.mouse.move(cx, cy);
  await expect(donutTip(page)).toHaveCount(0);
});

test("donut: arrows walk segments and announce them", async ({ page }) => {
  const d = donut(page);
  await d.focus();
  const live = page.locator("[data-testid='cursor-donut'] [aria-live='polite']");
  await page.keyboard.press("ArrowRight");
  await expect(live).toHaveText("Search: 60 (50%)");
  await page.keyboard.press("End");
  await expect(live).toHaveText("Social: 60 (50%)");
  await page.keyboard.press("Escape");
  await expect(live).toHaveText("");
});

const scatter = (page) => page.locator("[data-testid='cursor-scatter'] [role='group']");
const scatterTip = (page) => page.locator("[data-testid='cursor-scatter'] [aria-hidden='true']").filter({ hasText: ":" });

test("scatter: hover finds the nearest point, and empty plot space selects nothing", async ({ page }) => {
  const s = scatter(page);
  await s.scrollIntoViewIfNeeded();
  const svg = page.locator("[data-testid='cursor-scatter'] svg");
  const box = await svg.boundingBox();
  // The svg letterboxes under the default preserveAspectRatio, so a naive
  // container-fraction would miss. Ask the page where the point actually is.
  const at = async (i) => svg.evaluate((el, idx) => {
    const c = el.querySelectorAll("g > circle:nth-child(2)")[idx];
    const r = c.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
  }, i);
  const a = await at(0);
  await page.mouse.move(a.x, a.y);
  await expect(scatterTip(page)).toContainText("A:");
  const b = await at(1);
  await page.mouse.move(b.x, b.y);
  await expect(scatterTip(page)).toContainText("B:");
  // far from every point, still inside the plot — nothing should be lit
  await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.08);
  await expect(scatterTip(page)).toHaveCount(0);
});

test("scatter: arrows walk points and announce them", async ({ page }) => {
  await scatter(page).focus();
  const live = page.locator("[data-testid='cursor-scatter'] [aria-live='polite']");
  await page.keyboard.press("ArrowRight");
  await expect(live).toContainText("A:");
  await page.keyboard.press("End");
  await expect(live).toContainText("B:");
});

test("both are one tab stop each, not one per segment or point", async ({ page }) => {
  await expect(page.locator("[data-testid='cursor-donut'] [tabindex='0']")).toHaveCount(1);
  await expect(page.locator("[data-testid='cursor-scatter'] [tabindex='0']")).toHaveCount(1);
});

/* The readout is positioned absolutely against its chart, so the wrapper must
   BE a containing block. All four x-indexed charts shipped without one: the
   binds carried a `style` that clobbered the element's own, leaving the wrapper
   with nothing but `outline-offset`. Every cursor test still passed, because
   they all asserted the readout's text and none its position. */
test("every cursor chart's wrapper is a containing block for its readout", async ({ page }) => {
  for (const id of ["cursor-line", "legend-chart", "cursor-donut", "cursor-scatter", "cursor-sankey"]) {
    const pos = await page.locator(`[data-testid='${id}'] [role='group']`).first()
      .evaluate((el) => getComputedStyle(el).position);
    expect(pos, `${id} wrapper must be positioned`).toBe("relative");
  }
});

test("the style prop reaches the chart wrapper instead of being swallowed", async ({ page }) => {
  // the donut sizes its own wrapper, so a wrapper that ignores style is visible
  const w = await page.locator("[data-testid='cursor-donut'] [role='group']")
    .evaluate((el) => el.getBoundingClientRect().width);
  expect(w).toBe(180);
});

/* Sankey's cursor walks LINKS, not nodes: every node already prints its label
   and throughput as text, while a ribbon's value appears nowhere but the hidden
   data table. Its ribbons are cubic beziers, so the pointer half is driven by
   each <path>'s own hit-testing rather than by re-deriving containment. */
const sankey = (page) => page.locator("[data-testid='cursor-sankey'] [role='group']");
const sankeyTip = (page) => page.locator("[data-testid='cursor-sankey'] div[aria-hidden='true']").filter({ hasText: ":" });

test("sankey: hovering a ribbon reads out the flow's value", async ({ page }) => {
  const s = sankey(page);
  await s.scrollIntoViewIfNeeded();
  const ribbon = async (i) => page.locator("[data-testid='cursor-sankey'] svg path").nth(i)
    .evaluate((el) => { const r = el.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
  const a = await ribbon(0);
  await page.mouse.move(a.x, a.y);
  await expect(sankeyTip(page)).toContainText("Paid to MQL: 120");
  const b = await ribbon(1);
  await page.mouse.move(b.x, b.y);
  await expect(sankeyTip(page)).toContainText("MQL to Won: 45");
});

test("sankey: leaving the plot clears, and the readout is one tab stop away", async ({ page }) => {
  await expect(page.locator("[data-testid='cursor-sankey'] [tabindex='0']")).toHaveCount(1);
  const s = sankey(page);
  await s.scrollIntoViewIfNeeded();
  const box = await page.locator("[data-testid='cursor-sankey'] svg").boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.move(box.x + box.width / 2, box.y - 40);
  await expect(sankeyTip(page)).toHaveCount(0);
});

test("sankey: arrows walk the flows and announce them", async ({ page }) => {
  await sankey(page).focus();
  const live = page.locator("[data-testid='cursor-sankey'] [aria-live='polite']");
  await page.keyboard.press("ArrowRight");
  await expect(live).toHaveText("Paid to MQL: 120");
  await page.keyboard.press("End");
  await expect(live).toHaveText("MQL to Won: 45");
  await page.keyboard.press("Escape");
  await expect(live).toHaveText("");
});

test("sankey: the keyboard lights a ribbon, not just the live region", async ({ page }) => {
  // the pointer-only `hover` state used to sit beside the cursor, so arrowing
  // through announced flows while the chart showed nothing at all
  await sankey(page).focus();
  await page.keyboard.press("ArrowRight");
  const op = await page.locator("[data-testid='cursor-sankey'] svg path").first()
    .evaluate((el) => getComputedStyle(el).strokeOpacity);
  expect(Number(op)).toBeGreaterThan(0);
});
