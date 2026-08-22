# ADR 0002: Keep the Action Menu implementation for v0.10

## Status

Accepted for v0.10; revisit after a concrete behavior gap is identified.

## Context

The Action Menu has a frozen Nexa presentation and already owns explicit keyboard activation, focus return and outside-click behavior. Angular Aria and CDK Overlay were considered as possible behavioral infrastructure, but a migration would change more than the current evidence requires.

## Decision

KEEP the current implementation for v0.10. Do not migrate solely to adopt a library. Preserve the existing visual and interaction contract, keep the behavior covered by focused tests and browser evidence, and re-open the spike only when a measured accessibility, positioning or maintenance defect cannot be solved locally.

## Consequences

- The reusable candidate remains in `projects/nexa-ui/src/lib/action-menu` with no dependency on documentation or Lab code.
- Angular Material/CDK remain available for the existing theme and peer relationship; they are not introduced into the Action Menu without an accepted use case.
- A future REFINE decision must compare keyboard semantics, focus ownership, outside-click behavior, overlay positioning and visual parity before changing the implementation.
