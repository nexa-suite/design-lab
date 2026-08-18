<div align="center">

<br />

<img src="./public/brand/nexa.svg" alt="Nexa" width="240" />

# Nexa Design Lab

**Internal visual engineering studio for Nexa foundations, screens and workflow evidence.**

![Status](https://img.shields.io/badge/status-experimental-7C3AED?style=flat-square) ![Angular](https://img.shields.io/badge/Angular-22-DD0031?style=flat-square&logo=angular&logoColor=white) ![Material](https://img.shields.io/badge/Angular%20Material-22-757575?style=flat-square&logo=materialdesign&logoColor=white) ![Vitest](https://img.shields.io/badge/Vitest-tests-6E9F18?style=flat-square&logo=vitest&logoColor=white)

[Run](#run) · [Visual foundations](#visual-foundations) · [Reference library](#reference-screen-library) · [Review workflow](#review-workflow)

</div>

---

## Purpose

Design Lab is Nexa's executable visual laboratory. It holds design evidence, component behavior and representative B2B workflow experiments for human review.

Current state: v0.5.0-rc.1 product-quality convergence candidate. Experimental, not production, not canonical Blueprint.

## Design workspace

- Visual foundations: typography, color, spacing, surfaces, shape and motion.
- Accessibility, contrast and responsive behavior experiments.
- Angular Material compatibility comparisons.
- Routed Platform, Buyer Portal and Authentication reference screens using synthetic data.
- Catalog anatomy, Inventory Control and representative Sales Orders views.
- Brand and product assets used only as local design evidence.

## What belongs here

- Inspectable visual experiments.
- Reusable component and screen references.
- Design-system rules awaiting human approval.
- Traceability from visual question to evidence and decision.

## What does not belong here

- Production API, authentication, tenant provisioning or routing contracts.
- Final product semantics or accepted domain decisions.
- Claims that an experiment is production-ready.
- Legacy source copied as implementation authority.

Blueprint becomes durable design specification only after human approval. Production repositories remain authority for shipped behavior.

## Visual foundations

- Brand blue: #2563EB, represented through primitive OKLCH scale.
- Plus Jakarta Sans for display, Inter for operational UI, native/system monospace for identifiers.
- 4px spacing rhythm, restrained 6–16px radii and low-shadow surfaces.
- White/light shell with pale blue canvas.
- Accessible drawer navigation at narrow widths; sidebar is not silently removed.

## Reference Screen Library

<table>
<tr><td width="50%" valign="top"><strong>Foundations and Contrast</strong><br />Typography, spacing, surfaces, motion, icon comparison and WCAG contrast results.</td><td width="50%" valign="top"><strong>Material Compatibility</strong><br />Buttons, fields, select, checkbox, radio, toggle, menu, tooltip and progress.</td></tr>
<tr><td valign="top"><strong>Operational Reference</strong><br />Sales Orders and Inventory Control tables with state, density and overflow contracts.</td><td valign="top"><strong>Product Reference</strong><br />Platform Sales/Logistics, Buyer Portal request flows and Authentication screens.</td></tr>
</table>

## Current stack

| Concern | Technology |
| --- | --- |
| Framework | Angular 22 standalone |
| Components | Angular Material 22 and CDK-compatible patterns |
| Styling | SCSS |
| Tests | Vitest |
| Language | TypeScript 6 |
| Package manager | npm 11.17.0 |
| Experimental dependencies | Google Fonts and PrimeIcons CDN |

No DTCG compiler, token package, Storybook, Tailwind, Nx, dark mode or theme engine is present.

## Run

    npm ci
    npm start -- --host 127.0.0.1 --port 4301

Open http://127.0.0.1:4301/.

## Validation

    npm run build
    npm test -- --watch=false
    npm audit --omit=dev --audit-level=high

Browser review checkpoints: 320px, 768px, 1024px and 1440px.

## Repository structure

    src/                         Angular application
    public/                      Local brand and catalog assets
    IMPLEMENTATION-REPORT-v0.4.md
    TRACEABILITY-v0.4.md
    IMPLEMENTATION-REPORT-v0.5.md
    TRACEABILITY-v0.5.md
    RESEARCH-v0.5.md
    STYLE-GUIDELINES-v0.5.md
    VISUALIZATION-DECISION-v0.5.md
    NORMALIZATION-REPORT-v0.2.md
    package.json
    angular.json

## Review workflow

1. Define visual question and evidence boundary.
2. Build smallest inspectable experiment.
3. Check keyboard, contrast, responsive states and content density.
4. Compare against current Nexa identity and production constraints.
5. Record decision, unresolved question or rejection.
6. Promote only after human approval and production-repository ownership is clear.

## Relationship to products

Design Lab supports Website, Platform, Portal, API documentation and future Mobile decisions. It does not publish product behavior, replace Blueprint authority or alter application source.

## Security and publication boundary

Do not report vulnerabilities through public issues. No standalone Security Policy exists in this checkout. Experiments remain local design evidence until approved; publication does not imply production readiness.

## Legal

Copyright © 2026 Nexa. All rights reserved. No open-source license is selected by this README.

<div align="center"><br />Nexa · Visual decisions made inspectable</div>
