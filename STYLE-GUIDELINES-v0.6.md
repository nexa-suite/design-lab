# NEXA DESIGN LAB v0.6 — Complete Style Guidelines

Status: CANDIDATE. Human design approval is required. This document is the current Design Lab candidate reference; it is not Blueprint authority or a production component library.

## 1. Scope and authority

The visual order is human direction → FLOW → rendered Vue → Vue source → Angular Design Lab implementation. Legacy source is read-only evidence. External Apple, NN/G, Google/Material, Android and WCAG guidance informs quality without replacing Nexa identity.

## 2. Visual voice

Nexa is operational clarity with a human visual voice:

- Blue is the anchor, not a decorative gradient.
- White work surfaces and cool light canvases create hierarchy.
- Slate text carries calm density; status hues have semantic jobs.
- PrimeIcons are quiet and subordinate to labels.
- Large spacing coexists with compact rows and explicit action hierarchy.
- The Platform sidebar, Buyer Portal horizontal shell and Auth split shell are separate compositions.
- Product media belongs on an evidence-backed white surface; do not force dashboard canvas treatments onto product imagery.

## 3. Tokens

### Color

| Token role          | Candidate value                             | Use                                             |
| ------------------- | ------------------------------------------- | ----------------------------------------------- |
| Primary blue 50–900 | OKLCH scale, blue 600 approximately #2563EB | Action, active route, focus and links           |
| Slate 50–950        | #F8FAFC → #0F172A                           | Canvas, borders, text and structural separation |
| Success             | green 50 / 700                              | Completed, available, healthy                   |
| Attention           | amber 50 / 800 and orange 500               | Awaiting review or operational priority         |
| Danger              | red 50 / 800                                | Blocked, invalid, destructive                   |
| Cold refrigerated   | sky 50 / 600–800                            | Refrigerated classification only                |
| Cold frozen         | indigo 50 / 600                             | Frozen classification only                      |

Use semantic variables from src/styles/_tokens-semantic.scss. A new literal color requires a documented role and contrast evidence.

### Typography

| Role        | Family                | Candidate size/line-height/weight        |
| ----------- | --------------------- | ---------------------------------------- |
| Display     | Plus Jakarta Sans     | 48/52, 760; exceptional orientation only |
| Large title | Plus Jakarta Sans     | 32/38, 760                               |
| Title       | Plus Jakarta Sans     | 24/30, 700                               |
| Heading     | Plus Jakarta Sans     | 18/24, 700                               |
| Subheading  | Inter                 | 16/24, 600                               |
| Body        | Inter                 | 14/21, 400                               |
| Callout     | Inter                 | 15/24, 500                               |
| Label       | Inter                 | 12/16, 600                               |
| Caption     | Inter                 | 11/16, 500                               |
| Code        | JetBrains/system mono | 12/18, 500                               |

Do not use thin text for critical UI. Keep native headings and labels; placeholder is not a label.

### Spacing and layout

Primitive rhythm: 4px. Common applications: 4, 8, 12, 16, 20, 24, 28, 32, 40, 48 and 64px.

- Page gutters: 16–40px by viewport.
- Platform sidebar: 240–284px evidence range.
- Topbar: 56–60px evidence range.
- Active navigation row: 40px minimum, 8px radius, 3px inset/left blue cue.
- Cards/panels: 12–16px radius and explicit internal padding.
- Use grid/flex with minmax and local overflow for data.
- Preserve edge alignment and gutters before reducing type.

### Shape and surfaces

| Semantic role       |  Radius | Surface / elevation                                      |
| ------------------- | ------: | -------------------------------------------------------- |
| Small control / nav |   6–8px | White or selected pale blue; structural border as needed |
| Control             |  8–10px | White, interactive border, focus ring                    |
| Card                | 12–16px | White, border; shadow optional only when raised          |
| Overlay             | 16–18px | White, menu/overlay shadow, scrim when modal             |
| Pill                |   999px | Compact status/badge only                                |

The revoked rule is a universal 18px navigation capsule. No shadow on everything. No universal gradient. Auth is a scoped exception backed by FLOW.

## 4. Component contract

Every reusable component documents:

1. What it is and the task it serves.
2. When to use and when not to use.
3. Anatomy, variants, sizes and properties.
4. Default, hover, pressed, focus-visible, disabled, loading, selected, error, warning, success, empty and read-only states as applicable.
5. Content and domain vocabulary.
6. Keyboard, focus, screen-reader name, contrast and target-area behavior.
7. Responsive and input-modality behavior.
8. Primitive, semantic and component token dependencies.
9. Angular behavior owner and real Nexa usage.
10. Vue/FLOW provenance, Figma mapping, open questions and status.

## 5. Component rules

- Buttons: native button, explicit type, one primary action, visible label, truthful loading and disabled state.
- Text/search fields: visible label, helper/error relationship, clear behavior, preserved input and search result status.
- Select/combo: native select baseline; custom overlay only when vocabulary size or search requires it.
- Checkbox/radio/toggle: native semantics; do not use a toggle for deferred multi-step submission.
- Status/badges: text first; color plus icon/shape/position; separate workflow, priority and temperature meanings.
- Alerts/feedback: inline for affected content; alert/status roles only at the correct urgency.
- Menus/overlays: route secondary actions separately from navigation; Escape, focus ownership and return are explicit.
- Tooltips: supplemental only; never hold required labels, errors or recovery.
- Lists/tables: preserve comparison, headings, captions and local horizontal overflow.
- Progress/steppers: show phase and permission to move; do not invent business completion.
- Navigation/sidebars: grouped, route-aware, white Platform shell, 8px active row and mobile drawer.
- Cards/panels: boundary for related content, not a wrapper for every paragraph.

## 6. Patterns

The default workflow is orient → choose → act → verify → recover.

- Forms: context, groups, labels, validation, review and safe commit.
- Search/filtering: query, applied state, result/empty state and clear.
- Manual order: client → catalog → conditions → delivery → review.
- Dashboard: page context → action banner → workload/status → operational panels → next actions.
- States: empty, loading, error, success and read-only each explain what happened and what happens next.
- Authentication: workspace, email, password, recovery and register in the scoped split composition.
- Responsive: preserve meaning and actions across desktop, tablet and mobile.

## 7. Quality gates

- WCAG 2.2 AA target; manual review required.
- NN/G H1–H10 audit with severity 0–4.
- Keyboard and focus pass.
- Contrast and non-color cue pass.
- 320px/400% reflow pass.
- Reduced-motion pass.
- Matched Vue/FLOW/Angular comparison where parity is claimed.
- Build, unit tests, audit and browser evidence reported separately.

## 8. Angular implementation

Use standalone components, native semantics, lazy documentation/reference routes, signals for local shell state, RouterLink for navigation and semantic CSS custom properties. Use Angular Aria/CDK for behavior that native elements cannot provide; keep visual presentation in Nexa tokens. Do not introduce Material-default visuals, new dependencies or production contracts in this lab release.

## 9. Figma handoff status

Figma mapping is prepared as a textual contract in FIGMA-HANDOFF-v0.6.md. No Figma file or published library exists yet.
