# Nexa Design Lab v0.7 — Style Guidelines

## Status

Candidate design-system guidance for human review. Light appearance is canonical. The rules below describe the active laboratory direction and are demonstrated by rendered Angular specimens.

## Design stance

Nexa is an operational B2B system for cold-chain work. Visual decisions should make the next correct action, current state, consequence and recovery path easy to understand. Restraint is part of the identity: use hierarchy, spacing and semantic color before decoration.

The evidence loop is:

```text
Human decision → frozen foundation → external quality guidance → Angular implementation → human review
```

External guidance informs quality thresholds. It does not define Nexa's visual identity.

## Foundations

### Color

- Nexa blue is the primary identity scale, from 50 to 950.
- Slate neutrals carry text, borders, canvas and grouping.
- Success, warning, danger, operational, refrigerated and frozen families are semantic support families.
- A hue never carries a critical state alone. Pair color with text, icon, shape, position or an explicit status attribute.
- Light is the only canonical appearance in this release. Increased Contrast is an evaluation mode.
- Primitive values feed semantic roles; semantic roles feed component state tokens.

### Typography

- Plus Jakarta Sans carries display and heading hierarchy.
- Inter carries operational UI, labels and body copy.
- JetBrains Mono or the system monospace stack carries IDs, values and token names.
- Type roles specify family, size, weight, leading and tracking together.
- Resize evidence must remain readable at 200% and reflow at 400%; do not solve density by clipping text.

### Layout and spacing

- Use a 4px primitive rhythm; common applications are 8, 12, 16, 24, 32 and 48px.
- Establish page padding, section gaps and control padding explicitly.
- Prefer CSS grid and flex with intrinsic sizing and `minmax()`.
- A table or contrast matrix may scroll locally when its semantics require it. The page itself must not overflow horizontally.
- Responsive behavior is a contract: inspect 1440, 1024, 768, 390 and 320px.

### Shape and surfaces

- `radius-control` belongs to controls and toolbar groups; `radius-card` bounds an object; `radius-panel` groups a working region.
- Full pills are reserved for compact status cues. Do not make every object pill-shaped.
- White structural surfaces sit on a cool light canvas.
- Borders separate; shadows establish only meaningful elevation such as a menu, dialog or raised object.
- Card, Panel and Surface have different responsibilities. There is no universal visual Box.

### Iconography

PrimeIcons remain the candidate icon system. Icons support labels, state and navigation; they do not replace accessible names. Decorative icons are hidden from assistive technology. Icon-only controls must expose a name and a visible target.

### Motion

Motion must explain a state change: trigger, property, duration, easing and fallback are documented. Short feedback transitions are allowed; continuous decorative animation is not. Reduced Motion removes non-essential movement while preserving state and context.

## Component evidence contract

Each component page should show:

1. purpose and anatomy;
2. a live default specimen;
3. variants and sizes with a real control where applicable;
4. a state gallery containing visible geometry;
5. an operation sequence with Play, Next and Reset;
6. accessibility evidence and token ownership;
7. maturity, open questions and test coverage.

Simulation controls belong to documentation specimens. They do not leak into reusable component APIs.

## State language

The common state vocabulary is Rest, Hover, Focus-visible, Pressed, Selected, Processing, Disabled, Read-only, Empty, Loading, Progress, Success, Warning and Error. The same state must be communicated through semantic attributes and at least one visible non-color cue where meaning matters.

Loading strategy follows knowledge of the work:

- determinate progress when completion is measurable;
- indeterminate progress when work is active but duration is unknown;
- skeleton only when content geometry is known and the placeholder reduces uncertainty;
- empty, error and retry when no content or recovery is the real state.

## Accessibility baseline

- Native HTML semantics first.
- Every control has a usable accessible name, visible focus, keyboard operation and a touch target appropriate to the task.
- Normal text targets 4.5:1; large text targets 3:1; essential non-text UI targets 3:1.
- Focus is visible against the actual component geometry.
- Color is supplemented by text, icon, pattern, shape or state attributes.
- Standard and Increased Contrast modes use token overrides, not opacity hacks or a separate dark theme.
- Reduced Motion preserves the result without decorative movement.

## Review rule

If a rule cannot be seen, triggered or measured in the lab, it is not ready for promotion. This candidate is prepared for human design and accessibility review; it is not a certification or production-readiness claim.
