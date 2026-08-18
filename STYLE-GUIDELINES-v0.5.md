# NEXA DESIGN LAB v0.5 — Current Style Guidelines

Status: experimental candidate. Human design review required. This document supersedes v0.4 for current Design Lab work; it does not alter the historical record.

## Authority

1. Explicit human decisions.
2. Legacy Vue and extracted FLOW visual contracts.
3. Reusable Nexa rules proven in real routes and Guidelines.
4. Angular implementation details.

External systems are behavior and quality references, never visual authority.

## Visual language

- White product surfaces; light canvas only where FLOW establishes it.
- Nexa blue leads actions and active navigation. Status colors communicate state, not decoration.
- Pastel surfaces are semantic accents, never default page fill and never rainbow decoration.
- No gradients, emoji, fake testimonials, bento grids, generic marketing metrics, blanket shadows or terminal-window theater.
- Product images sit on white surfaces. Cold-chain labels remain restrained chips.
- PrimeIcons remain the reference icon family for application UI. Icons support labels; they do not compete with them.

## Shape and spacing

- No hard rectangular default. Use `control` for fields/actions, `card` for content, `panel` for grouped context, `dialog` for modal surfaces and `pill` only for compact state.
- Active Platform navigation is a fully rounded capsule with a blue rail and blue icon/text. Never square the left edge.
- Preserve page gutters, section rhythm and local auto-layout. Density may increase inside tables, not by collapsing page structure.
- Focus uses visible Nexa ring. Reduced motion disables transitions.

## Shared contracts

`NexaButton`, `NexaField`, `NexaNativeSelect`, `NexaActionMenu`, `NexaStatusChip`, `NexaSurface`, `NexaTableShell`, `NexaPageHeader` and `NexaProgressSteps` are reusable only where used by a real reference route and Guidelines. Each contract owns semantics, states and responsive behavior.

## Workflow patterns

- Headers expose eyebrow, title, description and primary action.
- Wizards expose current, complete and not-started states; each step has a usable control.
- Tables own toolbar search/filter/sort, local overflow, empty/loading/error specimens and readable row actions.
- Empty states explain why and name next action.
- Analytics uses accessible SVG plus text; no fabricated CSS chart bars.

## Material boundary

Material/CDK/Angular Aria may provide behavior. Nexa owns presentation through public APIs and component-local styles. Private MDC selectors, `::ng-deep` and `!important` are prohibited.
