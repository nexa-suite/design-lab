import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ReferenceProduct } from '../demo-data';

@Component({
  selector: 'nexa-product-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class NexaProductCard {
  readonly product = input.required<ReferenceProduct>();
  readonly addToRequest = output<string>();

  protected add(): void {
    this.addToRequest.emit(this.product().id);
  }
}
