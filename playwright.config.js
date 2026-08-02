import { defineConfig, devices } from "@playwright/test";

/* Two projects:
   - interaction: OS-independent behaviour assertions — gates CI on a bare runner.
   - visual: tri-theme screenshot regression. Baselines are platform-suffixed:
     *-darwin.png for local dev, *-linux.png committed for the CI `visual` gate
     (both run in the version-pinned Playwright container). Regenerate the Linux
     set with the update-visual-baselines workflow. */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: "line",
  timeout: 30000,
  webServer: {
    command: "node scripts/serve-tests.mjs 8799",
    url: "http://127.0.0.1:8799/tests/harness.html",
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
  use: {
    baseURL: "http://127.0.0.1:8799",
    reducedMotion: "reduce",
    viewport: { width: 1240, height: 900 },
  },
  projects: [
    // NB: testMatch is an explicit alternation, not a glob of tests/ — a new
    // spec file has to be named here or it silently never runs.
    { name: "interaction", testMatch: /interaction\.spec\.js|theme-tokens\.spec\.js|chart-cursor\.spec\.js|kits-boot\.spec\.js|strings\.spec\.js|target-size\.spec\.js/, use: { ...devices["Desktop Chrome"] } },
    { name: "visual", testMatch: /visual\.spec\.js/, use: { ...devices["Desktop Chrome"] } },
    // forced-colors: Windows High Contrast emulation. Chromium substitutes the system
    // palette, so this asserts real computed colors, not just that the media query fires.
    { name: "forced-colors", testMatch: /forced-colors\.spec\.js/, use: { ...devices["Desktop Chrome"], forcedColors: "active" } },
    // playground: boots the live docs page and clicks through all 115 components
    { name: "playground", testMatch: /playground\.spec\.js/, use: { ...devices["Desktop Chrome"] } },
    // reflow: WCAG 1.4.10 at a 320px CSS viewport. Every other project pins
    // 1240px, so until this existed the suite could only ever see one width.
    { name: "reflow", testMatch: /reflow\.spec\.js/, use: { ...devices["Desktop Chrome"], viewport: { width: 320, height: 720 } } },
  ],
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.02, animations: "disabled" } },
});
