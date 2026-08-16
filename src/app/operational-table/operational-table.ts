import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { UiAction } from '../shared/ui-action';

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
  templateUrl: './operational-table.html',
  styleUrl: './operational-table.scss',
})
export class NexaOperationalTable {
  readonly action = output<UiAction>();

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
}
