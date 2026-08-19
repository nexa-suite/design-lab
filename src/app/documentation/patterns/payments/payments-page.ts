import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NexaButton, NexaStatusChip } from 'nexa-ui';
import { NexaDocumentationFrame } from '../../layout/documentation-page';
import { injectDocumentationRouteContext } from '../../layout/page-context';

type PaymentState = 'none' | 'loading' | 'unavailable';

@Component({
  selector: 'nexa-payments-page',
  imports: [NexaButton, NexaDocumentationFrame, NexaStatusChip],
  templateUrl: './payments-page.html',
  styleUrls: ['../pattern-foundation.scss', './payments-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaPaymentsPage {
  protected readonly context = injectDocumentationRouteContext();
  protected readonly state = signal<PaymentState>('none');
  protected selectState(state: PaymentState): void { this.state.set(state); }
}
