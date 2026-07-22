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

test("Button: hover changes the background (usePress hover state)", async ({ page }) => {
  const btn = page.locator("[data-testid='btn'] button");
  const before = await btn.evaluate((el) => getComputedStyle(el).backgroundColor);
  await btn.hover();
  await expect
    .poll(async () => btn.evaluate((el) => getComputedStyle(el).backgroundColor))
    .not.toBe(before);
});
