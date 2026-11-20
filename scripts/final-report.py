from pathlib import Path
import json
root=Path(__file__).resolve().parents[1];docs=root/'docs'
run=json.loads((docs/'e2e-functional-results.json').read_text());quality=json.loads((docs/'e2e-quality-results.json').read_text());lh=json.loads((docs/'lighthouse.json').read_text());scores={k:round(v['score']*100) for k,v in lh['categories'].items()};metrics={k:lh['audits'][k].get('displayValue') for k in ['largest-contentful-paint','cumulative-layout-shift','total-blocking-time']}
assert run['stats']['unexpected']==0 and quality['stats']['unexpected']==0

visual=json.loads((docs/'visual-comparison/results.json').read_text())
samples=visual['results']
values=[row['withinTolerancePercent'] for row in samples]
target_hits=sum(value>=95 for value in values)
visual_summary=f"{target_hits} of {len(values)} initial-view captures reached 95% within RGB tolerance 16. Measured range {min(values):.2f}–{max(values):.2f}%."
webkit_file=docs/'e2e-webkit-results.json'
webkit=json.loads(webkit_file.read_text())['stats'] if webkit_file.exists() else None
webkit_retry_file=docs/'e2e-webkit-retry-results.json'
webkit_retry=json.loads(webkit_retry_file.read_text())['stats'] if webkit_retry_file.exists() else None
webkit_passes=(webkit['expected'] if webkit else 0)+(webkit_retry['expected'] if webkit_retry else 0)
webkit_failures=(webkit['unexpected'] if webkit else 0)
if webkit_retry and not webkit_retry['unexpected']:
    webkit_failures=max(0,webkit_failures-webkit_retry['expected'])
webkit_summary=(f"{webkit_passes} passed, {webkit['skipped']} skipped, {webkit_failures} unresolved failures" if webkit else "Not run")
catalogue_file=docs/'e2e-catalogue-results.json'
catalogue=json.loads(catalogue_file.read_text())['stats'] if catalogue_file.exists() else None
catalogue_summary=(f"{catalogue['expected']} passed, {catalogue['unexpected']} failed" if catalogue else "Not run")

repo=(docs/'repository-url.txt').read_text().strip() if (docs/'repository-url.txt').exists() else 'Not yet pushed'
(docs/'TEST_REPORT.md').write_text(f'''# Test report — 2026-11-21 (Asia/Calcutta)

## Executed checks

| Check | Actual result | Evidence |
|---|---|---|
| Unit/domain | 28 passed | tests/domain.test.ts; executed Vitest |
| Enquiry integration | 14 passed | tests/enquiries.test.ts; real isolated SQLite writes |
| Functional browser suite | {run['stats']['expected']} passed, {run['stats']['skipped']} intentional skip, 0 failures | e2e-functional-results.json |
| Nine viewports, motion, media and Lighthouse | {quality['stats']['expected']} passed, 0 failures | e2e-quality-results.json |
| Desktop WebKit | {webkit_summary} | e2e-webkit-results.json and e2e-webkit-retry-results.json |
| Final catalogue change | {catalogue_summary} | e2e-catalogue-results.json |
| TypeScript | Passed | Production build type-check |
| ESLint | Passed | npm run lint |
| Production build | Passed | Next.js 16.4.6 / Node 24 |

The desktop menu test is intentionally skipped because that control is mobile-only. The quality suite runs once in Chromium, including mobile viewport emulation. The Chromium reports cover {run['stats']['expected'] + quality['stats']['expected']} successful checks. WebKit is reported separately because the functional cases repeat across browser engines. The first WebKit run's screenshot test exceeded 60 seconds while reference captures were also running. The same case passed with a 120-second allowance. The final catalogue controls were retested on Chromium, mobile emulation and desktop WebKit.

Functional browser coverage includes all 49 public content routes (7 main + 42 profiles), custom HTTP 404, no page/console errors on valid routes, no horizontal overflow at desktop/mobile test sizes, catalogue/card counts, query refresh/back/forward, adopted state, image and video gallery controls, fullscreen keyboard navigation, 64 family buttons, nine FAQ entries/search/no-results, process tabs/anchor, mobile menu focus/Escape/navigation, contact and puppy-specific enquiry persistence, and contextual WhatsApp URL encoding. No WhatsApp message was sent.

Integration tests cover real persistence, idempotent retries, content deduplication, invalid fields and puppy IDs, honeypot, rate limiting, unavailable DB, malformed JSON, oversized payload, content type and origin validation. PostgreSQL/Supabase writes have NOT been exercised against a remote project.

## Lighthouse (latest final build)

| Metric | Measured value |
|---|---|
| Performance | {scores['performance']} |
| Accessibility | {scores['accessibility']} |
| Best Practices | {scores['best-practices']} |
| SEO | {scores['seo']} (assessment intentionally noindex/disallow) |
| LCP | {metrics['largest-contentful-paint']} |
| CLS | {metrics['cumulative-layout-shift']} |
| Total blocking time | {metrics['total-blocking-time']} |
| INP | Not measured; field data unavailable |

`lighthouse.json` is the full raw report. Local production server, Lighthouse default simulated mobile throttling, system Chromium, localhost HTTP. This is a lab observation, not a production SLA or field result. Earlier runs varied (89–91 Performance); unnecessary client catalogue data was removed and validation loading deferred before the final run. A static-SVG externalization experiment worsened LCP and was reverted.

Axe scans on the contact page found no serious/critical WCAG 2/2.1/2.2 AA violations in Chromium desktop/mobile emulation. Lighthouse home accessibility was {scores['accessibility']}. These automated checks do not establish full WCAG conformance or manual screen-reader verification.

## Responsive and visual evidence

Homepage captured and checked at 1920×1080, 1440×900, 1280×800, 1024×768, 768×1024, 430×932, 390×844, 375×812 and 360×800. All seven main pages were captured on desktop/mobile. Image completion/integrity was checked in the nine-size test. Max's local video played and advanced currentTime. The initial quilt curtain cleared after its animation and stayed hidden with reduced motion.

{visual_summary} Scores describe the captured first viewport and do not establish full-page parity. Reference and clone screenshots, overlays, difference maps and motion samples are under visual-comparison/. See SCREENSHOT_METHOD.md for the capture method.

## Environment limits

Desktop WebKit was evaluated with the host dependencies loaded from a temporary directory. Firefox content processes still fail inside this host. See CROSS_BROWSER_LIMITS.md. GitHub Actions is configured for four projects. The provided GitHub repository is accessible, but Git push and the write API returned HTTP 403. Source delivery and CI remain pending integration write permission. Managed preview relay startup failed. Vercel/Supabase production deployment and production-route verification are blocked by missing credentials. No live URL is fabricated.
''')
(docs/'FEATURE_PARITY.md').write_text('''# Feature parity

| Feature | Reference behavior | Clone behavior | Test evidence | Status | Known discrepancy |
|---|---|---|---|---|---|
| Routes | 7 main + 42 profiles | All resolve, invalid path returns 404 | Browser route sweep | Verified | Central catch-all routing instead of individual static folders |
| Available/adopted inventory | 15 available, 27 adopted | Exact slugs/status/order retained | Unit and browser counts | Verified | Snapshot, not current inventory |
| Catalogue queries | Hydrated origin, collection, breed and gender filters | Same visible options and URL-driven filtering | Browser controls/query/history tests | Verified | Local availability empty |
| Profile data/media | Unique galleries/counts | All media locally stored, generic profile template | File integrity, counts, route sweep | Verified | Fullscreen visual appearance not independently compared |
| Gallery controls | Arrows, thumbnails, video/fullscreen | Keyboard, touch, arrows, thumbnails, error/retry | Browser gallery tests | Verified | Native video controls; exact transition timing not verified |
| Actual video playback | Source browser could not verify playback | Local Max video played | currentTime assertion | Verified | Other video files exist; every clip not separately played |
| Adopted enquiry | Similar-puppy intent, no journey | Same intent, appropriate profile state | Browser adopted profile | Verified | Enquiry heading/CTAs based on source markup |
| Family wall | 64 moments plus 8 homepage previews | Correct independent ordering | Counts, media checks, lightbox | Verified | Hover CSS retained; full visual match unscored |
| FAQ | 9 folded notes, search auto-opens | Question and answer matching, highlights, no results and reset | Browser search and unit tests | Verified | Independent implementation |
| Process | Local/imported tabs, four anchors | Both panels and exact anchors | Browser tab/anchor tests | Verified | Tab animation limited to observed CSS |
| Header/menu | Fixed header, mobile overlay | Active links, native modal focus/close | Mobile tests | Verified | Exact original opening choreography unverified |
| Letter/profile forms | Name/phone required, optional fields | Validated persistence, retry and success states | Browser + integration tests | Verified | Demo label; independent backend |
| WhatsApp | Agency number with unrelated project message | Same authorized number, contextual assessment message | URL tests | Verified | Intentionally corrects message context |
| Email/phone/social | Placeholder UAE number and agency links | Configurable phone/email; agency social destinations retained | DOM/source audit, code | Implemented | No outbound messages/calls sent |
| Design/assets | Detailed scrapbook CSS, illustrations/media | Authorized sanitized presentation and local assets | Screenshot overlays and RGB difference report | Partially verified | Some routes and mobile sizes remain below target |
| Motion | Curtain, mascot choreography, staged scroll scenes | Initial quilt curtain, one-seat duck and pop rotation, pointer tracking at visible stops and staged conversation | CSS inventory, recorded samples and Chromium checks | Partially implemented | The source moves one fixed actor across scenes. The clone animates the visible illustration at each stop. Full navigation curtain pending |
| Accessibility | Source semantics | Focus traps, skip link, reduced motion, labels | Axe and Lighthouse | Verified | Automated scope only; not full conformance audit |
| Security | Private backend unavailable | Validation, limits, persistent anti-spam, RLS SQL | Integration tests | Verified | Remote Supabase RLS execution not verified |
| Database | Original backend not used | SQLite local; PostgreSQL schema/seed + adapter | SQLite integration | Partially implemented | Supabase credentials unavailable |
| Performance | No measured reference baseline | Latest local Lighthouse report | lighthouse.json | Verified | Lab only; no field INP |
| Native browser engines | Firefox and WebKit evaluation | Desktop WebKit executed; Firefox configured | e2e-webkit-results.json; CROSS_BROWSER_LIMITS.md | Partially verified | Firefox content process crashes on this host |
| Deployment | Independent Vercel host requested | Source/build ready; instructions supplied | DEPLOYMENT.md | Not implemented | Missing Vercel/Supabase credentials |
| Loom | 8–12 minute walkthrough requested | 10-minute script/checklist | LOOM_SCRIPT.md | Implemented | Video not recorded |
''')
(docs/'CHECKPOINT.md').write_text(f'''# Checkpoint — 2026-11-21 (Asia/Calcutta)

This archive is the current tested implementation. It is **not a verified production deployment** and does not meet every final acceptance criterion yet.

- Seven main pages, all 42 profiles, 64 family positions and nine FAQs implemented.
- 42 unit/integration tests pass. Final functional browser suite: {run['stats']['expected']} passed, {run['stats']['skipped']} intentional skip; separate quality suite: {quality['stats']['expected']} passed.
- Production build, strict type checking and lint pass.
- Latest Lighthouse: {scores['performance']} Performance / {scores['accessibility']} Accessibility / {scores['best-practices']} Best Practices; LCP {metrics['largest-contentful-paint']}, CLS {metrics['cumulative-layout-shift']}.
- Source repository: {repo}.
- No real enquiry or WhatsApp message was submitted to the reference business.

## Resume from here

1. Read README.md, FEATURE_PARITY.md and TEST_REPORT.md.
2. Configure authorized Supabase/PostgreSQL and Vercel credentials using DEPLOYMENT.md; never post secrets into the chat or repository.
3. Run the included migration and seed against the authorized project, deploy, and independently verify production persistence and all routes.
4. Iterate on the routes below 95% in visual-comparison/results.json and compare additional scroll positions. Recreate the mascot's travel between stops and the navigation curtain.
5. Verify Firefox in CI or a host that supports its content sandbox. Desktop WebKit: {webkit_summary}.
6. Record the Loom walkthrough using LOOM_SCRIPT.md.

Local run: `npm ci`, `npm run dev`. Build: `npm run build`. Tests: `npm test`, `npm run test:e2e`. SQLite is development/test only. Runtime dependencies/build output, secrets and local enquiry databases are excluded from the ZIP. All required source and local media are included; JPEG screenshot exports accompany the reports.

The user requested checkpoint packaging before interruption; the environment does not expose a reliable remaining-session percentage. Regenerate with `npm run checkpoint`.
''')
(docs/'SUBMISSION.md').write_text(f'''# PROJECT: TeddyPups U.A.E. Website Clone

Live URL: Not deployed — Vercel/Supabase credentials unavailable.
GitHub Repository: {repo}
Push status: Blocked by integration HTTP 403. Local commits are ready.
Loom Video: Not recorded; script/checklist included.

## IMPLEMENTATION

Pages completed: 7 main public pages.
Puppy profiles completed: 42 (15 available, 27 adopted).
Gallery entries completed: 64, plus separate 8-photo homepage preview.
Interactive features completed: navigation/menu, query filters, galleries/fullscreen/video, FAQ search, adoption tabs, anchors, contextual WhatsApp links, validated persistent demo enquiries.

## QUALITY

Visual comparison result: {visual_summary} See SCREENSHOT_METHOD.md.
Unit test results: 28 passed.
Integration test results: 14 passed, SQLite persistence.
End-to-end test results: {run['stats']['expected']} functional and {quality['stats']['expected']} quality tests passed in Chromium; {run['stats']['skipped']} intentional desktop skip. Native WebKit: {webkit_summary}.
Lighthouse performance: {scores['performance']}; LCP {metrics['largest-contentful-paint']}; CLS {metrics['cumulative-layout-shift']}.
Accessibility: Lighthouse {scores['accessibility']}; targeted Axe checks passed; no full manual conformance claim.
Known limitations: some capture sizes fall below the visual target, cross-scene mascot movement and navigation curtain are incomplete, Firefox fails on this host, no remote DB/production verification, and no Loom recording.

## DEPLOYMENT

Production build status: Passed.
Database status: Local SQLite verified. PostgreSQL/Supabase schema, seed and write adapter implemented, remote setup pending.
Production verification status: Not performed. No fabricated live URL.

Final acceptance: **Not fully complete** because production deployment and remaining verification/motion requirements are outstanding. See FEATURE_PARITY.md for the complete checklist.
''')
(docs/'IMPLEMENTATION_CHECKLIST.md').write_text('''# Implementation checklist

- [x] Public crawl, source inventory, all content records, media authorization
- [x] Extract design tokens and observable CSS animation rules
- [x] Shared shell, homepage and seven main routes
- [x] 42 profiles, catalogue filtering and adopted archive
- [x] 64-photo wall, FAQ search, process tabs and forms
- [x] Independent API, local persistence, PostgreSQL migration/seed and RLS
- [x] Responsive nine-size checks, no-overflow route sweep, keyboard/menu tests
- [x] Unit/integration/browser tests and production build
- [x] Lighthouse lab measurement and targeted accessibility scans
- [x] Documentation, exact AI prompt disclosure, Loom script and checkpoint ZIP
- [x] 25 matched first-viewport captures with reference overlays and pixel-difference reports
- [ ] Visual target across all tested viewports and comparison of additional scroll positions
- [x] Initial quilt curtain and reduced-motion behavior
- [x] Reference motion samples, per-seat rotation, pointer tracking and staged conversation
- [ ] Exact route curtain and mascot travel between scenes
- [x] Desktop WebKit execution
- [ ] Firefox execution (content process host blocker; CI configured)
- [ ] Authorized Supabase/Vercel setup and production verification
- [ ] Loom recording

GitHub delivery status is recorded in SUBMISSION.md after the remote result is verified.
''')
print('Final reports updated')
