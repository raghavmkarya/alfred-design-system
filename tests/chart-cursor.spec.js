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
  /* Bullet is deliberately absent: its readout is anchored to a row's target
     tick, so the containing block is that row's track wrapper, not the group
     that holds every row. */
  for (const id of ["cursor-line", "legend-chart", "cursor-donut", "cursor-scatter", "cursor-sankey", "cursor-gauge"]) {
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
  // the highlight transitions over var(--dur-fast), so sampling once races it —
  // this read exactly 0 mid-transition on CI while passing locally
  await expect
    .poll(async () => Number(await page.locator("[data-testid='cursor-sankey'] svg path").first()
      .evaluate((el) => getComputedStyle(el).strokeOpacity)))
    .toBeGreaterThan(0);
});

/* The gauge cursor walks BANDS. Its value is printed large in the centre and
   needs no cursor; a band is a tinted arc carrying no name and no bounds
   anywhere in the graphic, which is the case the cursor exists for. A gauge
   given no bands therefore has nothing to walk and is not a tab stop at all. */
const gauge = (page) => page.locator("[data-testid='cursor-gauge'] [role='group']");
const gaugeLive = (page) => page.locator("[data-testid='cursor-gauge'] [aria-live='polite']");

test("gauge: arrows walk the bands and announce their bounds", async ({ page }) => {
  await gauge(page).focus();
  await page.keyboard.press("ArrowRight");
  await expect(gaugeLive(page)).toHaveText("Behind: 0 to 50");
  await page.keyboard.press("End");
  // the value 72 sits in the second band, and the announcement says so — the
  // whole point of walking bands is learning where the score falls
  await expect(gaugeLive(page)).toHaveText("On pace: 50 to 100, holds the current 72");
  await page.keyboard.press("Escape");
  await expect(gaugeLive(page)).toHaveText("");
});

test("gauge: hover finds the band by angle, and the gap and the hole find nothing", async ({ page }) => {
  const g = gauge(page);
  await g.scrollIntoViewIfNeeded();
  const box = await g.boundingBox();
  // the gauge is 200px wide and its rail is centred on (100, 100) in its own
  // coordinates, so the wrapper's own top-left plus 100 is the axis
  const cx = box.x + 100, cy = box.y + 100;
  const railR = 100 - (Math.round(200 * 0.085) / 2 + 2);   // r = size/2 - (sw/2 + 2)
  const onRail = (deg) => [cx + railR * Math.cos((deg * Math.PI) / 180), cy + railR * Math.sin((deg * Math.PI) / 180)];
  const readout = page.locator("[data-testid='cursor-gauge'] span[aria-hidden='true']");
  // the sweep runs 135° → 405°, so 180° is an eighth of the way in: first band
  await page.mouse.move(...onRail(180));
  await expect(readout).toHaveText("Behind: 0 to 50");
  await page.mouse.move(...onRail(0));             // 3 o'clock, five sixths in
  await expect(readout).toHaveText("On pace: 50 to 100");
  // 110° is inside the 90° gap at the bottom: on the rail's radius and on no
  // band at all. Clamping to the nearest end here would make the rail look like
  // it wraps around through the gap. (Not a straight 90°: that lands within a
  // pixel of the cropped viewBox's bottom edge.)
  await page.mouse.move(...onRail(110));
  await expect(readout).toHaveCount(0);
  await page.mouse.move(cx, cy);                   // the middle, off the rail
  await expect(readout).toHaveCount(0);
});

test("gauge: a gauge with no bands is not a tab stop", async ({ page }) => {
  await expect(page.locator("[data-testid='gauge-plain'] [tabindex='0']")).toHaveCount(0);
  // and it keeps the static contract instead of a half-applied interactive one
  await expect(page.locator("[data-testid='gauge-plain'] svg[role='img']")).toHaveCount(1);
});

/* The bullet cursor walks ROWS, and reads out the half of the row that is not
   written down: the value is printed at the right of every row, the target is
   only a tick mark and the ratio between them appears nowhere. */
const bullet = (page) => page.locator("[data-testid='cursor-bullet'] [role='group']");
const bulletTip = (page) => page.locator("[data-testid='cursor-bullet'] div[aria-hidden='true']").filter({ hasText: "target" });

test("bullet: hovering a row reads out its target and percentage", async ({ page }) => {
  const b = bullet(page);
  await b.scrollIntoViewIfNeeded();
  // the group's only element children are ChartLive's span, the hidden table and
  // the rows, so `> div` is the rows
  const row = async (i) => page.locator("[data-testid='cursor-bullet'] [role='group'] > div").nth(i)
    .evaluate((el) => { const r = el.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
  const a = await row(0);
  await page.mouse.move(a.x, a.y);
  await expect(bulletTip(page)).toHaveText("target 100 · 80%");
  const c = await row(1);
  await page.mouse.move(c.x, c.y);
  await expect(bulletTip(page)).toHaveText("target 60 · 75%");
  // leaving the whole chart clears — leaving one row does not, or moving between
  // two rows could clear after the next has already set
  await page.mouse.move(a.x, a.y - 120);
  await expect(bulletTip(page)).toHaveCount(0);
});

test("bullet: arrows walk the rows, and it is one tab stop for all of them", async ({ page }) => {
  await expect(page.locator("[data-testid='cursor-bullet'] [tabindex='0']")).toHaveCount(1);
  await bullet(page).focus();
  const live = page.locator("[data-testid='cursor-bullet'] [aria-live='polite']");
  await page.keyboard.press("ArrowDown");
  await expect(live).toHaveText("Search: 80, target 100, 80% of target");
  await page.keyboard.press("End");
  await expect(live).toHaveText("Social: 45, target 60, 75% of target");
  await page.keyboard.press("Escape");
  await expect(live).toHaveText("");
});

test("bullet: the keyboard thickens the active row's bar, not just the live region", async ({ page }) => {
  await bullet(page).focus();
  // row → the track's wrapper → the track → the measure bar (these rows pass no
  // `ranges`, so the bar is the track's first child)
  const bar = page.locator("[data-testid='cursor-bullet'] [role='group'] > div").nth(0)
    .locator("> div").nth(1).locator("> div > div").first();
  const before = await bar.evaluate((el) => el.getBoundingClientRect().height);
  await page.keyboard.press("ArrowDown");
  await expect.poll(async () => bar.evaluate((el) => el.getBoundingClientRect().height))
    .toBeGreaterThan(before);
});
