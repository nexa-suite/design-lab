# NEXA DESIGN LAB v0.6 — External Research Record

Date checked: 2026-08-17. Scope: Design Lab only. This research informs quality, accessibility and implementation behavior; it does not replace Nexa visual authority.

## Authority boundary

1. Explicit human direction defines Nexa intent.
2. FLOW screenshots and the rendered Vue application define visual evidence.
3. The Vue source defines route, component and token provenance.
4. Apple, NN/G, Google/Material, Android and WCAG inform quality constraints.
5. Angular is the implementation target for this experimental documentation system.

No external source is copied as a visual theme. No production, Legacy or Blueprint repository is changed by this record.

## Primary sources

| Source                                                                                                       | Principle extracted                                                                                                     | Nexa implication                                                                                           | What Nexa does not copy                                                                    |
| ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)           | Hierarchy, clear navigation, legible type, intentional materials and predictable interaction.                           | Keep the operational hierarchy quiet: context, action, state and recovery remain visible.                  | Apple branding, Liquid Glass as a universal surface, iOS-only controls or platform chrome. |
| [Apple Color](https://developer.apple.com/design/human-interface-guidelines/color)                           | Color supports meaning and must not be the only cue.                                                                    | Status combines text, icon, shape or position with semantic color.                                         | Rainbow decoration or arbitrary role colors.                                               |
| [Apple Typography](https://developer.apple.com/design/human-interface-guidelines/typography)                 | Legibility and hierarchy matter more than novelty; avoid thin, unreadable type.                                         | Preserve Plus Jakarta Sans / Inter hierarchy and test identifiers, dense tables and zoom.                  | A new font chosen only because it looks fashionable.                                       |
| [Apple Materials](https://developer.apple.com/design/human-interface-guidelines/materials)                   | Materials establish layers; text-heavy surfaces need restraint.                                                         | White work surfaces, structural borders and limited overlay elevation; auth remains a special composition. | Liquid Glass or translucency in operational content without evidence.                      |
| [Apple Layout](https://developer.apple.com/design/human-interface-guidelines/layout)                         | Group related content, align edges and use negative space intentionally.                                                | Use the 4px rhythm, stable gutters and explicit page/panel relationships.                                  | Apple-specific grid, sidebars or title bars.                                               |
| [Apple Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars)                     | Toolbars expose deliberate actions without overcrowding.                                                                | One primary action, visible context and a restrained action cluster.                                       | Copying macOS toolbar chrome into Nexa screens.                                            |
| [NN/G ten heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)                            | Visibility, real-world match, control, consistency, prevention, recognition, efficiency, minimalism, recovery and help. | Audit each route and component with evidence, impact, severity and remediation.                            | Treating heuristics as a visual moodboard or automatic redesign order.                     |
| [NN/G heuristic evaluation process](https://www.nngroup.com/articles/how-to-conduct-a-heuristic-evaluation/) | Define scope, inspect independently where possible, record evidence and synthesize findings.                            | This file set separates evidence from human design approval and keeps route-level findings.                | Claiming a single code review is user research or certification.                           |
| [NN/G severity rating](https://www.nngroup.com/articles/how-to-rate-the-severity-of-usability-problems/)     | Severity is 0–4 and combines frequency, impact and persistence.                                                         | Every candidate finding uses the same 0–4 scale and explains priority.                                     | Invented percentages or severity without a task/context.                                   |
| [WCAG 2.2](https://www.w3.org/TR/WCAG22/)                                                                    | Contrast, keyboard, reflow, non-text contrast, target size and understandable content are testable criteria.            | Target WCAG 2.2 AA behavior; record manual evidence separately from build health.                          | Calling the Design Lab a WCAG certification.                                               |
| [Angular Aria overview](https://angular.dev/guide/aria/overview)                                             | Headless directives can supply keyboard, ARIA and focus behavior while styling remains custom.                          | Use native semantics first, Angular Aria/CDK for complex patterns and Nexa tokens for presentation.        | A Material skin as the Nexa design system.                                                 |
| [Angular lazy routes](https://angular.dev/best-practices/performance/lazy-loaded-routes)                     | Eager component routes enter the initial bundle; lazy components create route chunks.                                   | Documentation and reference screens use loadComponent; initial bundle is measured.                         | Lazy loading as proof of visual quality.                                                   |
| [Material interaction states](https://m3.material.io/foundations/interaction/states/overview)                | Enabled, hover, focus, pressed, dragged and disabled states need consistent indicators.                                 | State matrices are part of every component contract.                                                       | Material shape, color or typography as a default Nexa look.                                |
| [Android accessibility principles](https://developer.android.com/guide/topics/ui/accessibility/apps.html)    | Labels, contrast, 48dp touch targets and non-color cues support diverse input.                                          | Validate names, target area, contrast and modality at responsive checkpoints.                              | Android-specific navigation or density assumptions.                                        |

## Research decisions

- Keep the visual chain human direction → FLOW → Vue render/source → Angular reference.
- Keep operational dashboards white and quiet; auth may retain its distinct blue composition.
- Use the existing Vue/PrimeIcons language and approximately 8px active navigation geometry.
- Prefer semantic tokens and native controls. Behavior primitives may come from Angular Aria/CDK.
- Do not add dependencies, a dark theme, a Figma file or a production contract in v0.6.

## Open questions for human audit

- Confirm final font licensing/hosting before any product implementation.
- Confirm exact contrast ratios for every production color pair and real content.
- Confirm whether portal and auth require separate approved token modes.
- Confirm Figma naming and ownership before library publication.

Status: CANDIDATE. Human review required.
