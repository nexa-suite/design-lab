# Nexa Design Lab v0.7 — Accessibility Evidence

This document records what the laboratory renders and automates for later human review. It does not claim WCAG certification or complete assistive-technology validation.

## Accessibility Lab coverage

| Review dimension | Evidence in the lab | Automation / human boundary |
| --- | --- | --- |
| Focus | visible `:focus-visible` ring aligned to component geometry | route/specimen rendering; keyboard review remains human |
| Keyboard | native Tab, Space, Enter, Escape and control-specific arrows | interaction tests cover selected specimens; full walkthrough remains human |
| Targets | target overlay mode shows control bounds and 44px guidance | visual evaluation mode; target suitability needs human review |
| Names and roles | labels, `aria-describedby`, `aria-current`, dialog/menu/switch semantics | DOM contract tests and browser inspection |
| Non-color cues | labels, icons, shape, position and status text accompany hue | visual specimens; human content review remains open |
| Contrast | Contrast Lab uses normal, large and non-text thresholds | deterministic shared contrast utility and contrast gate |
| Increased Contrast | semantic token overrides strengthen text, borders and focus | shell evaluation toggle and visual review |
| Reduced Motion | non-essential transitions are removed or shortened | shell toggle and CSS media fallback |
| Text resize | 100%, 150% and 200% evaluation scale | typography matrix and shell control; reflow still needs manual review |
| Reflow | intrinsic grid/flex, local table/matrix scroll only | required viewport inspection at 320–1440px |

## Visible proof routes

- `/guidelines/quality/accessibility-lab`
- `/guidelines/quality/contrast-lab`
- `/guidelines/quality/input-modality`
- `/guidelines/foundations/typography`
- `/guidelines/components/text-fields`
- `/guidelines/components/navigation-sidebars`

## Review protocol

1. Start in Standard contrast and Motion mode.
2. Tab through the shell and current specimen; verify the focus ring is visible.
3. Enable Increased Contrast and repeat the visual comparison.
4. Enable Reduced Motion and trigger a state sequence.
5. Test 200% text and 400% reflow with browser zoom or equivalent tooling.
6. Test with a screen reader and record the result separately; no unperformed manual test is reported here as complete.

## Acceptance gates

- No critical state depends on color alone.
- Focus is visible and survives each component's geometry.
- Native semantics are preferred before ARIA composites.
- Text equivalents exist for progress and status.
- Error copy identifies the problem and the next recovery action.
- Disabled and read-only states remain distinguishable from loading and failure.

The lab prepares evidence. A human accessibility review owns the final interpretation.
