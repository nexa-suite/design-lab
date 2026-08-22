# ADR 0001: Blueprint authority and executable Lab evidence

## Status

Accepted for v0.10 release convergence.

## Decision

The Blueprint design branch is the normative design-system baseline. Nexa Design Lab is the executable Angular evidence layer. The Lab can demonstrate visual and interaction contracts, but it cannot silently promote experimental documentation infrastructure to a production API or replace Blueprint vocabulary and maturity decisions.

## Consequences

- `projects/nexa-ui` exposes only reusable candidates through an explicit public API.
- State Sequence, evaluation modes and contrast math remain Lab-only.
- Product patterns may show safe composition evidence while deferring domain contracts.
- Adoption requires source SHA, gate results and human review evidence.
- Historical v0.x reports remain available under `docs/archive/v0.x/` for provenance.
