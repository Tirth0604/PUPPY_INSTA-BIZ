const { mkdir, rename, writeFile } = require("node:fs/promises");
const { chromium } = require("@playwright/test");
const {
  referenceContext,
  referenceOrigin,
} = require("./reference-browser.cjs");

const directory = "docs/visual-comparison";
const cloneOrigin = process.env.VISUAL_CLONE_ORIGIN || "http://127.0.0.1:3102";

async function record(context, origin, name) {
  const page = await context.newPage();
  const video = page.video();
  await page.goto(origin, { waitUntil: "load" });
  await page.locator(".tp-curtain").waitFor({ state: "hidden" });
  const positions = [
    [100, 240],
    [1330, 240],
    [710, 760],
  ];
  const reactions = [];
  for (const [x, y] of positions) {
    await page.mouse.move(x, y);
    await page.waitForTimeout(350);
    reactions.push(
      await page.evaluate(() => {
        const referenceEyes = document.querySelector(
          ".pup-actor [data-p=eyes]",
        );
        if (referenceEyes) return referenceEyes.getAttribute("transform");
        return document
          .querySelector(".demo-mascot [data-p=eyes]")
          ?.style.getPropertyValue("translate");
      }),
    );
  }
  await page.waitForTimeout(2700);
  const steps = page.locator(".tp-chat__step");
  const scrollStates = [];
  for (let index = 0; index < (await steps.count()); index++) {
    await steps.nth(index).evaluate((step) => {
      scrollTo({
        top: scrollY + step.getBoundingClientRect().top - innerHeight * 0.24,
      });
    });
    await page.waitForTimeout(750);
    scrollStates.push(
      await page.evaluate(() => ({
        active: [...document.querySelectorAll(".tp-chat__step")].findIndex(
          (step) => step.hasAttribute("data-active"),
        ),
        messages: [...document.querySelectorAll(".tp-msg-group")].map((group) =>
          group.getAttribute("data-show"),
        ),
      })),
    );
  }
  await context.close();
  const path = await video.path();
  await rename(path, `${directory}/motion-${name}.webm`);
  return { reactions, scrollStates };
}

async function main() {
  await mkdir(directory, { recursive: true });
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_PATH || "/usr/bin/chromium",
  });
  try {
    const options = {
      viewport: { width: 1440, height: 900 },
      reducedMotion: "no-preference",
      recordVideo: { dir: directory, size: { width: 960, height: 600 } },
    };
    const reference = await referenceContext(browser, options);
    const clone = await browser.newContext(options);
    const results = {
      reference: await record(reference.context, referenceOrigin, "reference"),
      clone: await record(clone, cloneOrigin, "clone"),
    };
    await writeFile(
      `${directory}/motion.json`,
      JSON.stringify(results, null, 2) + "\n",
    );
    console.log(results);
  } finally {
    await browser.close();
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
