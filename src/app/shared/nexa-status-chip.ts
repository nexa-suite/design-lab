import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type NexaStatusTone = 'success' | 'info' | 'warning' | 'danger' | 'neutral';

@Component({
  selector: 'nexa-status-chip',
  template: '<span class="nexa-status-chip" [class]="tone()"><span class="status-dot" aria-hidden="true"></span><span><ng-content /></span></span>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host { display: inline-flex; }
      .nexa-status-chip { display: inline-flex; align-items: center; gap: var(--nexa-space-2); min-height: 26px; padding: 0 10px; border-radius: var(--nexa-radius-pill); font: 600 var(--nexa-font-size-xs)/1 var(--nexa-font-family-body); }
      .status-dot { width: 6px; height: 6px; flex: 0 0 6px; border-radius: 50%; background: currentColor; }
      .success { color: var(--nexa-color-success-700); background: var(--nexa-surface-success); }
      .info { color: var(--nexa-color-info-700); background: var(--nexa-surface-info); }
      .warning { color: var(--nexa-color-warning-text); background: var(--nexa-surface-warning); }
      .danger { color: var(--nexa-color-danger-text); background: var(--nexa-surface-danger); }
      .neutral { color: var(--nexa-color-neutral-700); background: var(--nexa-surface-inset); }
    `,
  ],
})
export class NexaStatusChip { readonly tone = input<NexaStatusTone>('neutral'); }
