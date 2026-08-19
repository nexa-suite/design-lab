# Nexa Design Lab v0.4 traceability

Legacy visual repository: `upc-pre-202610-1asi0730-12242-king/nexa-webapp`

Legacy source SHA: `b6200959ac53976db8588718c788e7b16362be02`

FLOW archive: `/Users/diegosandoval284/Downloads/FLOW.zip` (temporary local extraction only; not committed)

## Golden routes

| Angular route | FLOW reference | Legacy Vue evidence | Contracts |
| --- | --- | --- | --- |
| `/reference/platform/dashboard` | `FLOW/SALES/sales-dashboard.png` | `src/sales/presentation/commercial-validation/views/commercial-dashboard-view.vue` | platform shell, page header, KPI card, work surface, status |
| `/reference/platform/catalog` | `FLOW/SALES/sales-catalog.png` | `src/catalog-management/presentation/product-catalog/views/catalog-view.vue` | shell, filter panel, product card, search, badges |
| `/reference/platform/purchase-requests` | `FLOW/SALES/sales-purchase-req-modal.png` | `src/sales/presentation/commercial-validation/views/commercial-validation-view.vue` | request row, modal, summary, status |
| `/reference/platform/inventory` | `FLOW/LOGISTICS/logistics-inventory-control.png` | `src/warehouse/presentation/inventory-control/views/inventory-view.vue` | logistics shell, alert, KPI, tabs, warehouse, table |
| `/reference/portal/home` | `FLOW/BUYER-PORTAL/buyer-main.png` | `src/sales/presentation/buyer-portal/views/buyer-home-view.vue` | horizontal portal nav, hero, metrics, tracking |
| `/reference/portal/catalog` | `FLOW/BUYER-PORTAL/buyer-prod-catalog.png` | `src/catalog-management/presentation/product-catalog/views/buyer-catalog-view.vue` | portal shell, product card, search |
| `/reference/portal/request-builder` | `FLOW/BUYER-PORTAL/buyer-request-builder-phase-1.png` | `src/sales/presentation/buyer-portal/views/buyer-request-builder-view.vue` | wizard, native fields, selected product |
| `/reference/auth/login` | `FLOW/LOGIN/login-1.png` | `src/auth/presentation/views/login-view.vue` | split auth, Nexa mark, locale controls, fields |
| `/guidelines/material` | technical lab | Angular Material bench | native select, Nexa action menu |

## Copied asset provenance

Copied from the Legacy repository at the source SHA above into Design Lab:

- `public/brand/nexa.svg` from `src/assets/img/nexa.svg`
- `public/brand/nexa-white.svg` from `src/assets/img/nexa-white.svg`
- `public/brand-logos/logo-paysan-breton.png` from `public/brand-logos/logo-paysan-breton.png`
- `public/brand-logos/logo-cavour.png` from `public/brand-logos/logo-cavour.png`
- `public/brand-logos/logo-agriform.png` from `public/brand-logos/logo-agriform.png`
- `public/brand-logos/logo-green-island.png` from `public/brand-logos/logo-green-island.png`
- `public/brand-logos/logo-sancho-panza.png` from `public/brand-logos/logo-sancho-panza.png`
- `public/catalog-items/paysan-breton-mantequilla-sin-sal-20x10g.png` from `public/catalog-items/paysan-breton-mantequilla-sin-sal-20x10g.png`
- `public/catalog-items/cavour-coppa-molde-3kg.png` from `public/catalog-items/cavour-coppa-molde-3kg.png`

FLOW screenshots remain evidence only. They are not imported into runtime or committed.
