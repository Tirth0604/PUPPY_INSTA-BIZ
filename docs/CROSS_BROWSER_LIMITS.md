# Native browser verification

- Chromium desktop and Chromium mobile emulation exercise the functional suite. The quality suite uses desktop Chromium.
- Desktop WebKit 27.2 ran locally. Its Playwright bundle lacked host libraries, so the missing shared libraries were fetched from signed Debian packages, extracted into a temporary user directory, and added to the temporary browser bundle. Playwright's system-library preflight could not see local libraries in the host linker cache. The temporary run skipped that preflight after checking library resolution. Browser sandbox settings stayed unchanged. See e2e-webkit-results.json for outcomes.
- Firefox 159 initially could not create its profile because the default configuration and cache live on a read-only mount. Writable XDG configuration and cache directories let it launch. Its page process then crashed, with the browser reporting `Sandbox: writing /proc/self/uid_map: EROFS`. No Firefox route verification is claimed.

GitHub Actions can run all four projects with official Playwright dependencies. Chromium mobile emulation and desktop WebKit do not establish native iOS Safari behavior.
