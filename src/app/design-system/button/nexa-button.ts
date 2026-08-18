import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export type NexaButtonVariant = 'primary' | 'secondary' | 'quiet' | 'danger';
export type NexaButtonSize = 'compact' | 'standard' | 'large';

@Component({
  selector: 'nexa-button',
  imports: [RouterLink],
  template: `
    @if (routerLink(); as link) {
      <a class="nexa-button" [class]="classes()" [routerLink]="linkDisabled() ? null : link" [attr.aria-busy]="loading()" [attr.aria-disabled]="linkDisabled() ? 'true' : null" [attr.tabindex]="linkDisabled() ? -1 : null" (click)="guardLink($event)" (keydown.enter)="guardLink($event)" (keydown.space)="guardLink($event)">
        @if (loading()) { <span class="spinner" aria-hidden="true"></span> }
        <ng-content />
      </a>
    } @else {
      <button class="nexa-button" [class]="classes()" [disabled]="disabled() || loading()" [type]="type()" [attr.aria-busy]="loading()">
        @if (loading()) { <span class="spinner" aria-hidden="true"></span> }
        <ng-content />
      </button>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host { display: inline-flex; min-width: 0; }
      .nexa-button { display: inline-flex; min-height: var(--nexa-control-height-md); align-items: center; justify-content: center; gap: var(--nexa-space-2); border: 1px solid transparent; border-radius: var(--nexa-radius-control); padding: 0 var(--nexa-space-4); font: 600 var(--nexa-font-size-sm)/1 var(--nexa-font-family-body); text-decoration: none; cursor: pointer; transition: background var(--nexa-motion-standard), border-color var(--nexa-motion-standard), color var(--nexa-motion-standard), transform var(--nexa-motion-standard); }
      .compact { min-height: var(--nexa-control-height-sm); padding-inline: var(--nexa-space-3); font-size: var(--nexa-font-size-xs); }
      .large { min-height: var(--nexa-control-height-lg); padding-inline: var(--nexa-space-5); font-size: var(--nexa-font-size-md); }
      .full-width { width: 100%; }
      .nexa-button:focus-visible { outline: none; box-shadow: var(--nexa-focus-ring); }
      .nexa-button:active:not(:disabled) { transform: translateY(1px); }
      .primary { color: var(--nexa-color-text-inverse); background: var(--nexa-color-primary-600); }
      .primary:hover:not(:disabled) { background: var(--nexa-color-primary-700); }
      .secondary { color: var(--nexa-color-primary-700); background: var(--nexa-surface-card); border-color: var(--nexa-color-border-interactive); }
      .secondary:hover:not(:disabled) { background: var(--nexa-surface-info); border-color: var(--nexa-color-primary-300); }
      .quiet { color: var(--nexa-color-neutral-700); background: transparent; }
      .quiet:hover:not(:disabled) { color: var(--nexa-color-primary-700); background: var(--nexa-surface-info); }
      .danger { color: var(--nexa-color-danger-text); background: var(--nexa-surface-danger); border-color: var(--nexa-primitive-red-200); }
      .danger:hover:not(:disabled) { background: color-mix(in oklab, var(--nexa-surface-danger) 82%, var(--nexa-primitive-red-200)); }
      .nexa-button:disabled { cursor: not-allowed; opacity: 0.48; }
      .spinner { width: 14px; height: 14px; border: 2px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: nexa-spin var(--nexa-motion-spinner) linear infinite; }
      @keyframes nexa-spin { to { transform: rotate(360deg); } }
      @media (prefers-reduced-motion: reduce) { .nexa-button { transition: none; } .spinner { animation: none; border-right-color: currentColor; } }
    `,
  ],
})
export class NexaButton {
  readonly variant = input<NexaButtonVariant>('primary');
  readonly size = input<NexaButtonSize>('standard');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly fullWidth = input(false);
  readonly routerLink = input<string | undefined>(undefined);

  protected classes(): string { return `${this.variant()} ${this.size()}${this.fullWidth() ? ' full-width' : ''}`; }
  protected linkDisabled(): boolean { return this.disabled() || this.loading(); }
  protected guardLink(event: Event): void {
    if (!this.linkDisabled()) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  }
}
