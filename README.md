# TeddyPups U.A.E. — assessment recreation

Independent Next.js recreation of [the reference website](https://puppy.instabizweb.com/). **This is an assessment demonstration, not the official business or current puppy inventory.** Media reuse was explicitly authorized by the user. No source-business form submissions were made.

## Live website

**Production:** [https://teddypups-website-clone-theta.vercel.app/](https://teddypups-website-clone-theta.vercel.app/)

The frontend, API routes, and Supabase PostgreSQL-backed enquiry storage are deployed. The production site is an assessment demonstration and should only be used with fictional enquiry information.

## Run locally

Requires Node.js 24 and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Development enquiries persist to `.local/enquiries.sqlite`. Use fictional information. SQLite files are excluded from source control and the checkpoint ZIP.

```sh
npm test
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

The browser tests launch an isolated production server on port 3100 and use `.local/e2e.sqlite`. Their Chromium executable defaults to `/usr/bin/chromium`; configure `playwright.config.ts` for your operating system. No test submits to the reference site. To run a local production demo, explicitly set `ENQUIRY_STORAGE=sqlite` and `RATE_LIMIT_SECRET` before `npm start`.

## Implemented

- Seven main pages and all 42 individual puppy routes, including 15 available and 27 adopted records.
- Original family gallery ordering: 64 photos, with separate eight-photo homepage preview.
- Real origin/breed query filtering, URL refresh and history navigation; local availability correctly returns an empty state in this snapshot.
- Image/video galleries, thumbnails, fullscreen modal, keyboard controls, touch swipes and media-error fallback.
- Searchable nine-note FAQ, automatically expanded search results, adoption tabs and anchors.
- Mobile navigation with native modal focus management, Escape handling and focus restoration.
- Contact letter and profile forms with client/server validation, honeypot, persistent rate limiting, idempotency and confirmed persistence feedback.
- Local assets, responsive reference styling, semantic controls, reduced motion, assessment banner and noindex.
- APIs, PostgreSQL migrations/seed, SQLite development adapter, CI, tests and source audit.

## Architecture

App Router + strict TypeScript + React. `components/` separates galleries, forms, navigation, content and profile rendering. `lib/catalogue.ts` reads the fixed demonstration snapshot; `lib/enquiry-store.ts` handles independent enquiry writes. The PostgreSQL seed mirrors the catalogue snapshot. Public catalogue APIs currently read JSON rather than making database queries, keeping the demo browsable without credentials.

The authorized reference's public presentation markup, illustrations, and CSS were inspected, sanitized, and retained in `data/templates.json` and `app/reference.css` to preserve its detailed visual design. They are rendered as React elements. **Original JavaScript, backend endpoints, credentials, runtime scraping and iframes are not used.** Interactions are independently implemented in TypeScript. This reuse is disclosed, not represented as entirely hand-authored artwork or CSS. Additional unused preferred libraries were not installed.

## API

| Method | Endpoint | Behavior |
|---|---|---|
| GET | `/api/puppies?status=available&origin=imported&breed=poodle` | Stable filtered list |
| GET | `/api/puppies/[slug]` | Profile or 404 |
| GET | `/api/families` | 64 photo records |
| GET | `/api/faqs?q=Korea` | Search questions and answers |
| POST | `/api/enquiries` | Validated, rate-limited, persistent demo enquiry |
| GET | `/api/health` | App status and configuration presence; not a DB connectivity test |

POST accepts `name`, international `phone`, optional `email`, `area`, `puppyId`, `message`, empty `website`, `sourcePage`, and UUID `idempotencyKey`. Requests are capped at 16 KiB. Responses use `success` and `message`; validation is 422, honeypot 400, rate limit 429, unavailable storage 503. No public enquiry-read endpoint exists.

## Production database and deployment

See [deployment instructions](docs/DEPLOYMENT.md). Copy `.env.example` and configure server-only `DATABASE_URL` using an authorized Supabase PostgreSQL connection. Run `supabase/migrations/001_initial.sql`, then `supabase/seed.sql`. Use `ENQUIRY_STORAGE=postgres` in Vercel, never SQLite. All tables have RLS; enquiry tables have no public policies and explicit anonymous/authenticated revocation.

`NEXT_PUBLIC_WHATSAPP_PHONE` defaults to the reference destination, `919898124987`, as explicitly requested by the user. It belongs to the reference's web agency; the reference displays a different placeholder UAE number. Links include assessment context and never send automatically. Email/social links preserve their verified agency destinations. Configure real authorized demonstration destinations before external evaluation if needed.

## Evidence and limits

- [Checkpoint status](docs/CHECKPOINT.md)
- [Test report](docs/TEST_REPORT.md)
- [Reference audit](docs/REFERENCE_AUDIT.md)
- [Feature parity](docs/FEATURE_PARITY.md)
- [Asset manifest](docs/ASSET_MANIFEST.md)
- [AI prompts](docs/AI_PROMPTS.md)
- [Loom script](docs/LOOM_SCRIPT.md)

The visual evidence includes 25 matched viewport pairs, RGB difference maps, overlays and short motion recordings in `docs/visual-comparison/`. See `docs/SCREENSHOT_METHOD.md` for the capture method and limits. The clone uses the initial curtain, one-seat rotation, local mascot reactions, and scroll-triggered conversation stages. Exact navigation curtain timing and mascot travel between scenes are still open.

Live deployment URL: **[https://teddypups-website-clone-theta.vercel.app/](https://teddypups-website-clone-theta.vercel.app/)**
Loom video URL: **not recorded**; script included.
GitHub repository: **[https://github.com/Tirth0604/PUPPY_INSTA-BIZ](https://github.com/Tirth0604/PUPPY_INSTA-BIZ)**

Cross-browser CI uses `CROSS_BROWSER=1` after `npx playwright install --with-deps chromium firefox webkit`. Desktop WebKit ran after resolving its local dependency problem. Firefox content processes crash on this host. See `docs/CROSS_BROWSER_LIMITS.md`.
