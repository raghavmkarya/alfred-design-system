import { test, expect } from "@playwright/test";

/* The playground renders every component live from the real bundle, driven by a
   generated schema. That makes it the one surface that breaks silently when a
   component's API changes — verify-types would still pass, and no screenshot
   covers it. These assert it actually boots and renders, not just that the
   files exist. */
test.beforeEach(async ({ page }) => {
  await page.goto("/playground/index.html");
  await page.waitForSelector("body[data-ready='1']", { timeout: 20000 });
});

test("boots, lists every component, and renders one live", async ({ page }) => {
  // derived, not hardcoded: the count has gone stale three times, and props.json
  // is generated from the same manifest the playground renders
  const expected = await page.evaluate(async () => (await (await fetch("props.json")).json()).components.length);
  const listed = await page.locator(".pg-item[type=button]").count();
  expect(listed).toBe(expected);
  expect(expected).toBeGreaterThan(100);
  // the default selection is a real component rendered from the real bundle
  await expect(page.locator(".pg-canvas button")).toHaveCount(1);
  await expect(page.locator(".pg-err")).toHaveCount(0);
});

test("prop controls are wired to the live render", async ({ page }) => {
  await page.locator(".pg-item", { hasText: "Button" }).first().click();
  const canvasBtn = page.locator(".pg-canvas button").first();
  const before = await canvasBtn.evaluate((el) => getComputedStyle(el).height);
  // Button's `size` is a string-literal union parsed out of its .d.ts
  await page.locator("#f-size").selectOption("lg");
  await expect
    .poll(async () => canvasBtn.evaluate((el) => getComputedStyle(el).height))
    .not.toBe(before);
});

test("the copy-paste snippet tracks the controls", async ({ page }) => {
  await page.locator(".pg-item", { hasText: "Button" }).first().click();
  await page.locator("#f-variant").selectOption("danger");
  await expect(page.locator(".pg-code pre code")).toContainText('variant="danger"');
});

test("theme, density and direction chrome all apply to the canvas", async ({ page }) => {
  const canvas = page.locator(".pg-canvas");
  await page.getByRole("group", { name: "Theme" }).getByRole("button", { name: "App dark" }).click();
  await expect(canvas).toHaveAttribute("data-theme", "app-dark");
  await page.getByRole("group", { name: "Density" }).getByRole("button", { name: "compact" }).click();
  await expect(canvas).toHaveAttribute("data-density", "compact");
  await page.getByRole("group", { name: "Direction" }).getByRole("button", { name: "RTL" }).click();
  await expect(canvas).toHaveAttribute("dir", "rtl");
});

test("every component renders without throwing", async ({ page }) => {
  // 117 clicks, each a full React re-render, in ONE test. That is legitimately
  // slow rather than stuck, and it had crept up against the 30s default until it
  // began timing out on a loaded machine while asserting nothing was wrong.
  // Marking it slow (3x) instead of trimming what it covers: the value here is
  // that it clicks EVERY component, and a coverage cap to save wall-clock would
  // quietly stop testing the tail.
  test.slow();
  // the whole point of a playground is that you can click anything; a component
  // whose sample props no longer match its API would blow up here and nowhere else
  const names = await page.locator(".pg-item[type=button]").allTextContents();
  const broken = [];
  for (const name of names) {
    await page.locator(".pg-item", { hasText: new RegExp(`^${name}$`) }).first().click();
    if (await page.locator(".pg-err").count()) broken.push(name);
  }
  expect(broken, `components that threw in the playground: ${broken.join(", ")}`).toEqual([]);
});
