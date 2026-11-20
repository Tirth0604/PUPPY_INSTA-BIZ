# TeddyPups website comparison report

**Original:** [puppy.instabizweb.com](https://puppy.instabizweb.com/)  
**Project:** TeddyPups U.A.E. assessment demo, local production build with the motion update  
**Audit date:** 21 November 2026 · India Standard Time

[Follow-up fixes and verification](PARITY_FOLLOWUP.md). This report records the baseline before those fixes.

## Executive assessment

The project reproduces the original’s public browsing experience: the same seven main pages, 42 puppy profiles, adoption archive, family photo wall and FAQ. The design preserves the original’s scrapbook styling. Enquiries run on an independent backend, and the site uses a fixed data snapshot for the assessment. The strongest remaining differences concern the mobile profile layouts and precise mascot choreography. A public deployment, remote database verification and the Loom recording remain separate handoff items.

| Measure | Result |
|---|---:|
| Live sitemap routes returning HTTP 200 | 49/49 original and 49/49 project |
| Distinct project destinations checked | 151 internal paths, queries and fragments. 0 broken |
| Puppy profiles and media | 42 profiles (15 available, 27 adopted), 132 profile media records |
| Family photographs and FAQ entries | 64 family photographs and 9 FAQs |
| Unknown puppy route | HTTP 404, custom page |
| Matched first viewports | 25 pairs. 12 meet the brief’s 95% pixel target in the measured region |

## 1. Scope and method

- Compared the live public sitemap and page responses with the current local production preview on port 3001. Checked internal path, filter and fragment destinations in the rendered project. The route appendix records both HTTP results.
- Compared matched first viewports in Chromium using the same dimensions, device scale, locale and reduced motion. A pixel counts as matching when all three RGB channels differ by no more than 16. The score includes intentional differences such as the demo banner and corrected contact controls.
- Reviewed the reference’s public markup, styles and interaction evidence against the project’s components. Verified local behavior with browser and application tests. The original’s form submissions, messages and private infrastructure were outside the audit.
- Kept historical measurements separate when a current check was unavailable. Screenshot scores describe one viewport at a time. They do not measure below-the-fold layout, animation fidelity, or overall user experience.

## 2. Page and feature comparison

| Area | Original | Project and assessment |
|---|---|---|
| Global navigation | Fixed, scroll-aware header, paw highlights, mobile menu, quilt between routes and a footer with the main sections. | Retains the header and footer structure. The mobile dialog animates in and out and restores focus. Cross-page links run the quilt transition. Browser history and deep links were exercised. Alternate tab and external actions retain browser behavior. |
| Home | Arched lineup, mascot, showroom and imported pathways, simulated chat, trust/passport section, family previews, FAQ and final CTA. | All sections are present. The hero rotates one seat at a time. Breed chips open catalogue filters. The chat has a staged typing state and a playable demo clip. Eight previews open a viewer for all 64 family photos. |
| Available puppies | Fifteen listings in a sketchbook presentation, with origin, breed, collection and gender filters after hydration. Five adopted previews point to the archive. | Preserves the captured listings, filter combinations and direct URL access. Filters update the URL and persist across reloads. The local filter returns zero available listings because every available record in the captured data is marked imported. |
| Puppy profiles | A shared profile structure, original slugs, photos and video, health information, status dependent journey and enquiry, and related profile links. | All 42 slugs resolve, including unusual spellings. The viewer supports thumbnails, position counter, keyboard and touch, video and fullscreen. Previous and next wrap within the listing’s status. Adopted profiles use similar puppy enquiry messaging. |
| Gone Home | Adopted profiles presented in a scrapbook archive. | All 27 archived profiles load. The archive maintains a separate browse and enquiry path from available listings. |
| Happy Families | Scrapbook wall, captions, testimonials and 64 gallery positions. | All 64 positions are included. The viewer opens by photo, preserves captions and supports keyboard, gestures and Escape. |
| How It Works | Dubai and imported pathways, promise, delivery and collection, and reasons to choose TeddyPups. | Both tabs and their content are present, with a moving selector and staggered steps. The four section anchors resolve. The footer delivery link was tested through browser back and forward. |
| FAQ | Nine foldable notes with search across questions and answers. | All nine notes are present. Search highlights matches, unfolds results, and supports clearing and empty results. The mascot bubble changes with the answer state. |
| Visit and Contact | Letter-style form, WhatsApp, telephone, email and showroom directions. | Shared frontend/server validation, real local persistence and retry feedback. The letter folds and posts after the server confirms saving. The map opens the Downtown Dubai area. An exact showroom pin can be configured. |
| External destinations | Captured WhatsApp links use an agency number, the displayed UAE number is a placeholder, and the audit found agency URLs behind the social labels and map CTA. | Uses the authorized WhatsApp destination with contextual demo text. Social fallback links use the agency URLs and accept configured verified profiles. Email is configurable. Messages and calls require the visitor to initiate them. |
| Missing routes | Public sitemap describes the content pages. The earlier crawl found Cloudflare’s email protection path returning HTTP 404. | The application renders a custom 404 for unknown paths. The email protection link was replaced with a mail link, since it was infrastructure rather than a content page. |

## 3. Visual design and responsive behavior

Both sites use Fraunces for display headings, Figtree for interface and body text, and Shantell Sans for handwritten accents. Milk, cocoa, honey and toffee carry the palette. Arched portraits, polaroid cards, scalloped dividers and illustrated props define the scrapbook composition. The project reuses the authorized CSS, illustrations and media with local assets. It adds an assessment disclosure and uses its own controls for navigation, filters, media and forms.

The current sample ranged from **86.61% to 97.27%**. The desktop homepage measured **96.78%** at 1440×900 and the phone homepage **91.92%** at 390×844. At 390×844, the adopted Ace profile measured **86.61%**, available Max **87.60%** and Contact **88.30%**. Neither site showed horizontal overflow or a failed visible image load in the 25 sampled pairs. See Appendix B for all scores and three comparisons.

The mobile Ace comparison shows that the hero frame aligns closely in size and position. The project adds a visible fullscreen button over the photo, uses stronger thumbnail borders, and places the contact bar above the assessment disclosure. The contact comparison shows a matching heading and introductory block, followed by a taller form opening. The original has a paw stamp and dashed inline fields, while the project places the fictional-data notice above the greeting and wraps the fields differently. When refining the layout, start with mobile profiles and contact. Inspect the profile’s media frame, title tag and section offsets, then the contact form’s inline field widths, letter padding and the height reserved for persistent controls. Use screenshots with the menu open, after a few scroll stops and with a gallery open to check behaviors absent from the first viewport metric.

## 4. Animation and transitions

| Interaction | Reference evidence | Project behavior and remaining gap |
|---|---|---|
| Quilt entry and route changes | Quilt and walking mascot, with CSS phases for intro, cover and lift. | Intro plus a 300 ms cover and 460 ms lift around internal route changes. Reduced motion bypasses the animation. Direct loads, history and cross-page anchors were checked separately. |
| Hero and mascot | Portraits peek, duck and pop. One fixed mascot changes poses, responds to the pointer and travels across scenes. | Portrait rotation, pointer reactions and adjacent scene handoffs are implemented. In the project the fixed actor is used in transit and hands off to the resting scene artwork. The original has additional pose, cue and scroll timing logic. |
| Scroll scenes | Doors, notes, passport stamps, cards, sun and family prints use different reveal rules. | Retains the CSS effects and arms dynamically rendered content when it enters view. The visual sample does not establish matching timelines at every scroll position or browser. |
| Mobile menu and journey tabs | Circular menu reveal and staggered links. Sliding selector and stepped panel entrance. | Uses the observed menu keyframes. Modal Escape and focus restoration work. The selector, stagger and arrow/Home/End keys work in the journey tabs. |
| Chat and galleries | Chat typing precedes messages. Profile pages turn in the selected direction. The fullscreen viewer uses a spring. | Desktop replies use the observed 750 ms typing delay. Mobile and reduced-motion layouts expose all messages. Profile turns run for 700 ms. Fullscreen slides approximate the spring. Profile playback uses native controls. |
| FAQ and contact | Accordion notes unfold and a posted letter folds into an envelope before the mailbox feedback. | FAQ state and folds are rendered. The contact letter sequence waits for persistence. A failed submission keeps the fields editable and exposes the error for retry. |

## 5. Architecture, data and safeguards

| Area | Project implementation | Verification boundary |
|---|---|---|
| Rendering | Next.js 16 App Router and React. A shared layout wraps public pages, and one profile template handles the 42 records. TypeScript components provide behavior around sanitized presentation fragments. | Local production build was verified. The project runs without loading the original’s client scripts or requiring the original’s backend. |
| Public data | Local JSON snapshot for puppies, media, families and FAQs, with corresponding PostgreSQL schema and seed. Read APIs exist for puppies, a single puppy, families and FAQs. | Content is a captured assessment snapshot. It does not refresh with the business’s inventory. All 200 distinct profile and family media or poster paths exist locally, including six profile video files. |
| Enquiry processing | POST handler validates origin, JSON type and size, required fields, phone format, optional email, known puppy IDs and honeypot. Request IDs and content checks avoid duplicate records. Rate limits persist in storage. | Local SQLite integration tests exercise genuine writes and failure paths. The PostgreSQL adapter and RLS migrations exist. Remote Supabase execution and policies were not verified. |
| Privacy and browser policy | Server credentials are separated from public environment values. The application applies browser response headers and has no public enquiry listing endpoint. Phone, map and social destinations can be configured. | Code and exercised behavior were reviewed. This is not an independent security audit. |
| Search indexing | Assessment disclosure, metadata, sitemap, robots and noindex. | The indexing restriction is deliberate. Production SEO beyond the demo was outside scope. |

## 6. Quality evidence

| Check | Result |
|---|---|
| Domain and form integration | **42 passed** in the audit rerun, including 14 enquiry cases using isolated SQLite |
| Desktop and mobile Chromium | **17 passed, 1 intentional skip** in the current functional run. The desktop project skips the mobile-only menu case. |
| Production build, types and lint | Passed during the motion update. This audit exercised its running production preview. |
| Media and forms | Earlier browser checks played a profile video and the homepage clip. The current suite covers the galleries, real local enquiry persistence and an intercepted failure followed by a success. |

| Lighthouse run | Performance | Accessibility | Best Practices | SEO | LCP | CLS | Total blocking time |
|---|---:|---:|---:|---:|---:|---:|---:|
| Current build, isolated | 90 | 100 | 100 | 66 | 1.5 s | 0 | 320 ms |
| Current build, during parallel audit jobs | 65 | 100 | 100 | 66 | 1.7 s | 0.012 | 2,190 ms |
| Earlier project checkpoint | 98 | 100 | 100 | 66 | 1.4 s | 0.012 | 100 ms |

These are simulated mobile lab measurements on the workspace server. The concurrent run overlapped with screenshot capture and test activity, which limits its value as a performance baseline. There is no comparable reference Lighthouse run or field INP measurement. The SEO score reflects the intentional assessment indexing restriction. The accessibility score is an automated homepage result.

Desktop WebKit covered seven successful cases in the earlier checkpoint. Native Firefox remained blocked by a content process failure on the audit host. The latest mobile tests use Chromium emulation. Earlier contact-page axe results reported no serious or critical findings in their automated scope. Keyboard tests cover selected flows. Manual screen-reader testing and broad assistive technology coverage remain unverified.

## 7. Priorities before wider release

1. **Refine mobile profile and contact screens.** Match photo proportions, vertical spacing and form geometry. Compare menu, gallery and form states as well as the initial viewport.
2. **Tune mascot and viewer motion.** Capture the same scroll and pointer sequences on both sites and compare the pose changes, handoff position and fullscreen easing. Include touch devices and reduced motion in verification.
3. **Confirm business destinations.** Configure an approved showroom pin and verified social profiles. Review the displayed contact information and confirm the assessment or live use of the messaging destinations.
4. **Verify production infrastructure when deployment is authorized.** Apply the schema in an approved test project, exercise persisted enquiries and permission boundaries there, and validate the deployed site in native Chrome, Safari and Firefox. The project includes deployment instructions and a Loom walkthrough script.
5. **Keep the handoff local for this round.** The current project changes and this report were prepared in the workspace. No Git push was made.

## Evidence index

| Evidence | Location |
|---|---|
| Live route inventory | [Original XML sitemap](https://puppy.instabizweb.com/sitemap.xml) and Appendix A |
| Source behavior and design tokens | `docs/REFERENCE_AUDIT.md`, `docs/DESIGN_SYSTEM.md`, `docs/ANIMATION_INVENTORY.md` |
| Screenshot comparison method | `docs/SCREENSHOT_METHOD.md` and Appendix B |
| Test cases | `tests/domain.test.ts`, `tests/enquiries.test.ts`, `tests/e2e/site.spec.ts`, `tests/e2e/transitions.spec.ts` |
| Implementation and production handoff | `docs/ARCHITECTURE.md`, `docs/DEPLOYMENT.md`, `docs/LOOM_SCRIPT.md` |

## Appendix A. Live route check

| Public path | Original HTTP | Project HTTP |
|---|---:|---:|
| `/` | 200 | 200 |
| `/puppies` | 200 | 200 |
| `/gone-home` | 200 | 200 |
| `/happy-families` | 200 | 200 |
| `/how-it-works` | 200 | 200 |
| `/faq` | 200 | 200 |
| `/contact` | 200 | 200 |
| `/puppies/maltipoo-max-male` | 200 | 200 |
| `/puppies/korean-teacup-maltipoo-female` | 200 | 200 |
| `/puppies/korean-teacup-poodle-female` | 200 | 200 |
| `/puppies/maltipoo-cavapoo-male` | 200 | 200 |
| `/puppies/toy-poodle-male-female` | 200 | 200 |
| `/puppies/maltipoo-female-2` | 200 | 200 |
| `/puppies/pomeranian-female` | 200 | 200 |
| `/puppies/copper-male` | 200 | 200 |
| `/puppies/shitzu-female` | 200 | 200 |
| `/puppies/shitzu-male` | 200 | 200 |
| `/puppies/maltipoo-female-1` | 200 | 200 |
| `/puppies/maltipoo-female` | 200 | 200 |
| `/puppies/korean-teacup-pomeranian-1` | 200 | 200 |
| `/puppies/korean-teacup-pomeranian` | 200 | 200 |
| `/puppies/korean-teacup-pomeranian-male` | 200 | 200 |
| `/puppies/pomeranian-ace-boy` | 200 | 200 |
| `/puppies/poodle-leo-male` | 200 | 200 |
| `/puppies/maltipoo-mia-girl` | 200 | 200 |
| `/puppies/maltipoo-sadie-girl` | 200 | 200 |
| `/puppies/blue-marle-pomeranian` | 200 | 200 |
| `/puppies/pomsky-ollie-boy` | 200 | 200 |
| `/puppies/maltipoo-bruno-boy` | 200 | 200 |
| `/puppies/maltese-buddy-male` | 200 | 200 |
| `/puppies/maltese-charlie-male` | 200 | 200 |
| `/puppies/pomeranian-daisy-girl` | 200 | 200 |
| `/puppies/pomeranian-bella-female` | 200 | 200 |
| `/puppies/poodle-teddy-male` | 200 | 200 |
| `/puppies/poodle-molly-female` | 200 | 200 |
| `/puppies/pomski-coco-girl` | 200 | 200 |
| `/puppies/pomsky-rosie-girl` | 200 | 200 |
| `/puppies/pomeranian-leo-boy` | 200 | 200 |
| `/puppies/poodle-molly-girl` | 200 | 200 |
| `/puppies/poodle-rocky-boy` | 200 | 200 |
| `/puppies/maltipoo-sophie-girl` | 200 | 200 |
| `/puppies/maltipoo-lola-girl` | 200 | 200 |
| `/puppies/pomeranian-rex-boy` | 200 | 200 |
| `/puppies/pomsky-finn-male` | 200 | 200 |
| `/puppies/maltipoo-zoe-girl` | 200 | 200 |
| `/puppies/pomeranian-mimi-girl` | 200 | 200 |
| `/puppies/bichon-bailey-boy` | 200 | 200 |
| `/puppies/puppy` | 200 | 200 |
| `/puppies/maltipo` | 200 | 200 |

All seven linked catalogue queries returned HTTP 200. The separate browser suite checks query behavior and browser history, because an HTTP response alone cannot establish correct filtering.

## Appendix B. Matched viewport results

| Route | Viewport | Pixels within tolerance |
|---|---:|---:|
| `/` | 1920 × 1080 | 96.83% |
| `/` | 1440 × 900 | 96.78% |
| `/` | 1280 × 800 | 96.51% |
| `/` | 1024 × 768 | 96.31% |
| `/` | 768 × 1024 | 96.93% |
| `/` | 430 × 932 | 92.94% |
| `/` | 390 × 844 | 91.92% |
| `/` | 375 × 812 | 91.20% |
| `/` | 360 × 800 | 91.11% |
| `/puppies` | 1440 × 900 | 97.16% |
| `/puppies` | 390 × 844 | 93.59% |
| `/gone-home` | 1440 × 900 | 97.00% |
| `/gone-home` | 390 × 844 | 93.61% |
| `/happy-families` | 1440 × 900 | 96.98% |
| `/happy-families` | 390 × 844 | 92.98% |
| `/how-it-works` | 1440 × 900 | 97.13% |
| `/how-it-works` | 390 × 844 | 93.00% |
| `/faq` | 1440 × 900 | 97.27% |
| `/faq` | 390 × 844 | 92.89% |
| `/contact` | 1440 × 900 | 94.41% |
| `/contact` | 390 × 844 | 88.30% |
| `/puppies/maltipoo-max-male` | 1440 × 900 | 96.90% |
| `/puppies/maltipoo-max-male` | 390 × 844 | 87.60% |
| `/puppies/pomeranian-ace-boy` | 1440 × 900 | 96.88% |
| `/puppies/pomeranian-ace-boy` | 390 × 844 | 86.61% |

### Homepage, 1440 × 900

Original on the left. Project on the right.

![](<comparison-report-evidence/home-1440.jpg>){width=94%}

### Adopted Ace profile, 390 × 844

Original on the left. Project on the right.

![](<comparison-report-evidence/puppies__pomeranian-ace-boy-390.jpg>){width=94%}

### Contact, 390 × 844

Original on the left. Project on the right.

![](<comparison-report-evidence/contact-390.jpg>){width=94%}
