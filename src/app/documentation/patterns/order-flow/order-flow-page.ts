import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NexaButton, NexaStatusChip } from 'nexa-ui';
import { NexaStateSequence, type NexaSequencePhase } from '../../../lab/evidence/state-sequence/nexa-state-sequence';
import { NexaDocumentationFrame } from '../../layout/documentation-page';
import { injectDocumentationRouteContext } from '../../layout/page-context';

@Component({
  selector: 'nexa-order-flow-page',
  imports: [NexaButton, NexaDocumentationFrame, NexaStateSequence, NexaStatusChip],
  templateUrl: './order-flow-page.html',
  styleUrls: ['../pattern-foundation.scss', './order-flow-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaOrderFlowPage {
  protected readonly context = injectDocumentationRouteContext();
  protected readonly documentState = signal<'missing' | 'ready'>('missing');
  protected readonly phases: readonly NexaSequencePhase[] = [
    { id: 'submitted', label: 'Submitted', detail: 'Buyer request received.', tone: 'info', durationMs: 700 },
    { id: 'validated', label: 'Validated', detail: 'Sales checks request details.', tone: 'success', durationMs: 700 },
    { id: 'confirmed', label: 'Order confirmed', detail: 'Confirmation is visible to the buyer.', tone: 'success', terminal: true },
  ];
}
