import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NexaButton } from 'nexa-ui';
import { NexaStateSequence, type NexaSequencePhase } from '../../../lab/evidence/state-sequence/nexa-state-sequence';
import { NexaDocumentationFrame } from '../../layout/documentation-page';
import { injectDocumentationRouteContext } from '../../layout/page-context';

@Component({
  selector: 'nexa-async-operations-page',
  imports: [NexaButton, NexaDocumentationFrame, NexaStateSequence],
  templateUrl: './async-operations-page.html',
  styleUrls: ['../pattern-foundation.scss', './async-operations-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaAsyncOperationsPage {
  protected readonly context = injectDocumentationRouteContext();
  protected readonly warningChoice = signal<'idle' | 'continue' | 'cancelled'>('idle');
  protected readonly asyncHappy: readonly NexaSequencePhase[] = [
    { id: 'ready', label: 'Ready', detail: 'Action is available.', tone: 'neutral', durationMs: 1000 },
    { id: 'pressed', label: 'Pressed', detail: 'Input acknowledged.', tone: 'info', durationMs: 1000 },
    { id: 'processing', label: 'Processing', detail: 'Work is in progress.', tone: 'info', durationMs: 1400 },
    { id: 'success', label: 'Success', detail: 'Outcome confirmed.', tone: 'success', terminal: true },
  ];
  protected readonly asyncRecovery: readonly NexaSequencePhase[] = [
    { id: 'ready', label: 'Ready', detail: 'Context is available.', tone: 'neutral', durationMs: 1000 },
    { id: 'processing', label: 'Processing', detail: 'Work is in progress.', tone: 'info', durationMs: 1400 },
    { id: 'error', label: 'Error', detail: 'The operation failed safely.', tone: 'danger', terminal: true },
    { id: 'retry', label: 'Retry', detail: 'Action keeps current context.', tone: 'danger', durationMs: 1000 },
    { id: 'processing-again', label: 'Processing', detail: 'Retry is running.', tone: 'info', durationMs: 1400 },
    { id: 'success', label: 'Success', detail: 'Recovery completed.', tone: 'success', terminal: true },
  ];
  protected readonly asyncWarning: readonly NexaSequencePhase[] = [
    { id: 'ready', label: 'Ready', detail: 'Action is available.', tone: 'neutral', durationMs: 1000 },
    { id: 'processing', label: 'Processing', detail: 'A review point is reached.', tone: 'info', durationMs: 1400 },
    { id: 'warning', label: 'Warning', detail: 'The next step needs confirmation.', tone: 'warning', durationMs: 1600 },
    { id: 'continue', label: 'Continue', detail: 'User decision is explicit.', tone: 'info', durationMs: 1000 },
    { id: 'cancelled', label: 'Cancelled', detail: 'The operation stopped at the user decision.', tone: 'danger', terminal: true },
  ];

  protected setWarningChoice(choice: 'continue' | 'cancelled'): void { this.warningChoice.set(choice); }
}
