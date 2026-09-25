import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NexaButton, NexaStatusChip } from 'nexa-ui';
import { NexaDocumentationFrame } from '../../layout/documentation-page';
import { injectDocumentationRouteContext } from '../../layout/page-context';

@Component({
  selector: 'nexa-delivery-pod-page',
  imports: [NexaButton, NexaDocumentationFrame, NexaStatusChip],
  templateUrl: './delivery-pod-page.html',
  styleUrls: ['../pattern-foundation.scss', './delivery-pod-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaDeliveryPodPage {
  protected readonly context = injectDocumentationRouteContext();
  protected readonly proofState = signal<'pending' | 'received'>('pending');
}
