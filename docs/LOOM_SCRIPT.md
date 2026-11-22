# Loom Video Script — TeddyPups U.A.E. Website Clone
# Full 10-Minute Walkthrough (Word-for-Word)

## PRE-RECORDING CHECKLIST
- [ ] Loom is installed and screen sharing is selected
- [ ] Browser tabs open: `http://localhost:3000`, GitHub repo, VS Code with project
- [ ] Terminal window ready (for running tests live)
- [ ] AI_PROMPTS.md open in a text editor
- [ ] All secrets hidden (.env.local NOT visible)
- [ ] Close personal apps, notifications off
- [ ] 1080p resolution, clean desktop background

---

## SEGMENT 0: INTRO (0:00 – 0:30)

**[CAMERA: Face cam + full desktop screen share]**

> "Hey, I'm Tirth Gandhi. This is my Loom submission for the TeddyPups U.A.E. full-stack website cloning assessment. Over the next ten minutes I'll walk you through the development process, the project architecture, the AI tools I used and the exact prompts I gave, the implementation challenges I solved, and finally the test results and deployment setup. Let's get into it."

**[ACTION: Show http://localhost:3000 — the homepage]**

---

## SEGMENT 1: PROJECT OVERVIEW & REFERENCE COMPARISON (0:30 – 1:30)

**[SCREEN: Side by side — reference site puppy.instabizweb.com and localhost:3000]**

> "The goal was to recreate the TeddyPups U.A.E. website as faithfully as possible — not a template, not an inspiration — the actual site, pixel-for-pixel.

> You can see the clone on the right. It has the same scrapbook aesthetic — the warm paper background, the arched photographs of puppies, the hand-drawn illustrated mascots, the Fraunces serif headings, the Shantell Sans handwritten font, and the Toffee-brown brand palette.

> Notice the assessment banner at the top — this is intentional. The site marks itself clearly as a demonstration so it's never mistaken for the real business. The noindex meta tag is also set so search engines won't index it.

> The reference used a Wix-based architecture. I had to reverse-engineer the layout and CSS from the public DOM, sanitize it, and re-implement every interaction independently in TypeScript — no iframes, no source scripts, no backend calls to the original site."

**[ACTION: Scroll down on clone homepage slowly — show quilt sections, passport section, footer]**

---

## SEGMENT 2: PROJECT STRUCTURE & ARCHITECTURE (1:30 – 3:00)

**[SCREEN: VS Code file tree open on teddypups-website-clone/]**

> "Here's the project folder structure. This is a Next.js 16 App Router application with strict TypeScript and React 19.

> The `app/` directory holds all routes. The key file is `app/[...route]/page.tsx` — a single catch-all handler that resolves all 7 main public pages AND all 42 puppy profile routes. Unknown paths get the custom 404.

> `components/` is organized by concern: galleries, forms, navigation, home animations, puppy catalogue, and layout reveals. No God components — each file has a single job.

> `lib/` holds four modules: `catalogue.ts` for filtering and navigation, `enquiry-store.ts` for form persistence with both SQLite and PostgreSQL adapters, `validation.ts` with shared Zod schemas used by both the client form and the API route handler, and `whatsapp.ts` for constructing contextual WhatsApp links.

> `data/` is a pinned snapshot — `puppies.json` with all 42 records, `families.json` with all 64 gallery photos, `faqs.json`, and `templates.json` which holds the sanitized reference markup used for page-specific content blocks.

> `supabase/` has the full PostgreSQL migration with RLS policies and the seed file that mirrors the JSON snapshot exactly.

> `public/` holds every asset locally — no CDN dependencies."

**[ACTION: Click through each folder in VS Code briefly — app, components, lib, data]**

---

## SEGMENT 3: TECHNOLOGY STACK (3:00 – 3:45)

**[SCREEN: Keep VS Code open, switch to package.json briefly]**

> "The tech stack:

> **Frontend:** Next.js 16 with App Router, React 19, TypeScript strict mode. I used only the CSS that was extracted from the reference — `app/reference.css` preserves the original palette, spacing, card tilts and illustration shapes. No Tailwind, because the reference used bespoke Wix CSS that I needed to preserve, not abstract away.

> **Backend:** Next.js Route Handlers for the API layer. The enquiry backend supports both SQLite for local development and PostgreSQL via Supabase for production. Rate limiting, honeypot, idempotency keys, and content deduplication are all implemented server-side.

> **Testing:** Vitest for unit and integration tests, Playwright for end-to-end browser tests, Lighthouse for performance auditing.

> **Validation:** Zod schemas shared between client and server so the same rules enforce on both sides.

> **Build tooling:** Turbopack for dev, standard Next.js build for production, ESLint and TypeScript in strict mode."

---

## SEGMENT 4: LIVE DEMO — FEATURES (3:45 – 5:30)

**[SCREEN: http://localhost:3000 — Chrome, desktop viewport]**

> "Let me show you the features live."

**[ACTION: Navigate to /puppies]**

> "The catalogue page. All 15 available puppies load. I'll filter by breed — Poodle."

**[ACTION: Click the Poodle filter — URL updates to ?breed=poodle]**

> "The URL updates and browser history is preserved. Hit back — it goes back to the full list. That's React URL state without a client-side router library.

> Let me open a profile — Max, the Maltipoo."

**[ACTION: Click Max's card]**

> "Profile page with a local gallery. I'll click through the thumbnails, then switch to the video."

**[ACTION: Click video thumbnail, play video]**

> "Video plays from local storage. Now fullscreen."

**[ACTION: Open fullscreen lightbox, navigate with keyboard arrows]**

> "Keyboard navigation works — left and right arrow keys cycle the gallery. Escape closes it. This uses a native dialog element for proper focus trapping.

> Now let me show the Happy Families wall."

**[ACTION: Navigate to /happy-families]**

> "64 family photos in the original ordering. The lightbox works here too. Let me search the FAQ."

**[ACTION: Navigate to /faq, type 'Korea' in the search box]**

> "Results auto-expand. Clear it and they fold back. Now the contact form."

**[ACTION: Navigate to /contact, submit with empty fields]**

> "Client-side validation fires immediately. Let me fill it with fictional test data."

**[ACTION: Fill form with 'Test User', '+971501234567', valid message, submit]**

> "Submission persists to the local SQLite database. No data ever reaches the original business — the form posts only to our independent API route."

---

## SEGMENT 5: AI TOOLS & EXACT PROMPTS (5:30 – 7:00)

**[SCREEN: Open docs/AI_PROMPTS.md in VS Code or text editor]**

> "Full transparency on AI usage. The AI tool used was OpenAI Codex, model family GPT-6, run on 2026-11-20. The entire project was generated from a single master prompt that I authored. Let me read you the key sections.

> The opening instruction was:

> Quote: 'Act as a Senior Full-Stack Software Engineer, UI/UX Designer, Creative Frontend Developer, Animation Specialist, QA Engineer and DevOps Engineer. Your assignment is to analyse, recreate, implement, test and prepare a complete functional clone of the TeddyPups U.A.E. reference website at puppy.instabizweb.com. Do not build a website merely inspired by the reference. Recreate the actual reference website as closely as technically possible.' End quote.

> Phase 0 of the prompt required a mandatory reference website investigation before any implementation — Playwright-driven crawling, visual screenshots at 9 viewport sizes, computed style extraction, animation recording, and network request inspection.

> The prompt then specified the exact technology stack, all 49 required routes, design token requirements, component architecture, API contracts, database schema with RLS, testing coverage requirements including Vitest, Playwright and Lighthouse targets, and a CI workflow.

> Critically — the prompt included non-negotiable rules: no iframes, no generic templates, no fabricated test results, no deployment URLs without actual evidence, and clear assessment labelling at all times.

> The full 2000-line master prompt is preserved in `docs/AI_PROMPTS.md` for complete transparency."

**[ACTION: Scroll through AI_PROMPTS.md briefly to show its length]**

---

## SEGMENT 6: IMPLEMENTATION CHALLENGES (7:00 – 8:00)

**[SCREEN: Open docs/IMPLEMENTATION_DECISIONS.md]**

> "The key implementation decisions and challenges:

> **Challenge 1 — Preserving the reference design without copying source code.** The reference is a Wix SSR application. The public CSS and SVG markup are legally visible but their business logic isn't reusable. Solution: I inspected the DOM, extracted computed styles and design tokens, then reconstructed the styling rules as a sanitized `reference.css`. Interactions were independently re-implemented in TypeScript. This is disclosed in the README.

> **Challenge 2 — Routing architecture.** 42 puppy profiles plus 7 main pages. I used a single catch-all `[...route]` page that maps slug segments to data records. This avoids 42 static files while keeping server-side rendering.

> **Challenge 3 — SQLite vs PostgreSQL dual backend.** The enquiry store auto-detects the environment: if `DATABASE_URL` is absent in development, it falls back to SQLite using Node 24's built-in `node:sqlite` module. No third-party SQLite library needed.

> **Challenge 4 — The streaming 404 bug.** Next.js App Router was returning HTTP 200 with a streamed 404 page for unknown routes. I removed the root loading boundary, which stopped the premature 200 response. The custom not-found now correctly returns HTTP 404.

> **Challenge 5 — Asset optimization.** The original media totalled hundreds of megabytes. I compressed all images to max 1600px width at quality-85 JPEG/WebP, saving 27.8 MB without visible quality loss.

> **What remains incomplete:** Full mascot travel between scroll scenes, the navigation curtain animation timing, Firefox (crashes on this host), and production Vercel/Supabase deployment — blocked by missing credentials."

---

## SEGMENT 7: TESTING & RESULTS (8:00 – 9:15)

**[SCREEN: Terminal — run npm test live]**

> "Let me run the test suite right now so you see real results, not screenshots."

**[ACTION: In terminal: cd teddypups-website-clone && npm test]**

> "42 tests — 28 unit/domain tests covering catalogue filtering, slug resolution, validation logic, whatsapp URL generation, and 14 integration tests covering real SQLite writes, idempotency, rate limiting, honeypot, and malformed payloads. All 42 pass."

**[ACTION: Show the passing test output]**

> "For end-to-end testing, Playwright covers all 49 public routes, gallery controls, keyboard navigation, mobile menu focus trapping, form submission, and WhatsApp URL encoding — 15 functional tests plus a quality suite pass in Chromium. Desktop WebKit: 7 passed. Firefox crashes on this host — documented in CROSS_BROWSER_LIMITS.md.

> Lighthouse results on the production build: 98 Performance, 100 Accessibility, 100 Best Practices, LCP of 1.4 seconds, CLS of 0.012. These are lab measurements on localhost, not field data.

> Visual comparison: 25 paired viewport captures. 12 of 25 initial-view captures hit the 95% RGB similarity threshold. The range was 86 to 97 percent — the lower scores are on complex scroll-down sections with mascot illustrations.

> TypeScript strict mode passes. ESLint passes. Production build passes."

---

## SEGMENT 8: GITHUB & DEPLOYMENT (9:15 – 9:45)

**[SCREEN: Open GitHub repo in browser — https://github.com/Tirth0604/PUPPY_INSTA-BIZ]**

> "The complete project is on GitHub at github.com/Tirth0604/PUPPY_INSTA-BIZ. Every file was committed individually — 473 commits — with semantic conventional commit messages organized in dependency order: config first, then types, then database migrations, library modules, data, assets, components, routes, scripts, tests, and documentation last.

> For production deployment, the instructions are in `docs/DEPLOYMENT.md`. It needs a Supabase PostgreSQL project and a Vercel deployment. The migration file and seed are ready. The environment only requires `DATABASE_URL`, `ENQUIRY_STORAGE=postgres`, and `RATE_LIMIT_SECRET`. Vercel and Supabase credentials are not available to me for this assessment, so a live URL cannot be provided — no fabricated URL is included."

---

## SEGMENT 9: CLOSING (9:45 – 10:00)

**[CAMERA: Face cam prominent]**

> "To summarize: a complete Next.js 16 full-stack clone of TeddyPups U.A.E. — 7 pages, 42 puppy profiles, 64 family gallery photos, real form persistence, URL-driven filtering, server-side validation, full accessibility, 42 passing tests, 98 Lighthouse performance, and 473 individual commits on GitHub.

> AI-generated from a detailed master prompt, with every decision, limitation and known gap documented transparently. Thank you for reviewing."

---

## POST-RECORDING CHECKLIST
- [ ] Review the recording — verify no secrets were visible at any point
- [ ] Trim any dead air at the start/end
- [ ] Copy the Loom URL and paste it into docs/SUBMISSION.md
- [ ] Commit SUBMISSION.md update with message: `docs: add Loom recording URL`
- [ ] Push to GitHub

---

## KEY TIMESTAMPS TO HIT
| Time | Content |
|------|---------|
| 0:00 | Intro — name, purpose |
| 0:30 | Live clone vs reference comparison |
| 1:30 | VS Code — folder structure walkthrough |
| 3:00 | Technology stack — package.json |
| 3:45 | Live demo — catalogue, filters, gallery, fullscreen, FAQ, form |
| 5:30 | AI_PROMPTS.md — read exact prompts aloud |
| 7:00 | IMPLEMENTATION_DECISIONS.md — 5 key challenges |
| 8:00 | Live `npm test` run — show real output |
| 8:30 | Lighthouse, visual comparison numbers |
| 9:15 | GitHub — 473 commits |
| 9:45 | Closing summary |
| 10:00 | End |

---

## WHAT TO HAVE OPEN BEFORE HITTING RECORD

**Browser Tabs (in order):**
1. `http://localhost:3000` — clone homepage
2. `https://puppy.instabizweb.com/` — reference (for comparison)
3. `https://github.com/Tirth0604/PUPPY_INSTA-BIZ` — your repo commits page

**VS Code Tabs (in order):**
1. Project file tree visible in sidebar
2. `app/[...route]/page.tsx`
3. `lib/enquiry-store.ts`
4. `docs/AI_PROMPTS.md`
5. `docs/IMPLEMENTATION_DECISIONS.md`
6. `package.json`

**Terminal:**
- Working directory: `teddypups-website-clone`
- `npm test` ready to paste

**Loom Settings:**
- Record: Screen + Camera
- Screen: Full desktop (1080p)
- Camera: Webcam bubble (bottom-right corner)
- Audio: Microphone only (no system audio)
