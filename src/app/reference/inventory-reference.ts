import { ChangeDetectionStrategy, Component } from '@angular/core';
import { inventoryRows } from '../demo-data';

@Component({
  selector: 'nexa-inventory-reference',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './inventory-reference.html',
  styleUrl: './inventory-reference.scss',
})
export class NexaInventoryReference {
  protected readonly inventory = inventoryRows;
}
