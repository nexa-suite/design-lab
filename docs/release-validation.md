# v0.10 release validation

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
git diff --check
```

## Browser evidence

Record route, viewport, state, artifact path, test path and source SHA for each capture. Required responsive widths are 1440, 1024, 768, 390 and 320. High-risk routes receive 200% text and 400% reflow review. Required interactions include segmented selection, locale switching, Action Menu keyboard behavior, Tooltip, StateSequence terminal/retry/cancelled states, Progress variants, Authentication transitions, Analytics, Dispatch movement, Reduced Motion and Increased Contrast.

The deterministic contract lives in `tooling/visual-regression/manifest.json` and is checked by `npm run validate:visual`. Run `npm run audit:visual` before a review session to generate the ignored `tmp/v010-visual-audit.json`; each route record contains route, area, severity, finding, visual evidence, probable source, required correction and status, bound to the current source SHA. Generated captures belong under ignored `tmp/visual-regression/<source-sha>/`; the repository tracks the schema and route matrix, not generated screenshots. `npm run validate:package` runs the safe `npm pack --dry-run --json` inspection after the library build and rejects documentation, Lab or source leakage from `nexa-ui`.

Deterministic commands do not replace human visual, content, browser or assistive-technology review. Do not publish a final v1 claim from an RC branch.
