# Nexa Design Lab V1 candidate review pack

This document defines the human review handoff for the final correction pass. It
is evidence guidance, not Blueprint authority, production readiness, WCAG
certification, or screen-reader approval.

## Generated evidence

Run `npm run validate:browser` from the candidate commit. The browser gate writes
the review pack and screenshot artifacts under:

```text
tmp/visual-regression/<exact-source-sha>/review-pack.json
tmp/visual-regression/<exact-source-sha>/<route>/<viewport>/<state>.png
```

Every JSON and PNG artifact records the exact source SHA used for capture. The
generated pack is intentionally ignored and must not be copied into Blueprint
documentation.

## Human visual pass

Review the canonical evidence at 1440, 1024, 768, 390 and 320 pixels for:

- overview shell, brand/logo, color and typography;
- buttons, Text Field, native Checkbox/Radio evidence, Action Menu and Tooltip;
- authentication states and locale presentation;
- synthetic payment composition;
- analytics grammar and semantic status colors;
- Dispatch Board movement evidence;
- data-dense operations and local table scrolling;
- Accessibility Lab, Contrast Lab and responsive composition.

Confirm that section rhythm, dividers, selected geometry, focus geometry,
overlay placement, wrapping and page overflow remain coherent. The automated
gate proves deterministic contracts; the human pass decides visual acceptance
and assistive-technology behavior that was not executed locally.

## Explicit boundary

The candidate does not claim a production application release, Blueprint
adoption, domain approval, WCAG certification, or screen-reader approval. Any
remaining concern must be recorded against the exact candidate SHA before an
SCM-owned `v1.0.0` release closure.
