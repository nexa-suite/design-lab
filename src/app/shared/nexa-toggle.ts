import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

@Component({
  selector: 'nexa-toggle',
  templateUrl: './nexa-toggle.html',
  styleUrl: './nexa-toggle.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaToggle {
  readonly id = input.required<string>();
  readonly label = input.required<string>();
  readonly checked = model(false);
  readonly disabled = input(false);

  protected update(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLInputElement) this.checked.set(target.checked);
  }
}
