import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NexaButton } from '../shared/nexa-button';
import { evaluateContrast, type ContrastResult } from '../shared/contrast';
import { NexaLabEvaluation } from '../shared/lab-evaluation';
import { NexaSegmentedControl, type NexaSegmentOption } from '../shared/nexa-segmented-control';
import { NexaStateSequence, type NexaSequencePhase } from '../shared/nexa-state-sequence';
import { NexaStatusChip } from '../shared/nexa-status-chip';
import { NexaTextField } from '../shared/nexa-text-field';
import { NexaToggle } from '../shared/nexa-toggle';
import type { DocumentationGroup, DocumentationPage } from './documentation-registry';
import { APPROVED_CONTRAST_PAIRS, HEURISTIC_ROWS, MATURITY_ROWS } from './documentation-data';

interface AuditRow { readonly component: string; readonly keyboard: string; readonly focus: string; readonly contrast: string; readonly nonColor: string; readonly target: string; readonly motion: string; readonly resize: string; }

@Component({
  selector: 'nexa-context-documentation',
  imports: [NexaButton, NexaSegmentedControl, NexaStateSequence, NexaStatusChip, NexaTextField, NexaToggle, RouterLink],
  templateUrl: './documentation-context.html',
  styleUrl: './documentation-context.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaContextDocumentation {
  readonly page = input.required<DocumentationPage>();
  readonly allPages = input.required<readonly DocumentationPage[]>();
  protected readonly groups = input<readonly DocumentationGroup[]>([]);
  protected readonly evaluation = inject(NexaLabEvaluation);
  protected readonly contrastPairs = APPROVED_CONTRAST_PAIRS;
  protected readonly heuristicRows = HEURISTIC_ROWS;
  protected readonly maturityRows = MATURITY_ROWS;
  protected readonly formValue = signal('');
  protected readonly formValid = signal(false);
  protected readonly patternToggle = signal(true);
  protected readonly patternSegment = signal('orders');
  protected readonly emptyMode = signal<'empty' | 'loading' | 'error' | 'success'>('empty');
  protected readonly stateModes: readonly ('empty' | 'loading' | 'error' | 'success')[] = ['empty', 'loading', 'error', 'success'];
  protected readonly authNotice = signal('Sign in to continue.');
  protected readonly authEmail = signal('');
  protected readonly auditRows: readonly AuditRow[] = [
    { component: 'Button', keyboard: 'Verified', focus: 'Verified', contrast: 'Verified', nonColor: 'Verified', target: 'Verified', motion: 'Verified', resize: 'Verified' },
    { component: 'Text Field', keyboard: 'Verified', focus: 'Verified', contrast: 'Verified', nonColor: 'Verified', target: 'Verified', motion: 'N/A', resize: 'Verified' },
    { component: 'Toggle', keyboard: 'Verified', focus: 'Verified', contrast: 'Verified', nonColor: 'Verified', target: 'Verified', motion: 'Partial', resize: 'N/A' },
    { component: 'Dialog', keyboard: 'Partial', focus: 'Partial', contrast: 'Verified', nonColor: 'Verified', target: 'Verified', motion: 'Partial', resize: 'Partial' },
  ];
  protected readonly asyncPhases: readonly NexaSequencePhase[] = [
    { id: 'ready', label: 'Ready', detail: 'Action available.', tone: 'neutral' },
    { id: 'processing', label: 'Processing', detail: 'Work in progress.', tone: 'info' },
    { id: 'error', label: 'Error', detail: 'Retry keeps context.', tone: 'danger' },
    { id: 'success', label: 'Success', detail: 'Outcome confirmed.', tone: 'success' },
  ];
  protected readonly patternOptions: readonly NexaSegmentOption[] = [
    { value: 'orders', label: 'Orders' },
    { value: 'documents', label: 'Documents' },
    { value: 'buyers', label: 'Buyers' },
  ];

  protected pageUrl(candidate: DocumentationPage): string { return `/guidelines/${candidate.path}`; }
  protected groupPages(label: string): readonly DocumentationPage[] { return this.allPages().filter((candidate) => candidate.group === label); }
  protected setFormValue(value: string): void { this.formValue.set(value); this.formValid.set(false); }
  protected validateForm(): void { this.formValid.set(this.formValue().trim().length > 2); }
  protected setEmptyMode(mode: 'empty' | 'loading' | 'error' | 'success'): void { this.emptyMode.set(mode); }
  protected signIn(): void { this.authNotice.set(this.authEmail() ? 'Credentials ready; next step is server authentication.' : 'Enter a work email to continue.'); }
  protected contrast(pairId: string): ContrastResult {
    const pair = this.contrastPairs.find((candidate) => candidate.id === pairId) ?? this.contrastPairs[0];
    return evaluateContrast(pair.foreground, pair.background, pair.gate);
  }
  protected statusTone(status: string): 'success' | 'warning' | 'danger' | 'info' { return status === 'Verified' ? 'success' : status === 'Partial' ? 'warning' : status === 'Pending' ? 'danger' : 'info'; }
}
