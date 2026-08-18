import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NexaLogo } from '../../../design-system/brand/nexa-logo';
import { NexaButton } from '../../../design-system/button/nexa-button';
import { NexaLocaleSwitcher, type NexaLocale } from '../../../design-system/segmented-control/nexa-locale-switcher';
import { NexaSegmentedControl, type NexaSegmentOption } from '../../../design-system/segmented-control/nexa-segmented-control';
import { NexaTextField } from '../../../design-system/text-field/nexa-text-field';
import { NexaDocumentationFrame } from '../../layout/documentation-page';
import { injectDocumentationRouteContext } from '../../layout/page-context';

type AuthState = 'default' | 'focus' | 'invalid' | 'authenticating' | 'credentials' | 'workspace' | 'success';
interface AuthCopy { readonly title: string; readonly notice: string; readonly action: string; }

const AUTH_COPY: Readonly<Record<NexaLocale, AuthCopy>> = {
  en: { title: 'Sign in to your workspace', notice: 'Use your work identity to continue.', action: 'Sign in' },
  es: { title: 'Ingresa a tu workspace', notice: 'Usa tu identidad de trabajo para continuar.', action: 'Ingresar' },
};

@Component({
  selector: 'nexa-authentication-page',
  imports: [NexaButton, NexaDocumentationFrame, NexaLocaleSwitcher, NexaLogo, NexaSegmentedControl, NexaTextField],
  templateUrl: './authentication-page.html',
  styleUrl: './authentication-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaAuthenticationPage {
  protected readonly context = injectDocumentationRouteContext();
  protected readonly authState = signal<AuthState>('default');
  protected readonly authEmail = signal('');
  protected readonly authLocale = signal<NexaLocale>('en');
  protected readonly authStateOptions: readonly NexaSegmentOption[] = [
    { value: 'default', label: 'Default' },
    { value: 'focus', label: 'Field focus' },
    { value: 'invalid', label: 'Form invalid' },
    { value: 'authenticating', label: 'Authenticating' },
    { value: 'credentials', label: 'Invalid credentials' },
    { value: 'workspace', label: 'Workspace detected' },
    { value: 'success', label: 'Success / continue' },
  ];
  protected readonly authCopy = computed(() => AUTH_COPY[this.authLocale()]);

  protected setAuthState(value: string): void { this.authState.set(value as AuthState); }
  protected setAuthLocale(value: NexaLocale): void { this.authLocale.set(value); }

  protected authenticate(): void {
    if (!this.authEmail().trim()) {
      this.authState.set('invalid');
      return;
    }
    this.authState.set('authenticating');
    window.setTimeout(() => this.authState.set('success'), 420);
  }
}
