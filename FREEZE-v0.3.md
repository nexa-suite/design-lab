# Nexa Design Lab — Mini Freeze v0.3

Status: superseded by `STYLE-GUIDELINES-v0.4.md`; retained as the original visual freeze
Date: 2026-08-16
Workspace: `/Users/diegosandoval284/Developer/nexa-design-lab`

## Frozen baseline

- Runtime: Angular standalone application. No Vue runtime.
- Initial surface: Sales Dashboard.
- Shell: Vue `ops-layout.vue` reverse-engineered into Angular.
- Dashboard: Vue `commercial-dashboard-view.vue` reverse-engineered into Angular.
- Styling source: Vue `ops.css` values and component structure.
- Icons: PrimeIcons stylesheet loaded from CDN to match the Vue implementation.
- Active navigation: pale blue row, blue inset left bar, quiet line icon, rounded right edge.
- Navigation groups: `WORKSPACE`, `SALES`, `ACCOUNT`.
- Dashboard layout: action header, flow banner, four KPI cards, 7/5 panels, 8/4 panels and quick actions.
- Product media: white surface, contained images, no text overlap.
- Responsive baseline: desktop sidebar; mobile sidebar hidden and dashboard stacked.

## Source references

- `src/app/presentation/layouts/ops-layout.vue`
- `src/sales/presentation/commercial-validation/views/commercial-dashboard-view.vue`
- `src/assets/styles/ops.css`

Remote source repository: `upc-pre-202610-1asi0730-12242-king/nexa-webapp`.

## Local boundaries

- Do not edit `/Users/diegosandoval284/Developer/nexa-suite` from this lab.
- Do not send to the auditor yet.
- Do not commit or push without explicit instruction.
- Do not replace Vue-derived values with report-derived rules.
- Do not add new dashboard sections, metrics, navigation or product data without approval.

## Resume tomorrow

```bash
cd /Users/diegosandoval284/Developer/nexa-design-lab
npm start -- --host 127.0.0.1 --port 4301
```

Validation baseline:

```bash
npm run build
npm test -- --watch=false
npm audit --omit=dev --audit-level=high
```

Last verified for the v0.3 baseline: build PASS, tests 2/2 PASS, audit 0 vulnerabilities, desktop/mobile browser smoke PASS, console errors 0.
