# Deployment

## Vercel deployment status

Production is live at [teddypups-website-clone-theta.vercel.app](https://teddypups-website-clone-theta.vercel.app/). The Next.js pages and API share the Vercel project `teddypups-website-clone`. The separate Supabase Free project `teddypups-enquiries` is in the US East region.

The migration and seed ran in a one-time Vercel build before promotion because direct database sockets from the workspace could not reach the pooler. It seeded 42 puppies, 132 media records, 64 family photographs and nine FAQs. Enquiry row security is enabled. The anonymous and authenticated database roles lack read privileges on enquiries. Later deployments can use the established schema and the regular build command.

The public API saved one fictional enquiry and returned the same record ID on an identical retry. A server-side query to Supabase confirmed the row and an anonymous request was denied. The fictional record was then removed. The production build uses the Supabase transaction pooler via the server-only `DATABASE_URL` variable. No Git push was used to deploy.

Production deployment ID: `dpl_86F4ijQBVWL5dYVT1v68MgXWFiXx`.

## Hosting and readiness

Deploy this repository as one Next.js application on Vercel (Node.js 24). This serves both the public pages and the route handlers under `/api`. Use a separate managed Supabase PostgreSQL database for enquiry persistence and rate limits. Puppy listings, family photos, and FAQ content continue to use the packaged snapshot.

The production build and PostgreSQL 17 preflight passed. The migration and seed applied to an empty test database, all 42 puppy records were seeded, a fictional HTTP enquiry persisted, and an identical retry returned the same record ID. The test database had enquiry RLS enabled and no read privilege for the `anon` or `authenticated` roles. These checks exercise PostgreSQL locally. Verify the managed pooler and deployed functions after connecting the provider accounts.

## Exact deployment steps

1. Create/select an authorized Supabase project and keep its credentials private.
2. In its SQL editor, execute `supabase/migrations/001_initial.sql`, then `supabase/seed.sql`. The seed is idempotent; the initial migration is for a new database. Do not run the initial migration over an existing unrelated schema.
3. Obtain the PostgreSQL pooler URL and set Vercel `DATABASE_URL` as a server-only environment variable. Use the transaction pooler endpoint; the application disables prepared statements.
4. Set `ENQUIRY_STORAGE=postgres`, a random `RATE_LIMIT_SECRET` (at least 32 bytes), `NEXT_PUBLIC_WHATSAPP_PHONE=919898124987`, authorized contact email and `NEXT_PUBLIC_SITE_URL` to the eventual deployment origin. Never prefix DB credentials with `NEXT_PUBLIC_`.
5. Link the current workspace to the intended Vercel project with the Vercel CLI. Use the Next.js preset, Node.js 24, `npm ci` and `npm run build`. Direct CLI deployments use the current workspace and do not require a Git push. `.vercelignore` excludes local databases, reports and test output from deployment uploads.
6. Deploy a preview first with `vercel deploy`. Use its configured preview database to smoke test the app, then configure production variables and deploy with `vercel deploy --prod`. Set `NEXT_PUBLIC_SITE_URL` to the production origin and rebuild when changing public variables.
7. Verify all seven main routes and 42 profiles. Check `/api/health` only for configuration presence; it is not proof of database connectivity.
8. Submit a fictional demo enquiry through the deployment. Confirm the new row in the authorized Supabase console before declaring production persistence verified. Ensure anonymous clients cannot query `enquiries`.
9. Verify phone/WhatsApp destinations without sending messages. Confirm noindex, mobile layout, gallery playback and menu dismissal.
10. Record actual test results and URL in `docs/SUBMISSION.md`.

Production stores names/phones/emails server-side only. Use fictional records for the assessment; define retention and deletion procedures before accepting real customer information.

## Local production preview

```sh
npm ci
npm run build
ENQUIRY_STORAGE=sqlite RATE_LIMIT_SECRET=local-demo-secret npm start
```

The managed preview relay could not open port 4173 in this session. The automated Playwright test server is separate, temporary, and only exercises localhost.
