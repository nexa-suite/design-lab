import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { NexaSegmentedControl, type NexaSegmentOption } from './nexa-segmented-control';

export type NexaLocale = 'en' | 'es';

@Component({
  selector: 'nexa-locale-switcher',
  imports: [NexaSegmentedControl],
  template: '<nexa-segmented-control [label]="label()" [options]="options" [selected]="locale()" (selectedChange)="choose($event)" size="compact" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaLocaleSwitcher {
  readonly label = input('Specimen language');
  readonly locale = model<NexaLocale>('en');
  protected readonly options: readonly NexaSegmentOption[] = [
    { value: 'en', label: 'EN' },
    { value: 'es', label: 'ES' },
  ];

  protected choose(value: string): void {
    if (value === 'en' || value === 'es') this.locale.set(value);
  }
}
