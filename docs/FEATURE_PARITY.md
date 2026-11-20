# Feature parity

| Feature | Reference behavior | Clone behavior | Test evidence | Status | Known discrepancy |
|---|---|---|---|---|---|
| Routes | 7 main + 42 profiles | All 49 resolve, including direct access and deep links. Invalid paths return 404. | Browser route sweep | Verified | Central catch-all routing instead of individual static folders |
| Available/adopted inventory | 15 available, 27 adopted | Exact slugs/status/order retained | Unit and browser counts | Verified | Snapshot, not current inventory |
| Catalogue queries | Hydrated origin, collection, breed and gender filters | Same visible options and URL-driven filtering | Browser controls/query/history tests | Verified | Local availability empty |
| Profile data/media | Unique galleries/counts | All media locally stored, generic profile template | File integrity, counts, route sweep | Verified | Fullscreen visual appearance not independently compared |
| Gallery controls | Arrows, thumbnails, video/fullscreen | Directional page turns, lightbox slides, keyboard, touch, arrows, thumbnails, error/retry | Browser gallery tests | Verified | Native profile video controls. Fullscreen easing approximates the source spring. |
| Actual video playback | Source browser could not verify playback | Local Max video played | currentTime assertion | Verified | Other video files exist; every clip not separately played |
| Adopted enquiry | Similar-puppy intent, no journey | Same intent, appropriate profile state | Browser adopted profile | Verified | Enquiry heading/CTAs based on source markup |
| Family wall | 64 moments plus 8 homepage previews | Correct independent ordering | Counts, media checks, lightbox | Verified | Hover CSS retained; full visual match unscored |
| FAQ | 9 folded notes, search auto-opens | Question and answer matching, highlights, no results and reset | Browser search and unit tests | Verified | Independent implementation |
| Process | Local/imported tabs, four anchors | Both panels, animated selector and staggered steps, exact anchors | Browser tab/anchor tests | Verified | Keyboard selection supports arrow keys, Home and End. |
| Header/menu | Fixed header, mobile overlay | Active links, clip-path entrance and exit with staggered links, native modal focus | Mobile tests | Verified | Original CSS durations and easing retained. |
| Letter/profile forms | Name/phone required, optional fields | Validated persistence and retry, fold/envelope/mailbox sequence after success | Browser + integration tests | Verified | Demo label; independent backend |
| WhatsApp | Agency number with unrelated project message | Same authorized number, contextual assessment message | URL tests | Verified | Intentionally corrects message context |
| Email/phone/social | Placeholder UAE number and agency links | Configurable phone/email; agency social destinations retained | DOM/source audit, code | Implemented | No outbound messages/calls sent. Social profiles can be configured when verified. |
| Design/assets | Detailed scrapbook CSS, illustrations/media | Authorized sanitized presentation and local assets | Screenshot overlays and RGB difference report | Partially verified | Some routes and mobile sizes remain below target |
| Motion | Curtain, mascot choreography, staged scroll scenes | Intro and route quilts, duck/pop rotation, pointer tracking, mascot handoffs, staged conversation with typing feedback | CSS inventory, recorded samples and Chromium checks | Partially implemented | The clone uses a fixed actor between neighboring scenes and each scene’s existing SVG at rest. Exact pose and scroll timing differ. |
| Accessibility | Source semantics | Focus traps, skip link, reduced motion, labels | Axe and Lighthouse | Verified | Automated scope only; not full conformance audit |
| Security | Private backend unavailable | Validation, limits, persistent anti-spam, RLS SQL | Integration tests | Verified | Remote Supabase RLS execution not verified |
| Database | Original backend not used | SQLite local; PostgreSQL schema/seed + adapter | SQLite integration | Partially implemented | Supabase credentials unavailable |
| Performance | No measured reference baseline | Latest local Lighthouse report | lighthouse.json | Verified | Lab only; no field INP |
| Native browser engines | Firefox and WebKit evaluation | Desktop WebKit executed; Firefox configured | e2e-webkit-results.json; CROSS_BROWSER_LIMITS.md | Partially verified | Firefox content process crashes on this host |
| Deployment | Independent Vercel host requested | Source/build ready; instructions supplied | DEPLOYMENT.md | Not implemented | Missing Vercel/Supabase credentials |
| Loom | 8–12 minute walkthrough requested | 10-minute script/checklist | LOOM_SCRIPT.md | Implemented | Video not recorded |
