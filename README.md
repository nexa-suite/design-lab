# Nexa Design Lab v0.9

Visual evidence laboratory for Nexa foundations, reusable components, interaction states and accessibility review.

`0.9.0-rc.1` is an Angular-only design-system candidate. It is not a production package, a product application, a Blueprint baseline or a completed Figma library.

## Purpose

v0.9 preserves the v0.8 visual foundation and hardens its architecture:

- every important rule has a rendered specimen;
- states can be seen, triggered, compared and reset;
- color and contrast use a shared deterministic gate;
- accessibility modes expose focus, target, resize and motion behavior;
- component maturity separates human-frozen direction from open exploration;
- canonical supplied logo assets, semantic status emphasis and reusable Action Menu / Tooltip behavior are rendered;
- Async Operations, Authentication, Legal Content, Payments, Analytics, Dispatch Board and Data-Dense Operations are candidate patterns;
- Increased Contrast and Reduced Motion are root-level functional evaluation modes.
- reusable candidates live under `design-system`, while Lab-only evidence lives under `lab`;
- Authentication, Analytics and Dispatch Board own focused documentation features and explicit lazy routes;
- StateSequence playback has configurable phase timing, terminal states and explicit recovery;
- architecture, token and contrast gates protect the source structure and geometry contracts.

The active lab contains documentation pages and composition specimens only. Product patterns remain design evidence; they do not define accepted domain behavior or production contracts.

## Run

```bash
npm ci
npm start -- --host 127.0.0.1 --port 4301
```

Open `http://127.0.0.1:4301/guidelines/overview`.

## Route map

| Area | Evidence |
| --- | --- |
| Start here | Overview, principles, maturity/freeze |
| Foundations | Color, Brand / Logo, typography, layout, shape, surfaces, iconography, motion |
| Components | Buttons, text fields, search, choice controls, status, feedback, menus, overlays, data, progress, workflow, quantity, navigation |
| Patterns | Forms, search/filtering, async operations, authentication, legal content, payments, analytics, dispatch board, data-dense operations, responsive behavior |
| Quality | Accessibility Lab, Contrast Lab, heuristics, input modality, maturity |
| Engineering | Angular architecture, tokens, APIs, testing, Figma mapping |

All documentation pages are lazy-loaded through the Angular router. There is no active screen-library route.

## Frozen candidate direction

- Light appearance is canonical.
- The current sidebar geometry, grouping, search, active row and mobile drawer behavior remain frozen.
- The current text-field geometry remains frozen and is now reusable through `NexaTextField`.
- Plus Jakarta Sans, Inter and JetBrains/system mono remain the candidate type families.
- PrimeIcons remain the candidate icon system.
- White structural surfaces sit on a cool light canvas; elevation is restrained and purposeful.
- Rounded geometry is semantic: controls, cards, panels and compact status do not share one universal radius.
- The supplied `logo-nexa/logo-nexa.svg` and `logo-nexa/Documento.svg` files are the canonical rendered logo sources; the wordmark is never redrawn in CSS or text.
- Dark mode is intentionally deferred. Increased Contrast is an evaluation mode over the same light foundation.

## Quality evidence

```bash
npm run build
npm run validate:architecture
npm run validate:tokens
npm run validate:contrast
npm test -- --watch=false
npm audit --omit=dev --audit-level=high
git diff --check
```

The Contrast Lab derives ratios from token color values. The required gates are WCAG 2.2: 4.5:1 for normal text, 3:1 for large text and 3:1 for essential non-text UI. The lab also exposes Standard/Increased Contrast, Motion/Reduced Motion and target-overlay review modes.

Browser review covers the required pages and 1440, 1024, 768, 390 and 320px viewports. Manual assistive-technology review remains a human handoff item unless explicitly recorded in the implementation report.

## Angular structure

```text
src/app/
  shell/                 documentation navigation shell
  design-system/         reusable candidate controls and brand primitives
  lab/                   evaluation, evidence and quality infrastructure
  documentation/         route features, page content and navigation metadata
src/styles/
  _tokens-primitives.scss
  _tokens-semantic.scss
  _tokens-components.scss
  _motion.scss
  _accessibility.scss
tooling/scripts/         token and contrast gates
```

Reusable controls own their public API and native semantics. Documentation specimens own simulation state, galleries and evidence composition. Strict templates and signal-first state are required.

## Documentation

- [Style guidelines v0.8](./STYLE-GUIDELINES-v0.8.md)
- [Component maturity v0.8](./COMPONENT-MATURITY-v0.8.md)
- [Accessibility evidence v0.8](./ACCESSIBILITY-EVIDENCE-v0.8.md)
- [Freeze v0.8](./FREEZE-v0.8.md)
- [Implementation report v0.8](./IMPLEMENTATION-REPORT-v0.8.md)

Historical v0.7 evidence remains in Git for provenance and is not runtime authority: [style guidelines](./STYLE-GUIDELINES-v0.7.md), [component inventory](./COMPONENT-INVENTORY-v0.7.md), [contrast audit](./CONTRAST-AUDIT-v0.7.md), [Angular architecture](./ANGULAR-ARCHITECTURE-v0.7.md) and [Figma handoff](./FIGMA-HANDOFF-v0.7.md).

## Boundary

Design Lab changes are local to this repository. No production application, API, Blueprint, mobile repository or deployment is modified by this release candidate. v0.9 publishes its feature branch and prerelease tag only; it does not merge to `main` or create a final release.

Copyright © 2026 Nexa. All rights reserved.
