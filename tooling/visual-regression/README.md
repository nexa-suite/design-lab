# Deterministic visual evidence

The Design Lab does not commit generated screenshots or copy them into the
Blueprint. `manifest.json` is the small, reviewable contract for the browser
evidence workflow.

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
- targeted 200% text and 400% reflow checks.

`npm run validate:visual` validates the manifest, registry coverage and
artifact contract in CI. Browser execution remains a local/release evidence
step because the repository deliberately does not add a second browser
automation dependency for this documentation-only laboratory.
