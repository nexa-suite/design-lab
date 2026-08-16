<div align="center">

<img src="https://raw.githubusercontent.com/nexa-suite/api/develop/docs/assets/nexa.svg" alt="Nexa" width="220" />

# Nexa Design Lab

**Visual engineering studio for Nexa foundations, components and workflow evidence.**

[![Status](https://img.shields.io/badge/status-experimental-7C3AED?style=flat-square)](https://github.com/nexa-suite/design-lab) [![Angular 22](https://img.shields.io/badge/Angular-22-DD0031?style=flat-square&logo=angular&logoColor=white)](https://angular.dev/) [![Material 22](https://img.shields.io/badge/Material-22-757575?style=flat-square&logo=materialdesign&logoColor=white)](https://material.angular.dev/)

[Run](#run) · [Foundations](#foundations) · [Review workflow](#review-workflow)

</div>

---

## Purpose

Design Lab is Nexa's executable visual laboratory. It holds design evidence, component behavior and representative B2B workflow experiments for human review.

Current state: v0.4 Legacy visual parity candidate plus routed reference screen library. Experimental, not production, not canonical Blueprint.

## What belongs here

- Visual foundations: typography, color, spacing, surfaces, shape and motion.
- Accessibility and contrast experiments.
- Angular Material compatibility comparisons.
- Routed Platform, Buyer Portal and Authentication reference screens using synthetic data.
- Catalog anatomy, Inventory Control and representative Sales Orders views.
- Prototypes that make design decisions inspectable.

## What does not belong here

- Production API, authentication, tenant provisioning or routing contracts.
- Final product semantics or accepted domain decisions.
- Claims that an experiment is production-ready.
- Legacy source copied as implementation authority.

Blueprint becomes durable design specification only after human approval. Production repositories remain authority for shipped behavior.

## Design language

- Brand blue: #2563EB, represented through primitive OKLCH scale.
- Plus Jakarta Sans for display, Inter for operational UI, native/system monospace for identifiers.
- 4px spacing rhythm, restrained 6–16px radii and low-shadow surfaces.
- White/light shell with pale blue canvas.
- Accessible drawer navigation at narrow widths; sidebar is not silently removed.

## Review surfaces

<table>
<tr><td><strong>Foundations</strong><br />Typography, spacing, surfaces, motion and icon comparison.</td><td><strong>Contrast Lab</strong><br />Foreground/background ratios and WCAG results.</td></tr>
<tr><td><strong>Material Compatibility</strong><br />Buttons, fields, select, checkbox, radio, toggle, menu, tooltip and progress.</td><td><strong>Operational Reference</strong><br />Sales Orders and Inventory Control tables with state and overflow contracts.</td></tr>
<tr><td colspan="2"><strong>Reference Screen Library</strong><br />Platform Sales/Logistics, Buyer Portal request flows and Authentication screens.</td></tr>
</table>

## Current stack

Angular 22 standalone application, Angular Material 22, CDK-compatible patterns, SCSS, Vitest and TypeScript 6. No DTCG compiler, token package, Storybook, Tailwind, Nx, dark mode or theme engine is present.

External Google Fonts and PrimeIcons CDN are experimental dependencies, not final production strategy.

## Run

    npm ci
    npm start -- --host 127.0.0.1 --port 4301

Open http://127.0.0.1:4301/.

## Validate

    npm run build
    npm test -- --watch=false
    npm audit --omit=dev --audit-level=high

Browser review checkpoints: 320px, 768px, 1024px and 1440px.

## Repository structure

    src/                 Angular application
    public/              Static assets
    IMPLEMENTATION-REPORT-v0.4.md
    TRACEABILITY-v0.4.md
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

## Security

Do not report vulnerabilities through public issues. Follow the repository security channel when available. No security policy file was found in this local checkout; add or confirm one before public publication.

## Legal

Copyright © 2026 Nexa. All rights reserved. No open-source license is selected by this README.

<div align="center"><br />Nexa · Visual decisions made inspectable</div>
