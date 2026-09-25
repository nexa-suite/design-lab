import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NexaButton, NexaStatusChip } from 'nexa-ui';
import { NexaDocumentationFrame } from '../../layout/documentation-page';
import { injectDocumentationRouteContext } from '../../layout/page-context';

@Component({
  selector: 'nexa-request-builder-page',
  imports: [NexaButton, NexaDocumentationFrame, NexaStatusChip],
  templateUrl: './request-builder-page.html',
  styleUrls: ['../pattern-foundation.scss', './request-builder-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaRequestBuilderPage {
  protected readonly context = injectDocumentationRouteContext();
  protected readonly quantity = signal(2);
  protected readonly submitted = signal(false);
  protected readonly totalLines = computed(() => this.quantity() + 1);
  protected increment(): void { this.quantity.update((value) => Math.min(99, value + 1)); this.submitted.set(false); }
  protected decrement(): void { this.quantity.update((value) => Math.max(1, value - 1)); this.submitted.set(false); }
  protected submitDraft(): void { this.submitted.set(true); }
}
