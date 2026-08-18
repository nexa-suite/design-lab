# NEXA DESIGN LAB v0.8 — POLISH & SEMANTIC DEPTH REPORT

## SCM recovery

- Recovered the exact v0.7 local baseline at `f1e9531f0b39206dc7660eab1203c481df4da48b`.
- Published `design/v0.7-visual-evidence-component-maturity` and annotated tag `v0.7.0-rc.1` as a GitHub prerelease before v0.8 work.
- Implemented v0.8 on `design/v0.8-polish-semantic-depth`.
- The v0.8 branch and `v0.8.0-rc.1` tag are published only after the validation gates pass; no merge to `main` is part of this milestone.

## Frozen designs preserved

- Preserved the v0.7 sidebar grouping, active-row geometry, PrimeIcons, text-field direction, light appearance, blue/slate foundation, typography candidates, spacing rhythm, radius vocabulary and Action Menu direction.
- FLOW remains local ignored evidence. It is not runtime input, tracked source or a published artifact.
- No legacy reference screen, production application or Blueprint baseline was modified.

## Logo system

- Added the supplied `logo-nexa/logo-nexa.svg` and `logo-nexa/Documento.svg` assets as the canonical tracked logo evidence.
- Added `NexaLogo` with primary/inverse, alternative text and decorative behavior.
- Replaced the shell's text approximation with the real canonical asset; no logo redraw or fabricated variant was introduced.

## Global polish

- Added semantic warning and danger tone/emphasis tokens and separated tone from emphasis.
- Normalized section separators, vertical rhythm, intrinsic Grid/Flex layout, logical properties and local overflow boundaries.
- Kept raw color literals in primitive/token definitions or approved contrast contracts only.
- Preserved white structural surfaces and deferred dark mode.

## Focus

- Focus rings now belong to actual controls, including native checkbox inputs and reusable composite controls.
- Keyboard paths cover native controls, Action Menu navigation, Tooltip dismissal and recovery actions.
- The focus treatment follows a visible, control-owned ring contract rather than a documentation wrapper effect.

## Checkbox

- Added rendered unchecked, checked, indeterminate, focus-visible, disabled unchecked and disabled checked evidence.
- Kept the native input as the semantic owner and added visible non-color state cues.

## Action Menu

- Added a reusable typed Action Menu with disabled and destructive commands, separators, Arrow/Home/End navigation, Escape, outside close and focus restoration.
- Added compact, grouped, long-list and viewport-safe specimens with internal scrolling at narrow widths.
- Preserved command semantics; it is not a Select or Segmented Control replacement.

## Tooltip

- Added a reusable tooltip contract with hover/focus entry, truthful `aria-describedby`, pointer-gap persistence and Escape dismissal.
- Kept the trigger as a named native button and bounded the overlay for narrow viewports.

## Semantic states

- Expanded Status evidence to cover operational, support, warning, danger, loading, disabled, read-only and emphasis variants.
- Warning and danger now expose subtle, standard and strong visual levels with mechanically checked inverse pairs.
- Labels, icons, shape and adjacent copy remain available so meaning does not depend on color alone.

## Async operations

- Added deterministic happy, warning/cancel and failure/retry sequences.
- Each sequence keeps current state, consequence and next action adjacent; reduced motion changes activity behavior without hiding the resulting state.

## Evaluation modes

- Increased Contrast changes root semantic text, border and focus values.
- Reduced Motion changes transition and spinner tokens and collapses non-essential animation.
- Text scale changes rendered documentation text at 100%, 150% and 200% without JavaScript layout calculation.
- Target Overlay exposes hit-area review at the root evaluation boundary.

## Authentication

- Added a restrained branded authentication composition using the canonical inverse logo, workspace selection, localized EN/ES labels, validation, authenticating and success states.
- Kept the specimen SaaS-neutral and excluded organization registration, provisioning and backend authentication behavior.

## Legal Content

- Added semantic long-form document structure with local anchors, metadata, related navigation, print behavior and synthetic placeholder copy.
- Added an explicit formal approval marker; no Nexa legal policy was authored.

## Payments

- Added synthetic masked payment data plus empty, loading and unavailable states.
- Separated user-safe failure copy from development diagnostics and excluded provider SDKs, payment contracts and financial behavior.

## Analytics

- Added a question-first visual grammar: question, lightweight visual, text summary, accessible table alternative and no-data state.
- Kept the composition dependency-free and generic; no production analytics contract was invented.

## Dispatch

- Added candidate board columns and card states with selection and Action Menu command paths.
- Drag-and-drop is not required for access. Accepted transitions, permissions and domain ownership remain unresolved design decisions.

## Nielsen evidence

- Added ten inline visual proof specimens, one for each Nielsen heuristic, using the same reusable candidate controls.
- Evidence remains a review aid, not a claim that a product audit or usability certification was completed.

## Angular architecture

- Kept the Angular 22 standalone, strict, lazy-route structure with focused feature components, signals, computed state, native semantics and OnPush-compatible shared controls.
- Added focused `NexaLogo`, `NexaActionMenu`, `NexaTooltip` and pattern components instead of extending the documentation page into a mega component.
- No `::ng-deep`, `!important`, private MDC selectors, invented REST endpoints or forced production states were added.
- The implementation follows Angular's standalone/component guidance and keeps interaction ownership in the control; see the [Angular style guide](https://angular.dev/style-guide) and [Angular component guide](https://angular.dev/guide/components).

## Validation

- `npm ci`: passed.
- `npm run build`: passed.
- `npm test -- --watch=false`: passed with 4 test files and 20 tests.
- `npm run validate:tokens`: passed with 213 declarations, 129 references and no unknowns, duplicates or cycles.
- `npm run validate:contrast`: passed with 14 approved pairs.
- `npm audit --omit=dev --audit-level=high`: passed with 0 vulnerabilities.
- `git diff --check`: passed.
- Browser QA covered Brand / Logo, Checkbox, Menus, Tooltips, Async Operations, Authentication, Legal Content, Payments, Analytics, Dispatch Board, Data-Dense Operations, Heuristics and Accessibility Lab.
- Responsive checks covered 1440, 1024, 768, 390 and 320px; the narrow long menu used internal scrolling without global overflow. Console QA recorded zero errors and zero warnings.
- Focus and contrast decisions use the WCAG focus-appearance baseline for later human review: [WCAG 2.2 Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html).

## Deferred

- Dark mode, additional themes, Figma library publication, production package extraction, provider integrations, domain transitions, accessibility certification, full manual assistive-technology review and merge to `main`.

## Human review candidates

- Principal design owner: confirm logo placement, semantic tone/emphasis, section rhythm, surface elevation and candidate pattern composition.
- Accessibility reviewer: run keyboard, screen-reader, 200%/400% reflow, target-size and reduced-motion review on the changed-page set.
- Product/domain owners: decide accepted Authentication, Payments, Analytics, Dispatch and Data-Dense Operations contracts before any production extraction.
