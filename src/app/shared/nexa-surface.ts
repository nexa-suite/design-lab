import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'nexa-surface',
  template: '<section class="nexa-surface" [class]="tone()"><ng-content /></section>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`:host { display: block; } .nexa-surface { border: 1px solid var(--nexa-color-border-default); border-radius: var(--nexa-radius-panel); background: var(--nexa-surface-card); } .soft { background: var(--nexa-surface-info); border-color: var(--nexa-color-primary-200); } .inset { background: var(--nexa-surface-inset); }`],
})
export class NexaSurface { readonly tone = input<'default' | 'soft' | 'inset'>('default'); }
