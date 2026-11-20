import { test, expect } from "@playwright/test";

test("the quilt covers and lifts across route navigation, including deep links and history", async ({
  page,
}) => {
  await page.goto("/faq");
  const curtain = page.locator(".tp-curtain");
  await expect(curtain).toBeHidden();
  // A fresh document would lose this marker and replay the intro.
  await page.evaluate(() =>
    document.body.setAttribute("data-test-document", "same"),
  );
  const delivery = page.getByRole("link", { name: "Delivery & collection" });
  await delivery.focus();
  await page.keyboard.press("Enter");
  await expect(curtain).toHaveAttribute("data-state", /covering|covered/);
  await expect(page).toHaveURL(/\/how-it-works#delivery$/);
  await expect(curtain).toHaveAttribute("data-state", "lifting");
  await expect(curtain).toBeHidden();
  await expect(page.locator("body")).toHaveAttribute(
    "data-test-document",
    "same",
  );
  await expect(page.locator("#delivery")).toBeInViewport();
  await page.goBack();
  await expect(page).toHaveURL(/\/faq$/);
  await expect(page.locator("h1")).toHaveText("Questions & answers");
  await page.goForward();
  await expect(page.locator("#delivery")).toBeInViewport();

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.getByRole("link", { name: "FAQ", exact: true }).last().click();
  await expect(page).toHaveURL(/\/faq$/);
  await expect(curtain).toBeHidden();
  await expect(page.locator("html")).not.toHaveAttribute("data-curtain");
});

test("a failed letter stays editable and only animates after saving", async ({
  page,
}) => {
  let attempt = 0;
  await page.route("**/api/enquiries", (route) => {
    attempt++;
    return route.fulfill(
      attempt === 1
        ? {
            status: 503,
            json: { success: false, message: "Storage unavailable" },
          }
        : { status: 201, json: { success: true } },
    );
  });
  await page.goto("/contact");
  const form = page.locator("form.tp-letterform");
  await form.getByLabel("Your name").fill("Demo Person");
  await form.getByLabel("Phone or WhatsApp").fill("+971 50 123 4567");
  await form.getByRole("button", { name: "Post my letter" }).click();
  await expect(form.getByRole("alert")).toHaveText("Storage unavailable");
  await expect(form.getByLabel("Your name")).toHaveValue("Demo Person");
  const post = page.locator(".tp-post");
  await expect(post).toHaveAttribute("data-phase", "writing");
  await form.getByRole("button", { name: "Post my letter" }).click();
  await expect(post).toHaveAttribute("data-phase", "sealing");
  await expect(post).toHaveAttribute("data-phase", "posting");
  await expect(
    page.getByRole("heading", { name: "Demo enquiry saved" }),
  ).toBeFocused();
  expect(attempt).toBe(2);
});

test("Teddy moves in the homepage and respects reduced motion", async ({
  page,
}, info) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator(".tp-curtain")).toBeHidden();
  const actor = page.locator(".demo-mascot");
  const tail = actor.locator('[data-p="tail"]');
  await expect(actor).toBeVisible();
  const restingRotation = await tail.evaluate(
    (svg) => getComputedStyle(svg).rotate,
  );
  await expect
    .poll(() => tail.evaluate((svg) => getComputedStyle(svg).rotate))
    .not.toBe(restingRotation);

  if (info.project.name === "mobile") {
    await expect(actor).toHaveAttribute("data-react", "peek");
    const pose = actor.locator(".demo-mascot-pose");
    await expect
      .poll(() => pose.evaluate((el) => el.getAnimations()[0]?.playState))
      .toBe("finished");
    await expect(actor.locator(".pup-bubble")).toHaveAttribute(
      "data-show",
      "true",
    );
  } else {
    const first = await actor.evaluate(
      (element) => element.getBoundingClientRect().x,
    );
    const hallway = page.locator(".tp-meet");
    await expect(hallway).toHaveAttribute("data-pinned", "");
    await hallway.evaluate((section) => {
      const range = section.querySelector("[data-pin-range]")!;
      scrollTo({
        top:
          scrollY +
          range.getBoundingClientRect().top +
          range.getBoundingClientRect().height * 0.35,
        behavior: "instant",
      });
    });
    await expect(actor).toHaveAttribute("data-walking", "");
    await expect(
      hallway.locator('.tp-door[data-open="true"]').first(),
    ).toBeVisible();
    const scrollTarget = page.locator(".tp-chat__teddy");
    await scrollTarget.evaluate((stop) =>
      scrollTo({
        top: scrollY + stop.getBoundingClientRect().top - 0.6 * innerHeight,
        behavior: "instant",
      }),
    );
    await expect
      .poll(() =>
        actor.evaluate(
          (element, initialX) =>
            Math.abs(element.getBoundingClientRect().x - initialX),
          first,
        ),
      )
      .toBeGreaterThan(100);
    await expect(actor).toBeVisible();
  }

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(actor).toBeHidden();
  await expect(page.locator(".tp-hero__teddy .pup-buddy")).toHaveCSS(
    "opacity",
    "1",
  );
});
