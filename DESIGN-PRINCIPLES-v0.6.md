# NEXA DESIGN LAB v0.6 — Design Principles

Status: CANDIDATE. These principles guide the Design Lab and are not approved production policy.

## The principles

| #   | Principle                             | Rule                                                                                                             | Evidence / check                                                                                |
| --- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| 01  | Operational before ornamental         | Every surface earns its space by helping a user review, choose, validate, move or recover.                       | Dashboard panels and manual-order phases have a named task; remove decoration that has no task. |
| 02  | Domain language is interface language | Sales, Buyer Portal, request, order, dispatch, document and inventory remain distinct terms.                     | Route labels and reference screens preserve Vue vocabulary; no generic ecommerce substitutions. |
| 03  | State must be truthful                | Text, icon, color and affordance agree about selected, pending, blocked, loading and complete.                   | Status matrix includes non-color cues and a recovery action when needed.                        |
| 04  | Quiet hierarchy, deliberate density   | White work surfaces, structural borders and spacing create scan paths without card soup.                         | Use the 4px rhythm, panel hierarchy and stable gutters before adding a new container.           |
| 05  | Human visual voice                    | Nexa remains recognisable through blue, slate, PrimeIcons, type hierarchy, active rows and workflow composition. | FLOW/Vue evidence must precede a new visual language.                                           |
| 06  | Accessibility by construction         | Semantics, keyboard, focus, contrast, reflow, target size and reduced motion belong in the component contract.   | Component page records behavior, accessibility and manual evidence separately.                  |
| 07  | Evidence before abstraction           | A rule becomes reusable only when the reason, source, route and implementation owner are visible.                | Every inventory row has provenance and status; unsupported rules remain open questions.         |
| 08  | Smallest useful language              | Use one primary action, one clear status vocabulary and one sensible surface role before introducing variants.   | Reject fake metrics, generic bento grids, rainbow roles and ornamental tags.                    |
| 09  | Preserve the task across widths       | Responsive composition changes layout, not meaning, labels or recovery.                                          | Check 1440px, 1024px, 768px, 390px and 320px/400% zoom.                                         |

## Decision test

Before adding a component, ask:

1. What user task does it make easier?
2. Which Vue/FLOW or human decision supports its shape, color and density?
3. What are its default, focus, disabled, loading, error and recovery states?
4. What happens with keyboard, touch, zoom and assistive technology?
5. Which semantic tokens and Angular behavior owner implement it?
6. What would make the component unnecessary?

If these questions cannot be answered, the proposal stays EXPERIMENTAL and does not enter the shared contract.

## Explicit anti-pattern boundary

The following are not Nexa defaults: universal gradients, pure-white dashboard canvases that erase hierarchy, rainbow coloring, drop shadow on everything, three feature cards as a marketing template, emojis, em dashes as interface decoration, generic bento grids, terminal-window framing, fake testimonials, unnecessary metrics/tags, skeleton loaders by default, three pricing tiers, or invented legal/product copy.

Auth is an evidence-backed exception for its blue composition. Special treatment must stay scoped to auth.

## Promotion

CANDIDATE → EXPERIMENTAL → HUMAN REVIEW → APPROVED is a design decision path. Code cannot perform the final approval.
