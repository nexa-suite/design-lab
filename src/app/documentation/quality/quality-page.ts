import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NexaStatusChip, NexaTextField, NexaToggle } from 'nexa-ui';
import { NexaLabEvaluation } from '../../lab/evaluation/lab-evaluation';
import { evaluateContrast, type ContrastResult } from '../../lab/quality/contrast';
import type { DocumentationPage } from '../models/documentation-page';
import { APPROVED_CONTRAST_PAIRS, HEURISTIC_ROWS, MATURITY_ROWS } from '../content/documentation-data';
import { injectDocumentationRouteContext } from '../layout/page-context';
import { NexaDocumentationFrame } from '../layout/documentation-page';

interface AuditRow { readonly component: string; readonly keyboard: string; readonly focus: string; readonly contrast: string; readonly nonColor: string; readonly target: string; readonly motion: string; readonly resize: string; }

@Component({
  selector: 'nexa-quality-page',
  imports: [NexaDocumentationFrame, NexaStatusChip, NexaTextField, NexaToggle],
  templateUrl: './quality-page.html',
  styleUrls: ['../context/context-documentation.scss', './quality-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaQualityPage {
  protected readonly context = injectDocumentationRouteContext();
  protected readonly evaluation = inject(NexaLabEvaluation);
  protected readonly contrastPairs = APPROVED_CONTRAST_PAIRS;
  protected readonly heuristicRows = HEURISTIC_ROWS;
  protected readonly maturityRows = MATURITY_ROWS;
  protected readonly heuristicOutcomes: Readonly<Record<string, string>> = {
    H1: 'Weak: silent work → Improved: visible phase → Outcome: user knows the operation is active.',
    H2: 'Weak: generic entity → Improved: buyer and request vocabulary → Outcome: context is recognizable.',
    H3: 'Weak: no exit → Improved: Cancel / Undo → Outcome: user control remains local.',
    H4: 'Weak: one-off treatment → Improved: shared status and action → Outcome: patterns are predictable.',
    H5: 'Weak: surprise consequence → Improved: review cue → Outcome: preventable error is surfaced early.',
    H6: 'Weak: hidden filter → Improved: applied scope → Outcome: current result set is recoverable.',
    H7: 'Weak: pointer-only action → Improved: keycap and button path → Outcome: repeat work is faster.',
    H8: 'Weak: decorative noise → Improved: one cue / one action → Outcome: signal remains readable.',
    H9: 'Weak: dead end → Improved: specific Retry → Outcome: recovery preserves context.',
    H10: 'Weak: distant documentation → Improved: rationale beside specimen → Outcome: decision is reviewable.',
  };
  protected readonly auditRows: readonly AuditRow[] = [
    { component: 'Button', keyboard: 'Verified', focus: 'Verified', contrast: 'Verified', nonColor: 'Verified', target: 'Verified', motion: 'Verified', resize: 'Verified' },
    { component: 'Text Field', keyboard: 'Verified', focus: 'Verified', contrast: 'Verified', nonColor: 'Verified', target: 'Verified', motion: 'N/A', resize: 'Verified' },
    { component: 'Toggle', keyboard: 'Verified', focus: 'Verified', contrast: 'Verified', nonColor: 'Verified', target: 'Verified', motion: 'Partial', resize: 'N/A' },
    { component: 'Segmented Control', keyboard: 'Verified', focus: 'Verified', contrast: 'Verified', nonColor: 'Verified', target: 'Verified', motion: 'N/A', resize: 'Verified' },
    { component: 'Action Menu', keyboard: 'Verified', focus: 'Manual review', contrast: 'Verified', nonColor: 'Verified', target: 'Verified', motion: 'N/A', resize: 'Verified' },
    { component: 'Tooltip', keyboard: 'Verified', focus: 'Manual review', contrast: 'Verified', nonColor: 'Verified', target: 'Verified', motion: 'N/A', resize: 'Verified' },
    { component: 'Dialog', keyboard: 'Manual review', focus: 'Manual review', contrast: 'Verified', nonColor: 'Verified', target: 'Verified', motion: 'Partial', resize: 'Partial' },
    { component: 'Progress', keyboard: 'Verified', focus: 'Verified', contrast: 'Verified', nonColor: 'Verified', target: 'Verified', motion: 'Verified', resize: 'Verified' },
  ];

  protected contrast(pairId: string): ContrastResult {
    const pair = this.contrastPairs.find((candidate) => candidate.id === pairId) ?? this.contrastPairs[0];
    return evaluateContrast(pair.foreground, pair.background, pair.gate);
  }
  protected statusTone(status: string): 'success' | 'warning' | 'danger' | 'info' { return status === 'Verified' ? 'success' : status === 'Partial' || status === 'Manual review' ? 'warning' : status === 'Pending' ? 'danger' : 'info'; }
}
