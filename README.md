# Nexa Design Lab v0.7

Visual evidence laboratory for Nexa foundations, reusable components, interaction states and accessibility review.

`0.7.0-rc.1` is an Angular-only design-system candidate. It is not a production package, a product application, a Blueprint baseline or a completed Figma library.

## Purpose

v0.7 changes the lab from description-first documentation to evidence-first review:

- every important rule has a rendered specimen;
- states can be seen, triggered, compared and reset;
- color and contrast use a shared deterministic gate;
- accessibility modes expose focus, target, resize and motion behavior;
- component maturity separates human-frozen direction from open exploration.

The active lab contains documentation pages and composition specimens only. Authentication remains available under `Patterns / Authentication` as a design-system composition specimen.

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
| Foundations | Color, typography, layout, shape, surfaces, iconography, motion |
| Components | Buttons, text fields, search, choice controls, status, feedback, menus, overlays, data, progress, workflow, quantity, navigation |
| Patterns | Forms, search/filtering, async operations, empty/loading/error, authentication, responsive behavior |
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

## Quality evidence

```bash
npm run build
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
  guidelines/            focused route/page composition features
  shared/                reusable candidate controls and deterministic utilities
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

- [Style guidelines](./STYLE-GUIDELINES-v0.7.md)
- [Component inventory](./COMPONENT-INVENTORY-v0.7.md)
- [Component maturity](./COMPONENT-MATURITY-v0.7.md)
- [Accessibility evidence](./ACCESSIBILITY-EVIDENCE-v0.7.md)
- [Contrast audit](./CONTRAST-AUDIT-v0.7.md)
- [Angular architecture](./ANGULAR-ARCHITECTURE-v0.7.md)
- [Figma handoff](./FIGMA-HANDOFF-v0.7.md)
- [Freeze](./FREEZE-v0.7.md)
- [Implementation report](./IMPLEMENTATION-REPORT-v0.7.md)

The v0.7 documents supersede earlier candidate notes for the active lab. Historical notes remain in Git for provenance and are not runtime authority.

## Boundary

Design Lab changes are local to this repository. No production application, API, Blueprint, mobile repository or deployment is modified by this release candidate. No push, tag or final release is part of v0.7.

Copyright © 2026 Nexa. All rights reserved.
