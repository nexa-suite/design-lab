# NEXA DESIGN LAB v0.6 — Figma Handoff Contract

Status: CANDIDATE. This is a future reconstruction map; no Figma file, component library or design approval was created.

## Variable collections

| Collection | Variables                                                                                                   | Modes / note                                                       |
| ---------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Primitives | blue 50–950, slate 50–950, semantic hue seeds, 4px spacing, 6/8/12/16px radii, shadow seeds, font families. | Light baseline; values trace to Vue tokens and Angular primitives. |
| Semantic   | action, text, border, canvas, surface, selected, status, temperature, focus, scrim.                         | Light candidate; high-contrast mode is an open question.           |
| Component  | control radius, active-nav radius, panel padding, field height, icon size, focus ring, menu shadow.         | Component properties consume semantic variables.                   |

## Component property map

| Figma component | Properties / variants                             | States                                            | Token dependencies                     |
| --------------- | ------------------------------------------------- | ------------------------------------------------- | -------------------------------------- |
| Button          | intent, size, icon, fullWidth, type               | default, hover, pressed, focus, disabled, loading | action, text, radius-control, focus    |
| Text Field      | label, help, error, required, readOnly, inputMode | default, focus, filled, error, disabled           | border, text, surface, focus           |
| Status Badge    | semantic, label, icon/dot, temperature, priority  | default, muted, selected                          | semantic status/temperature, pill      |
| Navigation Item | group, label, icon, badge, active                 | default, hover, focus, active, disabled           | radius-nav-active, selected, action    |
| Panel           | title, subtitle, action, density, divider, state  | default, empty, loading, error                    | surface, border, radius-card           |
| Dialog / Drawer | modal, size, placement, title, close              | open, closing, focus-owned                        | overlay, scrim, radius-overlay, shadow |
| Table           | columns, density, selectable, sortable, rowAction | default, empty, loading, selected                 | border, text, status                   |
| Stepper         | steps, current, completed, orientation            | default, active, complete, blocked                | action, border, text                   |

## Auto Layout rules

- Page: vertical stack, 4px-derived gaps, responsive outer gutter.
- Shell: fixed desktop sidebar plus flexible content; mobile drawer replaces persistence.
- Panel: header row with title/subtitle and action; divider only when it clarifies.
- Row: label/value/status/action aligned to stable columns.
- Form: label → control → help/error with a predictable vertical rhythm.
- Data: preserve column comparison; allow local scroll before hiding meaning.

## Handoff checklist

- Name component and property with domain meaning.
- Link every variable to primitive/semantic owner.
- Show all required states, including focus-visible and error/recovery.
- Mark evidence source: FLOW filename, Vue route/source, Angular route.
- Record open questions instead of inventing a variant.
- Human designer confirms geometry, naming and library ownership before publication.
