# Nexa Design Lab v0.10

Visual evidence laboratory for Nexa foundations, reusable components, interaction states and accessibility review.

`0.10.0-rc.1` is an Angular-only design-system candidate. It is not a production package, a product application, a Blueprint baseline or a completed design-library publication.

## Purpose

v0.10 converges the v0.9 visual foundation into an executable, consumable and reviewable baseline:

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
- DTCG-ish token sources generate primitive, semantic, component and data-visualization layers;
- PrimeIcons are pinned locally and exposed through an audited explorer;
- `projects/nexa-ui` is the real Angular library boundary with an explicit public API;
- Buttons and Progress own focused route features instead of depending on the broad component renderer;
- Blueprint documentation is the normative design-system baseline; this repository is executable evidence.

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
| Engineering | Angular architecture, tokens, APIs, testing, Design Adoption & Handoff |

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
npm run build:library
npm run validate:architecture
npm run validate:tokens
npm run validate:colors
npm run validate:icons
npm run validate:documentation
npm run validate:public-api
npm run validate:visual
npm run validate:contrast
npm test -- --watch=false
npm run test:library -- --watch=false
npm run build:all
npm audit --omit=dev --audit-level=high
git diff --check
```

The Contrast Lab derives ratios from token color values. The required gates are WCAG 2.2: 4.5:1 for normal text, 3:1 for large text and 3:1 for essential non-text UI. The lab also exposes Standard/Increased Contrast, Motion/Reduced Motion and target-overlay review modes.

Browser review covers the required pages and 1440, 1024, 768, 390 and 320px viewports. Manual assistive-technology review remains a human handoff item unless explicitly recorded in the implementation report.

## Angular structure

```text
src/app/
  shell/                 documentation navigation shell
projects/nexa-ui/         reusable candidate library and explicit public API
  lab/                   evaluation, evidence and quality infrastructure
  documentation/         route features, page content and navigation metadata
src/styles/
  _tokens-primitives.scss
  _tokens-semantic.scss
  _tokens-components.scss
  _tokens-data-visualization.scss
  _motion.scss
  _accessibility.scss
tooling/scripts/         token and contrast gates
```

Reusable controls own their public API and native semantics. Documentation specimens own simulation state, galleries and evidence composition. Strict templates and signal-first state are required.

## Documentation

- [Architecture](./docs/architecture.md)
- [Consuming Nexa UI](./docs/consuming-nexa-ui.md)
- [Release validation](./docs/release-validation.md)
- [Design adoption ADR](./docs/adr/0001-blueprint-authority-and-lab-evidence.md)
- [Historical v0.x archive](./docs/archive/v0.x/)

The archive preserves prior reports for provenance. It is not runtime authority and does not override the Blueprint design-system baseline.

## Boundary

Design Lab changes are local to this repository. No production application, API, mobile repository or deployment is modified by this release candidate. The v0.10 branch and prerelease tag are published without merging to `main` or creating a final release. The Blueprint baseline is updated only in its isolated design branch.

Copyright © 2026 Nexa. All rights reserved.
