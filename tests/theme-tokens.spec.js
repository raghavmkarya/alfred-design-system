import { test, expect } from "@playwright/test";

/* Computed token values per theme.
   These exist because of a bug that six static verifiers could not see. CSS
   substitutes a custom property's var() at computed-value time on the element
   where the DECLARATION sits, and the substituted result is what inherits. So
   an alias written only in :root — `--elevation-surface: var(--shadow-xs)` —
   computes against the LIGHT ramp, and a [data-theme] scope overriding
   --shadow-xs does not change it. Every dark surface silently kept the light
   shadow, and display copy rendered ink #02021E on a black page (1.02:1).
   Nothing but a browser resolves this, so nothing but a browser can gate it. */
const scopes = [
  { theme: null, name: "light" },
  { theme: "app-dark", name: "app-dark" },
  { theme: "dark", name: "marketing-dark" },
];

async function tokensPerTheme(page, names) {
  return page.evaluate((props) => {
    const out = {};
    for (const [key, attr] of [["light", null], ["app-dark", "app-dark"], ["marketing-dark", "dark"]]) {
      const el = document.createElement("div");
      if (attr) el.dataset.theme = attr;
      document.body.appendChild(el);
      const cs = getComputedStyle(el);
      out[key] = Object.fromEntries(props.map((p) => [p, cs.getPropertyValue(p).trim()]));
      el.remove();
    }
    return out;
  }, names);
}

test.beforeEach(async ({ page }) => {
  await page.goto("/tests/harness.html");
  await page.waitForSelector("body[data-ready='1']", { timeout: 15000 });
});

test("elevation re-resolves per theme instead of freezing at the light ramp", async ({ page }) => {
  const steps = ["--elevation-surface", "--elevation-raised", "--elevation-floating", "--elevation-overlay", "--elevation-modal"];
  const t = await tokensPerTheme(page, steps.concat(["--shadow-xs"]));
  for (const step of steps) {
    // each dark theme must differ from light — if the alias froze, these are equal
    expect(t["app-dark"][step], `${step} did not re-resolve on app-dark`).not.toBe(t.light[step]);
    expect(t["marketing-dark"][step], `${step} did not re-resolve on marketing-dark`).not.toBe(t.light[step]);
  }
  // and must actually track that theme's ramp, not just be different
  expect(t["marketing-dark"]["--elevation-surface"]).toBe(t["marketing-dark"]["--shadow-xs"]);
  expect(t["app-dark"]["--elevation-surface"]).toBe(t["app-dark"]["--shadow-xs"]);
});

test("display type is legible on every theme's canvas", async ({ page }) => {
  const t = await tokensPerTheme(page, ["--text-display", "--text-primary"]);
  // marketing-dark is the one that shipped broken: white page text, ink display text
  expect(t["marketing-dark"]["--text-display"]).not.toBe("#02021E");
  for (const k of ["light", "app-dark", "marketing-dark"]) {
    expect(t[k]["--text-display"], `--text-display is unset on ${k}`).toBeTruthy();
  }
});
