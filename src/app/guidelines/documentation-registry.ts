export type DocumentationKind =
  | 'overview'
  | 'principles'
  | 'foundation'
  | 'component'
  | 'pattern'
  | 'quality'
  | 'engineering';

export type DocumentationStatus = 'FROZEN' | 'CANDIDATE' | 'EXPERIMENTAL' | 'DEPRECATED';

export interface DocumentationPage {
  readonly id: string;
  readonly path: string;
  readonly label: string;
  readonly icon: string;
  readonly group: string;
  readonly kind: DocumentationKind;
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
  readonly summary: string;
  readonly status: DocumentationStatus;
  readonly keywords: readonly string[];
  readonly decision: string;
  readonly foundation: string;
  readonly angularContract: string;
  readonly figmaMapping: string;
}

export interface DocumentationGroup {
  readonly label: string;
  readonly items: readonly DocumentationPage[];
}

interface PageInput {
  readonly id: string;
  readonly path?: string;
  readonly label: string;
  readonly icon: string;
  readonly group: string;
  readonly kind: DocumentationKind;
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
  readonly summary: string;
  readonly keywords: readonly string[];
  readonly decision: string;
  readonly foundation: string;
  readonly angularContract: string;
  readonly figmaMapping: string;
  readonly status?: DocumentationStatus;
}

const SECTION_ROUTE_PREFIX: Readonly<Record<string, string>> = {
  FOUNDATIONS: 'foundations',
  COMPONENTS: 'components',
  PATTERNS: 'patterns',
  QUALITY: 'quality',
  ENGINEERING: 'engineering',
};

const page = (input: PageInput): DocumentationPage => ({
  ...input,
  path: input.path ?? (SECTION_ROUTE_PREFIX[input.group] ? `${SECTION_ROUTE_PREFIX[input.group]}/${input.id}` : input.id),
  status: input.status ?? 'CANDIDATE',
});

const foundations = (items: readonly PageInput[]): DocumentationGroup => ({
  label: 'FOUNDATIONS',
  items: items.map((item) => page(item)),
});

const components = (items: readonly PageInput[]): DocumentationGroup => ({
  label: 'COMPONENTS',
  items: items.map((item) => page(item)),
});

export const DOCUMENTATION_GROUPS: readonly DocumentationGroup[] = [
  {
    label: 'START HERE',
    items: [
      page({
        id: 'overview', label: 'Overview', icon: 'pi-th-large', group: 'START HERE', kind: 'overview',
        eyebrow: '00 / START HERE', title: 'A visual Nexa design system laboratory',
        intro: 'Live specimens, state transitions and quality evidence make each design decision inspectable.',
        summary: 'Navigate from frozen foundations to candidate components, patterns and quality gates.',
        keywords: ['design system', 'documentation', 'visual evidence', 'v0.7'],
        decision: 'v0.7 changes documentation from description-first to visual evidence-first.',
        foundation: 'Cool light canvas, white structural surfaces, controlled Nexa blue and slate hierarchy.',
        angularContract: 'Standalone lazy routes, strict templates and signal-first specimens.',
        figmaMapping: 'Page anatomy maps to Overview, Anatomy, Variants, States and Quality sections.',
      }),
      page({
        id: 'principles', label: 'Principles', icon: 'pi-compass', group: 'START HERE', kind: 'principles',
        eyebrow: '01 / PRINCIPLES', title: 'Operational clarity with a human visual voice',
        intro: 'Nexa visual decisions protect domain meaning, hierarchy and trust before styling begins.',
        summary: 'Use the smallest language that helps people make the next correct cold-chain decision.',
        keywords: ['principles', 'clarity', 'hierarchy', 'trust'],
        decision: 'Context, action, status and recovery remain visible together.',
        foundation: 'Quiet borders, deliberate padding, restrained elevation and readable state cues.',
        angularContract: 'Encode principles as semantic tokens, native semantics and interaction tests.',
        figmaMapping: 'Principle cards become reusable review criteria, not production components.',
      }),
      page({
        id: 'maturity', label: 'Maturity / Freeze', icon: 'pi-bookmark', group: 'START HERE', kind: 'overview',
        eyebrow: '02 / MATURITY', title: 'A visible boundary between frozen direction and exploration',
        intro: 'Maturity tells reviewers what should stay stable, what can evolve and what is intentionally deferred.',
        summary: 'Frozen is human direction, not production certification.',
        keywords: ['maturity', 'freeze', 'candidate', 'experimental', 'deferred'],
        decision: 'Sidebar, text field language, typography families, blue identity and light appearance are frozen.',
        foundation: 'Component candidates prove behavior before any production package is approved.',
        angularContract: 'Each candidate owns a focused API, tests user behavior and stays independently reusable.',
        figmaMapping: 'Maturity maps to library status and open review questions; no library is published here.',
        status: 'FROZEN',
      }),
    ],
  },
  foundations([
    { id: 'color', label: 'Color', icon: 'pi-palette', group: 'FOUNDATIONS', kind: 'foundation', eyebrow: 'F1 / COLOR', title: 'Color communicates responsibility and state', intro: 'Blue anchors Nexa. Supporting families carry semantic work and remain measurable in the Contrast Lab.', summary: 'Every important color rule has a swatch, pairing and non-color cue.', keywords: ['color', 'blue', 'neutral', 'semantic', 'contrast'], decision: 'Light is canonical; increased contrast is an evaluation mode, not a second theme.', foundation: 'Primitive scales feed semantic roles, then component states.', angularContract: 'Token values are mechanically evaluated by the contrast utility and gate.', figmaMapping: 'Primitive variables, semantic aliases and contrast-mode values are named for later mapping.' },
    { id: 'typography', label: 'Typography', icon: 'pi-align-left', group: 'FOUNDATIONS', kind: 'foundation', eyebrow: 'F2 / TYPOGRAPHY', title: 'Type carries operational hierarchy', intro: 'Live specimens show primary, secondary and tertiary text at actual role sizes, weights and line heights.', summary: 'Plus Jakarta Sans, Inter and system mono remain the frozen candidate families.', keywords: ['typography', 'type scale', 'resize', 'contrast'], decision: 'Keep Plus Jakarta Sans, Inter and JetBrains/system mono; do not reopen family selection.', foundation: 'Display hierarchy uses Plus Jakarta Sans; dense UI uses Inter; identifiers use mono.', angularContract: 'Native headings, labels and text roles remain strict and resize-safe.', figmaMapping: 'Ten type roles map to text styles with family, size, weight, leading and usage.' },
    { id: 'layout-spacing', label: 'Layout & Spacing', icon: 'pi-arrows-alt', group: 'FOUNDATIONS', kind: 'foundation', eyebrow: 'F3 / LAYOUT', title: 'A 4px rhythm makes density deliberate', intro: 'Padding, gutters, alignment and responsive reflow are shown as measurable layout evidence.', summary: 'Use intrinsic grid and flex layout before shrinking content.', keywords: ['layout', 'spacing', 'padding', 'responsive', 'reflow'], decision: 'A small spacing scale protects alignment across documentation and specimens.', foundation: '4px primitives become 8, 12, 16, 24, 32 and 48px applications.', angularContract: 'CSS grid/flex with minmax; wide matrices scroll locally when semantics require it.', figmaMapping: 'Auto Layout contracts cover page stack, toolbar, panel, row and responsive gutter.' },
    { id: 'shape-radius', label: 'Shape & Radius', icon: 'pi-stop-circle', group: 'FOUNDATIONS', kind: 'foundation', eyebrow: 'F4 / SHAPE', title: 'Soft geometry without pill everything', intro: 'Radii are shown by responsibility: controls, cards, panels, overlays and compact status.', summary: 'Radius expresses hierarchy, not decoration.', keywords: ['shape', 'radius', 'card', 'control'], decision: 'Subtle rounded rectangles are canonical; full pills stay limited to compact status.', foundation: 'Semantic radii alias primitive values and remain consistent across states.', angularContract: 'Components own meaningful geometry; documentation wrappers do not leak APIs.', figmaMapping: 'Radius variables map to component properties and layout surfaces.' },
    { id: 'surfaces', label: 'Surfaces', icon: 'pi-stop', group: 'FOUNDATIONS', kind: 'foundation', eyebrow: 'F5 / SURFACES', title: 'Surfaces create a calm operational plane', intro: 'Canvas, primary, grouped, selected, raised and overlay planes are rendered with explicit responsibility.', summary: 'White structural surfaces sit on a cool canvas; elevation stays meaningful.', keywords: ['surfaces', 'canvas', 'card', 'panel', 'overlay'], decision: 'Surface, Card and Panel are distinct concepts; no universal Box abstraction.', foundation: 'Surface tokens define plane; component borders, padding and radius define object grouping.', angularContract: 'NexaSurface is small and composable; docs primitives remain docs-only.', figmaMapping: 'Surface roles map to fills, borders, radius and elevation variables.' },
    { id: 'iconography', label: 'Iconography', icon: 'pi-compass', group: 'FOUNDATIONS', kind: 'foundation', eyebrow: 'F6 / ICONOGRAPHY', title: 'Icons support labels and state', intro: 'PrimeIcons remain quiet, aligned and purposeful across navigation, actions and status evidence.', summary: 'Icon weight never competes with operational content.', keywords: ['icons', 'PrimeIcons', 'alignment', 'accessible name'], decision: 'Keep PrimeIcons as current candidate icon system.', foundation: '16–20px line icons, label relationships, state colors and non-color cues.', angularContract: 'Decorative icons are hidden; icon-only actions expose names and target geometry.', figmaMapping: 'Icon name, size, weight, label relationship and state color are explicit properties.' },
    { id: 'motion', label: 'Motion', icon: 'pi-bolt', group: 'FOUNDATIONS', kind: 'foundation', eyebrow: 'F7 / MOTION', title: 'Motion explains a state change', intro: 'Live specimens show cause, changed state, duration, easing and reduced-motion behavior.', summary: 'No continuous decorative animation.', keywords: ['motion', 'transition', 'reduced motion', 'easing'], decision: 'Short feedback motion is allowed when it preserves context and has a reason.', foundation: '140–250ms semantic durations with tokenized easing and reduced fallback.', angularContract: 'CSS transitions plus prefers-reduced-motion; no animation dependency.', figmaMapping: 'Motion entries expose trigger, property, duration, easing and fallback.' },
  ]),
  components([
    { id: 'buttons', label: 'Buttons', icon: 'pi-external-link', group: 'COMPONENTS', kind: 'component', eyebrow: 'C1 / BUTTONS', title: 'Buttons make one next action obvious', intro: 'State gallery and live playground cover rest, hover, focus, pressed, disabled, processing, success and error.', summary: 'Processing preserves geometry and prevents duplicate activation.', keywords: ['button', 'loading', 'success', 'error', 'focus'], decision: 'Success can be adjacent feedback or brief local confirmation; not every button turns green.', foundation: 'Primary, secondary, quiet and danger intents use semantic action tokens.', angularContract: 'Native button, explicit type, aria-busy and disabled behavior.', figmaMapping: 'Intent, size, icon, loading, state and full-width properties.' },
    { id: 'text-fields', label: 'Text Fields', icon: 'pi-pencil', group: 'COMPONENTS', kind: 'component', eyebrow: 'C2 / TEXT FIELDS', title: 'Text Fields expose input and recovery', intro: 'The approved field geometry is now a reusable first-class component with live and forced state evidence.', summary: 'Labels, help, error and value remain connected.', keywords: ['text field', 'input', 'label', 'error', 'readonly'], decision: 'Default and focus visual direction remains frozen.', foundation: 'Surface card, interactive border, focus ring and semantic danger roles.', angularContract: 'NexaTextField uses model signal, native input semantics and aria-describedby.', figmaMapping: 'State, value, leading, trailing, helper, error and required properties.', status: 'FROZEN' },
    { id: 'search-fields', label: 'Search Fields', icon: 'pi-search', group: 'COMPONENTS', kind: 'component', eyebrow: 'C3 / SEARCH', title: 'Search makes query, progress and recovery visible', intro: 'Typing, searching, results, empty results, error and retry are interactive states, not labels in a table.', summary: 'Search geometry follows the field contract; result state stays nearby.', keywords: ['search', 'query', 'results', 'empty', 'retry'], decision: 'Search remains a field variant with truthful asynchronous phases.', foundation: 'Field geometry plus status text and result surface.', angularContract: 'Native search input, live status and explicit clear action.', figmaMapping: 'Query, loading, results, empty and error states.' },
    { id: 'select-combobox', label: 'Select & Combobox', icon: 'pi-chevron-down', group: 'COMPONENTS', kind: 'component', eyebrow: 'C4 / CHOICE', title: 'Select, Combobox and Action Menu have different jobs', intro: 'A visual comparison prevents bounded choices, searchable vocabularies and commands from collapsing into one control.', summary: 'Native select is baseline; composite behavior earns its complexity.', keywords: ['select', 'combobox', 'action menu', 'choice'], decision: 'Use native semantics first.', foundation: 'Control geometry, surface card and focused border.', angularContract: 'Native select for bounded vocabulary; Angular Aria/CDK only for composite needs.', figmaMapping: 'Control role, option density, open state and keyboard model.' },
    { id: 'checkbox', label: 'Checkbox', icon: 'pi-check-square', group: 'COMPONENTS', kind: 'component', eyebrow: 'C5 / CHECKBOX', title: 'Checkbox supports independent choices', intro: 'Real native checkboxes show unchecked, checked, indeterminate, hover, focus and disabled states.', summary: 'State is conveyed by native semantics, shape, icon and label.', keywords: ['checkbox', 'indeterminate', 'selection', 'keyboard'], decision: 'No div-based fake checkbox.', foundation: 'Accent blue, explicit label and 44px interaction target.', angularContract: 'Native input with indeterminate property set by the specimen.', figmaMapping: 'Checked, indeterminate, disabled and focus properties.' },
    { id: 'radio', label: 'Radio', icon: 'pi-circle', group: 'COMPONENTS', kind: 'component', eyebrow: 'C6 / RADIO', title: 'Radio makes one choice within a named group', intro: 'The live group exposes unselected, selected, hover, focus and disabled states with fieldset semantics.', summary: 'Group name and current selection remain available to assistive technology.', keywords: ['radio', 'group', 'choice', 'keyboard'], decision: 'Native radio group owns selection semantics.', foundation: 'Circle cue plus text label; no color-only selection.', angularContract: 'Fieldset, legend, same-name inputs and checked binding.', figmaMapping: 'Group label, option, selected, disabled and focus.' },
    { id: 'toggle', label: 'Toggle / Switch', icon: 'pi-power-off', group: 'COMPONENTS', kind: 'component', eyebrow: 'C7 / TOGGLE', title: 'Toggle communicates an immediate change', intro: 'Click and keyboard interaction update a real switch with on, off, focus and disabled evidence.', summary: 'Use for immediate settings, not deferred form choices.', keywords: ['toggle', 'switch', 'checked', 'keyboard'], decision: 'Immediate behavior is mandatory for toggle.', foundation: 'Track, thumb, label and state text use semantic tokens.', angularContract: 'NexaToggle wraps native checkbox semantics with role switch.', figmaMapping: 'On/off, enabled/disabled, size and label.' },
    { id: 'segmented-control', label: 'Segmented Control', icon: 'pi-table', group: 'COMPONENTS', kind: 'component', eyebrow: 'C8 / SEGMENTED', title: 'Segmented Control keeps small related choices visible', intro: 'A real selection group demonstrates default, selected, hover, focus, disabled segment and compact size.', summary: 'Not main navigation.', keywords: ['segmented', 'filter', 'view mode', 'selection'], decision: 'Use only for a small set of closely related local choices.', foundation: 'Selected surface and blue cue align with sidebar language.', angularContract: 'Buttons expose aria-pressed and model updates.', figmaMapping: 'Options, selected value, size, disabled option and state.' },
    { id: 'status-badges', label: 'Status & Badges', icon: 'pi-tag', group: 'COMPONENTS', kind: 'component', eyebrow: 'C9 / STATUS', title: 'Status is a composition, not text color', intro: 'Workflow, availability, priority and temperature vocabularies use icon, shape, label and semantic color.', summary: 'Hue supports meaning; it never carries meaning alone.', keywords: ['status', 'badge', 'workflow', 'temperature', 'priority'], decision: 'Status families stay semantically separate.', foundation: 'Surface, border, foreground and icon roles per semantic family.', angularContract: 'NexaStatusChip exposes tone and accessible text content.', figmaMapping: 'Family, tone, icon cue, label and density.' },
    { id: 'alerts-feedback', label: 'Alerts & Feedback', icon: 'pi-bell', group: 'COMPONENTS', kind: 'component', eyebrow: 'C10 / FEEDBACK', title: 'Feedback tells what happened and what can happen next', intro: 'Success, warning, error, info and recovery examples use context-specific intensity.', summary: 'Recoverable errors make retry or correction visible.', keywords: ['alert', 'feedback', 'success', 'warning', 'error'], decision: 'Do not use green everywhere or generic error copy.', foundation: 'Semantic surface, border, icon, foreground and recovery action.', angularContract: 'Native region/alert semantics plus live status when appropriate.', figmaMapping: 'Tone, urgency, persistence, action and dismissal.' },
    { id: 'menus', label: 'Menus & Action Menus', icon: 'pi-list', group: 'COMPONENTS', kind: 'component', eyebrow: 'C11 / MENUS', title: 'Menus expose commands in context', intro: 'Open, command selection, destructive separation, Escape and focus evidence are interactive.', summary: 'Action Menu invokes; it does not replace select or segmented choice.', keywords: ['menu', 'action', 'escape', 'keyboard'], decision: 'Commands remain distinct from value selection.', foundation: 'Raised surface, overlay shadow and clear focus cue.', angularContract: 'Native buttons plus menu role; CDK/Aria preferred for production composites.', figmaMapping: 'Trigger, command, destructive group, open and keyboard states.' },
    { id: 'tooltips', label: 'Tooltips', icon: 'pi-question-circle', group: 'COMPONENTS', kind: 'component', eyebrow: 'C12 / TOOLTIPS', title: 'Tooltips supplement visible instruction', intro: 'Hover and focus show contextual help without hiding essential task guidance.', summary: 'Tooltips never carry critical meaning alone.', keywords: ['tooltip', 'help', 'hover', 'focus'], decision: 'Visible labels and instructions remain primary.', foundation: 'Dark neutral support surface with readable text.', angularContract: 'aria-describedby and focus-safe trigger.', figmaMapping: 'Trigger, placement, delay, content and dismissal.' },
    { id: 'dialogs-overlays', label: 'Dialogs & Overlays', icon: 'pi-window-maximize', group: 'COMPONENTS', kind: 'component', eyebrow: 'C13 / OVERLAYS', title: 'Overlays focus a decision without losing context', intro: 'The live dialog demonstrates open, close, Escape, focus cue, scrim and recovery actions.', summary: 'Use for focused decisions, not ordinary content.', keywords: ['dialog', 'overlay', 'scrim', 'escape'], decision: 'Overlay elevation is meaningful and restrained.', foundation: 'Raised card, scrim and dialog radius tokens.', angularContract: 'Dialog role, labelled title, modal semantics and close action.', figmaMapping: 'Size, scrim, entry, title, actions and dismissal.' },
    { id: 'cards-surfaces', label: 'Cards & Surfaces', icon: 'pi-stop', group: 'COMPONENTS', kind: 'component', eyebrow: 'C14 / SURFACES', title: 'Card and Panel responsibilities stay separate', intro: 'Object cards, grouped panels and visual planes use consistent border, padding, radius and state.', summary: 'No universal Box abstraction.', keywords: ['card', 'panel', 'surface', 'selected'], decision: 'A Card bounds an object; a Panel groups work; Surface defines a plane.', foundation: 'White surfaces, quiet borders and deliberate padding.', angularContract: 'NexaSurface stays small; docs composition primitives remain local.', figmaMapping: 'Role, interaction, selection, padding and elevation.' },
    { id: 'lists-tables', label: 'Lists & Tables', icon: 'pi-table', group: 'COMPONENTS', kind: 'component', eyebrow: 'C15 / DATA', title: 'Data display preserves object identity and recovery', intro: 'Search, filter, sort, status, row action, empty and horizontal overflow are visible in one live table.', summary: 'Local horizontal scroll is allowed when table semantics require it.', keywords: ['table', 'list', 'sort', 'filter', 'overflow'], decision: 'Operational data needs explicit density and status cues.', foundation: 'Table header, row border, monospace identifiers and status composition.', angularContract: 'Semantic table, scoped headers, native controls and live result message.', figmaMapping: 'Density, row state, sort, filter and empty behavior.' },
    { id: 'progress-indicators', label: 'Progress Indicators', icon: 'pi-spinner', group: 'COMPONENTS', kind: 'component', eyebrow: 'C16 / PROGRESS', title: 'Progress distinguishes known work from unknown duration', intro: 'Determinate progress, indeterminate activity, skeleton and reduced-motion behavior are shown side-by-side.', summary: 'Loading strategy follows knowledge of content geometry and duration.', keywords: ['progress', 'spinner', 'skeleton', 'determinate'], decision: 'Do not treat all loading as skeleton.', foundation: 'Progress accent, neutral track and text equivalent.', angularContract: 'Native progress where possible; status text and aria-valuenow when custom.', figmaMapping: 'Type, value, label, motion and reduced-motion fallback.' },
    { id: 'workflow-steps', label: 'Workflow Steps', icon: 'pi-sitemap', group: 'COMPONENTS', kind: 'component', eyebrow: 'C17 / WORKFLOW', title: 'Workflow Steps describe a multi-phase task', intro: 'Client, Products, Delivery and Review are distinct from numeric quantity controls.', summary: 'Current, complete and upcoming phases remain legible.', keywords: ['workflow steps', 'phases', 'current step', 'review'], decision: 'Workflow Steps are not Numeric Steppers.', foundation: 'Step line, number/icon cue, current surface and completion status.', angularContract: 'Typed step model, current index and accessible list semantics.', figmaMapping: 'Phase, current, completed, upcoming and navigation actions.' },
    { id: 'numeric-stepper', label: 'Numeric Stepper', icon: 'pi-plus-minus', group: 'COMPONENTS', kind: 'component', eyebrow: 'C18 / NUMERIC', title: 'Numeric Stepper changes an exact quantity', intro: 'Quantity, min boundary, max boundary, increment, decrement and disabled states are real.', summary: 'Display the affected value; do not hide numeric meaning in a track.', keywords: ['numeric stepper', 'quantity', 'min', 'max'], decision: 'Use for bounded increments, not broad ranges requiring many clicks.', foundation: 'Field surface, value emphasis and circular/clear actions.', angularContract: 'NexaNumericStepper clamps value and exposes labelled buttons.', figmaMapping: 'Value, min, max, step, disabled and label.' },
    { id: 'slider', label: 'Slider', icon: 'pi-sliders-h', group: 'COMPONENTS', kind: 'component', eyebrow: 'C19 / SLIDER', title: 'Slider represents a meaningful quantitative range', intro: 'Temperature threshold, tolerance and dashboard range examples show minimum, middle, maximum, focus and disabled.', summary: 'Current value is always visible beside the track.', keywords: ['slider', 'range', 'temperature', 'threshold'], decision: 'Pair with field or numeric stepper when exact values matter.', foundation: 'Track, thumb, focus and semantic value roles.', angularContract: 'Native range input with labelled output.', figmaMapping: 'Min, max, step, value, unit, focus and disabled.' },
    { id: 'navigation-sidebars', label: 'Navigation & Sidebars', icon: 'pi-bars', group: 'COMPONENTS', kind: 'component', eyebrow: 'C20 / NAVIGATION', title: 'Navigation preserves location and hierarchy', intro: 'The frozen Design Lab sidebar remains visible with grouped disclosure, active row, search and mobile drawer behavior.', summary: 'Current location uses label, icon, pale selected surface and blue leading cue.', keywords: ['navigation', 'sidebar', 'active', 'mobile', 'disclosure'], decision: 'Sidebar visual direction is frozen.', foundation: '284px desktop rail, 8px active radius, pale blue row and quiet PrimeIcons.', angularContract: 'RouterLinkActive, aria-current, disclosure buttons and focus restoration.', figmaMapping: 'Group, item, active, badge, disclosure, search and drawer.', status: 'FROZEN' },
  ]),
  {
    label: 'PATTERNS',
    items: [
      page({ id: 'forms', label: 'Forms', icon: 'pi-file-edit', group: 'PATTERNS', kind: 'pattern', eyebrow: 'P1 / FORMS', title: 'Forms preserve context, validation and recovery', intro: 'Field groups, validation, disabled/read-only differences and submit feedback compose into one inspectable pattern.', summary: 'Inputs remain typed and recoverable.', keywords: ['forms', 'validation', 'readonly', 'submit'], decision: 'Use native semantics, visible labels and adjacent recovery.', foundation: 'Text field, select, checkbox, radio, button and feedback contracts.', angularContract: 'Signal-first local state with typed model boundaries.', figmaMapping: 'Form group, field state, action hierarchy and feedback.' }),
      page({ id: 'search-filtering', label: 'Search & Filtering', icon: 'pi-filter', group: 'PATTERNS', kind: 'pattern', eyebrow: 'P2 / SEARCH', title: 'Search and filters show applied scope', intro: 'Query, filter selection, result count, empty state and clear recovery stay visible in a reusable composition.', summary: 'Search finds; filters narrow; applied state remains discoverable.', keywords: ['search', 'filter', 'query', 'empty'], decision: 'No hidden filter state.', foundation: 'Search field, segmented control, status and table contracts.', angularContract: 'Local signals for specimen; route/query state when deep links matter.', figmaMapping: 'Query, filter, applied, count, empty and retry.' }),
      page({ id: 'async-operations', label: 'Async Operations', icon: 'pi-sync', group: 'PATTERNS', kind: 'pattern', eyebrow: 'P3 / ASYNC', title: 'Async work has visible phases', intro: 'Ready, pressed, processing, success, warning, error, retry and cancelled states can be stepped through.', summary: 'Every phase keeps context and an honest next action.', keywords: ['async', 'processing', 'retry', 'success', 'cancelled'], decision: 'Operation vocabulary is shared but component behavior remains specific.', foundation: 'Button, progress, alert, status and state sequence evidence.', angularContract: 'Typed phase model and signal-driven local transitions.', figmaMapping: 'Phase, label, progress, feedback and recovery.' }),
      page({ id: 'empty-loading-error', label: 'Empty / Loading / Error', icon: 'pi-inbox', group: 'PATTERNS', kind: 'pattern', eyebrow: 'P4 / STATES', title: 'States answer what happened and what happens next', intro: 'Empty, loading, progress, success, warning, error, read-only and disabled examples are visual compositions.', summary: 'Recovery is part of the state, not an afterthought.', keywords: ['empty', 'loading', 'error', 'success', 'warning'], decision: 'Avoid generic error copy when context is known.', foundation: 'Icon, title, explanation, action and status severity.', angularContract: 'Native regions, live messages and deterministic specimen state.', figmaMapping: 'State, cue, copy, primary action and secondary recovery.' }),
      page({ id: 'authentication', label: 'Authentication', icon: 'pi-lock', group: 'PATTERNS', kind: 'pattern', eyebrow: 'P5 / AUTHENTICATION', title: 'Authentication composes trusted brand and usable form evidence', intro: 'Brand surface, workspace selection, fields, validation, loading, success and localization are shown as a design-system pattern.', summary: 'Composition specimen, not production application screen.', keywords: ['authentication', 'workspace', 'login', 'localization'], decision: 'Use auth direction as a composition of frozen components.', foundation: 'Brand atmosphere remains a restrained exception; form surface stays canonical.', angularContract: 'Typed form state, accessible names and recoverable validation.', figmaMapping: 'Brand plane, workspace card, fields, action, locale and feedback.' }),
      page({ id: 'responsive', label: 'Responsive Composition', icon: 'pi-mobile', group: 'PATTERNS', kind: 'pattern', eyebrow: 'P6 / RESPONSIVE', title: 'Responsive behavior preserves task hierarchy', intro: 'The same composition is evaluated at 1440, 1024, 768, 390 and 320 widths with no accidental page overflow.', summary: 'Wide data can scroll locally; reading and controls reflow.', keywords: ['responsive', 'mobile', 'reflow', '320px', '400%'], decision: 'Protect hierarchy and hit targets before decorative density.', foundation: 'Intrinsic layout, gutters and component min widths.', angularContract: 'CSS media queries and semantic DOM, not duplicated route implementations.', figmaMapping: 'Desktop, tablet, mobile frame and reflow notes.' }),
    ],
  },
  {
    label: 'QUALITY',
    items: [
      page({ id: 'accessibility-lab', label: 'Accessibility Lab', icon: 'pi-shield', group: 'QUALITY', kind: 'quality', eyebrow: 'Q1 / ACCESSIBILITY', title: 'Accessibility is shown, not claimed', intro: 'Focus, target size, keyboard, text resize, non-color cues, reduced motion, names and reflow are visible evaluation modes.', summary: 'Evidence supports later manual review; it is not certification.', keywords: ['accessibility', 'focus', 'keyboard', 'targets', 'reflow'], decision: 'WCAG 2.2 is mechanical baseline; manual assistive-technology review remains open.', foundation: 'Native semantics, visible focus and readable state composition.', angularContract: 'Strict templates, aria attributes, keyboard-native controls and tests.', figmaMapping: 'A11y annotations and state coverage per component.' }),
      page({ id: 'contrast-lab', label: 'Contrast Lab', icon: 'pi-eye', group: 'QUALITY', kind: 'quality', eyebrow: 'Q2 / CONTRAST', title: 'Contrast ratios are derived from actual candidate colors', intro: 'The matrix renders foreground, background, ratio, WCAG gate and pass/fail for approved semantic contracts.', summary: 'No hand-written ratios.', keywords: ['contrast', 'WCAG', 'ratio', 'AA', 'color'], decision: 'Normal text 4.5:1, large text 3:1 and essential UI 3:1.', foundation: 'Primitive colors feed approved semantic foreground/background pairs.', angularContract: 'Shared contrast utility parses candidate color formats and gates contracts.', figmaMapping: 'Color pairing and accessibility annotations remain explicit.' }),
      page({ id: 'heuristics', label: 'Nielsen Heuristics', icon: 'pi-check-circle', group: 'QUALITY', kind: 'quality', eyebrow: 'Q3 / HEURISTICS', title: 'Heuristics become small visual checks', intro: 'Each heuristic pairs concise guidance with a tiny Nexa interaction example.', summary: 'Quality guidance stays actionable and compact.', keywords: ['heuristics', 'visibility', 'recovery', 'error prevention'], decision: 'Ten heuristics remain a quality authority, not a fake product audit.', foundation: 'Live state transitions and recovery paths.', angularContract: 'Examples use the same reusable candidate components.', figmaMapping: 'Review criterion, specimen, severity and open question.' }),
      page({ id: 'input-modality', label: 'Input Modality', icon: 'pi-keyboard', group: 'QUALITY', kind: 'quality', eyebrow: 'Q4 / INPUT', title: 'Pointer, keyboard and touch share one contract', intro: 'Keyboard showcase demonstrates Tab, Shift+Tab, Space, Enter, Escape and arrows only where appropriate.', summary: 'Native interaction models stay recognizable.', keywords: ['keyboard', 'pointer', 'touch', 'focus'], decision: 'Do not invent keyboard behavior that conflicts with native controls.', foundation: 'Focus geometry and 44px hit target.', angularContract: 'Native HTML first; Angular Aria/CDK for composite behavior.', figmaMapping: 'Input modality annotation per component.' }),
      page({ id: 'component-maturity', label: 'Component Maturity', icon: 'pi-bookmark', group: 'QUALITY', kind: 'quality', eyebrow: 'Q5 / MATURITY', title: 'Maturity separates direction from certification', intro: 'Experimental, Candidate, Frozen and Deprecated states are defined with visual inventory coverage.', summary: 'Frozen means human direction should not change casually.', keywords: ['maturity', 'experimental', 'candidate', 'frozen', 'deprecated'], decision: 'Production package and certification remain deferred.', foundation: 'Evidence depth, API quality, interaction coverage and accessibility proof.', angularContract: 'Maturity is documentation metadata, not runtime behavior.', figmaMapping: 'Library status and review ownership.' }),
    ],
  },
  {
    label: 'ENGINEERING',
    items: [
      page({ id: 'angular-architecture', label: 'Angular Architecture', icon: 'pi-sitemap', group: 'ENGINEERING', kind: 'engineering', eyebrow: 'E1 / ANGULAR', title: 'Feature areas stay understandable and lazy', intro: 'Standalone routes, focused shared components, signal-first state and strict template checks keep the lab maintainable.', summary: 'Documentation, specimens and reusable controls have separate responsibilities.', keywords: ['Angular', 'standalone', 'signals', 'lazy loading'], decision: 'No God Documentation component or giant presentation registry.', foundation: 'Token layers and small shared UI contracts.', angularContract: 'Angular 22, strict TypeScript, OnPush and native semantics.', figmaMapping: 'Component ownership and candidate properties are implementation evidence.' }),
      page({ id: 'design-tokens', label: 'Design Tokens', icon: 'pi-sliders-h', group: 'ENGINEERING', kind: 'engineering', eyebrow: 'E2 / TOKENS', title: 'Primitive, semantic and component tokens form one dependency graph', intro: 'The token page shows actual relationships, state tokens and standard/increased contrast mode behavior.', summary: 'Magic values and arbitrary opacity hacks are rejected.', keywords: ['tokens', 'primitive', 'semantic', 'component', 'modes'], decision: 'Component tokens are added only when semantic intent is insufficient.', foundation: 'Blue, slate, support families, spacing, radius, motion and typography.', angularContract: 'Token integrity and contrast scripts run independently.', figmaMapping: 'CSS custom properties map to future variable modes.' }),
      page({ id: 'component-apis', label: 'Component APIs', icon: 'pi-code', group: 'ENGINEERING', kind: 'engineering', eyebrow: 'E3 / APIs', title: 'Candidate APIs are semantic and future-consumable', intro: 'Text Field, Button, Toggle, Segmented Control, Card and State Sequence contracts expose user-facing behavior.', summary: 'Specimen simulation never leaks into production component APIs.', keywords: ['API', 'input', 'output', 'model', 'harness'], decision: 'One concept per component; no universal field or box.', foundation: 'Native semantics plus tokenized state relationships.', angularContract: 'input, output, model, computed and strict types.', figmaMapping: 'Properties and states align with future component sets.' }),
      page({ id: 'testing', label: 'Testing', icon: 'pi-check-square', group: 'ENGINEERING', kind: 'engineering', eyebrow: 'E4 / TESTING', title: 'Tests prove user-facing contracts', intro: 'Behavior, keyboard, disabled, model updates, accessible attributes, token integrity and contrast gates are explicit.', summary: 'No fragile implementation-class assertions as the primary proof.', keywords: ['tests', 'unit', 'harness', 'contrast', 'tokens'], decision: 'Coverage follows stable contracts, not raw count.', foundation: 'Shared components and utilities have focused tests.', angularContract: 'Angular unit tests plus deterministic Node gates.', figmaMapping: 'Visual review evidence remains separate from automated tests.' }),
      page({ id: 'figma-mapping', label: 'Figma Mapping', icon: 'pi-pencil', group: 'ENGINEERING', kind: 'engineering', eyebrow: 'E5 / FIGMA', title: 'Implementation is prepared for future library handoff', intro: 'Each mature candidate exposes variants, states, tokens and open questions without publishing a Figma library.', summary: 'Documentation maps; human designers approve and publish.', keywords: ['Figma', 'handoff', 'variants', 'variables'], decision: 'No Figma library publication in v0.7.', foundation: 'Frozen foundations and candidate component contracts.', angularContract: 'Rendered Angular specimens are implementation evidence.', figmaMapping: 'Button, Text Field, Toggle and Card property maps are ready for review.' }),
    ],
  },
];

export const ALL_DOCUMENTATION_PAGES: readonly DocumentationPage[] = DOCUMENTATION_GROUPS.flatMap(
  (group) => group.items,
);

export const DOCUMENTATION_PAGE_MAP = new Map(
  ALL_DOCUMENTATION_PAGES.map((documentationPage) => [documentationPage.id, documentationPage]),
);
