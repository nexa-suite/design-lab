# NEXA DESIGN LAB v0.6 — Legacy Visual DNA

Status: CANDIDATE. Legacy is evidence, not current product authority.

## Evidence boundary

- Vue repository: [nexa-webapp](https://github.com/upc-pre-202610-1asi0730-12242-king/nexa-webapp), inspected read-only at b6200959ac53976db8588718c788e7b16362be02.
- Visual routes: src/app/app-routes.js, src/sales/presentation/sales.routes.js, src/logistics/presentation/logistics.routes.js, src/iam/presentation/iam.routes.js.
- Visual styles: src/assets/styles/tokens.css, src/assets/styles/ops.css, src/assets/styles/app.css, src/layouts/ops-layout.vue.
- FLOW archive: /Users/diegosandoval284/Downloads/FLOW.zip, 49 user-facing PNGs plus macOS metadata entries. Screenshots remain external evidence and are not runtime assets.
- Backend repository nexa-platform is not a visual source.

## Observed DNA

| Axis              | Observed value                                                                  | v0.6 decision                                                       |
| ----------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Shell             | White Platform sidebar, grouped labels, 240–284px width, 56–60px topbar.        | Keep and document as Platform evidence.                             |
| Active navigation | Pale blue row, blue left/inset edge, approximately 8px radius, quiet PrimeIcon. | Keep exactly; revoke the 18px capsule.                              |
| Canvas            | Cool light canvas around white operational surfaces.                            | Keep where FLOW establishes it; do not force it onto product media. |
| Surfaces          | White panels, structural borders, restrained elevation for transient layers.    | Keep; no shadow on every object.                                    |
| Color             | Nexa blue anchor with slate, green, amber, red, orange and cold-chain roles.    | Keep semantic jobs; no decorative rainbow.                          |
| Type              | Plus Jakarta Sans display, Inter UI, JetBrains Mono identifiers in Vue tokens.  | Keep pending licensing/hosting review.                              |
| Icons             | PrimeIcons, fine, aligned, subordinate to labels.                               | Keep source family and accessible naming.                           |
| Density           | Large whitespace/gutters with compact operational rows.                         | Keep deliberate spacing; formalize 4px primitives.                  |
| Portal            | Horizontal navigation and its own buyer composition.                            | Keep as a separate portal shell, not a sidebar variant.             |
| Auth              | Split blue brand plane and white form plane; special gradient evidence.         | Keep only in auth reference; do not generalize.                     |

## KEEP / REFINE / REWORK / REJECT

| Decision | Evidence                                                                                                                                             | Action                                                                      |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| KEEP     | Vue ops sidebar, active row, PrimeIcons, white cards, blue scale, domain labels.                                                                     | Preserve in reference screens and v0.6 contracts.                           |
| REFINE   | Raw CSS values, repeated shell geometry, hardcoded semantic colors and incomplete responsive rules.                                                  | Normalize primitive/semantic/component tokens; record ownership and states. |
| REWORK   | v0.5 documentation shell, broad pages, active capsule and eager route tree.                                                                          | Replace with routed v0.6 IA, 8px active row, search and lazy components.    |
| REJECT   | Generic AI card soup, bento marketing layout, fake metrics/testimonials, universal gradients, solid rainbow decoration and Material-default styling. | Do not add to Nexa documentation or references.                             |

## Explicit correction

The v0.5 --nexa-radius-nav-active: 18px value made the navigation look like a generic capsule and diverged from the Vue .nav-item evidence. v0.6 maps the semantic token to the 8px primitive radius and uses the inset blue edge.

## Confidence

- High: shell geometry, active row, PrimeIcons, colors, type families and route/source locations.
- Medium: exact pixel values across all screens because FLOW captures are large exports and some screens have local composition exceptions.
- Pending: matched runtime screenshots at the same viewport for Angular and Vue. No visual parity claim is made until both are captured and compared.
