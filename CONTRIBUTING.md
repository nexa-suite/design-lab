# Contributing to Nexa Design Lab

Nexa Design Lab is executable design-system evidence. Keep normative decisions in the Blueprint and keep this repository focused on rendered behavior, component contracts, quality evidence and consumable Angular library code.

## Before changing code

- Read `docs/architecture.md` and the relevant Blueprint design baseline.
- Preserve the frozen visual foundation: Nexa logo, blue/slate identity, typography hierarchy, light surfaces, sidebar, Text Field, Action Menu and keycap language.
- Prefer feature ownership. Keep related `.ts`, `.html`, `.scss` and `.spec.ts` files together.
- Reusable components belong under `projects/nexa-ui/src/lib`; Lab-only evidence belongs under `src/app/lab`; documentation compositions belong under `src/app/documentation`.
- Use tokens for reusable design decisions. Do not add raw UI colors or one-off geometry values without a documented role.

## Validation

```bash
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

Browser, responsive, reduced-motion, increased-contrast and assistive-technology checks remain explicit evidence gates. Do not claim human review from deterministic commands.

## Public API rule

Consumers import from `nexa-ui` only. Documentation renderers and Lab utilities are intentionally not exported. A new reusable candidate needs a colocated test, an explicit public export, token rationale and documentation evidence before adoption.
