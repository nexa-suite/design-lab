import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { NexaActionMenu, type NexaActionMenuItem } from '../shared/nexa-action-menu';
import { NexaButton } from '../shared/nexa-button';
import { NexaLabEvaluation } from '../shared/lab-evaluation';
import { NexaLogo } from '../shared/nexa-logo';
import { NexaSegmentedControl, type NexaSegmentOption } from '../shared/nexa-segmented-control';
import { NexaStateSequence, type NexaSequencePhase } from '../shared/nexa-state-sequence';
import { NexaStatusChip, type NexaStatusEmphasis, type NexaStatusTone } from '../shared/nexa-status-chip';
import { NexaTextField } from '../shared/nexa-text-field';
import type { DocumentationPage } from './documentation-registry';

type AuthState = 'default' | 'focus' | 'invalid' | 'authenticating' | 'credentials' | 'workspace' | 'success';
type PaymentState = 'none' | 'loading' | 'unavailable';
type DenseMode = 'rows' | 'loading' | 'error' | 'empty';

interface AuthCopy { readonly title: string; readonly notice: string; readonly action: string; }
interface LegalSection { readonly id: string; readonly title: string; readonly summary: string; }
interface AnalyticsBar { readonly label: string; readonly value: string; readonly width: number; readonly tone: NexaStatusTone; }
interface DispatchCard { readonly id: string; readonly buyer: string; readonly destination: string; readonly status: string; readonly tone: NexaStatusTone; readonly emphasis?: NexaStatusEmphasis; readonly eta: string; readonly next: string; }

const AUTH_COPY: Readonly<Record<'en' | 'es', AuthCopy>> = {
  en: { title: 'Sign in to your workspace', notice: 'Use your work identity to continue.', action: 'Sign in' },
  es: { title: 'Ingresa a tu workspace', notice: 'Usa tu identidad de trabajo para continuar.', action: 'Ingresar' },
};

@Component({
  selector: 'nexa-pattern-documentation',
  imports: [NexaActionMenu, NexaButton, NexaLogo, NexaSegmentedControl, NexaStateSequence, NexaStatusChip, NexaTextField],
  templateUrl: './documentation-patterns.html',
  styleUrl: './documentation-patterns.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaPatternDocumentation {
  readonly page = input.required<DocumentationPage>();
  protected readonly evaluation = inject(NexaLabEvaluation);
  protected readonly authState = signal<AuthState>('default');
  protected readonly authEmail = signal('');
  protected readonly authLocale = signal<'en' | 'es'>('en');
  protected readonly warningChoice = signal<'idle' | 'continue' | 'cancelled'>('idle');
  protected readonly paymentState = signal<PaymentState>('none');
  protected readonly denseMode = signal<DenseMode>('rows');
  protected readonly denseSegment = signal('review');
  protected readonly dispatchSelection = signal('DSP-204');
  protected readonly dispatchNotice = signal('Choose a card or command to inspect the accessible movement path.');
  protected readonly denseQuery = signal('');

  protected readonly authStateOptions: readonly NexaSegmentOption[] = [
    { value: 'default', label: 'Default' },
    { value: 'focus', label: 'Field focus' },
    { value: 'invalid', label: 'Form invalid' },
    { value: 'authenticating', label: 'Authenticating' },
    { value: 'credentials', label: 'Invalid credentials' },
    { value: 'workspace', label: 'Workspace detected' },
    { value: 'success', label: 'Success / continue' },
  ];
  protected readonly denseModeOptions: readonly NexaSegmentOption[] = [
    { value: 'review', label: 'Needs review' },
    { value: 'ready', label: 'Ready' },
    { value: 'blocked', label: 'Blocked' },
  ];
  protected readonly asyncHappy: readonly NexaSequencePhase[] = [
    { id: 'ready', label: 'Ready', detail: 'Action is available.', tone: 'neutral' },
    { id: 'pressed', label: 'Pressed', detail: 'Input acknowledged.', tone: 'info' },
    { id: 'processing', label: 'Processing', detail: 'Work is in progress.', tone: 'info' },
    { id: 'success', label: 'Success', detail: 'Outcome confirmed.', tone: 'success' },
  ];
  protected readonly asyncRecovery: readonly NexaSequencePhase[] = [
    { id: 'ready', label: 'Ready', detail: 'Context is available.', tone: 'neutral' },
    { id: 'processing', label: 'Processing', detail: 'Work is in progress.', tone: 'info' },
    { id: 'error', label: 'Error', detail: 'The operation failed safely.', tone: 'danger' },
    { id: 'retry', label: 'Retry', detail: 'Action keeps current context.', tone: 'danger' },
    { id: 'processing-again', label: 'Processing', detail: 'Retry is running.', tone: 'info' },
    { id: 'success', label: 'Success', detail: 'Recovery completed.', tone: 'success' },
  ];
  protected readonly asyncWarning: readonly NexaSequencePhase[] = [
    { id: 'ready', label: 'Ready', detail: 'Action is available.', tone: 'neutral' },
    { id: 'processing', label: 'Processing', detail: 'A review point is reached.', tone: 'info' },
    { id: 'warning', label: 'Warning', detail: 'The next step needs confirmation.', tone: 'warning' },
    { id: 'continue', label: 'Continue', detail: 'User decision is explicit.', tone: 'info' },
    { id: 'cancelled', label: 'Cancelled', detail: 'Context remains recoverable.', tone: 'neutral' },
  ];
  protected readonly authCopy = computed(() => AUTH_COPY[this.authLocale()]);
  protected readonly legalSections: readonly LegalSection[] = [
    { id: 'scope', title: '1. Purpose and scope', summary: 'Synthetic placeholder: describe what the document covers and which audience should read it.' },
    { id: 'information', title: '2. Information and handling', summary: 'Synthetic placeholder: formal policy content must be supplied and approved by the responsible owner.' },
    { id: 'responsibilities', title: '3. Responsibilities', summary: 'Synthetic placeholder: define obligations only after legal and product review.' },
    { id: 'contact', title: '4. Contact and updates', summary: 'Synthetic placeholder: provide an approved support or policy contact.' },
  ];
  protected readonly analyticsBars: readonly AnalyticsBar[] = [
    { label: 'Completed', value: '64%', width: 64, tone: 'success' },
    { label: 'Awaiting review', value: '22%', width: 22, tone: 'warning' },
    { label: 'Blocked', value: '14%', width: 14, tone: 'danger' },
  ];
  protected readonly dispatchColumns: readonly { id: string; label: string; cards: readonly DispatchCard[] }[] = [
    { id: 'orders', label: 'Orders', cards: [{ id: 'DSP-204', buyer: 'La Cava Fría', destination: 'Lima · North', status: 'Ready for review', tone: 'info', eta: 'Candidate ETA', next: 'Review documents' }] },
    { id: 'preparation', label: 'Ready / preparation', cards: [{ id: 'DSP-198', buyer: 'Andino Food Service', destination: 'Callao · Hub', status: 'Documents pending', tone: 'warning', eta: 'Candidate ETA', next: 'Resolve checklist' }] },
    { id: 'distribution', label: 'In distribution', cards: [{ id: 'DSP-191', buyer: 'Frío Norte SAC', destination: 'Chiclayo · Route', status: 'Critical exception', tone: 'danger', emphasis: 'strong', eta: 'Candidate ETA', next: 'Open exception' }] },
    { id: 'delivered', label: 'Delivered', cards: [{ id: 'DSP-183', buyer: 'Mercado Central', destination: 'Lima · South', status: 'Completed', tone: 'success', eta: 'Closed', next: 'View record' }] },
    { id: 'exception', label: 'Exception / returned', cards: [{ id: 'DSP-176', buyer: 'Distribuciones Sur', destination: 'Arequipa · Hub', status: 'Blocked', tone: 'danger', eta: 'Needs decision', next: 'Review safely' }] },
  ];
  protected readonly dispatchMenuItems: readonly NexaActionMenuItem[] = [
    { id: 'open', label: 'Open candidate detail', icon: 'pi-external-link', shortcut: 'Enter' },
    { id: 'review', label: 'Review next safe action', icon: 'pi-check-circle' },
    { id: 'move', label: 'Move to candidate column', icon: 'pi-arrow-right', separatorBefore: true },
    { id: 'blocked', label: 'Critical command', icon: 'pi-ban', destructive: true },
    { id: 'disabled', label: 'Unresolved transition', icon: 'pi-lock', disabled: true },
  ];
  protected readonly denseRows = [
    { id: 'LOT-2041', item: 'Refrigerated product', quantity: '24', progress: '82%', status: 'Needs review', tone: 'warning' as const },
    { id: 'LOT-2038', item: 'Frozen product', quantity: '12', progress: '100%', status: 'Ready', tone: 'success' as const },
    { id: 'LOT-2029', item: 'Document batch', quantity: '8', progress: '36%', status: 'Blocked', tone: 'danger' as const },
  ];

  protected setAuthState(value: string): void { this.authState.set(value as AuthState); }
  protected setAuthLocale(value: string): void { this.authLocale.set(value as 'en' | 'es'); }
  protected authenticate(): void {
    if (!this.authEmail().trim()) {
      this.authState.set('invalid');
      return;
    }
    this.authState.set('authenticating');
    window.setTimeout(() => this.authState.set('success'), 420);
  }
  protected setWarningChoice(choice: 'continue' | 'cancelled'): void { this.warningChoice.set(choice); }
  protected selectPaymentState(state: PaymentState): void { this.paymentState.set(state); }
  protected selectDispatch(id: string): void {
    this.dispatchSelection.set(id);
    this.dispatchNotice.set(`${id} selected. Candidate transition permissions remain unresolved.`);
  }
  protected dispatchCommand(id: string): void { this.dispatchNotice.set(`Candidate command “${id}” inspected. No domain transition was executed.`); }
  protected setDenseMode(value: string): void { this.denseMode.set(value as DenseMode); }
  protected setDenseSegment(value: string): void { this.denseSegment.set(value); }
  protected denseResults(): readonly typeof this.denseRows[number][] {
    const query = this.denseQuery().trim().toLocaleLowerCase();
    return query ? this.denseRows.filter((row) => `${row.id} ${row.item}`.toLocaleLowerCase().includes(query)) : this.denseRows;
  }
}
