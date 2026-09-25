import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NexaButton, NexaSegmentedControl, NexaStatusChip, NexaTextField, type NexaSegmentOption } from 'nexa-ui';
import { NexaDocumentationFrame } from '../../layout/documentation-page';
import { injectDocumentationRouteContext } from '../../layout/page-context';

type DenseMode = 'rows' | 'loading' | 'error' | 'empty';
interface DenseRow { readonly id: string; readonly item: string; readonly quantity: string; readonly progress: number; readonly status: string; readonly tone: 'success' | 'warning' | 'danger'; }

@Component({
  selector: 'nexa-data-dense-operations-page',
  imports: [NexaButton, NexaDocumentationFrame, NexaSegmentedControl, NexaStatusChip, NexaTextField],
  templateUrl: './data-dense-operations-page.html',
  styleUrls: ['../pattern-foundation.scss', './data-dense-operations-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaDataDenseOperationsPage {
  protected readonly context = injectDocumentationRouteContext();
  protected readonly mode = signal<DenseMode>('rows');
  protected readonly segment = signal('review');
  protected readonly query = signal('');
  protected readonly options: readonly NexaSegmentOption[] = [
    { value: 'review', label: 'Needs review' },
    { value: 'ready', label: 'Ready' },
    { value: 'blocked', label: 'Blocked' },
  ];
  protected readonly rows: readonly DenseRow[] = [
    { id: 'LOT-2041', item: 'Refrigerated product', quantity: '24', progress: 82, status: 'Needs review', tone: 'warning' },
    { id: 'LOT-2038', item: 'Frozen product', quantity: '12', progress: 100, status: 'Ready', tone: 'success' },
    { id: 'LOT-2029', item: 'Document batch', quantity: '8', progress: 36, status: 'Blocked', tone: 'danger' },
  ];
  protected readonly visibleRows = computed(() => {
    const query = this.query().trim().toLocaleLowerCase();
    return query ? this.rows.filter((row) => `${row.id} ${row.item} ${row.status}`.toLocaleLowerCase().includes(query)) : this.rows;
  });
  protected setMode(mode: DenseMode): void { this.mode.set(mode); }
}
