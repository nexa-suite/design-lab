import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NexaButton } from 'nexa-ui';
import { NexaDocumentationFrame } from '../../layout/documentation-page';
import { injectDocumentationRouteContext } from '../../layout/page-context';

type StateMode = 'empty' | 'loading' | 'error' | 'success';

@Component({
  selector: 'nexa-empty-loading-error-page',
  imports: [NexaButton, NexaDocumentationFrame],
  templateUrl: './empty-loading-error-page.html',
  styleUrls: ['../pattern-foundation.scss', './empty-loading-error-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaEmptyLoadingErrorPage {
  protected readonly context = injectDocumentationRouteContext();
  protected readonly mode = signal<StateMode>('empty');
  protected readonly modes: readonly StateMode[] = ['empty', 'loading', 'error', 'success'];
  protected setMode(mode: StateMode): void { this.mode.set(mode); }
  protected retry(): void { this.mode.set('loading'); this.mode.set('success'); }
}
