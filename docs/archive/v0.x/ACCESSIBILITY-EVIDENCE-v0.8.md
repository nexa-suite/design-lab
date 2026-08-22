# Nexa Design Lab v0.8 — Accessibility Evidence

The lab records rendered and automated evidence for later human review. It does not claim WCAG certification or complete assistive-technology validation.

## Functional evaluation modes

| Mode | Root behavior | Observable result |
| --- | --- | --- |
| Standard contrast | `data-contrast-mode="standard"` | Baseline light semantic tokens |
| Increased contrast | `data-contrast-mode="increased"` | Stronger secondary text, muted text, borders and focus ring |
| Motion | `data-motion-mode="motion"` | Tokenized transitions and activity cues |
| Reduced motion | `data-motion-mode="reduced"` | Non-essential transitions/spinner motion collapse while state remains |
| Text scale | `--nexa-doc-text-scale` 1 / 1.5 / 2 | Rendered documentation text grows without JavaScript layout |
| Target overlay | `data-target-overlay="true"` | Evaluation outlines expose hit-area review |

The modes change root semantic values or actual motion rules; labels alone are not accepted as evidence.

## v0.8 coverage

| Dimension | Evidence | Boundary |
| --- | --- | --- |
| Focus | Real control `:focus-visible` rings; checkbox wrapper no longer paints a fake rectangle | Full keyboard walkthrough remains human |
| Keyboard | Native controls, Action Menu arrows/Home/End/Escape, Tooltip Escape and retry buttons | Screen-reader command review remains human |
| Names and roles | Native inputs/buttons, menu roles, tooltip relationship, status, tables, progress and article navigation | Manual AT announcement review remains open |
| Non-color cues | Labels, icons, shape, position, status text and emphasis | Principal design owner reviews copy and severity |
| Contrast | 14 approved token pair contracts, including emphasized warning and strong danger | Automation is not certification |
| Async recovery | Happy, warning/cancel and error/retry sequences retain context | No backend or domain transition is claimed |
| Reflow | Grid/flex/minmax, local table scroll and 1440/1024/768/390/320 targets | 200% browser and 400% reflow review remains a handoff |

## Changed-page review set

Brand / Logo, Checkbox, Menus, Tooltips, Async Operations, Authentication, Legal Content, Payments, Analytics, Dispatch Board, Data-Dense Operations, Heuristics and Accessibility Lab are the v0.8 browser QA set.

## Acceptance boundary

No critical state depends on color alone. Focus is visible on the actual control. Errors identify the problem and next recovery. Loading, empty, unavailable, disabled and read-only states remain distinct. Human design, content, keyboard and assistive-technology review owns the final interpretation.
