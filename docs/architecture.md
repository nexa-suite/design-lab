# Nexa Design Lab architecture

## Ownership

The Blueprint owns normative design truth: vocabulary, token laws, component contracts, maturity, adoption and release decisions. The Design Lab owns executable evidence: Angular route features, rendered states, quality specimens, deterministic gates and browser review records.

```text
src/app/shell
  documentation navigation and route shell
projects/nexa-ui/src/lib
  reusable candidate controls, brand primitives and colocated tests
src/app/documentation
  focused foundations, components, patterns, quality and engineering pages
src/app/lab
  evaluation modes, contrast contracts and Lab-only StateSequence evidence
tokens/*.tokens.json
  primitive -> semantic -> component/data source
src/styles/_tokens-*.scss
  generated runtime artifacts; never edit directly
src/app/documentation/content/token-reference.generated.ts
  generated typed evidence catalog; never edit directly
```

## Routing boundary

Major features use explicit analyzable dynamic imports in `src/app/app.routes.ts`. Authentication, Analytics, Dispatch Board, Quality, Engineering, Buttons, Progress and the focused product patterns each load a page feature. The generic component renderer remains only for the long-tail component catalogue; high-value lifecycle pages no longer depend on it.

The build is the first lazy-loading proof: it emits named `button-page`, `progress-page`, `analytics-page`, `authentication-page`, `dispatch-board-page`, `quality-page` and `engineering-page` chunks. A route-evidence manifest records route, viewport, state, artifact and source SHA under ignored `tmp/` evidence.

## Design-system versus Lab

`nexa-ui` is a real Angular package boundary. Its `src/public-api.ts` uses explicit exports for reusable candidates and does not export documentation or Lab infrastructure. The Action Menu, Tooltip and control components preserve the accepted Nexa presentation. `NexaStateSequence`, contrast parsing and evaluation modes remain Lab-owned because they demonstrate evidence rather than define production APIs.

## Token and geometry laws

Token source is organized as primitive, semantic, component and data-visualization layers. Generated SCSS and the typed documentation reference must stay synchronized. Semantic status roles are not categorical chart series. Reusable controls use focused aliases for control padding, panel/card padding, gaps, interactive radius and focus geometry. Selected, focus, pressed and loading layers inherit the base shape; documentation sections own their divider once. The architecture gate rejects reusable primitive references and arbitrary reusable radii.

## Feature content

Documentation registry metadata owns discovery only. Substantial page copy and behavior live with the feature. Product patterns preserve the distinction between catalog browsing, cart, draft request and order; the cart never reserves inventory. Provider-neutral map, payment and delivery evidence names deferred production ownership rather than inventing contracts.

The shared documentation layout owns the repeated section heading and divider primitive in `src/app/documentation/layout/documentation-section.*`. It is intentionally a section primitive, not a generic `Box`; projected specimens retain ownership of their feature-specific layout styles.

## Verification boundary

The automated gates are intentionally small and understandable: architecture, token, color, icon, documentation, public API and contrast validation plus library/application tests and builds. Human visual, content, browser, responsive, reduced-motion, increased-contrast and assistive-technology review remain explicit handoff items until recorded.
