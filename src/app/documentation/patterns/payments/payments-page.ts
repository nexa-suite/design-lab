import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NexaButton, NexaStatusChip, NexaTextField, type NexaStatusTone } from 'nexa-ui';
import { NexaDocumentationFrame } from '../../layout/documentation-page';
import { NexaDocumentationSection } from '../../layout/documentation-section';
import { injectDocumentationRouteContext } from '../../layout/page-context';

type PaymentState = 'none' | 'processing' | 'saved' | 'invalid' | 'declined' | 'unavailable';
interface PaymentStateOption { readonly id: PaymentState; readonly label: string; }

const PAYMENT_COPY: Readonly<Record<PaymentState, { readonly title: string; readonly copy: string; readonly action: string; readonly tone: NexaStatusTone }>> = {
  none: { title: 'No saved method', copy: 'The user understands why a method is needed before adding one.', action: 'Prepare method', tone: 'info' },
  processing: { title: 'Processing method', copy: 'Keep the surrounding task visible while the method is prepared.', action: 'Processing', tone: 'info' },
  saved: { title: 'Saved method', copy: 'A masked method is available for the next approved step.', action: 'Review method', tone: 'success' },
  invalid: { title: 'Invalid entry', copy: 'Explain which local field needs correction without exposing provider diagnostics.', action: 'Correct entry', tone: 'danger' },
  declined: { title: 'User-safe decline', copy: 'The method was not accepted. Preserve context and offer a safe recovery path.', action: 'Try again', tone: 'danger' },
  unavailable: { title: 'Method unavailable', copy: 'The provider boundary is unavailable; do not imply that the user caused the failure.', action: 'Retry availability', tone: 'warning' },
};

@Component({
  selector: 'nexa-payments-page',
  imports: [NexaButton, NexaDocumentationFrame, NexaDocumentationSection, NexaStatusChip, NexaTextField],
  templateUrl: './payments-page.html',
  styleUrls: ['../pattern-foundation.scss', './payments-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaPaymentsPage {
  protected readonly context = injectDocumentationRouteContext();
  protected readonly state = signal<PaymentState>('none');
  protected readonly cardholder = signal('');
  protected readonly expiry = signal('');
  protected readonly securityCode = signal('');
  protected readonly paymentStates: readonly PaymentStateOption[] = [
    { id: 'none', label: 'No saved method' },
    { id: 'processing', label: 'Processing' },
    { id: 'saved', label: 'Saved / default' },
    { id: 'invalid', label: 'Invalid entry' },
    { id: 'declined', label: 'Declined-style' },
    { id: 'unavailable', label: 'Unavailable' },
  ];
  protected readonly stateCopy = computed(() => PAYMENT_COPY[this.state()].copy);
  protected readonly stateTitle = computed(() => PAYMENT_COPY[this.state()].title);
  protected readonly stateAction = computed(() => PAYMENT_COPY[this.state()].action);
  protected readonly stateTone = computed(() => PAYMENT_COPY[this.state()].tone);
  protected readonly stateLabel = computed(() => this.paymentStates.find((option) => option.id === this.state())?.label ?? 'State');

  protected selectState(state: PaymentState): void { this.state.set(state); }

  protected advanceState(): void {
    if (this.state() === 'processing') return;
    if (this.state() === 'none' || this.state() === 'invalid' || this.state() === 'declined' || this.state() === 'unavailable') {
      this.state.set('processing');
      window.setTimeout(() => this.state.set('saved'), 420);
      return;
    }
    this.state.set('saved');
  }
}
