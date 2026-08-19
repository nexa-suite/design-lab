import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NexaButton, NexaStatusChip } from 'nexa-ui';
import { NexaDocumentationFrame } from '../layout/documentation-page';
import { injectDocumentationRouteContext } from '../layout/page-context';
import { NexaStateSequence, type NexaSequencePhase } from '../../lab/evidence/state-sequence/nexa-state-sequence';

type ButtonOutcome = 'idle' | 'processing' | 'success' | 'error';

@Component({
  selector: 'nexa-button-page',
  imports: [NexaButton, NexaDocumentationFrame, NexaStateSequence, NexaStatusChip],
  templateUrl: './button-page.html',
  styleUrl: './button-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaButtonPage {
  protected readonly context = injectDocumentationRouteContext();
  protected readonly outcome = signal<ButtonOutcome>('idle');
  protected readonly notice = signal('Choose an outcome to inspect button feedback.');
  protected readonly phases: readonly NexaSequencePhase[] = [
    { id: 'idle', label: 'Idle', detail: 'The action is available.', tone: 'neutral', durationMs: 500 },
    { id: 'processing', label: 'Processing', detail: 'Duplicate activation is blocked.', tone: 'info', durationMs: 700 },
    { id: 'success', label: 'Success', detail: 'The result is confirmed next to the action.', tone: 'success', terminal: true },
    { id: 'error', label: 'Error', detail: 'Retry preserves the current context.', tone: 'danger', terminal: true },
  ];

  protected run(outcome: 'success' | 'error'): void {
    if (this.outcome() === 'processing') return;
    this.outcome.set('processing');
    this.notice.set('Processing. The button keeps its geometry and blocks duplicate activation.');
    window.setTimeout(() => {
      this.outcome.set(outcome);
      this.notice.set(outcome === 'success' ? 'Success. Adjacent feedback confirms the outcome.' : 'Error. Retry is explicit and keeps the action context.');
    }, 520);
  }

  protected reset(): void {
    this.outcome.set('idle');
    this.notice.set('Choose an outcome to inspect button feedback.');
  }

  protected label(): string {
    return this.outcome() === 'processing' ? 'Creating order' : this.outcome() === 'success' ? 'Created' : this.outcome() === 'error' ? 'Try again' : 'Create sales order';
  }
}
