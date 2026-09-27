import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NexaButton, NexaStatusChip, NexaTextField, NexaToggle } from 'nexa-ui';
import { NexaDocumentationFrame } from '../../layout/documentation-page';
import { injectDocumentationRouteContext } from '../../layout/page-context';

@Component({
  selector: 'nexa-forms-page',
  imports: [NexaButton, NexaDocumentationFrame, NexaStatusChip, NexaTextField, NexaToggle],
  templateUrl: './forms-page.html',
  styleUrls: ['../pattern-foundation.scss', './forms-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaFormsPage {
  protected readonly context = injectDocumentationRouteContext();
  private readonly initialBuyerName = 'La Cava Fría';
  protected readonly buyerName = signal(this.initialBuyerName);
  protected readonly buyerError = signal('');
  protected readonly requiresDocuments = signal(true);
  protected readonly submitted = signal(false);
  protected readonly dirty = signal(false);
  protected readonly submissionState = signal<'idle' | 'submitting' | 'success' | 'error' | 'conflict'>('idle');
  protected readonly submissionStates = ['idle', 'submitting', 'success', 'error', 'conflict'] as const;

  protected setBuyerName(value: string): void {
    this.buyerName.set(value);
    this.dirty.set(value !== this.initialBuyerName);
    this.buyerError.set('');
    this.submitted.set(false);
    this.submissionState.set('idle');
  }
  protected validate(): void {
    const value = this.buyerName().trim();
    this.buyerError.set(value.length < 3 ? 'Use at least 3 characters.' : '');
    this.submitted.set(value.length >= 3);
    if (value.length >= 3) this.dirty.set(false);
    this.submissionState.set(value.length >= 3 ? 'success' : 'error');
  }
  protected setSubmissionState(state: typeof this.submissionStates[number]): void { this.submissionState.set(state); }
}
