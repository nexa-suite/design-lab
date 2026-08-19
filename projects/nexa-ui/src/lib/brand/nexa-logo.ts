import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type NexaLogoVariant = 'primary' | 'inverse';

@Component({
  selector: 'nexa-logo',
  template: '<img [src]="source()" [attr.alt]="decorative() ? \'\' : alt()" [attr.aria-hidden]="decorative() ? \'true\' : null" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host { display: inline-flex; min-width: 0; }
      img { display: block; width: 100%; height: auto; }
    `,
  ],
})
export class NexaLogo {
  readonly variant = input<NexaLogoVariant>('primary');
  readonly alt = input('Nexa');
  readonly decorative = input(false);
  protected readonly source = computed(() => this.variant() === 'inverse'
    ? '/brand/canonical/Documento.svg'
    : '/brand/canonical/logo-nexa.svg');
}
