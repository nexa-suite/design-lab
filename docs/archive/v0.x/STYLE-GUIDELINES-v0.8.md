# Nexa Design Lab v0.8 — Style Guidelines

## Status and boundary

Candidate guidance for human review. v0.8 polishes the recovered v0.7 foundation; it does not reopen the sidebar, text-field, typography, light-surface or action-menu directions. This document is Design Lab evidence, not production policy, Blueprint authority or accessibility certification.

The visual order remains:

```text
Human direction → frozen Nexa foundation → quality guidance → Angular specimen → human review
```

FLOW and the Vue application remain local visual evidence. They are not copied into runtime and do not authorize product behavior.

## Brand and identity

- The canonical mark is rendered from the tracked `logo-nexa/logo-nexa.svg` and `logo-nexa/Documento.svg` assets.
- `NexaLogo` owns primary/inverse selection, accessible alternative text and decorative behavior.
- CSS, text, canvas drawing and recolored derivatives must not recreate the wordmark.
- The inverse mark is scoped to a dark Nexa brand plane; the canonical product surface remains light.
- Dark mode and additional appearance themes remain deferred.

## Color and semantic depth

- Nexa blue and slate remain the primary identity and reading hierarchy.
- Success, warning, danger, operational, refrigerated and frozen families are semantic support—not decoration.
- Status needs a label and non-color cue. Tone and emphasis are separate: subtle, standard and strong.
- Warning and danger levels use semantic surface, border and foreground tokens; strong inverse text is mechanically contrast-checked.
- Increased Contrast overrides root semantic roles in the same light appearance. It is an evaluation mode, not a second theme.
- No raw color literals belong in reusable component styles. Primitive definitions, semantic token definitions and approved contrast contracts are the only color sources.

## Typography, spacing and shape

- Plus Jakarta Sans carries display hierarchy; Inter carries operational UI; JetBrains/system mono carries identifiers and tokens.
- A 4px rhythm is applied through explicit page padding, section gaps, control padding and grid/flex `gap`.
- Use CSS Grid/Flex, `minmax(0, 1fr)`, logical properties and intrinsic reflow. Do not use negative margins, JavaScript layout calculation or fixed text heights.
- Section headings use a consistent separator and vertical rhythm after the first section.
- Controls, cards, panels, overlays and compact statuses use different radius tokens. Full pills remain an exception.
- White structural surfaces sit on a cool light canvas; elevation is reserved for menus, overlays and meaningful raised objects.

## Component and interaction contracts

- Native HTML semantics come first. Reusable controls own their APIs; documentation pages own synthetic simulation state.
- Action Menu invokes commands, does not replace Select or Segmented Control. It supports disabled and destructive commands, separators, keyboard movement, Escape and focus return.
- Tooltip supplements visible instruction. It opens from hover/focus, keeps `aria-describedby` truthful, remains reachable while the pointer crosses its gap and dismisses with Escape.
- Checkbox evidence uses real native inputs with unchecked, checked, indeterminate, disabled and focus-visible states. The focus ring belongs to the input, not a documentation wrapper.
- Async sequences show happy path, warning/cancel and failure/retry. Current state, consequence and next action stay adjacent.
- Product pattern pages are generic evidence. Authentication has no organization registration; Payments has no provider integration; Dispatch has no accepted transition contract; Data-Dense Operations is not an Inventory route.

## Accessibility evaluation

- Standard and Increased Contrast change root semantic tokens and therefore rendered text, borders and focus styles.
- Motion and Reduced Motion change transition/spinner behavior while preserving the resulting state.
- Text scale controls expose 100%, 150% and 200%; responsive review covers 1440, 1024, 768, 390 and 320px.
- Focus remains visible against actual controls. Names, roles, status text, tables, progress alternatives and keyboard paths are part of the specimen.
- WCAG ratio gates are 4.5:1 normal text, 3:1 large text and 3:1 essential non-text UI. Passing automation does not equal certification.

## Angular implementation rule

Standalone lazy routes, strict templates, signals, `computed`, `OnPush`, native semantics and focused feature components are required. No `::ng-deep`, `!important`, private MDC selectors, mega component or forced production state belongs in the candidate system.

The lab may simulate states locally. It must not invent REST endpoints, domain entities, payment providers, dispatch permissions or tenant behavior.

## Review boundary

The implementation is ready for a principal design and accessibility review when browser evidence is attached. CodeX does not perform that design approval. Human reviewers decide promotion, Figma publication, production ownership and any future theme direction.
