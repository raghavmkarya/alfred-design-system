import { test, expect } from "@playwright/test";

/* Tri-theme visual regression — the harness that caught the marketing-dark
   Banner bug, made permanent. Run locally: `npx playwright test --project=visual`.
   Baselines are platform-suffixed; CI-gating needs Linux baselines (Phase 1.4a). */
test.beforeEach(async ({ page }) => {
  await page.goto("/tests/harness.html");
  await page.waitForSelector("body[data-ready='1']", { timeout: 15000 });
});

for (const theme of ["light", "app-dark", "dark"]) {
  test(`gallery renders correctly — ${theme}`, async ({ page }) => {
    const section = page.locator(`[data-testid='theme-${theme}']`);
    await expect(section).toHaveScreenshot(`gallery-${theme}.png`);
  });
}
