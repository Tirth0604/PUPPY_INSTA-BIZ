const { request } = require("@playwright/test");

const referenceOrigin = "https://puppy.instabizweb.com";

// This environment's API transport trusts its HTTPS proxy CA. Chromium's
// separate trust store does not. Fulfill public, read-only requests with
// verified responses while keeping their original URLs and browser origin.
async function referenceContext(browser, options = {}) {
  const transport = await request.newContext({
    proxy: process.env.HTTPS_PROXY
      ? { server: process.env.HTTPS_PROXY }
      : undefined,
    ignoreHTTPSErrors: false,
  });
  const context = await browser.newContext({
    ...options,
    serviceWorkers: "block",
  });
  const failures = new Map();
  const forwarded = new Set([
    "accept",
    "range",
    "rsc",
    "next-url",
    "next-router-state-tree",
    "next-router-prefetch",
    "next-router-segment-prefetch",
  ]);
  await context.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (url.origin !== referenceOrigin || route.request().method() !== "GET") {
      await route.abort();
      return;
    }
    try {
      const headers = Object.fromEntries(
        Object.entries(route.request().headers()).filter(([name]) =>
          forwarded.has(name),
        ),
      );
      const response = await transport.get(url.href, {
        headers,
        maxRedirects: 0,
        timeout: 20000,
      });
      try {
        if (!response.ok() && response.status() >= 400) {
          failures.set(url.pathname, response.status());
        }
        await route.fulfill({ response });
      } finally {
        await response.dispose();
      }
    } catch (error) {
      failures.set(url.pathname, error.message.split("\n")[0]);
      await route.abort().catch(() => {});
    }
  });
  context.on("close", () => {
    void transport.dispose();
  });
  return { context, failures };
}

module.exports = { referenceContext, referenceOrigin };
