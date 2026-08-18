import { ChangeDetectionStrategy, Component, computed, input, model, output } from '@angular/core';

export type NexaTextFieldType = 'text' | 'search' | 'email' | 'password';

@Component({
  selector: 'nexa-text-field',
  templateUrl: './nexa-text-field.html',
  styleUrl: './nexa-text-field.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaTextField {
  readonly id = input.required<string>();
  readonly label = input.required<string>();
  readonly value = model('');
  readonly type = input<NexaTextFieldType>('text');
  readonly placeholder = input('');
  readonly helper = input('');
  readonly error = input('');
  readonly required = input(false);
  readonly disabled = input(false);
  readonly readOnly = input(false);
  readonly leadingIcon = input('');
  readonly trailingActionLabel = input('');
  readonly trailingAction = output<void>();

  protected readonly describedBy = computed(() => {
    const ids = [] as string[];
    if (this.helper()) ids.push(`${this.id()}-help`);
    if (this.error()) ids.push(`${this.id()}-error`);
    return ids.join(' ') || null;
  });

  protected updateValue(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLInputElement) this.value.set(target.value);
  }

  protected emitTrailingAction(): void { this.trailingAction.emit(); }
}
