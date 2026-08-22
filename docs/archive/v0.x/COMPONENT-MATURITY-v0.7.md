# Nexa Design Lab v0.7 — Component Maturity

## Maturity vocabulary

| Status | Meaning | Promotion evidence |
| --- | --- | --- |
| EXPERIMENTAL | Exploring a question; direction or API may change | visible hypothesis and open question |
| CANDIDATE | Reviewable visual and interaction contract | live specimen, state evidence, API and focused validation |
| FROZEN | Human-approved direction for the current lab | visual change requires an explicit decision |
| DEPRECATED | Do not use for new work | replacement route or component is identified |

Maturity is documentation metadata. It is not a runtime feature flag, a production certification or an accessibility conformance claim.

## Current v0.7 set

### FROZEN

- Design Lab sidebar: current width behavior, grouping, search, active row, pale selected surface, blue leading cue, disclosure behavior and mobile drawer.
- Text Field: current border, radius, padding, focus geometry, typography relationship and label relationship.
- Typography families: Plus Jakarta Sans, Inter and JetBrains/system mono.
- Light appearance and primary blue identity.
- PrimeIcons as the current candidate icon system.

### CANDIDATE

Buttons, Search Fields, Select/Combobox comparison, Checkbox, Radio, Toggle, Segmented Control, Status, Alerts, Menus, Tooltips, Dialogs, Cards/Surfaces, Lists/Tables, Progress, Workflow Steps, Numeric Stepper and Slider have route specimens, state evidence and reusable contracts at different interaction depths.

### EXPERIMENTAL

The evaluation controls, increased-contrast mode, target overlay, visual state gallery composition and State Sequence are lab infrastructure. Their evidence is useful for review; their production API is intentionally not promoted.

### DEPRECATED

The prior screen-library runtime and its route/shell/components are retired from the active application. Git history remains the recovery boundary.

## Promotion checklist

Before a candidate can become a production-owned component, human reviewers should confirm:

1. purpose and semantic boundary;
2. variants and state completeness;
3. keyboard, focus, target, reflow and reduced-motion behavior;
4. token ownership and mechanically evaluated contrast;
5. API independence from documentation simulation;
6. user-facing tests and browser evidence;
7. Figma approval and production repository ownership.

No v0.7 page performs that human promotion decision.
