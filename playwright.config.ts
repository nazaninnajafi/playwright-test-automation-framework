import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright Configuration
 *
 * - Multi-browser testing (Chromium, Firefox)
 * - Automatic retries in CI
 * - Screenshot & video on failure
 * - Trace collection on first retry
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,

  reporter: [
    ["html", { open: "never" }],
    ["list"],
  ],

  use: {
    /* Capture rich artifacts for every test run */
    trace: "on",               // Full trace with DOM snapshots (viewable in Trace Viewer)
    screenshot: "on",           // Screenshot after every test
    video: "on",                // Record video of every test
    actionTimeout: 10_000,
  },

  /* Store screenshots, videos & traces here */
  outputDir: "test-results/",

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
  ],
});
