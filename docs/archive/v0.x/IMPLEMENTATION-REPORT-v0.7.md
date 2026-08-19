# NEXA DESIGN LAB v0.7 — VISUAL EVIDENCE & COMPONENT MATURITY REPORT

## Baseline

- Previous local branch: `design/v0.6-interaction-engineering-freeze`.
- Previous SHA: `69d67addeadb6431825b5329e3a85fa31417b80e` (`docs(readme): use local design lab branding`).
- Remote relationship: local RC2 baseline was one commit ahead of `origin/design/v0.6-design-documentation-system` at `c6d0191f489ab03058bc32fd0781cdd84821fbfa`; RC2 was not pushed.
- New branch: `design/v0.7-visual-evidence-component-maturity`.
- Final implementation SHA: `b118e201ed27912c5ace659ef390eccd003cf78a`.
- Package: `nexa-design-lab@0.7.0-rc.1`.

## Retired systems

- Reference Screens, screen-library navigation, routes, shells, dead components and screen-only data imports were removed from the active Angular runtime.
- Legacy parity and FLOW parity were removed from the active documentation/runtime direction.
- External visual-parity and provenance fields were removed from the active documentation model.
- Authentication survives as `/guidelines/patterns/authentication`, a composition specimen using reusable candidate controls.
- Retired binary brand/catalog assets were moved out of the repository into a temporary quarantine directory; laboratory brand assets remain.

## Frozen decisions

- Sidebar: current width behavior, hierarchy, groups, search, PrimeIcons, active row, pale selected surface, blue leading cue, disclosure and mobile drawer are preserved.
- Text Field: current geometry, padding, radius, label relationship and focus treatment remain the candidate direction; focused border is an approved contrast contract.
- Typography: Plus Jakarta Sans, Inter and JetBrains/system mono remain the candidate families.
- Appearance: light is canonical; Increased Contrast is an evaluation mode.
- Primary foundations: blue identity, slate neutrals, semantic support families, white structural surfaces and restrained elevation.

## Design architecture

- Lazy standalone routes: Start Here, Foundations, Components, Patterns, Quality and Engineering.
- 46 active documentation routes render through the focused documentation page and feature templates.
- Shared controls are separated from documentation specimens: Text Field, Button, Toggle, Segmented Control, Numeric Stepper, Slider, Surface and State Sequence.
- Specimen state is local, typed and signal-first. No universal Box/Field or documentation God component was added.
- Grouped navigation paths are generated from the same registry metadata as the lazy route structure.

## Color

- Blue primitive scale: 50–950, surfaced as semantic roles.
- Neutral ramp: slate 50–900 for canvas, surfaces, borders, metadata and text.
- Support families: success, attention, danger, operational, refrigerated and frozen.
- Semantic mappings are tokenized primitive → semantic → component state; hue is paired with text, icon, shape or status attributes.

## Contrast

- Approved pairs: 12.
- Passed: 12.
- Failed: 0.
- Method: relative luminance and WCAG 2.2 ratio calculated from actual hex/RGB/OKLCH values.
- Gates: normal text 4.5:1, large text 3:1, essential non-text 3:1.
- Automation: `npm run validate:contrast` imports the same approved contracts and fails on any failed pair; focused parser/threshold tests remain in `contrast.spec.ts`.

## Typography

- Ten-role visual matrix shows family, pixel size, weight, leading, tracking and usage beside rendered specimens.
- Primary, secondary and tertiary text roles are shown on actual surfaces with contrast evidence.
- Resize controls expose 100%, 150% and 200% evaluation states; 400% reflow remains a manual review handoff.

## Component maturity

- 20 component pages are active.
- Frozen: Sidebar and Text Field direction.
- Candidate: Buttons, Search Fields, Select/Combobox, Checkbox, Radio, Toggle, Segmented Control, Status, Alerts, Menus, Tooltips, Dialogs, Cards/Surfaces, Lists/Tables, Progress, Workflow Steps, Numeric Stepper and Slider.
- Experimental: evaluation modes, State Gallery composition and State Sequence documentation infrastructure.
- Every component page includes purpose/anatomy, live or rendered state evidence, contract guidance, maturity and operation sequence where applicable.

## Process evidence

- Async action sequence: Ready → Pressed → Processing → Success.
- Search sequence: query → searching → results/empty/error → retry.
- Operation sequence: reusable Play/Pause, Next state and Reset controls; no autoplay.
- Workflow sequence: typed Client → Products → Delivery → Review phases, separate from Numeric Stepper quantity control.

## States

Rendered evidence covers empty, loading, determinate progress, indeterminate progress, skeleton, success, warning, error, read-only, disabled, selected, focused and processing. Loading strategies are shown according to whether duration and content geometry are known.

## Accessibility Lab

- Focus gallery, keyboard/native semantics, target overlay, non-color cues and visible names/roles.
- Standard/Increased Contrast and Motion/Reduced Motion controls are reversible.
- Text scale evidence: 100%, 150%, 200%; responsive review includes 400% reflow guidance.
- No certification claim. Manual screen-reader and assistive-technology review remains human-owned.

## Angular architecture

- Feature-oriented standalone lazy routes with strict templates.
- Native-first controls; Angular Aria/CDK remains reserved for composite behavior.
- `input()`, `model()`, `signal()` and `computed()` keep APIs semantic and local.
- Shared controls expose independent APIs; specimen simulation does not leak into them.
- Removed dead screen-library architecture and corrected registry-generated grouped links.

## Tests

- Focused component tests: Button loading, Text Field model/description, Toggle, Segmented Control, Numeric Stepper bounds, Slider model and State Sequence reset/advance.
- Interaction tests: route rendering, aliases, search, menu and toggle.
- Route tests: grouped foundations/components/quality/engineering pages and 12 contrast cards.
- Token tests: 196 declarations, 113 references, no unknowns, duplicates or cycles.
- Contrast tests: known WCAG ratio, RGB/OKLCH parsing, non-text threshold and 12-contract gate.
- Result: 3 test files, 13 tests passed.

## Performance

- Initial raw bundle: 307.75 kB; estimated transfer 73.68 kB.
- Lazy documentation chunk: 211.15 kB raw / 35.48 kB estimated transfer.
- Lazy shell chunk: 18.77 kB raw / 4.14 kB estimated transfer.
- Build completed without Angular warnings.

## Browser QA

- All 46 active routes rendered with an `h1`, one shell and no page overflow at the 1200px sweep.
- 65 representative page/viewport checks passed across 1440, 1024, 768, 390 and 320px.
- 35 route interaction checks passed; evaluation modes, authentication validation, component states and Accessibility Lab controls were manually exercised through Playwright.
- Console result: 0 errors and 0 warnings.
- Evidence captures are local under ignored `output/playwright/`.

## Open design decisions

- Candidate component promotion remains a human decision.
- Manual accessibility review and assistive-technology evidence remain open.
- Dark mode is deferred.
- Figma library publication is deferred.
- Production component package extraction is deferred.
- Mobile-native system and production repository adoption are out of scope.

## SCM HANDOFF

- Branch: `design/v0.7-visual-evidence-component-maturity`.
- Commits: `b118e201ed27912c5ace659ef390eccd003cf78a` — `feat(design-system): add v0.7 visual evidence lab`.
- Push state: not pushed.
- RC proposal: `0.7.0-rc.1`; no tag or release created.
- No final release.

Design Lab only. No production application repositories, Blueprint baseline or external product repository was modified.
