<div align="center">

<img src="./public/brand/nexa.svg" alt="Nexa" width="240" />

# Nexa Design Lab

**Executable design-system evidence, separate from production Product implementation.**

![Angular](https://img.shields.io/badge/Angular-22.1.2-DD0031?style=flat-square&logo=angular&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-3178C6?style=flat-square&logo=typescript&logoColor=white) ![Design evidence](https://img.shields.io/badge/design-evidence-64748B?style=flat-square) ![Latest Git tag](https://img.shields.io/github/v/tag/nexa-suite/design-lab?sort=semver&style=flat-square&label=latest%20Git%20tag)

[Run](#run) · [Route map](#route-map) · [Quality evidence](#quality-evidence) · [Architecture boundary](#architecture-boundary)

</div>

Visual evidence laboratory for Nexa foundations, reusable components, interaction states and accessibility review.

The repository tag identifies a Git baseline, while the package version remains independently declared in `package.json`. The lab is executable design evidence, not a production Product application, Domain contract or accessibility certification.

## Nexa Product Ecosystem

<table>
<tr>
<td><strong><a href="https://github.com/nexa-suite/mobile-report">Mobile Report</a></strong><br>Academic and product research evidence.</td>
<td><strong><a href="https://github.com/nexa-suite/mobile">Mobile</a></strong><br>Accepted mobile projections and implementation workspace.</td>
</tr>
<tr>
<td><strong><a href="https://github.com/nexa-suite/api">API</a></strong><br>Shared backend and domain integration surface.</td>
<td><strong><a href="https://github.com/nexa-suite/website">Website</a></strong><br>Public acquisition and product context.</td>
</tr>
<tr>
<td><strong><a href="https://github.com/nexa-suite/portal">Buyer Portal</a></strong><br>Buyer-facing web experience.</td>
<td><strong><a href="https://github.com/nexa-suite/platform">Platform</a></strong><br>Operations and platform web experience.</td>
</tr>
</table>

## Purpose

v1.0.0 establishes an executable, consumable and reviewable design-system baseline:

- every important rule has a rendered specimen;
- states can be seen, triggered, compared and reset;
- color and contrast use a shared deterministic gate;
- accessibility modes expose focus, target, resize and motion behavior;
- component maturity separates human-frozen direction from open exploration;
- canonical supplied logo assets, semantic status emphasis and reusable Action Menu / Tooltip behavior are rendered;
- Async Operations, Authentication, Legal Content, Payments, Analytics, Dispatch Board and Data-Dense Operations are candidate patterns;
- Increased Contrast, Reduced Motion and an explicit 400% reflow evaluation mode are root-level functional evaluation modes.
- reusable candidates live under `design-system`, while Lab-only evidence lives under `lab`;
- Authentication, Analytics and Dispatch Board own focused documentation features and explicit lazy routes;
- StateSequence playback has configurable phase timing, terminal states and explicit recovery;
- architecture, token and contrast gates protect the source structure and geometry contracts.
- the generated token reference feeds documentation and contrast evidence from the same canonical JSON source;
- DTCG-ish token sources generate primitive, semantic, component and data-visualization layers;
- PrimeIcons are pinned locally and exposed through an audited explorer;
- the icon explorer exposes render, role, size, alignment, label policy, semantic color and hit-target evidence;
- `projects/nexa-ui` is the real Angular library boundary with an explicit public API;
- Buttons and Progress own focused route features instead of depending on the broad component renderer;
- repository validation tooling is authored as TypeScript and executed with Node's native type stripping; no JavaScript-like tooling source is versioned in this repository;
- Blueprint documentation is the normative design-system baseline; this repository is executable evidence.

The active lab contains documentation pages and composition specimens only. Product patterns remain design evidence; they do not define accepted domain behavior or production contracts.

## Run

    npm ci
    npm start -- --host 127.0.0.1 --port 4301

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

## Frozen design direction

- Light appearance is canonical.
- The current sidebar geometry, grouping, search, active row and mobile drawer behavior remain frozen.
- The current text-field geometry remains frozen and is now reusable through `NexaTextField`.
- Plus Jakarta Sans, Inter and JetBrains/system mono remain the candidate type families.
- PrimeIcons remain the candidate icon system.
- White structural surfaces sit on a cool light canvas; elevation is restrained and purposeful.
- Rounded geometry is semantic: controls, cards, panels and compact status do not share one universal radius.
- The supplied logo assets are the canonical rendered logo sources; the wordmark is never redrawn in CSS or text.
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
npm run validate:package
npm run validate:browser
npm run audit:visual
npm test -- --watch=false
npm run test:library -- --watch=false
npm run build:all
npm audit --omit=dev --audit-level=high
git diff --check
```

The Contrast Lab derives ratios from token color values. The required gates are WCAG 2.2: 4.5:1 for normal text, 3:1 for large text and 3:1 for essential non-text UI. The lab also exposes Standard/Increased Contrast, Motion/Reduced Motion and target-overlay review modes.

The browser gate covers every registered page at 1440, 1024, 768, 390 and 320px, plus representative state and recovery interactions. Screenshot capture remains an optional review artifact; the committed contract records route, viewport, state and source SHA without generated images. Manual visual judgment and assistive-technology review remain human handoff items.

## Nexa Engineering & Documentation

<table>
<tr>
<td><strong><a href="https://github.com/nexa-suite/blueprint">Blueprint</a></strong><br>Canonical architecture and decision records.</td>
<td><strong><a href="https://github.com/nexa-suite/web-report">Web Report</a></strong><br>Structured report and documentation workspace.</td>
</tr>
<tr>
<td><strong><a href="https://github.com/nexa-suite/complementary">Complementary</a></strong><br>Supporting research and reproducible utilities.</td>
<td><strong><a href="https://github.com/nexa-suite/design-lab">Design Lab</a></strong><br>Executable design-system evidence.</td>
</tr>
</table>

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

## Architecture boundary

Design Lab changes are local to this repository. No production application, API, mobile repository or deployment is modified by the lab. Blueprint remains normative for design-system governance, while product patterns remain non-production evidence.

Copyright © 2026 Nexa. All rights reserved.
