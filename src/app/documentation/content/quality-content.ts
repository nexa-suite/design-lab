import type { DocumentationPageContent } from '../models/documentation-page';

export const QUALITY_CONTENT: readonly DocumentationPageContent[] = [
  {
    id: 'accessibility-lab', label: 'Accessibility Lab', icon: 'pi-shield', group: 'QUALITY', kind: 'quality', eyebrow: 'Q1 / ACCESSIBILITY', title: 'Accessibility is shown, not claimed', intro: 'Focus, target size, keyboard, text resize, non-color cues, reduced motion, names and reflow are visible evaluation modes.', summary: 'Evidence supports later manual review; it is not certification.', keywords: ['accessibility', 'focus', 'keyboard', 'targets', 'reflow'], decision: 'WCAG 2.2 is mechanical baseline; manual assistive-technology review remains open.', foundation: 'Native semantics, visible focus and readable state composition.', angularContract: 'Strict templates, aria attributes, keyboard-native controls and tests.', adoptionMapping: 'A11y annotations and state coverage per component.'
  },
  {
    id: 'contrast-lab', label: 'Contrast Lab', icon: 'pi-eye', group: 'QUALITY', kind: 'quality', eyebrow: 'Q2 / CONTRAST', title: 'Contrast ratios are derived from actual candidate colors', intro: 'The matrix renders foreground, background, ratio, WCAG gate and pass/fail for approved semantic contracts.', summary: 'No hand-written ratios.', keywords: ['contrast', 'WCAG', 'ratio', 'AA', 'color'], decision: 'Normal text 4.5:1, large text 3:1 and essential UI 3:1.', foundation: 'Primitive colors feed approved semantic foreground/background pairs.', angularContract: 'Shared contrast utility parses candidate color formats and gates contracts.', adoptionMapping: 'Color pairing and accessibility annotations remain explicit.'
  },
  {
    id: 'heuristics', label: 'Nielsen Heuristics', icon: 'pi-check-circle', group: 'QUALITY', kind: 'quality', eyebrow: 'Q3 / HEURISTICS', title: 'Heuristics become small visual checks', intro: 'Each heuristic pairs concise guidance with a tiny Nexa interaction example.', summary: 'Quality guidance stays actionable and compact.', keywords: ['heuristics', 'visibility', 'recovery', 'error prevention'], decision: 'Ten heuristics remain a quality authority, not a fake product audit.', foundation: 'Live state transitions and recovery paths.', angularContract: 'Examples use the same reusable candidate components.', adoptionMapping: 'Review criterion, specimen, severity and open question.'
  },
  {
    id: 'input-modality', label: 'Input Modality', icon: 'pi-keyboard', group: 'QUALITY', kind: 'quality', eyebrow: 'Q4 / INPUT', title: 'Pointer, keyboard and touch share one contract', intro: 'Keyboard showcase demonstrates Tab, Shift+Tab, Space, Enter, Escape and arrows only where appropriate.', summary: 'Native interaction models stay recognizable.', keywords: ['keyboard', 'pointer', 'touch', 'focus'], decision: 'Do not invent keyboard behavior that conflicts with native controls.', foundation: 'Focus geometry and 44px hit target.', angularContract: 'Native HTML first; Angular Aria/CDK for composite behavior.', adoptionMapping: 'Input modality annotation per component.'
  },
  {
    id: 'component-maturity', label: 'Component Maturity', icon: 'pi-bookmark', group: 'QUALITY', kind: 'quality', eyebrow: 'Q5 / MATURITY', title: 'Maturity separates direction from certification', intro: 'Experimental, Candidate, Frozen and Deprecated states are defined with visual inventory coverage.', summary: 'Frozen means human direction should not change casually.', keywords: ['maturity', 'experimental', 'candidate', 'frozen', 'deprecated'], decision: 'Production package and certification remain deferred.', foundation: 'Evidence depth, API quality, interaction coverage and accessibility proof.', angularContract: 'Maturity is documentation metadata, not runtime behavior.', adoptionMapping: 'Library status and review ownership.'
  },
];

