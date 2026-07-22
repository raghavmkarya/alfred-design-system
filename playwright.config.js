import { defineConfig, devices } from "@playwright/test";

/* Two projects:
   - interaction: OS-independent behaviour assertions — gates CI.
   - visual: tri-theme screenshot regression — run locally (baselines are
     platform-suffixed; CI gating needs Linux baselines, tracked as Phase 1.4a). */
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
