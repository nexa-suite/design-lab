import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NexaButton, NexaStatusChip } from 'nexa-ui';
import { NexaDocumentationFrame } from '../../layout/documentation-page';
import { injectDocumentationRouteContext } from '../../layout/page-context';

interface Product { readonly id: string; readonly name: string; readonly family: string; readonly temperature: 'Refrigerated' | 'Frozen'; readonly availability: string; readonly tone: 'info' | 'success'; }

@Component({
  selector: 'nexa-catalog-page',
  imports: [NexaButton, NexaDocumentationFrame, NexaStatusChip],
  templateUrl: './catalog-page.html',
  styleUrls: ['../pattern-foundation.scss', './catalog-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaCatalogPage {
  protected readonly context = injectDocumentationRouteContext();
  protected readonly selectedId = signal('QPD-150');
  protected readonly products: readonly Product[] = [
    { id: 'QPD-150', name: 'Queso Grana Padano DOP 150G', family: 'Agriform · Cheese', temperature: 'Refrigerated', availability: '214 available', tone: 'info' },
    { id: 'QPR-150', name: 'Queso Parmigiano Reggiano DOP 150G', family: 'Agriform · Cheese', temperature: 'Refrigerated', availability: '137 available', tone: 'info' },
    { id: 'MOR-7500', name: 'Mortadella Bologna IGP', family: 'Cavour · Charcuterie', temperature: 'Frozen', availability: '8 available', tone: 'success' },
  ];
  protected readonly selected = computed(() => this.products.find((product) => product.id === this.selectedId()) ?? this.products[0]);
  protected selectProduct(id: string): void { this.selectedId.set(id); }
}
