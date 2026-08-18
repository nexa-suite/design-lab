import { ChangeDetectionStrategy, Component, input, output, viewChild } from '@angular/core';
import { Menu, MenuContent, MenuItem, MenuTrigger } from '@angular/aria/menu';
import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';

export interface NexaMenuAction {
  readonly id: string;
  readonly label: string;
  readonly disabled?: boolean;
}

@Component({
  selector: 'nexa-action-menu',
  imports: [Menu, MenuContent, MenuItem, MenuTrigger, OverlayModule],
  template: `
    <button
      #triggerElement
      class="menu-trigger"
      type="button"
      ngMenuTrigger
      #trigger="ngMenuTrigger"
      [menu]="menu()"
      [attr.aria-label]="label()"
      [attr.aria-expanded]="trigger.expanded()"
    >
      <span>{{ label() }}</span
      ><span class="chevron" aria-hidden="true">⌄</span>
    </button>
    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="triggerElement"
      [cdkConnectedOverlayOpen]="trigger.expanded()"
      [cdkConnectedOverlayPositions]="overlayPositions"
      [cdkConnectedOverlayHasBackdrop]="true"
      cdkConnectedOverlayBackdropClass="cdk-overlay-transparent-backdrop"
      cdkConnectedOverlayPanelClass="nexa-action-menu-overlay"
      [cdkConnectedOverlayPush]="true"
      [cdkConnectedOverlayViewportMargin]="12"
      (backdropClick)="menu()?.close()"
    >
      <div ngMenu #menu="ngMenu" class="menu-panel" (itemSelected)="select($event)">
        <ng-template ngMenuContent>
          @for (item of items(); track item.id) {
            <button ngMenuItem type="button" [value]="item.id" [disabled]="item.disabled ?? false">
              {{ item.label }}
            </button>
          }
        </ng-template>
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: inline-flex;
      }
      .menu-trigger {
        display: inline-flex;
        align-items: center;
        gap: 9px;
        min-height: 40px;
        border: 1px solid var(--nexa-color-border-interactive);
        border-radius: var(--nexa-radius-pill);
        padding: 0 14px;
        color: var(--nexa-color-text-primary);
        background: var(--nexa-surface-card);
        font: 600 13px/1 var(--nexa-font-family-body);
        cursor: pointer;
      }
      .menu-trigger:hover {
        border-color: var(--nexa-color-primary-400);
        background: var(--nexa-surface-info);
      }
      .menu-trigger:focus-visible {
        outline: none;
        box-shadow: var(--nexa-focus-ring);
      }
      .chevron {
        color: var(--nexa-color-text-secondary);
        font-size: 17px;
        line-height: 0.7;
      }
      .menu-panel {
        min-width: 190px;
        overflow: hidden;
        border: 1px solid var(--nexa-color-border-default);
        border-radius: var(--nexa-radius-overlay);
        padding: 6px;
        background: var(--nexa-surface-card);
        box-shadow: var(--nexa-shadow-menu);
      }
      .menu-panel button {
        display: block;
        width: 100%;
        border: 0;
        border-radius: var(--nexa-radius-md);
        padding: 10px 12px;
        color: var(--nexa-color-text-primary);
        background: transparent;
        font: 500 13px/1.2 var(--nexa-font-family-body);
        text-align: left;
        cursor: pointer;
      }
      .menu-panel button:hover,
      .menu-panel button:focus-visible {
        outline: none;
        color: var(--nexa-color-primary-700);
        background: var(--nexa-surface-info);
      }
      .menu-panel button:disabled {
        cursor: not-allowed;
        opacity: 0.45;
      }
    `,
  ],
})
export class NexaActionMenu {
  readonly label = input('More actions');
  readonly items = input.required<readonly NexaMenuAction[]>();
  readonly selected = output<string>();
  protected readonly menu = viewChild<Menu<string>>('menu');
  protected readonly overlayPositions: ConnectedPosition[] = [
    { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: 8 },
    { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetY: -8 },
  ];
  protected select(id: string): void {
    this.selected.emit(id);
  }
}
