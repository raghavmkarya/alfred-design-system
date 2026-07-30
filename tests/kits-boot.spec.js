import { test, expect } from "@playwright/test";

/* The four kit pages are published to GitHub Pages and no longer load React or
   Babel from a CDN: React is vendored and the JSX is compiled to .js at build
   time. Nothing else proves a compiled page still boots — verify-render checks
   the components in isolation, not the page that wires them together. */
const KITS = [
  ["app", "/ui_kits/app/index.html"],
  ["app-dark", "/ui_kits/app-dark/index.html"],
  ["website", "/ui_kits/website/index.html"],
  ["onboarding", "/ui_kits/onboarding/index.html"],
];

for (const [name, url] of KITS) {
  test(`${name} boots with no CDN and no console errors`, async ({ page }) => {
    const errors = [];
    page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
    page.on("pageerror", (e) => errors.push(String(e)));
    const external = [];
    page.on("request", (r) => { if (!r.url().startsWith("http://localhost") && !r.url().startsWith("http://127.0.0.1")) external.push(r.url()); });

    await page.goto(url);
    await expect(page.locator("#root")).not.toBeEmpty();
    expect(errors, `${name} console errors`).toEqual([]);
    expect(external, `${name} requested a third-party URL`).toEqual([]);
  });
}
