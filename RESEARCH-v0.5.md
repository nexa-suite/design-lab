# Nexa Design Lab v0.5 — External Research Record

Date checked: 2026-08-17. Scope: Design Lab only. External systems inform interaction quality and accessibility; Vue/FLOW and explicit human decisions remain visual authority.

## Sources and adopted principles

| Source                                                                                                | Principle used                                                                        | Nexa application                                                                        |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| [Angular Aria overview](https://angular.dev/guide/aria/overview)                                      | Headless behavior should carry keyboard, ARIA and focus semantics.                    | Action menu uses Angular Aria behavior while Nexa owns its surface.                     |
| [Angular Aria menu](https://angular.dev/guide/aria/menu)                                              | Menus need arrow navigation, disabled states and Escape handling.                     | Shared `NexaActionMenu` uses `Menu`, `MenuItem`, `MenuTrigger` and CDK overlay.         |
| [Angular component styling](https://angular.dev/guide/components/styling)                             | Component styles stay scoped at component boundaries.                                 | Shared contracts keep visual ownership local; no `::ng-deep` or private MDC selectors.  |
| [Angular Material theming](https://v18.material.angular.dev/guide/theming)                            | Use public Sass theming APIs; do not style private component internals.               | Material remains behavior evidence in the bench, not a visual authority.                |
| [Apple sidebars](https://developer.apple.com/design/human-interface-guidelines/sidebars)              | Group peers, keep hierarchy shallow, use familiar symbols and adapt at narrow widths. | Platform shell keeps grouped navigation, rounded active capsule and responsive drawer.  |
| [Apple menus](https://developer.apple.com/design/human-interface-guidelines/menus)                    | Use clear verbs, sensible grouping and short menus.                                   | Action menu labels stay concise and action-oriented.                                    |
| [Apple layout](https://developer.apple.com/design/human-interface-guidelines/layout)                  | Group related content, put essential information first, preserve negative space.      | Reference screens use page header, primary task, context rail and local density.        |
| [GitHub Primer ActionMenu](https://primer.style/product/components/action-menu/)                      | Action lists and overlays are separate interaction concerns.                          | `NexaActionMenu` separates headless menu behavior from Nexa presentation.               |
| [GitHub Primer NavList](https://primer.style/product/components/nav-list)                             | Active navigation needs a semantic current state and grouped items.                   | `RouterLinkActive` plus grouped shell navigation preserve current route semantics.      |
| [Carbon dashboards](https://carbondesignsystem.com/data-visualization/dashboards/)                    | Dashboard hierarchy follows an F-pattern, limits metrics and protects whitespace.     | Analytics opens with control-tower context, three priority KPIs and supporting records. |
| [Carbon data table](https://carbondesignsystem.com/components/data-table/usage/)                      | Tables need toolbar search/filter/sort and must not become spreadsheets.              | Operational table receives local search, status filter, sorting and bounded overflow.   |
| [Carbon progress indicator](https://carbondesignsystem.com/components/progress-indicator/style/)      | Progress states need complete/current/not-started distinction.                        | Manual order and buyer tracking expose explicit step state.                             |
| [Atlassian empty states](https://atlassian.design/foundations/content/designing-messages/empty-state) | Explain why a state is empty and provide the next action.                             | Empty specimens include context and a usable CTA.                                       |
| [Atlassian dynamic table](https://atlassian.design/components/dynamic-table)                          | Table actions should stay discoverable without bloating rows.                         | Toolbar owns filters/actions; rows keep operational facts.                              |

## Explicitly not copied visually

Primer, Apple, Carbon, Atlassian and Material visuals are not copied. Their brand colors, typography, component silhouettes, spacing scales and chart styles do not replace Nexa. Nexa retains Vue/FLOW evidence: the ICISA shell, PrimeIcons, active navigation treatment, white product surfaces, compact operational controls, and real workflow hierarchy.

## Compatibility check

[Angular version compatibility](https://angular.dev/reference/versions) was checked before CI work. Angular 22 supports current Node 22/24 lines listed by Angular. Design Lab remains experimental and does not claim production compatibility.
