import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

export type NexaButtonVariant = 'primary' | 'secondary' | 'quiet' | 'danger';

@Component({
  selector: 'nexa-button',
  imports: [RouterLink],
  template:
    '@if (routerLink(); as link) {<a class="nexa-button" [class]="variantClass()" [routerLink]="link"><ng-content /></a>} @else {<button class="nexa-button" [class]="variantClass()" [disabled]="disabled()" [type]="type()"><ng-content /></button>}',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: inline-flex;
      }
      .nexa-button {
        min-height: 40px;
        border: 1px solid transparent;
        border-radius: var(--nexa-radius-pill);
        padding: 0 18px;
        font: inherit;
        font-weight: 600;
        cursor: pointer;
        transition:
          background 0.16s ease,
          border-color 0.16s ease,
          transform 0.16s ease;
      }
      a.nexa-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
      }
      .nexa-button:focus-visible {
        outline: none;
        box-shadow: var(--nexa-focus-ring);
      }
      .nexa-button:active:not(:disabled) {
        transform: translateY(1px);
      }
      .primary {
        color: var(--nexa-color-text-inverse);
        background: var(--nexa-color-primary-600);
      }
      .primary:hover:not(:disabled) {
        background: var(--nexa-color-primary-700);
      }
      .secondary {
        color: var(--nexa-color-primary-700);
        background: var(--nexa-surface-card);
        border-color: var(--nexa-color-border-interactive);
      }
      .secondary:hover:not(:disabled),
      .quiet:hover:not(:disabled) {
        background: var(--nexa-color-primary-50);
      }
      .quiet {
        color: var(--nexa-color-primary-700);
        background: transparent;
      }
      .danger {
        color: var(--nexa-color-danger-text);
        background: var(--nexa-surface-danger);
        border-color: var(--nexa-primitive-red-200);
      }
      .nexa-button:disabled {
        cursor: not-allowed;
        opacity: 0.48;
      }
      @media (prefers-reduced-motion: reduce) {
        .nexa-button {
          transition: none;
        }
      }
    `,
  ],
})
export class NexaButton {
  readonly variant = input<NexaButtonVariant>('primary');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input(false);
  readonly routerLink = input<string | undefined>(undefined);
  protected variantClass(): string {
    return this.variant();
  }
}

@Component({
  selector: 'nexa-status-chip',
  template:
    '<span class="nexa-status-chip" [class]="tone()"><span class="status-dot" aria-hidden="true"></span><span><ng-content /></span></span>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: inline-flex;
      }
      .nexa-status-chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        min-height: 26px;
        padding: 0 10px;
        border-radius: var(--nexa-radius-pill);
        font: 600 12px/1 var(--nexa-font-family-body);
      }
      .status-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: currentColor;
      }
      .success {
        color: var(--nexa-color-success-700);
        background: var(--nexa-surface-success);
      }
      .info {
        color: var(--nexa-color-info-700);
        background: var(--nexa-surface-info);
      }
      .warning {
        color: var(--nexa-color-warning-text);
        background: var(--nexa-surface-warning);
      }
      .danger {
        color: var(--nexa-color-danger-text);
        background: var(--nexa-surface-danger);
      }
      .neutral {
        color: var(--nexa-color-neutral-700);
        background: var(--nexa-surface-inset);
      }
    `,
  ],
})
export class NexaStatusChip {
  readonly tone = input<'success' | 'info' | 'warning' | 'danger' | 'neutral'>('neutral');
}

@Component({
  selector: 'nexa-page-header',
  template: `<header class="nexa-page-header">
    <div>
      <p class="eyebrow">{{ eyebrow() }}</p>
      <h1>{{ title() }}</h1>
      <p class="description">{{ description() }}</p>
    </div>
    <div class="actions"><ng-content /></div>
  </header>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: block;
      }
      .nexa-page-header {
        display: flex;
        align-items: end;
        justify-content: space-between;
        gap: 24px;
        margin-bottom: 26px;
      }
      .eyebrow {
        margin: 0 0 6px;
        color: var(--nexa-color-text-secondary);
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }
      h1 {
        margin: 0;
        color: var(--nexa-color-text-primary);
        font: 800 clamp(28px, 3vw, 40px)/1.1 var(--nexa-font-family-display);
        letter-spacing: -0.03em;
      }
      .description {
        max-width: 680px;
        margin: 8px 0 0;
        color: var(--nexa-color-text-secondary);
        line-height: var(--nexa-line-height-normal);
      }
      .actions {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      @media (max-width: 700px) {
        .nexa-page-header {
          align-items: start;
          flex-direction: column;
          gap: 16px;
        }
        .actions {
          width: 100%;
          flex-wrap: wrap;
        }
      }
      @media (max-width: 480px) {
        h1 {
          font-size: 26px;
        }
      }
    `,
  ],
})
export class NexaPageHeader {
  readonly eyebrow = input('REFERENCE SCREEN');
  readonly title = input.required<string>();
  readonly description = input('');
}

@Component({
  selector: 'nexa-surface',
  template: '<section class="nexa-surface" [class]="tone()"><ng-content /></section>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: block;
      }
      .nexa-surface {
        border: 1px solid var(--nexa-color-border-default);
        border-radius: var(--nexa-radius-panel);
        background: var(--nexa-surface-card);
      }
      .soft {
        background: var(--nexa-surface-info);
        border-color: var(--nexa-color-primary-200);
      }
      .inset {
        background: var(--nexa-surface-inset);
      }
    `,
  ],
})
export class NexaSurface {
  readonly tone = input<'default' | 'soft' | 'inset'>('default');
}

@Component({
  selector: 'nexa-table-shell',
  template: '<section class="nexa-table-shell"><ng-content /></section>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: block;
        min-width: 0;
      }
      .nexa-table-shell {
        overflow: hidden;
        border: 1px solid var(--nexa-color-border-default);
        border-radius: var(--nexa-radius-panel);
        background: var(--nexa-surface-card);
      }
    `,
  ],
})
export class NexaTableShell {}

@Component({
  selector: 'nexa-native-select',
  template: `<label class="field"
    ><span>{{ label() }}</span
    ><select [value]="value()" (change)="changed.emit($any($event.target).value)">
      @for (option of options(); track option) {
        <option [value]="option">{{ option }}</option>
      }
    </select></label
  >`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: block;
      }
      .field {
        display: grid;
        gap: 7px;
        color: var(--nexa-color-text-primary);
        font-size: 13px;
        font-weight: 600;
      }
      select {
        width: 100%;
        min-height: 42px;
        border: 1px solid var(--nexa-color-border-interactive);
        border-radius: var(--nexa-radius-control);
        padding: 0 12px;
        color: var(--nexa-color-text-primary);
        background: var(--nexa-surface-card);
        font: inherit;
      }
      select:focus-visible {
        outline: none;
        box-shadow: var(--nexa-focus-ring);
        border-color: var(--nexa-color-primary-500);
      }
    `,
  ],
})
export class NexaNativeSelect {
  readonly label = input.required<string>();
  readonly options = input.required<readonly string[]>();
  readonly value = input.required<string>();
  readonly changed = output<string>();
}
