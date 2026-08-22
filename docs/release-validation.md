# v1.0.0 release validation

## Deterministic gates

The CI minimum is:

```text
npm ci
npm run validate:architecture
npm run validate:tokens
npm run validate:colors
npm run validate:icons
npm run validate:documentation
npm run validate:public-api
npm run validate:visual
npm run validate:contrast
npm run validate:package
npm test -- --watch=false
npm run test:library -- --watch=false
npm run build:library
npm run build
npm run validate:browser
git diff --check
```

## Browser evidence

Record route, viewport, state, artifact path, test path and source SHA for each capture. Required responsive widths are 1440, 1024, 768, 390 and 320. High-risk routes receive 200% text, increased text-spacing and 400% reflow review. The canonical state matrix also exercises forms, async terminal/recovery states, empty/loading/error taxonomy, payment method states, request-builder quantity/submission, order tracking/documents, delivery proof, map fallback and data-dense table states. Required interactions include segmented selection, locale switching, Action Menu keyboard behavior, Tooltip, StateSequence terminal/retry/cancelled states, Progress variants, Authentication transitions, Analytics, Search retry, Dispatch movement, Reduced Motion, Increased Contrast and increased text-spacing.

The deterministic contract lives in `tooling/visual-regression/manifest.json` and is checked by `npm run validate:visual`. Run `npm run audit:visual` after the browser gate to generate the ignored `tmp/v010-visual-audit.json`; each route record contains route, area, severity, finding, browser evidence, probable source, required correction and status, bound to the current source SHA. The audit reports captured artifacts and keeps human visual review explicitly pending. Generated captures belong under ignored `tmp/visual-regression/<source-sha>/`; the repository tracks the schema and route matrix, not generated screenshots. `npm run validate:package` runs the safe `npm pack --dry-run --json` inspection after the library build and rejects documentation, Lab or source leakage from `nexa-ui`. `npm run validate:browser` starts the production Angular serve target, installs/uses Chromium in CI, visits every registry route at 1440/1024/768/390/320 px, checks no overflow/content/heading/active navigation/console errors, activates the canonical state controls, checks console/page errors during each state activation and runs representative state, recovery, locale, menu, tooltip, motion, text-spacing and evaluation-mode interactions.

The Accessibility Lab exposes actual 100%, 150%, 200% and 400% reflow controls plus a reversible increased text-spacing mode. The 400% mode sets a root evaluation state and constrains the documentation frame for a targeted no-overflow/reflow review; it does not claim screen-reader or human visual certification.

Deterministic commands do not replace human visual, content, browser or assistive-technology review. The published v1.0.0 baseline does not claim accessibility certification or production product readiness.
