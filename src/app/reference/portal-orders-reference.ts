import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  NexaButton,
  NexaPageHeader,
  NexaStatusChip,
  NexaSurface,
  NexaTableShell,
} from '../shared/ui-contracts';

@Component({
  selector: 'nexa-portal-orders-reference',
  imports: [NexaButton, NexaPageHeader, NexaStatusChip, NexaSurface, NexaTableShell, RouterLink],
  templateUrl: './portal-orders-reference.html',
  styleUrl: './portal-orders-reference.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaPortalOrdersReference {
  protected readonly selectedOrder = signal('ORD-2026-0001');
  protected readonly order = {
    id: 'ORD-2026-0001',
    status: 'Delivered',
    dispatch: 'DSP-2026-0088',
    date: '15 Aug 2026',
    total: 'PEN 2,980.00',
    items: '4 items',
    address: 'Av. Javier Prado Este 4210, Lima',
    route: 'Lima Este Cold Route',
  };
  protected readonly tracking = [
    'Request created',
    'Validated',
    'Credit approved',
    'Preparing',
    'Packed',
    'Dispatched',
    'In transit',
    'Delivered',
    'Documents ready',
  ];
  protected selectOrder(id: string): void {
    this.selectedOrder.set(id);
  }
}
