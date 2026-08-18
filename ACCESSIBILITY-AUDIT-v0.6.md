# NEXA DESIGN LAB v0.6 — Accessibility Audit

Status: CANDIDATE. WCAG 2.2 AA is the target for design and implementation review; this document is not a certification.

## Audit matrix

| Area                | Target / rule                                                                            | Evidence inspected                                         | Status                                                    |
| ------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------- |
| Landmarks           | One main content region, navigation labels and dialog semantics.                         | App, Design Lab shell and mobile drawer templates.         | Implemented candidate; manual screen-reader check pending |
| Heading hierarchy   | One page H1; section headings express content structure.                                 | Documentation page header and section templates.           | Implemented candidate                                     |
| Skip links          | Keyboard users can bypass repeated shell navigation.                                     | App and documentation skip links.                          | Implemented candidate                                     |
| Keyboard navigation | All links, buttons, fields and disclosures are reachable and operable.                   | Native controls, route links, group buttons and search.    | Candidate; tab-order audit pending                        |
| Focus visibility    | Focus ring remains visible and is not removed without replacement.                       | Shell, search, button, field and reference focus styles.   | Implemented candidate; contrast check pending             |
| Focus restoration   | Drawer returns focus to invoking control after close.                                    | Design Lab shell mobile drawer.                            | Implemented candidate; browser proof pending              |
| Escape / dismissal  | Escape closes the mobile drawer; overlays need the same owner contract.                  | Shell host listener and overlay documentation.             | Partial; route-specific overlay tests pending             |
| Accessible names    | Icon-only controls have labels; decorative icons are hidden.                             | Search clear, menu, drawer close and specimen icons.       | Implemented candidate; AT check pending                   |
| Color contrast      | Normal text 4.5:1, large text 3:1, non-text 3:1 target per WCAG 2.2.                     | Semantic token pairs and specimen surfaces.                | Candidate; automated/manual contrast matrix pending       |
| Non-color cues      | Status uses text/icons/shape/position in addition to color.                              | Status, badge, active row and quality guidance.            | Documented candidate                                      |
| Target size         | Aim for at least 24px WCAG target; use 44–48px where product touch guidance requires it. | Shell buttons, drawer close, fields and reference actions. | Candidate; measured viewport audit pending                |
| Forms and errors    | Labels, help, required/error relationships and preserved input.                          | Text-field, form and authentication contracts.             | Documented candidate; runtime error exercise pending      |
| Reflow and zoom     | Content reflows at 320 CSS px / 400% without loss of task.                               | Responsive shell/page CSS and responsive contract.         | Candidate; browser proof pending                          |
| Motion              | Reduced-motion preference removes decorative interpolation.                              | Documentation/page and shell transitions.                  | Implemented candidate; browser preference check pending   |

## Source criteria

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) provides the conformance criteria and contrast/reflow requirements.
- [Angular Aria](https://angular.dev/guide/aria/overview) is available for headless behavior where native elements are insufficient.
- [Android accessibility principles](https://developer.android.com/guide/topics/ui/accessibility/apps.html) reinforces labels, contrast, target area and non-color cues across input modalities.

## Manual evidence still required

1. Keyboard-only pass at 1440px and 390px.
2. VoiceOver or equivalent screen-reader pass for shell, search, active route, forms and references.
3. Contrast calculation from rendered colors, not token names alone.
4. 320px / 400% zoom screenshots with no clipped primary action.
5. Reduced-motion browser capture.
6. Touch target measurement for actual production components.

Build success and unit tests do not close these manual gates.
