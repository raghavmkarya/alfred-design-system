import { test, expect } from "@playwright/test";

/* Windows High Contrast (forced-colors). Chromium substitutes the system palette,
   so these assert real computed colors rather than just that the media query fires.
   The bug this suite exists to catch: HCM flattens every author background to
   Canvas, so anything that conveyed meaning through a FILL — selection, elevation,
   a focus ring drawn as a box-shadow — silently disappears. */
test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ forcedColors: "active" });
  await page.goto("/tests/harness.html");
  await page.waitForSelector("body[data-ready='1']", { timeout: 15000 });
  // guard the guard: if emulation ever stops applying, every assertion below
  // would pass vacuously against ordinary light-theme colors.
  expect(await page.evaluate(() => matchMedia("(forced-colors: active)").matches)).toBe(true);
});

const styleOf = (page, sel, prop) =>
  page.locator(sel).first().evaluate((el, p) => getComputedStyle(el)[p], prop);

test("selection survives: a checked segment is not identical to an unchecked one", async ({ page }) => {
  // before Phase 2.4 both rendered white-on-black and the state was simply gone
  const onSel = "[data-testid='seg'] [role='radio'][aria-checked='true']";
  const offSel = "[data-testid='seg'] [role='radio'][aria-checked='false']";
  expect(await styleOf(page, onSel, "backgroundColor")).not.toBe(await styleOf(page, offSel, "backgroundColor"));
  expect(await styleOf(page, onSel, "color")).not.toBe(await styleOf(page, offSel, "color"));
});

test("selection survives: a selected tab is not identical to an unselected one", async ({ page }) => {
  const on = await styleOf(page, "[data-testid='hcm-tabs'] [role='tab'][aria-selected='true']", "backgroundColor");
  const off = await styleOf(page, "[data-testid='hcm-tabs'] [role='tab'][aria-selected='false']", "backgroundColor");
  expect(on).not.toBe(off);
});

test("the selected item's label follows it onto the highlight", async ({ page }) => {
  // a descendant keeping CanvasText would vanish into the Highlight fill
  const colors = await page.locator("[data-testid='seg'] [role='radio'][aria-checked='true']").first()
    .evaluate((el) => ({
      own: getComputedStyle(el).color,
      kids: [...el.querySelectorAll("*")].map((k) => getComputedStyle(k).color),
    }));
  for (const k of colors.kids) expect(k).toBe(colors.own);
});

test("focus ring survives, even where it is drawn as a box-shadow", async ({ page }) => {
  // HCM drops box-shadows; the baseline restores a real outline with !important
  const input = page.locator("[data-testid='density-comfortable'] input").first();
  await input.focus();
  const outline = await input.evaluate((el) => {
    const cs = getComputedStyle(el);
    return { width: cs.outlineWidth, style: cs.outlineStyle };
  });
  expect(outline.style).not.toBe("none");
  expect(parseFloat(outline.width)).toBeGreaterThan(0);
});

test("chart colour is preserved so series stay distinguishable", async ({ page }) => {
  // forcing the palette would collapse every series to one CanvasText silhouette.
  // Defensible only because every chart also carries a text alternative (PR #40).
  expect(await styleOf(page, "[data-testid='hcm-chart'] svg", "forcedColorAdjust")).toBe("none");
  const label = await page.locator("[data-testid='hcm-chart'] svg").first().getAttribute("aria-label");
  expect(label).toBeTruthy();
});
