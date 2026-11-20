import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "tests/e2e",
  timeout: 60000,
  fullyParallel: false,
  workers: 1,
  reporter: [["list"], ["json", { outputFile: "docs/e2e-results.json" }]],
  use: { baseURL: "http://127.0.0.1:3100", trace: "retain-on-failure" },
  webServer: {
    command: "npm run start -- --port 3100",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: false,
    env: {
      ENQUIRY_STORAGE: "sqlite",
      LOCAL_DATABASE_PATH: ".local/e2e.sqlite",
      RATE_LIMIT_SECRET: "isolated-e2e-demo",
    },
    timeout: 60000,
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: {
          executablePath: process.env.CI ? undefined : "/usr/bin/chromium",
          args: ["--no-sandbox"],
        },
      },
    },
    ...(process.env.CROSS_BROWSER === "1"
      ? [
          { name: "firefox", use: { ...devices["Desktop Firefox"] } },
          { name: "webkit", use: { ...devices["Desktop Safari"] } },
        ]
      : []),
    {
      name: "mobile",
      use: {
        ...devices["iPhone 13"],
        defaultBrowserType: "chromium",
        launchOptions: {
          executablePath: process.env.CI ? undefined : "/usr/bin/chromium",
          args: ["--no-sandbox"],
        },
      },
    },
  ],
});
