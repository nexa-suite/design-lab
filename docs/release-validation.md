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
npm run validate:contrast
npm test -- --watch=false
npm run build:library
npm run build
git diff --check
```

## Browser evidence

Record route, viewport, state, artifact path, test path and source SHA for each capture. Required responsive widths are 1440, 1024, 768, 390 and 320. High-risk routes receive 200% text and 400% reflow review. Required interactions include segmented selection, locale switching, Action Menu keyboard behavior, Tooltip, StateSequence terminal/retry/cancelled states, Progress variants, Authentication transitions, Analytics, Dispatch movement, Reduced Motion and Increased Contrast.

Deterministic commands do not replace human visual, content, browser or assistive-technology review. Do not publish a final v1 claim from an RC branch.
