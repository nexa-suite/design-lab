import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { NexaButton } from '../../../design-system/button/nexa-button';
import { NexaSegmentedControl, type NexaSegmentOption } from '../../../design-system/segmented-control/nexa-segmented-control';
import { NexaStateSequence, type NexaSequencePhase } from '../../../lab/evidence/state-sequence/nexa-state-sequence';
import { NexaStatusChip } from '../../../design-system/status/nexa-status-chip';
import { NexaTextField } from '../../../design-system/text-field/nexa-text-field';
import type { DocumentationPage } from '../../models/documentation-page';

type PaymentState = 'none' | 'loading' | 'unavailable';
type DenseMode = 'rows' | 'loading' | 'error' | 'empty';
interface LegalSection { readonly id: string; readonly title: string; readonly summary: string; }

@Component({
  selector: 'nexa-pattern-documentation',
  imports: [NexaButton, NexaSegmentedControl, NexaStateSequence, NexaStatusChip, NexaTextField],
  templateUrl: './pattern-documentation.html',
  styleUrl: './pattern-documentation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaPatternDocumentation {
  readonly page = input.required<DocumentationPage>();
  protected readonly warningChoice = signal<'idle' | 'continue' | 'cancelled'>('idle');
  protected readonly paymentState = signal<PaymentState>('none');
  protected readonly denseMode = signal<DenseMode>('rows');
  protected readonly denseSegment = signal('review');
  protected readonly denseQuery = signal('');

  protected readonly denseModeOptions: readonly NexaSegmentOption[] = [
    { value: 'review', label: 'Needs review' },
    { value: 'ready', label: 'Ready' },
    { value: 'blocked', label: 'Blocked' },
  ];
  protected readonly asyncHappy: readonly NexaSequencePhase[] = [
    { id: 'ready', label: 'Ready', detail: 'Action is available.', tone: 'neutral', durationMs: 700 },
    { id: 'pressed', label: 'Pressed', detail: 'Input acknowledged.', tone: 'info', durationMs: 700 },
    { id: 'processing', label: 'Processing', detail: 'Work is in progress.', tone: 'info', durationMs: 900 },
    { id: 'success', label: 'Success', detail: 'Outcome confirmed.', tone: 'success', terminal: true },
  ];
  protected readonly asyncRecovery: readonly NexaSequencePhase[] = [
    { id: 'ready', label: 'Ready', detail: 'Context is available.', tone: 'neutral', durationMs: 700 },
    { id: 'processing', label: 'Processing', detail: 'Work is in progress.', tone: 'info', durationMs: 900 },
    { id: 'error', label: 'Error', detail: 'The operation failed safely.', tone: 'danger', terminal: true },
    { id: 'retry', label: 'Retry', detail: 'Action keeps current context.', tone: 'danger', durationMs: 700 },
    { id: 'processing-again', label: 'Processing', detail: 'Retry is running.', tone: 'info', durationMs: 900 },
    { id: 'success', label: 'Success', detail: 'Recovery completed.', tone: 'success', terminal: true },
  ];
  protected readonly asyncWarning: readonly NexaSequencePhase[] = [
    { id: 'ready', label: 'Ready', detail: 'Action is available.', tone: 'neutral', durationMs: 700 },
    { id: 'processing', label: 'Processing', detail: 'A review point is reached.', tone: 'info', durationMs: 900 },
    { id: 'warning', label: 'Warning', detail: 'The next step needs confirmation.', tone: 'warning', durationMs: 800 },
    { id: 'continue', label: 'Continue', detail: 'User decision is explicit.', tone: 'info', durationMs: 700 },
    { id: 'cancelled', label: 'Cancelled', detail: 'The operation stopped at the user decision.', tone: 'danger', terminal: true },
  ];
  protected readonly legalSections: readonly LegalSection[] = [
    { id: 'scope', title: '1. Purpose and scope', summary: 'Synthetic placeholder: describe what the document covers and which audience should read it.' },
    { id: 'information', title: '2. Information and handling', summary: 'Synthetic placeholder: formal policy content must be supplied and approved by the responsible owner.' },
    { id: 'responsibilities', title: '3. Responsibilities', summary: 'Synthetic placeholder: define obligations only after legal and product review.' },
    { id: 'contact', title: '4. Contact and updates', summary: 'Synthetic placeholder: provide an approved support or policy contact.' },
  ];
  protected readonly denseRows = [
    { id: 'LOT-2041', item: 'Refrigerated product', quantity: '24', progress: '82%', status: 'Needs review', tone: 'warning' as const },
    { id: 'LOT-2038', item: 'Frozen product', quantity: '12', progress: '100%', status: 'Ready', tone: 'success' as const },
    { id: 'LOT-2029', item: 'Document batch', quantity: '8', progress: '36%', status: 'Blocked', tone: 'danger' as const },
  ];

  protected setWarningChoice(choice: 'continue' | 'cancelled'): void { this.warningChoice.set(choice); }
  protected selectPaymentState(state: PaymentState): void { this.paymentState.set(state); }
  protected setDenseMode(value: string): void { this.denseMode.set(value as DenseMode); }
  protected setDenseSegment(value: string): void { this.denseSegment.set(value); }
  protected denseResults(): readonly typeof this.denseRows[number][] {
    const query = this.denseQuery().trim().toLocaleLowerCase();
    return query ? this.denseRows.filter((row) => `${row.id} ${row.item}`.toLocaleLowerCase().includes(query)) : this.denseRows;
  }
}
