# Deterministic visual evidence

The Design Lab does not commit generated screenshots or copy them into the
Blueprint. `manifest.json` is the small, reviewable contract for the browser
evidence workflow. `npm run validate:browser` executes that contract against
the real Angular application with a pinned Playwright runner.

The browser runner records one result per route, viewport and state under the
ignored `tmp/visual-regression/<source-sha>/` directory. Each result includes
the route, viewport, semantic state, artifact path, test result and source
SHA. Geometry assertions are preferred over pixel-only assertions: document
overflow, heading presence, selected/focus geometry, visible recovery and
console cleanliness are recorded alongside optional screenshots.

The required matrix is:

- canonical routes at 1440 and 390 px;
- layout/no-overflow checks at 1024, 768 and 320 px;
- high-risk selected, focus, pressed, disabled, loading, error and open
  states;
- targeted 200% text, increased text-spacing and 400% reflow checks (the accessibility route records
  the review state; the browser gate verifies the route remains usable).

`npm run validate:visual` validates the manifest, registry coverage and
artifact contract. `npm run validate:browser` starts the production Angular
serve target when no `NEXA_BROWSER_BASE_URL` is supplied, visits every
registered route at 1440, 1024, 768, 390 and 320 px, writes ignored evidence
artifacts bound to the current source SHA, and fails on empty content, missing
headings, inactive navigation, horizontal overflow, console errors or page
errors. It also exercises representative analytics recovery, authentication
locale/error, search retry, dispatch movement, reduced-motion, text-spacing and manual stepping paths. CI
installs Chromium and runs this gate after the production build.
