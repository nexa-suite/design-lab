import { ChangeDetectionStrategy, Component, ElementRef, inject, input, signal } from '@angular/core';

@Component({
  selector: 'nexa-tooltip',
  templateUrl: './nexa-tooltip.html',
  styleUrl: './nexa-tooltip.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(pointerenter)': 'cancelHide()',
    '(pointerleave)': 'scheduleHide()',
    '(focusin)': 'show()',
    '(focusout)': 'handleFocusOut($event)',
    '(keydown)': 'handleKeydown($event)',
  },
})
export class NexaTooltip {
  readonly id = input.required<string>();
  readonly content = input.required<string>();
  readonly triggerLabel = input.required<string>();
  readonly visible = signal(false);
  private readonly host = inject(ElementRef<HTMLElement>);
  private hideTimer: number | undefined;

  protected show(): void {
    this.cancelHide();
    this.visible.set(true);
  }

  protected scheduleHide(): void {
    this.cancelHide();
    this.hideTimer = window.setTimeout(() => this.visible.set(false), 120);
  }

  protected cancelHide(): void {
    if (this.hideTimer !== undefined) window.clearTimeout(this.hideTimer);
    this.hideTimer = undefined;
  }

  protected handleFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget;
    if (!(next instanceof Node) || !this.host.nativeElement.contains(next)) this.scheduleHide();
  }

  protected dismiss(event: Event): void {
    event.preventDefault();
    this.cancelHide();
    this.visible.set(false);
    const host = this.host.nativeElement as HTMLElement;
    host.querySelector<HTMLButtonElement>('.tooltip-trigger')?.focus();
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') this.dismiss(event);
  }
}
