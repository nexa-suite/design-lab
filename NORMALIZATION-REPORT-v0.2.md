# NEXA DESIGN LAB v0.2 — NORMALIZATION REPORT

## 1. VERDICT

PASS for experimental Design Lab normalization. Human design approval remains required. No production or Blueprint adoption claim.

## 2. REPOSITORY STATE

- Repository: `nexa-suite/design-lab`
- Local checkout: `/Users/diegosandoval284/Developer/nexa-design-lab`
- Starting state: local source had no Git metadata; remote repository was verified empty with `git ls-remote` before initialization.
- Branch: `main`.
- Implementation commit: `a442f8d96775b1bd83417626bbe05facb9424ab3`.
- Remote push: `origin/main` created and tracking successfully.
- No force-push, tag, release, branch-protection or organization change.

## 3. RESEARCH REVIEWED

Reviewed 2026-08-16:

- [Angular versioning and releases](https://angular.dev/reference/releases): Angular 22 active; local packages are Angular 22.1.x.
- [Angular component anatomy](https://angular.dev/guide/components): standalone components, component-local template/style files and explicit imports.
- [Angular Material theming](https://material.angular.dev/guide/theming): current official theming surface; bench uses public Material components.
- [Sass `@use`](https://sass-lang.com/documentation/at-rules/use/) and [`@forward`](https://sass-lang.com/documentation/at-rules/forward/): module organization; no new `@import`.
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/): AA contrast, focus, target and reflow quality direction.
- [CSS Color 4](https://www.w3.org/TR/css-color-4/): OKLCH color model reference.
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/): native semantics and interaction patterns.
- [Design Tokens Format](https://www.designtokens.org/tr/drafts/format/): token architecture informed, no token compiler introduced.

## 4. LEGACY DNA PRESERVED

- White/light sidebar, pale blue canvas and restrained toolbar.
- Compact workspace identity and grouped navigation.
- Blue active navigation with inset marker.
- Strong page heading, action-led dashboard and low-noise panels.
- Four workload cards, request/document split, credit queue, quick actions and activity.
- White product media surfaces, realistic catalog-shaped data and explicit action labels.
- Plus Jakarta Sans, Inter, quiet icons, subtle borders and limited elevation.

## 5. LEGACY DEBT REMOVED

- Removed S1/S2/S3 from current user-facing copy.
- Removed seller-side `Purchase Orders` wording in favor of `Sales Orders`.
- Removed role-success color coupling; Sales role now has role-specific tokens.
- Added accessible warning, danger and cold-chain foreground roles.
- Replaced mobile sidebar disappearance with drawer navigation.
- Replaced static-only review surface with interactive controls and feedback.
- Kept old v0.3 freeze as provenance; current guidance no longer calls Vue visual authority.

## 6. PRODUCT SEMANTIC CORRECTIONS

`Purchase Request` remains distinct from seller-side `Sales Order`. No Premium, Subscription, Plans, Entitlements, tenant provisioning, V1 Mobile or IoT claims added. No unresolved buyer reconfirmation rule invented.

## 7. COLOR SYSTEM

- Primary anchor: `#2563EB`, approximately `oklch(54.6% 0.215 262.9)`.
- Candidate scale: blue-50 through blue-950 with controlled OKLCH lightness/chroma progression.
- Semantic palettes: neutral, info, success, warning, danger, role-sales, refrigerated and frozen.
- Gamut strategy: use CSS OKLCH primitives for blue scale; candidate hex/OKLCH and contrast are rendered for visual review.
- Human review remains required before treating candidates as final brand palette.

## 8. CONTRAST AUDIT

Active combinations are rendered in Contrast Lab. Key results:

| Usage             | Foreground | Background | Ratio   | Result                           |
| ----------------- | ---------- | ---------- | ------- | -------------------------------- |
| Body text         | `#0F172A`  | `#FFFFFF`  | 17.85:1 | PASS                             |
| Secondary text    | `#64748B`  | `#FFFFFF`  | 4.76:1  | PASS                             |
| Muted metadata    | `#94A3B8`  | `#FFFFFF`  | 2.56:1  | FAIL; non-essential only         |
| Primary action    | `#FFFFFF`  | `#2563EB`  | 5.17:1  | PASS                             |
| Warning status    | `#92400E`  | `#FFFBEB`  | 6.84:1  | PASS                             |
| Danger status     | `#991B1B`  | `#FEF2F2`  | 7.60:1  | PASS                             |
| Cold-chain status | `#075985`  | `#F0F9FF`  | 7.09:1  | PASS                             |
| Subtle border     | `#E2E8F0`  | `#FFFFFF`  | 1.23:1  | FAIL; decorative separation only |
| Focus indicator   | `#2563EB`  | `#FFFFFF`  | 5.17:1  | PASS                             |

No certification claim. Ratios calculated using WCAG relative-luminance method; browser and human review still required.

## 9. TYPOGRAPHY

Plus Jakarta Sans remains display type; Inter remains UI/body; JetBrains Mono is selective for identifiers. Compact metadata is documented at 12–13px; routine copy remains around 14px. Tabular numerals used where scanning benefits.

## 10. SPACING / SHAPE / SURFACE

4px-derived scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64. Radius hierarchy is 6–8px controls, 10–12px panels and 12–16px overlays. Low-shadow surfaces use borders and role separation first.

## 11. TOKEN ARCHITECTURE

- Primitive: `src/styles/_tokens-primitives.scss`.
- Semantic: `src/styles/_tokens-semantic.scss`.
- Component: `src/styles/_tokens-components.scss`.
- Entry module: `src/styles/_tokens.scss`.
- No DTCG JSON, Style Dictionary, generated package or runtime theme engine.

## 12. RESPONSIVE

- Desktop: persistent 284px sidebar.
- Tablet: compact sidebar and two-column content where viable.
- Mobile: visible topbar menu trigger, modal drawer, backdrop, close button, Escape handling and focus restoration.
- Tables: semantic table with horizontal overflow, not ambiguous card conversion.

## 13. ACCESSIBILITY

Implemented native buttons, labels, headings, landmarks, `aria-current`, dialog semantics for drawer, focus-visible rings, `role=status`, keyboard-close behavior and reduced-motion scroll behavior. Browser automation, keyboard spot checks and contrast review performed. No WCAG certification claim.

## 14. ANGULAR MATERIAL COMPATIBILITY

| Area                               | Decision                            | Rationale                                                                |
| ---------------------------------- | ----------------------------------- | ------------------------------------------------------------------------ |
| Buttons, form field, input, select | THEME MATERIAL                      | Mature interaction primitives; Nexa density and color contract required. |
| Checkbox, radio, slide toggle      | THEME MATERIAL                      | Standard behavior useful; visual review remains.                         |
| Menu, tooltip, progress            | KEEP MATERIAL                       | Appropriate primitives, low custom behavior.                             |
| Shell, dashboard, status, catalog  | CUSTOM PREFERRED                    | Nexa-specific composition and information hierarchy.                     |
| Drawer behavior                    | CDK PREFERRED / custom presentation | Behavior/focus concerns separate from Nexa surface.                      |
| Dialog                             | UNDECIDED                           | Not needed for current reference surface.                                |
| Table                              | CUSTOM PREFERRED                    | Semantic operational layout and overflow contract.                       |

## 15. ICONOGRAPHY

PrimeIcons remains current visual candidate. Material Icons is exercised for comparison. Human review required for final choice; duplicate dependency cleanup remains an open decision.

## 16. ANGULAR / SCSS ARCHITECTURE

Root app owns composition and cross-component action feedback. Shell, dashboard, style guidelines, operational table and Material bench are colocated standalone components with `OnPush`, signals and outputs. SCSS consumes tokens; global Sass uses modules; no `::ng-deep` or undocumented Material internals.

## 17. VISUAL COMPARISON

v0.1 visual composition remains recognizable. v0.2 changes are deliberate: user-oriented workflow copy, Sales Orders terminology, role/status separation, safer status text, real mobile drawer, contrast evidence, Material comparison and operational table reference.

## 18. TESTING

Commands:

```text
npm test -- --watch=false
npm run build
npm audit --omit=dev --audit-level=high
```

Results: 5/5 tests PASS; production build PASS; audit PASS with 0 vulnerabilities. Browser checkpoints: 1440, 1024, 768 and 390px; page-level horizontal overflow 0; mobile drawer open/close/focus restoration PASS; console errors 0.

## 19. FILES CHANGED

Full tracked source list:

```text
.editorconfig
.gitignore
.prettierrc
.vscode/extensions.json
.vscode/launch.json
.vscode/tasks.json
CHANGELOG.md
FREEZE-v0.3.md
NORMALIZATION-REPORT-v0.2.md
README.md
STYLE-GUIDELINES-v0.2.md
angular.json
package-lock.json
package.json
public/catalog-items/*.png
public/favicon.ico
src/app/app.config.ts
src/app/app.html
src/app/app.scss
src/app/app.spec.ts
src/app/app.ts
src/app/dashboard/dashboard.html
src/app/dashboard/dashboard.scss
src/app/dashboard/dashboard.ts
src/app/demo-data.ts
src/app/material-bench/material-bench.html
src/app/material-bench/material-bench.scss
src/app/material-bench/material-bench.ts
src/app/operational-table/operational-table.html
src/app/operational-table/operational-table.scss
src/app/operational-table/operational-table.ts
src/app/shared/ui-action.ts
src/app/shell/shell.html
src/app/shell/shell.scss
src/app/shell/shell.ts
src/app/style-guidelines/style-guidelines.html
src/app/style-guidelines/style-guidelines.scss
src/app/style-guidelines/style-guidelines.ts
src/index.html
src/main.ts
src/styles.scss
src/styles/_accessibility.scss
src/styles/_material-theme.scss
src/styles/_motion.scss
src/styles/_tokens-components.scss
src/styles/_tokens-primitives.scss
src/styles/_tokens-semantic.scss
src/styles/_tokens.scss
src/styles/_typography.scss
tsconfig.app.json
tsconfig.json
tsconfig.spec.json
```

## 20. OPEN DESIGN DECISIONS

### Icon system

Context: PrimeIcons matches current visual weight; Material Icons simplifies Angular-native loading.

Option A: keep PrimeIcons. Option B: move to Material Icons. Recommendation: keep PrimeIcons for review parity. Trade-off: external dependency versus optical consistency.

### Muted metadata and subtle border

Context: historical softness fails normal-text/non-text contrast when used as required content/boundary.

Option A: retain only for non-essential decoration. Option B: darken active metadata/boundaries. Recommendation: role-based use shown in Contrast Lab. Trade-off: stronger required boundaries add visual weight.

## 21. PRODUCT / DOMAIN DECISIONS

Buyer reconfirmation after Purchase Request adjustment remains unresolved. No Product behavior invented.

## 22. RISKS

- OKLCH support and final palette need browser matrix and human visual review.
- PrimeIcons CDN and Google Fonts are experimental external dependencies.
- Material theme parity needs focused review across browser/OS combinations.
- Design Lab remains static demo evidence; no API or production contract validation.

## 23. REPOSITORY SAFETY

Blueprint modified: NO
Platform modified: NO
Portal modified: NO
Website modified: NO
API modified: NO
Legacy modified: NO

## 24. FINAL STATUS

NEXA DESIGN LAB v0.2 NORMALIZATION COMPLETE.
LEGACY VISUAL DNA PRESERVED INTENTIONALLY.
TARGET FOUNDATION REMAINS EXPERIMENTAL UNTIL HUMAN DESIGN APPROVAL.
