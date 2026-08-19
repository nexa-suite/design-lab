import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NexaDocumentationFrame } from '../layout/documentation-page';
import { injectDocumentationRouteContext } from '../layout/page-context';
import { NexaStateSequence, type NexaSequencePhase } from '../../lab/evidence/state-sequence/nexa-state-sequence';

type ProgressView = 'standard' | 'reduced';

@Component({
  selector: 'nexa-progress-page',
  imports: [NexaDocumentationFrame, NexaStateSequence],
  templateUrl: './progress-page.html',
  styleUrl: './progress-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaProgressPage {
  protected readonly context = injectDocumentationRouteContext();
  protected readonly view = signal<ProgressView>('standard');
  protected readonly phases: readonly NexaSequencePhase[] = [
    { id: 'determinate', label: 'Determinate', detail: 'Known completion amount.', tone: 'info', durationMs: 500 },
    { id: 'paused', label: 'Paused', detail: 'Progress is intentionally paused.', tone: 'warning', durationMs: 600 },
    { id: 'complete', label: 'Complete', detail: 'The operation reached its terminal result.', tone: 'success', terminal: true },
    { id: 'error', label: 'Error', detail: 'The operation needs explicit recovery.', tone: 'danger', terminal: true },
  ];

  protected setView(view: string): void { this.view.set(view as ProgressView); }
}
