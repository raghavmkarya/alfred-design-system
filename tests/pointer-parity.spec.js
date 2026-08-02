import { test, expect } from "@playwright/test";

/* Anything revealed by HOVER must also be revealed by FOCUS.

   A touch or keyboard user cannot hover. If a control's meaning only ever
   appears under a pointer, it does not exist for them — WCAG 2.1.1 (Keyboard)
   and 1.4.13 (Content on Hover or Focus).

   The system already does this correctly: `Tooltip` pairs `onMouseEnter` with
   `onFocus`, no component gates rendered content behind a hover-only state, and
   every chart cursor has a documented keyboard model. This suite is not fixing
   anything — it is holding a property that was true by care and guarded by
   nothing. `Tooltip` in particular had NO test coverage at all: not in any spec,
   not in verify-a11y, so its `onFocus` could have been dropped in a refactor
   and every gate would have stayed green. */

test.use({ viewport: { width: 900, height: 600 } });

async function mountTooltip(page) {
  await page.goto("/tests/harness.html");
  await page.waitForSelector("body[data-ready='1']", { timeout: 15000 });
  await page.evaluate(() => {
    const ns = window.AlfredAIDesignSystem_1ce241;
    document.body.innerHTML = "<div id='box' style='padding:60px'></div>";
    ReactDOM.createRoot(document.getElementById("box")).render(
      React.createElement(ns.Tooltip, { label: "Cost per acquisition" },
        React.createElement("button", { type: "button", id: "trigger" }, "CPA")));
  });
  await page.waitForSelector("#trigger", { timeout: 5000 });
}

test("Tooltip: keyboard focus reveals the tip, exactly as hover does", async ({ page }) => {
  await mountTooltip(page);
  await expect(page.locator("[role='tooltip']")).toHaveCount(0);

  await page.locator("#trigger").focus();
  // the tip has a hover-intent open delay, which applies to focus too
  await expect(page.locator("[role='tooltip']")).toHaveCount(1, { timeout: 3000 });
  await expect(page.locator("[role='tooltip']")).toHaveText("Cost per acquisition");
});

test("Tooltip: the tip is wired to the trigger by aria-describedby while open", async ({ page }) => {
  await mountTooltip(page);
  await page.locator("#trigger").focus();
  await expect(page.locator("[role='tooltip']")).toHaveCount(1, { timeout: 3000 });
  const described = await page.evaluate(() => {
    const tip = document.querySelector("[role='tooltip']");
    // the wrapper carries aria-describedby; assert the id actually resolves
    const owner = document.querySelector(`[aria-describedby='${tip.id}']`);
    return { hasOwner: !!owner, id: tip.id };
  });
  expect(described.hasOwner).toBe(true);
  expect(described.id).toBeTruthy();
});

test("Tooltip: blur closes it, so it cannot strand on screen after tabbing away", async ({ page }) => {
  await mountTooltip(page);
  await page.locator("#trigger").focus();
  await expect(page.locator("[role='tooltip']")).toHaveCount(1, { timeout: 3000 });
  await page.evaluate(() => document.getElementById("trigger").blur());
  await expect(page.locator("[role='tooltip']")).toHaveCount(0, { timeout: 3000 });
});
