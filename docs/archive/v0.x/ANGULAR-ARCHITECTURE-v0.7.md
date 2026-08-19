# Nexa Design Lab v0.7 — Angular Architecture

## Boundary

This repository is a design-system laboratory. Documentation composition and reusable candidate controls are intentionally separate from production application contracts.

## Feature-oriented route areas

```text
guidelines/
  overview, principles, maturity
  foundations/*
  components/*
  patterns/*
  quality/*
  engineering/*
shell/
shared/
```

Routes are standalone and lazy-loaded. RC2 aliases redirect to active guideline pages without reviving retired runtime screens.

## Component responsibilities

- `NexaTextField`, `NexaToggle`, `NexaSegmentedControl`, `NexaNumericStepper`, `NexaRangeSlider`, `NexaStateSequence`, `NexaSurface` and related contracts expose one semantic concept each.
- Native HTML owns input, button, checkbox, radio, range, select and progress semantics where sufficient.
- Documentation pages own galleries, scenario state and fake data used solely to make a design question inspectable.
- `NexaStateSequence` is a documentation evidence primitive; its Play/Next/Reset controls do not become production async APIs.
- There is no universal Field, Box or God Documentation component.

## State and APIs

- Angular signals and `model()` provide local, typed state.
- Inputs describe domain meaning; outputs/model changes describe user-facing interaction.
- Computed state is derived rather than duplicated.
- Disabled, read-only, loading and error behavior remain explicit.
- The shared contrast utility is pure and deterministic.

## Styling and tokens

SCSS is layered primitive → semantic → component. Mode aliases support Standard and Increased Contrast. Motion and focus behavior are tokenized. The token gate rejects unknown references, duplicate declarations outside mode overrides and cycles. Hardcoded visual values outside the token foundation require review.

## Strictness and performance

- TypeScript and Angular template checking remain strict.
- Standalone imports are explicit.
- Initial shell and documentation pages remain lazy-loadable.
- Small shared components prevent duplicate page-level controls.
- No new runtime dependency or animation library is introduced by v0.7.

## Validation architecture

- `app.spec.ts` covers route rendering, aliases and representative search/menu/toggle interactions.
- `contrast.spec.ts` covers deterministic color parsing and thresholds.
- `validate-design-tokens.mjs` checks the token graph independently of Angular.
- Build validation catches strict template and TypeScript regressions.

The design lab is prepared for future Angular component harnesses. Harness publication and production package extraction remain deferred until human review.
