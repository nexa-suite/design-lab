# NEXA DESIGN LAB v0.6 — Design-System Inventory

Status: CANDIDATE / RC2. Inventory means documented and traceable; it does not mean approved or production-complete.

RC2 extraction: the former documentation-page monolith is split into shell, foundation, component and context concepts. Each major component route now has a component-specific interactive specimen; generic fallback specimens are rejected.

## Information architecture

The documentation shell has one visible navigation level of groups and one level of pages. No page is more than two clicks from the shell.

| Group             |          Pages | Route family                                                  |
| ----------------- | -------------: | ------------------------------------------------------------- |
| START HERE        |              2 | /guidelines/overview, /guidelines/principles                  |
| FOUNDATIONS       |              7 | /guidelines/foundations/*                                     |
| COMPONENTS        |             14 | /guidelines/components/*                                      |
| PATTERNS          |              7 | /guidelines/patterns/*                                        |
| QUALITY           |              3 | /guidelines/quality/*                                         |
| ENGINEERING       |              4 | /guidelines/engineering/*                                     |
| REFERENCE SCREENS | 3 entry points | /reference/platform/_, /reference/portal/_, /reference/auth/* |

The sidebar search filters documentation by label, title, group, kind and keywords. Reference screens remain a separate evidence library.

## Foundation inventory

| Area        | Documented contract                                                                               | Current owner                                                        |
| ----------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Color       | Brand blue, slate, semantic outcome, role and temperature families; contrast and non-color rules. | src/styles/_tokens-primitives.scss, src/styles/_tokens-semantic.scss |
| Typography  | Plus Jakarta Sans display, Inter UI, JetBrains/system mono identifiers; 10 roles.                 | Global styles and documentation specimen                             |
| Materials   | Canvas, white work surface, grouped, selected, raised, menu, dialog and scrim.                    | Semantic surface tokens                                              |
| Layout      | 4px primitives, explicit gutters, grid/flex, local data overflow.                                 | Component styles and guideline contract                              |
| Shape       | 6/8/12/16/18px semantic roles; pill only for compact status.                                      | Semantic radius tokens                                               |
| Iconography | Observed PrimeIcons, quiet 15–20px optical alignment, accessible names for icon-only actions.     | Reference shells and component specimens                             |
| Motion      | 140–250ms cause/state transitions and reduced-motion fallback.                                    | Component contracts; runtime review pending                          |

## Component inventory

Every component page answers: what, when, when not, anatomy, variants, sizes, states, behavior, content, keyboard, accessibility, responsive behavior, tokens, Angular owner, real Nexa usage, do/don’t, provenance, status and Figma mapping.

Buttons · Text Fields · Search Fields · Select & Combo Box · Checkbox/Radio/Toggle · Status & Badges · Alerts & Feedback · Menus & Action Menus · Tooltips · Dialogs & Overlays · Lists & Tables · Progress & Steppers · Navigation & Sidebars · Cards & Panels.

## Pattern inventory

Forms · Search & Filtering · Workflows & Wizards · Dashboards & Analytics · Empty/Loading/Error · Authentication · Responsive Composition.

## Quality and engineering inventory

- Accessibility: WCAG 2.2 AA target, manual evidence pending.
- Nielsen: H1–H10 with NN/G severity 0–4.
- Input modality: pointer, keyboard, touch and assistive technology.
- Angular compatibility: native semantics, Angular Aria, CDK Overlay and lazy routes.
- Tokens: primitive → semantic → component → Figma mapping.
- Coverage: component, route, state, a11y, Angular owner, real usage and status.

## Status taxonomy

| Status           | Meaning                                                                |
| ---------------- | ---------------------------------------------------------------------- |
| CANDIDATE        | Documented proposal grounded in evidence; human review required.       |
| EXPERIMENTAL     | Deliberate exploration with a known open question or limited evidence. |
| LEGACY REFERENCE | Visual/source evidence retained for comparison, not a current rule.    |
| DEPRECATED       | Historical or revoked rule; do not extend.                             |

## Out of scope

No production application implementation, API contract, backend domain decision, Blueprint publication, Figma library publication, final font licensing decision or dark-mode approval belongs to this inventory.
