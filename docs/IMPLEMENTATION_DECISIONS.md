# Implementation decisions

- Preserve audited presentation rather than substitute a generic template. Authorized public CSS/SVG/markup is retained and sanitized. TypeScript implements interactions independently. This is disclosed in README.
- Use a fixed JSON content snapshot mirrored by PostgreSQL seed, so browsing does not require DB credentials. Persist enquiries in an independent backend.
- Use stable URL filters for origin, collection, breed and gender. The source SSR view omitted the controls and initially listed all available cards. The hydrated reference supports filters, including an empty local result; no local records were added.
- Use original WhatsApp number after the user's explicit instruction. Prefill assessment-specific puppy or similar-puppy messages; never send automatically.
- Replace the broken Cloudflare email-protection link with the email verified in the live DOM. Provide configurable social URLs and retain the audited agency destination as the demo default. The map opens a search for the Downtown Dubai area unless an exact verified map link is configured.
- Use native dialog for menu and lightbox focus trapping. Keep reduced-motion and keyboard navigation.
- Advance the homepage conversation as its desktop steps cross the viewport. Keep all messages available on small screens and with reduced motion.
- Use CSS/IntersectionObserver for observed simple motion. The initial quilt curtain uses the sanitized reference artwork and observed CSS timing. Use the quilt cover and lift on pathname changes, and let browser history handle back and forward. Teddy travels between adjoining scenes in a fixed layer, then hands off to the scene’s resting SVG.
- Limit browser writes to the independent clone. Source form submit was rejected by automatic approval review; no workaround was attempted. Read-only form attributes were inspected instead.
- Build/test issues found: reserved public `_next` font directory (moved to `/fonts`); TypeScript field conversion; 200 status on streamed 404; localhost/127.0.0.1 origin mismatch. Fixes and regression checks are recorded in test results.

- Optimized photographs to at most 1600px, quality-85 JPEG/WebP, retaining original aspect ratios and original source URL attribution. Saved 27,862,540 bytes from affected images.
- Tested externalizing static mascot SVGs, but it worsened LCP and changed layout. Reverted that experiment. Kept inline SVG presentation; separated media helpers from catalogue data and deferred form validation code instead.
- Removed the root streaming loading boundary after tests demonstrated its premature 200 response for unknown routes. The custom 404 now returns HTTP 404.

- Corrected the header's home-state attribute after matched mobile captures exposed a missing scalloped hem on inner pages. The stylesheet checks attribute presence, so inner pages must remove it. Scroll state is initialized when the route effect runs.
- Retried GitHub repository creation through GraphQL and REST on 2026-11-21. Both rejected the connected integration's repository-creation permission. A remote has not been created or pushed.
