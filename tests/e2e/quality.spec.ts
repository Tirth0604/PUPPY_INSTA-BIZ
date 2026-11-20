import { chromium, test, expect } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
test("nine viewport sizes, image integrity and local video playback", async ({
  page,
}, info) => {
  test.skip(info.project.name !== "chromium");
  test.setTimeout(120000);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const curtain = page.locator(".tp-curtain");
  await expect(curtain).toHaveAttribute("aria-hidden", "true");
  await expect(curtain).toHaveCSS("animation-name", "tp-curtain-rest");
  await expect(curtain).toBeHidden();
  const lineup = page.locator(".tp-lineup:not(.tp-lineup--tags)");
  const rotatingSeat = lineup.locator("a").nth(3);
  await expect(rotatingSeat).toHaveAttribute("data-state", "pop", {
    timeout: 7000,
  });
  await expect(lineup.locator("a").first()).toHaveAttribute(
    "href",
    "/puppies/maltipoo-max-male",
  );
  await page.mouse.move(100, 200);
  const mascot = page.locator('.demo-mascot [data-p="eyes"]');
  await expect
    .poll(() =>
      mascot.evaluate((node) => node.style.getPropertyValue("translate")),
    )
    .toMatch(/^-/);
  await page.mouse.move(1350, 200);
  await expect
    .poll(() =>
      mascot.evaluate((node) => node.style.getPropertyValue("translate")),
    )
    .toMatch(/^[1-9]/);

  const steps = page.locator(".tp-chat__step");
  await steps.nth(1).evaluate((step) =>
    scrollTo({
      top: scrollY + step.getBoundingClientRect().top - innerHeight * 0.25,
      behavior: "instant",
    }),
  );
  await expect(steps.nth(1)).toHaveAttribute("data-active", "");
  await expect(steps.first()).toHaveAttribute("data-done", "");
  await expect(page.locator(".tp-msg-group[data-show=true]")).toHaveCount(2);

  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const [width, height] of [
    [1920, 1080],
    [1440, 900],
    [1280, 800],
    [1024, 768],
    [768, 1024],
    [430, 932],
    [390, 844],
    [375, 812],
    [360, 800],
  ]) {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await expect(curtain).toHaveCSS("display", "none");
    await page
      .locator("img")
      .evaluateAll((imgs) =>
        imgs.forEach((i) => i.setAttribute("loading", "eager")),
      );
    await page.waitForFunction(() =>
      [...document.images].every((i) => i.complete),
    );
    const broken = await page
      .locator("img")
      .evaluateAll((imgs) =>
        imgs
          .filter((i) => (i as HTMLImageElement).naturalWidth === 0)
          .map((i) => i.getAttribute("src")),
      );
    expect(broken).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `docs/screenshots/home-${width}.png`,
      fullPage: true,
    });
  }
  await page.goto("/puppies/maltipoo-max-male");
  await page.getByRole("button", { name: "Next photo", exact: true }).click();
  await page.locator("video").evaluate(async (el) => {
    const v = el as HTMLVideoElement;
    v.muted = true;
    await v.play();
  });
  await expect
    .poll(() =>
      page
        .locator("video")
        .evaluate((v) => (v as HTMLVideoElement).currentTime),
    )
    .toBeGreaterThan(0);
});
test("measure Lighthouse against the independent application", async ({}, info) => {
  test.skip(info.project.name !== "chromium");
  test.setTimeout(120000);
  execFileSync(
    process.execPath,
    [
      "node_modules/lighthouse/cli/index.js",
      "http://127.0.0.1:3100/",
      "--chrome-flags=--headless --no-sandbox",
      "--output=json",
      "--output-path=docs/lighthouse.json",
      "--only-categories=performance,accessibility,best-practices,seo",
      "--quiet",
    ],
    {
      env: {
        ...process.env,
        CHROME_PATH: process.env.CI
          ? chromium.executablePath()
          : "/usr/bin/chromium",
      },
      timeout: 110000,
    },
  );
  writeFileSync(
    "docs/lighthouse-methodology.txt",
    "Local production build, Lighthouse default simulated mobile throttling, headless system Chromium, localhost HTTP. See fetchTime in the raw report. Lab measurement, not field INP. SEO intentionally noindex.\n",
  );
});
