import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  NexaButton,
  NexaNativeSelect,
  NexaPageHeader,
  NexaStatusChip,
  NexaSurface,
} from '../shared/ui-contracts';
import { NexaProgressSteps, NexaStep } from '../shared/progress-steps';
import { ReferenceProduct, referenceProducts } from '../demo-data';

@Component({
  selector: 'nexa-manual-order-reference',
  imports: [
    NexaButton,
    NexaNativeSelect,
    NexaPageHeader,
    NexaProgressSteps,
    NexaStatusChip,
    NexaSurface,
  ],
  templateUrl: './manual-order-reference.html',
  styleUrl: './manual-order-reference.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaManualOrderReference {
  protected readonly step = signal(0);
  protected readonly selectedClient = signal('');
  protected readonly selectedProduct = signal<ReferenceProduct | undefined>(undefined);
  protected readonly priority = signal('Standard');
  protected readonly created = signal(false);
  protected readonly steps: readonly NexaStep[] = [
    { id: 'client', label: 'Client', helper: 'Choose account' },
    { id: 'products', label: 'Products', helper: 'Build order' },
    { id: 'delivery', label: 'Delivery', helper: 'Set route' },
    { id: 'confirm', label: 'Confirm', helper: 'Review' },
  ];
  protected readonly clients = [
    {
      name: 'La Cava Fría Restaurant Group',
      meta: 'B2B · Lima Este',
      initials: 'LC',
      credit: 'PEN 15,000 available',
    },
    {
      name: 'Hotel Andino Food Service',
      meta: 'B2B · Miraflores',
      initials: 'HA',
      credit: 'PEN 24,500 available',
    },
    {
      name: 'Market Gourmet San Isidro',
      meta: 'B2B · San Isidro',
      initials: 'MG',
      credit: 'PEN 8,200 available',
    },
  ];
  protected readonly products = referenceProducts.slice(3, 8);
  protected setStep(step: number): void {
    if (step <= this.step() || (step === this.step() + 1 && this.canAdvance())) this.step.set(step);
  }
  protected chooseClient(name: string): void {
    this.selectedClient.set(name);
  }
  protected chooseProduct(product: ReferenceProduct): void {
    this.selectedProduct.set(product);
  }
  protected next(): void {
    if (this.canAdvance()) this.step.update((value) => Math.min(value + 1, 3));
  }
  protected previous(): void {
    this.step.update((value) => Math.max(value - 1, 0));
  }
  protected canAdvance(): boolean {
    return this.step() === 0
      ? !!this.selectedClient()
      : this.step() === 1
        ? !!this.selectedProduct()
        : true;
  }
  protected productTotal(): string {
    return this.selectedProduct()?.price ?? 'S/ 0.00';
  }
  protected submitOrder(): void {
    this.created.set(true);
  }
}
