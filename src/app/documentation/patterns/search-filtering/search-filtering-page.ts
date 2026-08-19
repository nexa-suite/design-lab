import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NexaButton, NexaSegmentedControl, NexaStatusChip, NexaTextField, type NexaSegmentOption } from 'nexa-ui';
import { NexaDocumentationFrame } from '../../layout/documentation-page';
import { injectDocumentationRouteContext } from '../../layout/page-context';

type SearchMode = 'query' | 'searching' | 'results' | 'empty' | 'error';
interface SearchResult { readonly id: string; readonly label: string; readonly status: 'success' | 'warning' | 'danger'; readonly detail: string; }

@Component({
  selector: 'nexa-search-filtering-page',
  imports: [NexaButton, NexaDocumentationFrame, NexaSegmentedControl, NexaStatusChip, NexaTextField],
  templateUrl: './search-filtering-page.html',
  styleUrls: ['../pattern-foundation.scss', './search-filtering-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaSearchFilteringPage {
  protected readonly context = injectDocumentationRouteContext();
  protected readonly query = signal('');
  protected readonly scope = signal('orders');
  protected readonly mode = signal<SearchMode>('query');
  protected readonly results: readonly SearchResult[] = [
    { id: 'PR-2026-0001', label: 'La Cava Fría', status: 'warning', detail: 'Buyer request awaiting review.' },
    { id: 'PR-2026-0002', label: 'Andina Foods', status: 'success', detail: 'Documents validated.' },
    { id: 'PR-2026-0003', label: 'Frío Norte', status: 'danger', detail: 'Blocked by credit review.' },
  ];
  protected readonly scopeOptions: readonly NexaSegmentOption[] = [
    { value: 'orders', label: 'Orders' },
    { value: 'documents', label: 'Documents' },
    { value: 'buyers', label: 'Buyers' },
  ];
  protected readonly visibleResults = computed(() => {
    const value = this.query().trim().toLocaleLowerCase();
    return value ? this.results.filter((result) => `${result.id} ${result.label} ${result.detail}`.toLocaleLowerCase().includes(value)) : this.results;
  });

  protected setQuery(value: string): void { this.query.set(value); this.mode.set('query'); }
  protected setScope(value: string): void { this.scope.set(value); this.mode.set('query'); }
  protected search(): void { this.mode.set(this.visibleResults().length ? 'results' : 'empty'); }
  protected setMode(mode: SearchMode): void { this.mode.set(mode); }
  protected retry(): void { this.mode.set('searching'); this.mode.set(this.visibleResults().length ? 'results' : 'empty'); }
  protected clear(): void { this.query.set(''); this.mode.set('query'); }
}
