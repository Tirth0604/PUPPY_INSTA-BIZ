# Architecture

`app/layout.tsx` owns the shared header, footer, persistent contact bar and assessment label. Static presentation is sanitized at generation time and rendered through `components/Markup.tsx` as React elements. Slots inject independent client components. No user input is interpreted as markup.

`app/[...route]/page.tsx` resolves the six non-home main pages and 42 audited profile slugs. Unknown paths use the custom 404. The profile template handles status, origin, ordered media, form context and within-status previous/next wraparound.

`data/` is a pinned demonstration snapshot, not a live scraping dependency. `lib/catalogue.ts` handles filtering, lookup and navigation. `types/index.ts` models records. `lib/validation.ts` shares Zod validation between forms and server.

POST enquiries validates size, content type, origin, schema, honeypot and associated puppy. `lib/enquiry-store.ts` stores the validated record, enforces persistent rate buckets and deduplicates by request UUID/content fingerprint. PostgreSQL uses transactions and an advisory lock for same-content races. SQLite uses an immediate transaction for local demos/tests. IP-derived bucket keys are hashed with a deployment secret; raw IPs are not stored. There is no browser-accessible list of enquiries.

The PostgreSQL migration contains catalogue/media/family/FAQ/enquiry tables, constraints, indexes and RLS. Public read models currently use JSON matching the seed. No admin interface or paid messaging integration is included.

Assets are local. The reference's Next image URLs were decoded to their public source assets; fonts are relocated to `/fonts`. Reusable CSS preserves the original palette, spacing, handwritten typography and illustration shapes. Client modules implement behavior without loading source scripts.
