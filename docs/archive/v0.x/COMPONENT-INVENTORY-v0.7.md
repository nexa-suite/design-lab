# Nexa Design Lab v0.7 — Component Inventory

This inventory maps the 20 active component pages to their visible evidence and reusable Angular contract. `CANDIDATE` means reviewable evidence, not production certification. `FROZEN` means the visual direction should not be casually changed.

| Component | Maturity | Variants / sizes | Visible states | Interactive specimen | Accessibility / test evidence |
| --- | --- | --- | --- | --- | --- |
| Buttons | CANDIDATE | primary, secondary, quiet, danger; standard, compact, full width | rest, hover, focus, pressed, disabled, processing, success, error | live playground + state gallery + operation sequence | native button, `aria-busy`, route and interaction tests |
| Text Fields | FROZEN | text, password, required, leading/trailing action | rest, focus, filled, error, read-only, disabled | live field + forced state gallery | native input, label/help/error association, route tests |
| Search Fields | CANDIDATE | search, clear, result context | typing, searching, results, empty, error, retry | query updates result state | native search input, live status, interaction test |
| Select & Combobox | CANDIDATE | native select, combobox comparison, action menu comparison | closed, focused, open, selected, disabled | side-by-side role comparison | native-first guidance; route specimen |
| Checkbox | CANDIDATE | checked, indeterminate, disabled | unchecked, checked, indeterminate, focus, disabled | native checkbox group | native input and label; route specimen |
| Radio | CANDIDATE | named group, selected/disabled option | unselected, selected, focus, disabled | fieldset group | legend and same-name native inputs; route specimen |
| Toggle / Switch | CANDIDATE | standard, labelled on/off | on, off, focus, disabled | native checkbox with switch role | keyboard/click model test |
| Segmented Control | CANDIDATE | compact, standard; disabled option | rest, selected, focus, disabled | `aria-pressed` model group | button semantics; route specimen |
| Status & Badges | CANDIDATE | workflow, availability, priority, temperature | neutral, success, warning, danger, info | tone gallery | icon + label + semantic tone; route specimen |
| Alerts & Feedback | CANDIDATE | info, success, warning, error, recovery | visible outcome and recovery | live feedback examples | region/alert guidance; route specimen |
| Menus & Action Menus | CANDIDATE | commands, destructive group | closed, open, focus, Escape, selected | open/close command menu | menu semantics and keyboard evidence; interaction test |
| Tooltips | CANDIDATE | hover/focus help | hidden, visible, dismissed | trigger specimen | visible guidance remains primary; route specimen |
| Dialogs & Overlays | CANDIDATE | confirmation, focused decision | closed, open, focus, Escape, recovery | open/close dialog specimen | labelled dialog contract; route specimen |
| Cards & Surfaces | CANDIDATE | surface, card, panel, raised, selected | rest, selected, disabled/read-only | surface anatomy examples | distinct responsibilities; route specimen |
| Lists & Tables | CANDIDATE | dense/comfortable, filter/sort | data, empty, loading, error, overflow | filterable table specimen | semantic table, scoped headers, local scroll |
| Progress Indicators | CANDIDATE | determinate, indeterminate, skeleton | idle, active, complete, reduced motion | progress comparison | progress semantics + text equivalent; route specimen |
| Workflow Steps | CANDIDATE | current, complete, upcoming | current, complete, upcoming | typed phase sequence | list/step semantics; separate from quantity control |
| Numeric Stepper | CANDIDATE | min/max/step, compact | value, min, max, disabled | bounded increment/decrement control | labelled buttons, clamping; shared component contract |
| Slider | CANDIDATE | min/max/step/unit | min, middle, max, focus, disabled | native range with live output | labelled range and visible value; shared contract |
| Navigation & Sidebars | FROZEN | desktop rail, mobile drawer, grouped disclosure | active, focus, expanded, collapsed | search, route, drawer and disclosure | `aria-current`, focus restoration, route tests |

## Evidence key

- **Live playground**: the user can change a real value or trigger a real state.
- **State gallery**: the state is rendered without relying on prose alone.
- **Operation sequence**: the user can Play, Next, Pause and Reset a deterministic sequence; there is no autoplay.
- **Route test**: the page renders through the active lazy route.
- **Shared component contract**: reusable controls are independently typed and signal-first.

The inventory is a design-lab coverage map. It does not imply a published component package.
