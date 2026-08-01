import { test, expect } from "@playwright/test";

/* OS-independent behaviour assertions — these gate CI. They also guard the
   usePress refactor (hover / focus / controlled-toggle state). */
test.beforeEach(async ({ page }) => {
  await page.goto("/tests/harness.html");
  await page.waitForSelector("body[data-ready='1']", { timeout: 15000 });
});

test("SegmentedControl: arrow keys move the selection (roving radiogroup)", async ({ page }) => {
  const radios = page.locator("[data-testid='seg'] [role='radio']");
  await expect(radios.nth(0)).toHaveAttribute("aria-checked", "true");
  await radios.nth(0).focus();
  await page.keyboard.press("ArrowRight");
  await expect(radios.nth(1)).toHaveAttribute("aria-checked", "true");
  await expect(radios.nth(0)).toHaveAttribute("aria-checked", "false");
});

test("Switch: click toggles checked (native input, controlled round-trip)", async ({ page }) => {
  const sw = page.locator("[data-testid='switch'] [role='switch']");   // native <input type=checkbox role=switch>
  await expect(sw).not.toBeChecked();
  await sw.click();
  await expect(sw).toBeChecked();
});

test("OfferSwitch: click toggles aria-checked", async ({ page }) => {
  const sw = page.locator("[data-testid='offer'] [role='switch']");
  await expect(sw).toHaveAttribute("aria-checked", "false");
  await sw.click();
  await expect(sw).toHaveAttribute("aria-checked", "true");
});

/* Density scale (Phase 2.1). The point of the scale is that ONE attribute resizes
   controls with no per-component override, and that `comfortable` is byte-identical
   to what shipped before it existed — so these assert the literal default heights. */
const boxH = (page, testid, sel) =>
  page.locator(`[data-testid='${testid}'] ${sel}`).first().evaluate((el) => el.getBoundingClientRect().height);

test("density: one attribute resizes controls, comfortable === the pre-scale defaults", async ({ page }) => {
  const [compact, comfortable, spacious] = await Promise.all(
    ["compact", "comfortable", "spacious"].map((d) => boxH(page, `density-${d}`, "button")),
  );
  expect(compact).toBeLessThan(comfortable);
  expect(comfortable).toBeLessThan(spacious);
  expect(comfortable).toBe(46);   // Button md, unchanged from before the scale existed
  expect(compact).toBe(38);
  expect(spacious).toBe(54);
});

test("density: fields scale with the same attribute", async ({ page }) => {
  // the field's height lives on the bordered wrapper; the inner <input> is height:100% of it
  const fieldH = (d) => page.locator(`[data-testid='density-${d}'] input`).first()
    .evaluate((el) => el.parentElement.getBoundingClientRect().height);
  const [compact, comfortable, spacious] = await Promise.all(
    ["compact", "comfortable", "spacious"].map(fieldH),
  );
  expect(compact).toBe(44);
  expect(comfortable).toBe(52);   // Input, unchanged from before the scale existed
  expect(spacious).toBe(60);
});

test("density: a comfortable island inside a compact region resets fully", async ({ page }) => {
  // guards the density-contract craft rule: a scope that omitted a token would
  // inherit the compact value here and this would read 38, not 46.
  expect(await boxH(page, "density-island", "button")).toBe(46);
});

/* RTL (Phase 2.3). Logical properties are invisible in LTR — they resolve to exactly
   the physical values they replaced — so the only way to prove the migration did
   anything is to render the same component in both directions and watch it mirror. */
test("rtl: the leading accent rail mirrors to the other edge", async ({ page }) => {
  const railOffset = async (dir) => {
    const box = page.locator(`[data-testid='dir-${dir}'] > *`).first();
    const rail = page.locator(`[data-testid='dir-${dir}'] [aria-hidden='true']`).first();
    const [b, r] = await Promise.all([box.boundingBox(), rail.boundingBox()]);
    return { fromStart: Math.round(r.x - b.x), fromEnd: Math.round(b.x + b.width - (r.x + r.width)) };
  };
  const ltr = await railOffset("ltr");
  const rtl = await railOffset("rtl");
  // the rail sits the same distance from the LEADING edge in both directions...
  expect(rtl.fromEnd).toBe(ltr.fromStart);
  // ...which means it is nowhere near the left edge under RTL. Before the logical
  // migration this was `left: 0` and both directions measured identically.
  expect(rtl.fromStart).toBeGreaterThan(100);
  expect(ltr.fromEnd).toBeGreaterThan(100);
});

/* The other half of the RTL story, and the half logical properties cannot reach.
   `transform` has no logical form: `translateX(18px)` is eighteen physical pixels
   to the right in every writing direction. A checked Switch therefore mirrored
   its TRACK correctly and drove its KNOB the wrong way, landing it back at the
   start edge — the one place it must never be when the switch reads as on.
   Reverting either component to a bare `translateX(18px)` fails this. */
test("rtl: a checked knob travels toward the leading end, not the physical right", async ({ page }) => {
  const knobOffsets = async (dir, sel) => {
    const track = page.locator(`[data-testid='flip-${dir}'] ${sel.track}`).first();
    const knob = track.locator(sel.knob).first();
    const [t, k] = await Promise.all([track.boundingBox(), knob.boundingBox()]);
    return {
      fromStart: Math.round(dir === "rtl" ? t.x + t.width - (k.x + k.width) : k.x - t.x),
      fromEnd: Math.round(dir === "rtl" ? k.x - t.x : t.x + t.width - (k.x + k.width)),
    };
  };
  const SWITCHES = [
    { track: ".ds-switch-track", knob: "span[aria-hidden='true']" },              // Switch
    { track: "button[role='switch'] > span:last-child", knob: "span" },           // OfferSwitch
  ];
  for (const sel of SWITCHES) {
    const ltr = await knobOffsets("ltr", sel);
    const rtl = await knobOffsets("rtl", sel);
    // measured from the LEADING edge, the knob sits in the same place in both
    expect(rtl.fromStart).toBe(ltr.fromStart);
    // and it is at the trailing end, not the leading one — the bug put it at 3px
    expect(rtl.fromStart).toBeGreaterThan(rtl.fromEnd);
    expect(ltr.fromStart).toBeGreaterThan(ltr.fromEnd);
  }
});

test("Button: hover changes the background (usePress hover state)", async ({ page }) => {
  const btn = page.locator("[data-testid='btn'] button");
  const before = await btn.evaluate((el) => getComputedStyle(el).backgroundColor);
  await btn.hover();
  await expect
    .poll(async () => btn.evaluate((el) => getComputedStyle(el).backgroundColor))
    .not.toBe(before);
});
