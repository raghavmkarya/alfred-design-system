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
    { name: "interaction", testMatch: /interaction\.spec\.js/, use: { ...devices["Desktop Chrome"] } },
    { name: "visual", testMatch: /visual\.spec\.js/, use: { ...devices["Desktop Chrome"] } },
  ],
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.02, animations: "disabled" } },
});
