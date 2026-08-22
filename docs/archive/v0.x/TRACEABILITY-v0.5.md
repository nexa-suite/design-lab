# Nexa Design Lab v0.5 — Traceability

Scope: current Design Lab candidate only. Synthetic data remains local reference data. No production application, Blueprint or Legacy checkout changed.

## Visual authority

| Route                                    | Vue/FLOW evidence                                                                                                          | Angular reference           | v0.5 decision                                                              |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | --------------------------- | -------------------------------------------------------------------------- |
| `/reference/platform/dashboard`          | `FLOW/SALES/sales-dashboard.png` and Legacy `src/platform/presentation/views/sales-dashboard-view.vue`                     | Existing routed dashboard   | Retained shell; active navigation and spacing normalized.                  |
| `/reference/auth/login`                  | `FLOW/LOGIN/login-1.png`; Legacy `src/iam/presentation/views/login-view.vue`, `src/iam/presentation/views/auth-layout.vue` | `NexaAuthReference`         | Rebuilt split login with real brand panel, workspace card, fields and CTA. |
| `/reference/auth/workspace`              | `FLOW/LOGIN/login-workspace detected.png`; Legacy `src/iam/presentation/components/workspace-login-form.vue`               | `NexaAuthReference`         | Added selected ICISA preview and same form path.                           |
| `/reference/platform/manual-order-entry` | `FLOW/SALES/sales-manual-order-entry*.png`; Legacy `src/sales/presentation/views/manual-order-entry-view.vue`              | `NexaManualOrderReference`  | Four usable local steps: client, products, delivery and confirm.           |
| `/reference/platform/analytics`          | `FLOW/LOGISTICS/logistics-analytics.png`; Legacy `src/logistics/presentation/views/analytics-view.vue`                     | `NexaAnalyticsReference`    | Replaced placeholder CSS chart wall with token-driven SVG and text.        |
| `/reference/portal/home`                 | `FLOW/BUYER-PORTAL/buyer-main.png`; Legacy `src/buyer-portal/presentation/views/buyer-home-view.vue`                       | `NexaPortalHomeReference`   | Added next action, recent activity and commercial context hierarchy.       |
| `/reference/portal/orders`               | `FLOW/BUYER-PORTAL/buyer-my-orders.png`; Legacy `src/buyer-portal/presentation/views/my-orders-view.vue`                   | `NexaPortalOrdersReference` | Added order detail, status, route, documents and tracking checkpoints.     |
| `/reference/platform/sales-orders`       | Nexa operational table guideline                                                                                           | `NexaOperationalTable`      | Added local search, status filter, sort, menu and state specimens.         |

## Shared contract matrix

| Contract            | Used by                                               |
| ------------------- | ----------------------------------------------------- |
| `NexaButton`        | Auth, manual order, portal home and portal orders     |
| `NexaNativeSelect`  | Material bench and manual order                       |
| `NexaActionMenu`    | Material bench and operational table                  |
| `NexaStatusChip`    | Analytics, manual order, portal home/orders and table |
| `NexaSurface`       | All extracted v0.5 screens                            |
| `NexaTableShell`    | Operational table and portal orders                   |
| `NexaPageHeader`    | Analytics, manual order, portal home/orders           |
| `NexaProgressSteps` | Manual order                                          |

## Corrections

- Previous auth trace incorrectly named `src/auth/presentation/views/login-view.vue`; source is IAM and is corrected above.
- v0.2 remains historical and is not edited. `STYLE-GUIDELINES-v0.5.md` is current candidate authority and explicitly marks v0.2/v0.4 history as superseded where applicable.
- `NexaActionMenu` now uses Angular Aria menu behavior with CDK Overlay; custom conditional menu panel removed from Material Bench.
