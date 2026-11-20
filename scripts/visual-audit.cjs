const { mkdir, writeFile } = require("node:fs/promises");
const { chromium } = require("@playwright/test");
const sharp = require("sharp");
const {
  referenceContext,
  referenceOrigin,
} = require("./reference-browser.cjs");

const output = "docs/visual-comparison";
const cloneOrigin = process.env.VISUAL_CLONE_ORIGIN || "http://127.0.0.1:3102";
const sizes = [
  [1920, 1080],
  [1440, 900],
  [1280, 800],
  [1024, 768],
  [768, 1024],
  [430, 932],
  [390, 844],
  [375, 812],
  [360, 800],
];
const routes = [
  "puppies",
  "gone-home",
  "happy-families",
  "how-it-works",
  "faq",
  "contact",
  "puppies/maltipoo-max-male",
  "puppies/pomeranian-ace-boy",
];
const jobs = [
  ...sizes.map(([width, height]) => ({ route: "", width, height })),
  ...routes.flatMap((route) => [
    { route, width: 1440, height: 900 },
    { route, width: 390, height: 844 },
  ]),
];
const tolerance = 16;

async function capture(page, origin, { route, width, height }) {
  await page.setViewportSize({ width, height });
  const response = await page.goto(origin + "/" + route, { waitUntil: "load" });
  if (!response?.ok())
    throw new Error(`HTTP ${response?.status()} for ${origin}/${route}`);
  if (origin === referenceOrigin) {
    await page.waitForFunction(
      () => document.querySelector(".tp-curtain")?.dataset.state === "idle",
    );
    if (route === "puppies") await page.locator(".tp-sketches.mt-8").waitFor();
  }
  await page.evaluate(async () => {
    await document.fonts.ready;
    const visibleImages = [...document.images].filter((image) => {
      const bounds = image.getBoundingClientRect();
      return bounds.bottom > 0 && bounds.top < innerHeight;
    });
    await Promise.race([
      Promise.allSettled(visibleImages.map((image) => image.decode())),
      new Promise((resolve) => setTimeout(resolve, 3500)),
    ]);
  });
  const measurements = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > innerWidth + 1,
    heading: document.querySelector("h1")?.textContent.trim(),
    headingFont: document.querySelector("h1")
      ? getComputedStyle(document.querySelector("h1")).fontSize
      : null,
    brokenVisibleImages: [...document.images]
      .filter((image) => {
        const bounds = image.getBoundingClientRect();
        return (
          bounds.width > 0 &&
          bounds.bottom > 0 &&
          bounds.top < innerHeight &&
          image.complete &&
          !image.naturalWidth
        );
      })
      .map((image) => image.getAttribute("alt")),
  }));
  return {
    png: await page.screenshot({ animations: "disabled" }),
    measurements,
  };
}

async function compare(reference, clone, job) {
  const slug = (job.route || "home").replaceAll("/", "__") + "-" + job.width;
  const options = { raw: { ...job, channels: 3 } };
  const [a, b] = await Promise.all(
    [reference, clone].map(({ png }) =>
      sharp(png).removeAlpha().toColourspace("srgb").raw().toBuffer(),
    ),
  );
  if (a.length !== b.length || a.length !== job.width * job.height * 3) {
    throw new Error(`Unexpected dimensions for ${slug}`);
  }
  const blend = Buffer.alloc(a.length);
  const heat = Buffer.alloc(a.length);
  let close = 0;
  for (let pixel = 0; pixel < a.length; pixel += 3) {
    let delta = 0;
    for (let channel = 0; channel < 3; channel++) {
      const i = pixel + channel;
      delta = Math.max(delta, Math.abs(a[i] - b[i]));
      blend[i] = Math.round((a[i] + b[i]) / 2);
      heat[i] = Math.round(a[i] / 4);
    }
    if (delta <= tolerance) close++;
    else heat[pixel] = 255;
  }
  await Promise.all([
    sharp(reference.png)
      .jpeg({ quality: 90 })
      .toFile(`${output}/${slug}-reference.jpg`),
    sharp(clone.png)
      .jpeg({ quality: 90 })
      .toFile(`${output}/${slug}-clone.jpg`),
    sharp(blend, options)
      .jpeg({ quality: 90 })
      .toFile(`${output}/${slug}-overlay.jpg`),
    sharp(heat, options)
      .jpeg({ quality: 90 })
      .toFile(`${output}/${slug}-difference.jpg`),
  ]);
  return {
    ...job,
    withinTolerancePercent: Math.round((10000 * close) / (a.length / 3)) / 100,
    reference: reference.measurements,
    clone: clone.measurements,
  };
}

async function main() {
  await mkdir(output, { recursive: true });
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_PATH || "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  try {
    const settings = {
      reducedMotion: "reduce",
      deviceScaleFactor: 1,
      locale: "en-US",
    };
    const { context: reference, failures } = await referenceContext(
      browser,
      settings,
    );
    const clone = await browser.newContext(settings);
    const results = [];
    const workers = Array.from({ length: 3 }, async (_, worker) => {
      const pages = await Promise.all([reference.newPage(), clone.newPage()]);
      for (let i = worker; i < jobs.length; i += 3) {
        const job = jobs[i];
        const [a, b] = await Promise.all([
          capture(pages[0], referenceOrigin, job),
          capture(pages[1], cloneOrigin, job),
        ]);
        results[i] = await compare(a, b, job);
        console.log(
          job.route || "home",
          job.width,
          results[i].withinTolerancePercent,
        );
      }
    });
    await Promise.all(workers);
    await writeFile(
      `${output}/results.json`,
      JSON.stringify(
        {
          capturedAt: new Date().toISOString(),
          tolerance,
          region: "initial viewport at scrollTop 0; reduced motion, no masks",
          referenceFailedRequests: Object.fromEntries(failures),
          results,
        },
        null,
        2,
      ) + "\n",
    );
  } finally {
    await browser.close();
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
