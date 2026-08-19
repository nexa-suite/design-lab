# Consuming Nexa UI

`nexa-ui` is the reusable Angular candidate library in this repository. It is evidence for future production applications, not a production release.

## Import boundary

```ts
import { NexaButton, NexaTextField, NexaStatusChip } from 'nexa-ui';
```

Do not import from `projects/nexa-ui/src/lib` and do not import documentation or Lab code into a reusable component. The public entrypoint is `projects/nexa-ui/src/public-api.ts`; `npm run validate:public-api` protects this boundary.

## Available candidates

The current explicit entrypoint includes Action Menu, Logo, Button, Numeric Stepper, Range Slider, Locale Switcher, Segmented Control, Status Chip, Surface, Text Field, Toggle and Tooltip. Each candidate has native semantics, signal-first inputs/outputs where applicable and a colocated test.

State Sequence, contrast utilities, evaluation modes and documentation frames are intentionally absent. They are Lab infrastructure, not production-style APIs.

## Adoption checklist

Before a product application adopts a candidate, record the Blueprint baseline, source SHA, public API contract, token version, contrast evidence, responsive evidence and human design/accessibility decision. A passing build is necessary but does not certify production readiness.
