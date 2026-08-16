# NEXA DESIGN LAB v0.2 — NORMALIZED DESIGN FOUNDATION

Experimental TARGET candidate. Human design approval required before Blueprint adoption.

## Authority boundaries

- Accepted Product semantics outrank historical visual wording.
- Existing Design Lab baseline is preserved where it still expresses Nexa character.
- Modern Angular implementation evidence informs engineering decisions.
- Legacy FLOW/Vue is visual provenance, not current Product authority.
- Blueprint remains future durable design specification after approval.

## Core character

Calm, precise, operational, credible, light, blue-led and restrained. Keep white/light sidebar, pale blue page canvas, subtle borders, compact identity, clear title, blue primary action and information-dense panels. Avoid generic SaaS, dark sidebar, glassmorphism, dashboard filler and decorative elevation.

## Semantic corrections

- `Purchase Request` remains buyer-originated request.
- `Sales Order` is seller-side confirmed commercial commitment.
- Never equate Purchase Request with Sales Order.
- Remove S1/S2/S3 from current user-facing responsibilities.
- Do not resurrect Premium, Subscription, Plans, Entitlements, Tenant provisioning, or V1 Mobile/IoT claims.
- Unresolved buyer reconfirmation remains `PROCESS DECISION REQUIRED` when represented.

## Token layers

1. Primitive: OKLCH blue scale, slate scale, limited status/cold-chain values, spacing, radius, shadow and font primitives.
2. Semantic: action, text, surface, border, focus, workflow status, role and cold-chain purpose.
3. Component: shell width, drawer width, table row height, control heights and focus ring.

Components consume CSS custom properties. Sass uses modules for source organization and compile-time concerns. No deprecated `@import`, `::ng-deep`, `!important` or undocumented Material internals.

## Color

Primary anchor remains `#2563EB`, represented as approximately `oklch(54.6% 0.215 262.9)`. Candidate blue scale is rendered in the app with token, hex, OKLCH, contrast against white, contrast against dark text and safe-use guidance.

Semantic families remain distinct:

- Brand/action blue.
- Neutral/slate.
- Workflow status: neutral, info, in progress, positive, attention, critical.
- Sales role: role token, not success green.
- Cold-chain: refrigerated/frozen classification, not workflow status.

Status always uses text plus color plus optional icon/shape. Color alone never communicates state.

## Typography

- Plus Jakarta Sans: page titles and controlled brand expression.
- Inter: body, forms, tables, navigation and metadata.
- JetBrains Mono: IDs, SKUs, lots and other true identifiers only.
- Compact metadata may use 12–13px intentionally; routine UI text targets 14px or larger where layout allows.
- Numeric alignment uses `font-variant-numeric: tabular-nums`.

## Spacing, shape, surfaces

- 4px-derived rhythm: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64.
- Small control: 6–8px; panel/card: 10–12px; major overlay: 12–16px; pill: full.
- Container is not automatically card. Borders and surface contrast precede shadows.
- Page, raised, inset, overlay, selected and subtle interactive surfaces are separate roles.

## Responsive behavior

- Desktop: persistent 284px sidebar.
- Tablet: compact sidebar and two-column content where viable.
- Mobile: topbar navigation trigger opens drawer/sheet; Escape, backdrop and close button dismiss; focus returns to trigger/previous control.
- Tables remain semantic tables; narrow layouts use horizontal overflow, not ambiguous card conversion.
- Breakpoints are behavior-driven: 700px shell transition, 900/980px content transitions, tested at 320/768/1024/1440.

## Accessibility

WCAG 2.2 AA is the quality target, not a certification claim. Native semantics come first. Active checks cover headings, landmarks, labels, keyboard access, visible focus, focus restoration, status text, target sizing, contrast, reduced motion, zoom/reflow and no page-level horizontal overflow.

Muted metadata and subtle border failures remain visible in Contrast Lab with usage restrictions. Warning, danger and cold-chain status text use darker accessible semantic roles while keeping soft backgrounds.

## Component policy

- Buttons: real button, explicit label, primary/secondary/quiet variants, focus and visible feedback.
- Inputs: visible label, useful placeholder, focus and state description.
- Cards: white surface, border, restrained radius; no default shadow.
- Status: text, color and optional icon/shape.
- Icons: quiet line treatment; PrimeIcons and Material Icons remain a human-review comparison.
- Operational tables: identifier hierarchy, date, money, quantity, status, actions, hover/focus, empty/loading/error guidance.
- Product cards: white media surface; brand/category, product, presentation/SKU, price, availability, classification, action.

## Angular and Material

Standalone components, `OnPush`, signals, signal inputs/outputs, built-in `@if`/`@for`, colocated TS/template/SCSS and simple feature structure. Material is evaluated per component: theme Material for primitives, custom Nexa presentation for shell/dashboard, CDK preferred for headless behavior, human review for icons.
