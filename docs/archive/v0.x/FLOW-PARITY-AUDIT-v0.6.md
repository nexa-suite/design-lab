# NEXA DESIGN LAB v0.6 — FLOW Parity Audit

Status: CANDIDATE. This is an evidence inventory and comparison plan, not a visual pass.

## Evidence set

| Item               | Value                                                                 |
| ------------------ | --------------------------------------------------------------------- |
| Archive            | /Users/diegosandoval284/Downloads/FLOW.zip                            |
| User-facing images | 49 PNGs; macOS metadata entries are excluded from the count           |
| Typical export     | 3594–3600px wide and 1876–1908px high                                 |
| Known exception    | buyer-payments-other-cards.png is 3600 × 1016                         |
| Vue source         | nexa-webapp SHA b6200959ac53976db8588718c788e7b16362be02              |
| Angular evidence   | Design Lab reference routes under /reference; runtime capture pending |
| Authority          | FLOW → rendered Vue → Vue source; Angular is a comparison candidate   |

## Complete FLOW inventory

| Folder       | Files                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Route family / task              |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| LOGIN        | login-1.png; login-workspace detected.png                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | /auth/login; workspace discovery |
| REGISTER     | Register-1-Company.png; Register-1-error.png; Register-2-Operation.png; Register-4-Admin.png; Register-4-Location.png; Register-5-Workspace.png; Register-6-Review.png                                                                                                                                                                                                                                                                                                                                                      | registration/setup sequence      |
| SALES        | sales-b2b-clients.png; sales-business-docs.png; sales-catalog.png; sales-dashboard.png; sales-manual-order-entry-b2b-selected.png; sales-manual-order-entry-catalog-select.png; sales-manual-order-entry-confirm.png; sales-manual-order-entry-phase-2.png; sales-manual-order-entry-phase-3.png; sales-manual-order-entry-phase-4.png; sales-manual-order-entry.png; sales-my-profile.png; sales-orders.png; sales-purchase-order.png; sales-purchase-req-modal.png; sales-purchase-req-review.png; sales-purchase-req.png | /ops/commercial/*                |
| LOGISTICS    | logistics-analytics.png; logistics-bussines-docs.png; logistics-dashboard.png; logistics-dispatch-orders-move.png; logistics-dispatch-orders.png; logistics-inventory-control.png; logistics-my-profile.png; logistics-pod.png                                                                                                                                                                                                                                                                                              | /ops/operations/*                |
| BUYER-PORTAL | buyer-main.png; buyer-my-orders.png; buyer-my-request.png; buyer-payments-other-cards.png; buyer-payments.png; buyer-privacy.png; buyer-prod-catalog.png; buyer-profile.png; buyer-request-builder-phase-1.png; buyer-request-builder-phase-2-empty.png; buyer-request-builder-phase-2-prods.png; buyer-request-builder-phase-3.png; buyer-request-builder-phase-4.png; buyer-support.png; buyer-terms.png                                                                                                                  | /portal/*                        |

## Vue route/source mapping

| FLOW family         | Vue route source                               | Vue view source                                                                  | Angular reference                      |
| ------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------- |
| Sales dashboard     | src/sales/presentation/sales.routes.js         | src/sales/presentation/commercial-validation/views/commercial-dashboard-view.vue | /reference/platform/dashboard          |
| Purchase requests   | src/sales/presentation/sales.routes.js         | src/sales/presentation/purchase-requests/views/request-inbox-view.vue            | /reference/platform/purchase-requests  |
| Manual order        | src/sales/presentation/sales.routes.js         | src/sales/presentation/purchase-orders/views/create-order-view.vue               | /reference/platform/manual-order-entry |
| Sales orders        | src/sales/presentation/sales.routes.js         | src/sales/presentation/purchase-orders/views/orders-view.vue                     | /reference/platform/sales-orders       |
| Clients             | src/sales/presentation/sales.routes.js         | src/sales/presentation/clients/views/clients-view.vue                            | /reference/platform/clients            |
| Logistics dashboard | src/logistics/presentation/logistics.routes.js | src/logistics/presentation/dispatch-orders/views/operations-dashboard-view.vue   | /reference/platform/logistics          |
| Dispatch / POD      | src/logistics/presentation/logistics.routes.js | dispatch-orders and proof-of-delivery views                                      | /reference/platform/dispatch and /pod  |
| Buyer home          | src/app/app-routes.js                          | src/sales/presentation/buyer-portal/views/buyer-home-view.vue                    | /reference/portal/home                 |
| Buyer builder       | src/app/app-routes.js                          | src/sales/presentation/buyer-portal/views/buyer-request-builder-view.vue         | /reference/portal/request-builder      |
| Buyer orders        | src/app/app-routes.js                          | src/sales/presentation/buyer-portal/views/my-orders-view.vue                     | /reference/portal/orders               |
| Auth                | src/iam/presentation/iam.routes.js             | src/iam/presentation/views/login-view.vue                                        | /reference/auth/login                  |

## Golden visual observations

| Screenshot                    | Observation                                                                                                              | Component implications                                                   |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| sales-dashboard.png           | White 284px-ish sidebar, pale cool canvas, white panels, four operational KPI cards, blue/orange/cyan/red status blocks. | Sidebar, active navigation, status, cards/panels, dashboard composition. |
| sales-catalog.png             | Product media is on a white card/media plane; category and price hierarchy are visible.                                  | Product card, image containment, badges, action button.                  |
| sales-manual-order-entry*.png | Four operational phases with client/product/delivery/review decisions.                                                   | Stepper, forms, tables, recovery and confirmation.                       |
| buyer-main.png                | Horizontal portal nav, dark blue hero, white work cards, tracking panel.                                                 | Separate portal shell and scoped hero treatment.                         |
| login-1.png                   | Split blue brand plane and white form plane.                                                                             | Auth frame, fields, language/action controls.                            |
| Register-1-error.png          | Registration stepper, inline red validation, slider and back/next actions.                                               | Form errors, progress, focus and recovery.                               |

## Comparison axes

The same Vue and Angular viewport capture must be compared for each selected route:

| Axis        | Question                                                                         | Classification       |
| ----------- | -------------------------------------------------------------------------------- | -------------------- |
| Composition | Are shell, hero, panel and workflow regions in the same relationship?            | MATCH / DELTA / OPEN |
| Geometry    | Are sidebar, topbar, controls and rows proportionate?                            | MATCH / DELTA / OPEN |
| Spacing     | Do gutters, panel padding and 4px rhythm preserve the scan path?                 | MATCH / DELTA / OPEN |
| Typography  | Do role, weight, line height and identifier treatments carry the same hierarchy? | MATCH / DELTA / OPEN |
| Color       | Are blue, slate, status, role and temperature colors semantic and restrained?    | MATCH / DELTA / OPEN |
| Radius      | Is the active nav row approximately 8px and are pills limited to compact status? | MATCH / DELTA / OPEN |
| Density     | Does the screen preserve operational whitespace without hiding work?             | MATCH / DELTA / OPEN |
| Iconography | Are PrimeIcons quiet, aligned and subordinate to labels?                         | MATCH / DELTA / OPEN |
| Hierarchy   | Can a user find context, primary action, state and recovery in the same order?   | MATCH / DELTA / OPEN |
| Affordance  | Do buttons, links, menus, drawers and errors behave visibly and accessibly?      | MATCH / DELTA / OPEN |

## Known v0.6 implementation deltas

- Documentation IA is broader than the v0.5 shell and is not intended to look like an operational dashboard.
- Angular reference shells are synthetic; content and data are not production parity.
- Active navigation geometry was corrected from the v0.5 18px capsule to the Vue/FLOW approximately 8px row with inset edge.
- Documentation/reference routes are lazy-loaded; this is an engineering change, not a visual claim.
- Matched Vue/Angular screenshot capture at 1440×900 and 390×844 remains required before declaring parity.

## Evidence protocol

1. Capture Vue and Angular at the same route, viewport, browser scale and content state.
2. Record filename, URL, viewport, commit SHA and capture timestamp.
3. Annotate only observable deltas; separate inference and implementation cause.
4. Fix one axis at a time and recapture.
5. Human designer reviews the comparison before any parity status is promoted.

No aggregate score is used. A total score would hide route-specific failures.
