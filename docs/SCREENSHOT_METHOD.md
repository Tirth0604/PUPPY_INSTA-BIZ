# Visual comparison method

Playwright captures the reference and independent application in Chromium with identical viewport size, device scale 1, locale and reduced motion. The 25 pairs cover the homepage at all nine requested sizes, plus the six other main pages and representative available/adopted profiles at 1440×900 and 390×844. It waits for reference hydration and visible image decoding before capturing the first viewport at scroll position zero. The separate functional suite captures full-page clone images.

The reference browser routes public GET requests on the reference origin through Playwright's HTTPS API transport, which trusts the environment's certificate chain. TLS verification stays enabled, credentials are excluded, and cross-origin requests are blocked. This allows the site to execute in Chromium when its separate TLS trust store rejects the execution environment's proxy certificate.

The comparison uses uncompressed RGB captures. A pixel is within tolerance when all three 8-bit channels differ by at most 16. No masks or alignment corrections are applied. An overlay averages the two frames. Difference maps show pixels outside tolerance in red. JPEGs are saved for inspection after the metrics are calculated. The JSON includes headings, broken-image checks and overflow observations for each viewport. Scores describe sampled initial views, not the entire pages or an overall perceptual similarity percentage.

Intentional differences include the assessment disclosure, corrected catalogue filter behavior, local image encoding, form semantics, and independently implemented media controls. Motion comparisons use separate recordings with motion enabled and identical mouse moves and scroll targets. They sample the initial curtain, lineup and chat behavior, with the active chat step and visible message groups saved in JSON.

Run `node scripts/visual-audit.cjs` or `node scripts/motion-audit.cjs` against an already running production build. Set `VISUAL_CLONE_ORIGIN` to its local address. Videos require the Playwright FFmpeg executable. Reference observations may change with the live site's inventory and deployment.
