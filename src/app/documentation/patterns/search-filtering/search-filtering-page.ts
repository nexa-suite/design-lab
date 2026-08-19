import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { NexaButton, NexaSegmentedControl, NexaStatusChip, NexaTextField, type NexaSegmentOption } from 'nexa-ui';
import { NexaDocumentationFrame } from '../../layout/documentation-page';
import { injectDocumentationRouteContext } from '../../layout/page-context';

type SearchMode = 'query' | 'searching' | 'results' | 'empty' | 'error';
type StatusFilter = 'all' | 'success' | 'warning' | 'danger';
type ResultSort = 'relevance' | 'status' | 'identifier';
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
  private readonly destroyRef = inject(DestroyRef);
  private retryTimer: number | undefined;
  protected readonly query = signal('');
  protected readonly scope = signal('orders');
  protected readonly mode = signal<SearchMode>('query');
  protected readonly statusFilter = signal<StatusFilter>('all');
  protected readonly sort = signal<ResultSort>('relevance');
  protected readonly statusFilters: readonly { readonly id: StatusFilter; readonly label: string }[] = [
    { id: 'all', label: 'All statuses' }, { id: 'success', label: 'Validated' }, { id: 'warning', label: 'Awaiting review' }, { id: 'danger', label: 'Blocked' },
  ];
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
    const filtered = value ? this.results.filter((result) => `${result.id} ${result.label} ${result.detail}`.toLocaleLowerCase().includes(value)) : this.results;
    const byStatus = this.statusFilter() === 'all' ? filtered : filtered.filter((result) => result.status === this.statusFilter());
    return [...byStatus].sort((left, right) => this.sort() === 'identifier' ? left.id.localeCompare(right.id) : this.sort() === 'status' ? left.status.localeCompare(right.status) : 0);
  });

  protected setQuery(value: string): void { this.query.set(value); this.mode.set('query'); }
  protected setScope(value: string): void { this.scope.set(value); this.mode.set('query'); }
  protected setStatusFilter(value: StatusFilter): void { this.statusFilter.set(value); this.mode.set('query'); }
  protected setSort(value: string): void { this.sort.set(value as ResultSort); this.mode.set('query'); }
  protected search(): void { this.mode.set(this.visibleResults().length ? 'results' : 'empty'); }
  protected setMode(mode: SearchMode): void { this.mode.set(mode); }
  protected retry(): void {
    if (this.retryTimer !== undefined) window.clearTimeout(this.retryTimer);
    this.mode.set('searching');
    this.retryTimer = window.setTimeout(() => {
      this.retryTimer = undefined;
      this.mode.set(this.visibleResults().length ? 'results' : 'empty');
    }, 260);
  }
  protected clear(): void { this.query.set(''); this.statusFilter.set('all'); this.sort.set('relevance'); this.mode.set('query'); }

  constructor() {
    this.destroyRef.onDestroy(() => {
      if (this.retryTimer !== undefined) window.clearTimeout(this.retryTimer);
    });
  }
}
