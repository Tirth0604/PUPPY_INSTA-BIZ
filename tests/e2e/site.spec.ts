import { test, expect } from "@playwright/test";
import puppies from "../../data/puppies.json";
import { DatabaseSync } from "node:sqlite";
import { existsSync } from "node:fs";
import AxeBuilder from "@axe-core/playwright";
const routes = [
  "/",
  "/puppies",
  "/gone-home",
  "/happy-families",
  "/how-it-works",
  "/faq",
  "/contact",
];
// Reset only rate buckets in the isolated browser fixture DB, never application data.
test.beforeEach(async ({}, info) => {
  if (
    /contact validation|puppy-specific/.test(info.title) &&
    existsSync(".local/e2e.sqlite")
  ) {
    const db = new DatabaseSync(".local/e2e.sqlite");
    if (
      db
        .prepare("SELECT name FROM sqlite_master WHERE name='rate_limits'")
        .get()
    )
      db.exec("DELETE FROM rate_limits");
    db.close();
  }
});
test("all public pages, profile destinations and media resolve", async ({
  page,
}) => {
  test.setTimeout(120_000);
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  for (const path of [...routes, ...puppies.map((p) => "/puppies/" + p.slug)]) {
    const r = await page.goto(path);
    expect(r?.status(), path).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      path,
    ).toBe(true);
  }
  expect(errors).toEqual([]);
  const bad = await page.goto("/puppies/not-a-puppy");
  expect(bad?.status()).toBe(404);
  await expect(page.getByText("This puppy wandered off")).toBeVisible();
});
test("catalogue queries, archive and back navigation", async ({ page }) => {
  await page.goto("/puppies");
  await expect(page.locator(".tp-sketches a")).toHaveCount(15);
  const filters = page.getByRole("group", { name: "Filter puppies" });
  await filters.getByRole("button", { name: "Korean Teacup" }).click();
  await expect(page).toHaveURL(/collection=korean-teacup/);
  await expect(page.locator(".tp-sketches a")).toHaveCount(5);
  await filters.getByRole("button", { name: "Girls" }).click();
  await expect(page.locator(".tp-sketches a")).toHaveCount(4);
  await filters.getByRole("button", { name: "Poodle", exact: true }).click();
  await expect(page.locator(".tp-sketches a")).toHaveCount(1);
  await expect(filters.getByRole("button", { name: "Girls" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.getByRole("link", { name: "Clear filters" }).click();
  await expect(page.locator(".tp-sketches a")).toHaveCount(15);
  await page.goto("/puppies?breed=poodle");
  await expect(page.locator(".tp-sketches a")).toHaveCount(2);
  await page.reload();
  await expect(page.locator(".tp-sketches a")).toHaveCount(2);
  await page.goto("/puppies?origin=local");
  await expect(page.getByText("No puppies in this selection")).toBeVisible();
  await page.goBack();
  await expect(page.locator(".tp-sketches a")).toHaveCount(2);
  await page.goForward();
  await expect(page.getByText("No puppies in this selection")).toBeVisible();
  await page.goto("/gone-home");
  await expect(page.locator(".tp-tickets a")).toHaveCount(27);
  await page.locator(".tp-tickets a").first().click();
  await expect(page.locator("h1")).toHaveText("Ace");
  await expect(
    page.getByText("Ask about a puppy like this").first(),
  ).toBeVisible();
});
test("gallery thumbnails, fullscreen keyboard, videos and family count", async ({
  page,
}) => {
  await page.goto("/puppies/maltipoo-max-male");
  await page.getByRole("button", { name: "Next photo", exact: true }).click();
  await expect(page.locator("video")).toHaveAttribute("controls", "");
  await expect(page.locator(".gallery-controls")).toContainText("2 / 2");
  await page
    .getByRole("button", { name: "Previous photo", exact: true })
    .click();
  await page.getByRole("button", { name: /full screen/ }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("dialog").locator("video")).toHaveCount(1);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.goto("/happy-families");
  await expect(page.locator(".tp-wall__print")).toHaveCount(64);
  await page.locator(".tp-wall__print").first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Next photo", exact: true })
    .click();
  await expect(page.locator(".lightbox-header")).toContainText("2 / 64");
  await page.keyboard.press("Escape");
});
test("FAQ search and process tabs", async ({ page }) => {
  await page.goto("/faq");
  await expect(page.locator(".tp-note")).toHaveCount(9);
  await page.getByRole("searchbox").fill("Korea");
  await expect(page.locator(".tp-note")).toHaveCount(2);
  await expect(page.getByText("2 notes found")).toBeVisible();
  await expect(page.locator(".tp-note mark").first()).toBeVisible();
  await expect(page.locator(".tp-note").first()).toHaveAttribute(
    "data-unfolded",
    "",
  );
  await page.getByRole("searchbox").fill("nonesuchvalue");
  await expect(page.getByText("No notes found")).toBeVisible();
  await page.getByRole("button", { name: "Clear search" }).click();
  await expect(page.locator(".tp-note")).toHaveCount(9);
  await page.goto("/how-it-works");
  await page.getByRole("tab", { name: /Imported/ }).click();
  await expect(page.locator("#panel-imported")).toBeVisible();
  await expect(page.locator("#panel-local")).toBeHidden();
  await page.getByRole("tab", { name: /In Dubai/ }).click();
  await expect(page.locator("#panel-local")).toBeVisible();
  await page
    .getByRole("link", { name: "3 Delivery & collection", exact: true })
    .click();
  await expect(page).toHaveURL(/#delivery$/);
});
test("contact validation and real demonstration persistence", async ({
  page,
}, info) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Post my letter" }).click();
  await expect(page.getByText("Please enter your full name.")).toBeVisible();
  await page
    .getByLabel("Your name", { exact: false })
    .fill("Assessment " + info.project.name);
  await page
    .getByLabel("Phone or WhatsApp", { exact: false })
    .fill("+971501234567");
  await page
    .getByLabel("Message (optional)")
    .fill("Isolated browser fixture " + info.project.name);
  await page.getByRole("button", { name: "Post my letter" }).click();
  await expect(
    page.getByRole("heading", { name: "Demo enquiry saved" }),
  ).toBeVisible();
  const db = new DatabaseSync(".local/e2e.sqlite");
  const rows = db.prepare("SELECT payload FROM enquiries").all() as {
    payload: string;
  }[];
  expect(
    rows.some(
      (r) => JSON.parse(r.payload).name === "Assessment " + info.project.name,
    ),
  ).toBe(true);
  db.close();
});
test("puppy-specific enquiry and WhatsApp context", async ({ page }, info) => {
  await page.goto("/puppies/maltipoo-max-male");
  const wa = page.getByRole("link", { name: "Ask about Max on WhatsApp" });
  const url = new URL((await wa.getAttribute("href"))!);
  expect(url.hostname).toBe("wa.me");
  expect(url.searchParams.get("text")).toContain("Max (Maltipoo)");
  await page
    .getByLabel("Your name", { exact: false })
    .fill("Profile " + info.project.name);
  await page
    .getByLabel("Phone or WhatsApp", { exact: false })
    .fill("+971501234568");
  await page.getByRole("button", { name: "Send enquiry", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Demo enquiry saved" }),
  ).toBeVisible();
  const db = new DatabaseSync(".local/e2e.sqlite");
  const rows = db.prepare("SELECT payload FROM enquiries").all() as {
    payload: string;
  }[];
  expect(
    rows.some((r) => {
      const p = JSON.parse(r.payload);
      return (
        p.name === "Profile " + info.project.name && p.puppyId === puppies[0].id
      );
    }),
  ).toBe(true);
  db.close();
});
test("mobile menu opens, restores focus and closes on navigation", async ({
  page,
}, info) => {
  test.skip(info.project.name !== "mobile");
  await page.goto("/");
  const menu = page.locator("header [aria-haspopup=dialog]");
  await menu.click();
  await expect(page.getByRole("dialog", { name: "Site menu" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await menu.click();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "FAQ", exact: true })
    .click();
  await expect(page.locator("h1")).toHaveText("Questions & answers");
  await expect(page.getByRole("dialog")).toBeHidden();
});
test("screenshots and basic accessibility", async ({ page }, info) => {
  test.setTimeout(120000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of routes) {
    await page.goto(route);
    await page.locator("img").evaluateAll((imgs) =>
      imgs.forEach((img) => {
        img.setAttribute("loading", "eager");
      }),
    );
    await page.waitForFunction(() =>
      [...document.images].every((i) => i.complete),
    );
    await page.screenshot({
      path: `docs/screenshots/${route.replaceAll("/", "") || "home"}-${info.project.name}.png`,
      fullPage: true,
    });
  }
  await page.goto("/contact");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  const critical = results.violations.filter((v) =>
    ["critical", "serious"].includes(v.impact || ""),
  );
  expect(
    critical.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
  ).toEqual([]);
});
