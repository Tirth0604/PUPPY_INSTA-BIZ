# Test report — 2026-11-21 (Asia/Calcutta)

## Executed checks

| Check | Actual result | Evidence |
|---|---|---|
| Unit/domain | 28 passed | tests/domain.test.ts; executed Vitest |
| Enquiry integration | 14 passed | tests/enquiries.test.ts; real isolated SQLite writes |
| Functional browser suite | 15 passed, 1 intentional skip, 0 failures | e2e-functional-results.json |
| Nine viewports, motion, media and Lighthouse | 2 passed, 0 failures | e2e-quality-results.json |
| Desktop WebKit | 7 passed, 1 skipped, 0 unresolved failures | e2e-webkit-results.json and e2e-webkit-retry-results.json |
| Final catalogue change | 3 passed, 0 failed | e2e-catalogue-results.json |
| TypeScript | Passed | Production build type-check |
| ESLint | Passed | npm run lint |
| Production build | Passed | Next.js 16.4.6 / Node 24 |

The desktop menu test is intentionally skipped because that control is mobile-only. The quality suite runs once in Chromium, including mobile viewport emulation. The Chromium reports cover 17 successful checks. WebKit is reported separately because the functional cases repeat across browser engines. The first WebKit run's screenshot test exceeded 60 seconds while reference captures were also running. The same case passed with a 120-second allowance. The final catalogue controls were retested on Chromium, mobile emulation and desktop WebKit.

Functional browser coverage includes all 49 public content routes (7 main + 42 profiles), custom HTTP 404, no page/console errors on valid routes, no horizontal overflow at desktop/mobile test sizes, catalogue/card counts, query refresh/back/forward, adopted state, image and video gallery controls, fullscreen keyboard navigation, 64 family buttons, nine FAQ entries/search/no-results, process tabs/anchor, mobile menu focus/Escape/navigation, contact and puppy-specific enquiry persistence, and contextual WhatsApp URL encoding. No WhatsApp message was sent.

Integration tests cover real persistence, idempotent retries, content deduplication, invalid fields and puppy IDs, honeypot, rate limiting, unavailable DB, malformed JSON, oversized payload, content type and origin validation. PostgreSQL/Supabase writes have NOT been exercised against a remote project.

## Lighthouse (latest final build)

| Metric | Measured value |
|---|---|
| Performance | 98 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 66 (assessment intentionally noindex/disallow) |
| LCP | 1.4 s |
| CLS | 0.012 |
| Total blocking time | 100 ms |
| INP | Not measured; field data unavailable |

`lighthouse.json` is the full raw report. Local production server, Lighthouse default simulated mobile throttling, system Chromium, localhost HTTP. This is a lab observation, not a production SLA or field result. Earlier runs varied (89–91 Performance); unnecessary client catalogue data was removed and validation loading deferred before the final run. A static-SVG externalization experiment worsened LCP and was reverted.

Axe scans on the contact page found no serious/critical WCAG 2/2.1/2.2 AA violations in Chromium desktop/mobile emulation. Lighthouse home accessibility was 100. These automated checks do not establish full WCAG conformance or manual screen-reader verification.

## Responsive and visual evidence

Homepage captured and checked at 1920×1080, 1440×900, 1280×800, 1024×768, 768×1024, 430×932, 390×844, 375×812 and 360×800. All seven main pages were captured on desktop/mobile. Image completion/integrity was checked in the nine-size test. Max's local video played and advanced currentTime. The initial quilt curtain cleared after its animation and stayed hidden with reduced motion.

12 of 25 initial-view captures reached 95% within RGB tolerance 16. Measured range 86.35–96.93%. Scores describe the captured first viewport and do not establish full-page parity. Reference and clone screenshots, overlays, difference maps and motion samples are under visual-comparison/. See SCREENSHOT_METHOD.md for the capture method.

## Environment limits

Desktop WebKit was evaluated with the host dependencies loaded from a temporary directory. Firefox content processes still fail inside this host. See CROSS_BROWSER_LIMITS.md. GitHub Actions is configured for four projects. The provided GitHub repository is accessible, but Git push and the write API returned HTTP 403. Source delivery and CI remain pending integration write permission. Managed preview relay startup failed. Vercel/Supabase production deployment and production-route verification are blocked by missing credentials. No live URL is fabricated.
