# NEXA DESIGN LAB v0.2

Normalized Design Foundation. Experimental. Not production. Not canonical Blueprint.

Design Lab is executable design evidence for reviewing Nexa visual foundations, component behavior and representative B2B workflows. It preserves valuable historical visual DNA while removing obsolete terminology, accidental semantic coupling and inaccessible defaults.

## Scope

- `v0.1`: reconstructed visual baseline and legacy provenance.
- `v0.2`: normalized design foundation candidate.
- Angular 22 standalone application with Angular Material 22, CDK-compatible patterns and SCSS.
- Sales Dashboard, Contrast Lab, OKLCH blue scale, Material compatibility bench, catalog anatomy and Sales Orders table.
- No production API, authentication, tenant provisioning, routing contract or business operation.

Design Lab does not independently define Product semantics. Blueprint becomes durable design specification only after human approval. Production repositories remain implementation authority for shipped behavior.

## Run

```bash
npm ci
npm start -- --host 127.0.0.1 --port 4301
```

Open `http://127.0.0.1:4301/`.

## Validate

```bash
npm run build
npm test -- --watch=false
npm audit --omit=dev --audit-level=high
```

Browser review checkpoints: `320px`, `768px`, `1024px`, `1440px`.

## Foundations

- Brand blue remains `#2563EB` and is represented in primitive OKLCH scale.
- Semantic roles separate brand action, workflow status, Sales responsibility and cold-chain classification.
- Plus Jakarta Sans is display type; Inter is operational UI text; JetBrains Mono is selective identifier type.
- 4px spacing rhythm; restrained 6–16px radii; low-shadow surfaces.
- White/light shell and pale blue page canvas preserve Nexa character.
- Mobile uses an accessible navigation drawer; sidebar is never silently removed without replacement.

## Review surfaces

- Foundations: typography, spacing, surfaces, shape, motion and icon comparison.
- Contrast Lab: active foreground/background pairs with ratio, AA result and known failures.
- Angular Material Compatibility: buttons, fields, select, checkbox, radio, toggle, menu, tooltip and progress.
- Operational reference: semantic Sales Orders table with overflow strategy and loading/error/empty guidance.
- Reference catalog: white media surface, scan-path contract and safe seed-shaped data.

## Boundaries

- This repository is separate from Blueprint, Platform, Portal, Website and API.
- Legacy Vue/FLOW material is provenance/evidence only; no screenshots are embedded.
- PrimeIcons remains a human-review candidate. Material Icons are exercised for comparison, not silently adopted.
- No DTCG compiler, token package, Storybook, Tailwind, Nx, dark mode or theme engine.
- External Google Fonts and PrimeIcons CDN are documented experimental dependencies, not final production strategy.

## Source and research

Historical visual evidence informed the v0.1 baseline. v0.2 decisions follow current official Angular, Angular Material, Sass, W3C WCAG, CSS Color, ARIA APG and Design Tokens references listed in `NORMALIZATION-REPORT-v0.2.md`.
