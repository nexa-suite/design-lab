# NEXA DESIGN LAB v0.6 — Traceability

Status: CANDIDATE. This matrix is rebuilt for v0.6. It does not copy v0.5 implementation claims and does not establish production parity.

## Documentation routes

| Human/design question    | Evidence                                           | Design Lab route          | Implementation owner                    | Status    |
| ------------------------ | -------------------------------------------------- | ------------------------- | --------------------------------------- | --------- |
| Orientation and boundary | Human direction, Vue/FLOW boundary                 | /guidelines/overview      | NexaDocumentationPage                   | Candidate |
| Principles               | Human direction, Vue dashboard/portal observations | /guidelines/principles    | NexaDocumentationPage                   | Candidate |
| Foundations              | Vue tokens.css and shell CSS                       | /guidelines/foundations/* | NexaDocumentationPage + semantic tokens | Candidate |
| Component contracts      | Vue/FLOW specimens and Angular behavior guidance   | /guidelines/components/*  | NexaDocumentationPage                   | Candidate |
| Workflow patterns        | Vue sales, logistics, portal and auth routes       | /guidelines/patterns/*    | NexaDocumentationPage                   | Candidate |
| Quality                  | WCAG, NN/G, human review boundary                  | /guidelines/quality/*     | NexaDocumentationPage                   | Candidate |
| Engineering              | Angular docs, lazy routes, token ownership         | /guidelines/engineering/* | NexaDocumentationPage + route config    | Candidate |

## Reference route matrix

| Angular route                           | FLOW evidence                                    | Vue source / route                                       | Angular component         | Notes                                              |
| --------------------------------------- | ------------------------------------------------ | -------------------------------------------------------- | ------------------------- | -------------------------------------------------- |
| /reference/platform/dashboard           | SALES/sales-dashboard.png                        | commercial-dashboard-view.vue; /ops/commercial/dashboard | NexaDashboard             | Synthetic reference; shell and hierarchy evidence. |
| /reference/platform/catalog             | SALES/sales-catalog.png                          | product-catalog/views/catalog-view.vue                   | NexaReferenceScreen       | Product surface remains white.                     |
| /reference/platform/purchase-requests   | SALES/sales-purchase-req*.png                    | request-inbox-view.vue                                   | NexaReferenceScreen       | Modal/review states are reference fixtures.        |
| /reference/platform/manual-order-entry  | SALES/sales-manual-order-entry*.png              | create-order-view.vue                                    | NexaManualOrderReference  | Four-phase local flow.                             |
| /reference/platform/sales-orders        | SALES/sales-orders.png; sales-purchase-order.png | orders-view.vue                                          | NexaOperationalTable      | Table/row evidence; no API claim.                  |
| /reference/platform/clients             | SALES/sales-b2b-clients.png                      | clients-view.vue                                         | NexaReferenceScreen       | Domain label retained.                             |
| /reference/platform/inventory           | LOGISTICS/logistics-inventory-control.png        | inventory-view.vue                                       | NexaInventoryReference    | Logistics reference.                               |
| /reference/platform/logistics           | LOGISTICS/logistics-dashboard.png                | operations-dashboard-view.vue                            | NexaReferenceScreen       | Operational dashboard fixture.                     |
| /reference/platform/dispatch            | LOGISTICS/logistics-dispatch-orders*.png         | dispatch-orders views                                    | NexaReferenceScreen       | Move/detail evidence.                              |
| /reference/platform/pod                 | LOGISTICS/logistics-pod.png                      | proof-of-delivery view                                   | NexaReferenceScreen       | Delivery proof fixture.                            |
| /reference/platform/analytics           | LOGISTICS/logistics-analytics.png                | analytics-view.vue                                       | NexaAnalyticsReference    | SVG/text data fixture.                             |
| /reference/portal/home                  | BUYER-PORTAL/buyer-main.png                      | buyer-home-view.vue; /portal/home                        | NexaPortalHomeReference   | Separate horizontal portal shell.                  |
| /reference/portal/catalog               | BUYER-PORTAL/buyer-prod-catalog.png              | buyer-catalog-view.vue                                   | NexaReferenceScreen       | White product media surface.                       |
| /reference/portal/request-builder       | BUYER-PORTAL/buyer-request-builder-phase-*.png   | buyer-request-builder-view.vue                           | NexaReferenceScreen       | Phase evidence.                                    |
| /reference/portal/orders                | BUYER-PORTAL/buyer-my-orders.png                 | my-orders-view.vue                                       | NexaPortalOrdersReference | Order/tracking fixture.                            |
| /reference/portal/profile/support/legal | matching BUYER-PORTAL files                      | portal views                                             | NexaReferenceScreen       | Separate reference screens, not policy authority.  |
| /reference/auth/login                   | LOGIN/login-1.png                                | login-view.vue; /auth/login                              | NexaAuthReference         | Auth split composition.                            |
| /reference/auth/workspace               | LOGIN/login-workspace detected.png               | workspace-login-form.vue                                 | NexaAuthReference         | Workspace selection fixture.                       |

## Component-level mapping

| Component         | FLOW/Vue evidence                      | Documentation                                            | Angular implementation             |
| ----------------- | -------------------------------------- | -------------------------------------------------------- | ---------------------------------- |
| Active navigation | SALES/dashboard; ops.css .nav-item     | components/navigation-sidebars; foundations/shape-radius | Design Lab shell + reference shell |
| PrimeIcon action  | All ops/portal screens                 | foundations/iconography; components/buttons              | Reference templates                |
| Status badge      | SALES/dashboard, request/order screens | components/status-badges                                 | Reference templates                |
| Product card      | SALES/catalog, BUYER-PORTAL/catalog    | components/cards-panels; components/status-badges        | Product reference styles           |
| Form field        | LOGIN and REGISTER; auth-layout.vue    | components/text-fields; patterns/forms/authentication    | Auth reference + specimens         |
| Stepper           | REGISTER; manual order; buyer builder  | components/progress-steppers; patterns/workflows         | Manual order/auth references       |
| Table             | SALES orders; LOGISTICS inventory      | components/lists-tables                                  | NexaOperationalTable / inventory   |
| Panel             | SALES dashboard; portal home           | components/cards-panels; patterns/dashboards             | Reference screens                  |

## Known corrections from prior candidate

- Removed eager imports for documentation and reference routes.
- Replaced broad v0.5 pages with a routed v0.6 documentation registry.
- Restored 8px active navigation geometry and inset blue edge.
- Kept portal/auth compositions scoped instead of generalizing dashboard styling.
- Deleted unused v0.5 guideline and Material bench source files.

## Not claimed

No route in this matrix proves API parity, production readiness, accepted Blueprint design, human approval or matched screenshot parity.
