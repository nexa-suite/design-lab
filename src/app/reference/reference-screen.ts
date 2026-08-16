import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { dispatchRows, inventoryRows, referenceProducts, syntheticOrders } from '../demo-data';
import { NexaProductCard } from './product-card';

@Component({
  selector: 'nexa-reference-screen',
  imports: [RouterLink, NgTemplateOutlet, NexaProductCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reference-screen.html',
  styleUrls: ['./reference-screen.scss', './reference-screen-extra.scss'],
  host: { '(document:keydown.escape)': 'closeActionMenu()' },
})
export class NexaReferenceScreen {
  protected readonly screen = inject(ActivatedRoute).snapshot.data['screen'] as string;
  protected readonly products = referenceProducts;
  protected readonly inventory = inventoryRows;
  protected readonly dispatch = dispatchRows;
  protected readonly orders = syntheticOrders;
  protected readonly requestStep = signal(1);
  protected readonly actionMessage = signal('');
  protected readonly loginSubmitted = signal(false);
  protected readonly selectedProduct = signal<string | null>(null);
  protected readonly reviewOpen = signal(false);
  protected readonly actionMenuOpen = signal<string | null>(null);

  protected setStep(step: number): void {
    this.requestStep.set(step);
  }
  protected chooseProduct(id: string): void {
    this.selectedProduct.set(id);
    this.actionMessage.set('Product added to request builder');
  }
  protected announce(message: string): void {
    this.actionMessage.set(message);
  }
  protected submitLogin(): void {
    this.loginSubmitted.set(true);
  }
  protected openReview(): void {
    this.reviewOpen.set(true);
  }
  protected closeReview(): void {
    this.reviewOpen.set(false);
  }
  protected toggleActionMenu(id: string): void {
    this.actionMenuOpen.update((current) => (current === id ? null : id));
  }
  protected closeActionMenu(): void {
    this.actionMenuOpen.set(null);
  }
  protected countDispatch(state: string): number {
    return this.dispatch.filter((row) => row.state === state).length;
  }
}
