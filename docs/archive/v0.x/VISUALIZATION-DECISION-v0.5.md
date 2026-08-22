# Visualization Decision — v0.5

## Decision

Use token-driven, accessible inline SVG for the analytics reference. No chart package added.

## Why

Current reference needs three circular progress indicators, two determinate tracks and a compact status comparison. SVG gives exact control over Nexa geometry, keeps the bundle small, and supports a textual/table representation beside every visual. Arbitrary CSS bars are removed.

## Candidates

| Candidate                                                                   | Result                                                                                                                            |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Custom SVG                                                                  | Selected. No dependency, exact identity, small scope, accessible text equivalent.                                                 |
| [Carbon Charts Angular](https://charts.carbondesignsystem.com/installation) | Rejected for v0.5. Capable and official, but adds dependency, styles and a larger visual abstraction for a small reference scope. |
| [ngx-charts](https://www.npmjs.com/package/%40swimlane/ngx-charts)          | Rejected. Angular 22 compatibility was not verified; latest visible release is alpha.                                             |

## Accessibility contract

Every SVG has a concise text label. KPI rings expose value, numerator and denominator in visible text. Status comparison includes a semantic list. No chart is the only carrier of an operational fact.
