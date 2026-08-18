import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { UiAction } from '../shared/ui-action';
import { NexaActionMenu } from '../shared/action-menu';
import { NexaStatusChip, NexaTableShell } from '../shared/ui-contracts';

interface SalesOrderRow {
  readonly id: string;
  readonly buyer: string;
  readonly delivery: string;
  readonly total: string;
  readonly status: 'Awaiting review' | 'In preparation' | 'Ready for dispatch';
}

@Component({
  selector: 'nexa-operational-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NexaActionMenu, NexaStatusChip, NexaTableShell],
  templateUrl: './operational-table.html',
  styleUrl: './operational-table.scss',
})
export class NexaOperationalTable {
  readonly action = output<UiAction>();
  protected readonly query = signal('');
  protected readonly filter = signal('All statuses');
  protected readonly sortDescending = signal(false);
  protected readonly menuItems = [
    { id: 'export', label: 'Export view' },
    { id: 'columns', label: 'Manage columns' },
  ];

  protected readonly rows: readonly SalesOrderRow[] = [
    {
      id: 'SO-2026-0418',
      buyer: 'Hotel Andino Food Service',
      delivery: '18 Aug · AM',
      total: 'PEN 8,420.00',
      status: 'Awaiting review',
    },
    {
      id: 'SO-2026-0417',
      buyer: 'Catering Miraflores Kitchen',
      delivery: '17 Aug · PM',
      total: 'PEN 3,860.50',
      status: 'In preparation',
    },
    {
      id: 'SO-2026-0416',
      buyer: 'Market Gourmet San Isidro',
      delivery: '16 Aug · AM',
      total: 'PEN 12,140.00',
      status: 'Ready for dispatch',
    },
  ];

  protected emitAction(label: string): void {
    this.action.emit({ label });
  }
  protected visibleRows(): readonly SalesOrderRow[] {
    const query = this.query().toLowerCase();
    const filtered = this.rows.filter(
      (row) =>
        (!query || `${row.id} ${row.buyer}`.toLowerCase().includes(query)) &&
        (this.filter() === 'All statuses' || row.status === this.filter()),
    );
    return [...filtered].sort((a, b) =>
      this.sortDescending() ? b.id.localeCompare(a.id) : a.id.localeCompare(b.id),
    );
  }
  protected setFilter(value: string): void {
    this.filter.set(value);
  }
  protected selectMenu(id: string): void {
    this.emitAction(
      id === 'export' ? 'Sales Orders table export requested' : 'Sales Orders columns requested',
    );
  }
}
