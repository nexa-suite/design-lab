import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import {
  NexaActionMenu,
  NexaButton,
  NexaNumericStepper,
  NexaRangeSlider,
  NexaSegmentedControl,
  NexaStatusChip,
  NexaTextField,
  NexaToggle,
  NexaTooltip,
  type NexaActionMenuItem,
  type NexaSegmentOption,
  type NexaStatusTone,
} from 'nexa-ui';
import { NexaStateSequence, type NexaSequencePhase } from '../../lab/evidence/state-sequence/nexa-state-sequence';
import type { DocumentationPage } from '../models/documentation-page';
import { COMPONENT_STATES, componentAnswers } from '../content/documentation-data';

type ButtonState = 'idle' | 'processing' | 'success' | 'error';
type TableStatus = 'Awaiting review' | 'Completed' | 'Blocked';
interface TableRow { readonly id: string; readonly buyer: string; readonly status: TableStatus; }
interface NavItem { readonly id: string; readonly label: string; readonly icon: string; }

const PRODUCTS = ['Grana Padano DOP 150G', 'Parmigiano Reggiano DOP 150G', 'Mortadella Bologna IGP'];
const TABLE_ROWS: readonly TableRow[] = [
  { id: 'SO-2026-0418', buyer: 'La Cava Fría', status: 'Awaiting review' },
  { id: 'SO-2026-0417', buyer: 'Andino Food Service', status: 'Completed' },
  { id: 'SO-2026-0416', buyer: 'Frío Norte SAC', status: 'Blocked' },
];
const NAV_ITEMS: readonly NavItem[] = [
  { id: 'dashboard', label: 'Sales Dashboard', icon: 'pi-th-large' },
  { id: 'catalog', label: 'Product Catalog', icon: 'pi-box' },
  { id: 'requests', label: 'Purchase Requests', icon: 'pi-inbox' },
];

@Component({
  selector: 'nexa-component-documentation',
  imports: [NexaActionMenu, NexaButton, NexaNumericStepper, NexaRangeSlider, NexaSegmentedControl, NexaStateSequence, NexaStatusChip, NexaTextField, NexaToggle, NexaTooltip],
  templateUrl: './component-documentation.html',
  styleUrl: './component-documentation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'closeLayers()' },
})
export class NexaComponentDocumentation {
  readonly page = input.required<DocumentationPage>();
  protected readonly componentStates = COMPONENT_STATES;
  protected readonly navItems = NAV_ITEMS;
  protected readonly products = PRODUCTS;
  protected readonly answers = computed(() => componentAnswers(this.page()));
  protected readonly buttonState = signal<ButtonState>('idle');
  protected readonly buttonNotice = signal('Choose an action to see a truthful result.');
  protected readonly fieldValue = signal('');
  protected readonly fieldValidated = signal(false);
  protected readonly searchQuery = signal('');
  protected readonly searchState = signal<'idle' | 'searching' | 'error'>('idle');
  protected readonly selectedOption = signal('Sales');
  protected readonly selectedPlan = signal('standard');
  protected readonly selectedFeatures = signal<readonly string[]>(['cold-chain']);
  protected readonly toggleEnabled = signal(true);
  protected readonly selectedSegment = signal('open');
  protected readonly segmentedLatencyMs = signal<number | null>(null);
  protected readonly statusNotice = signal('Submitted');
  protected readonly alertVisible = signal(true);
  protected readonly alertNotice = signal('');
  protected readonly menuOpen = signal(false);
  protected readonly menuNotice = signal('No menu command selected.');
  protected readonly dialogOpen = signal(false);
  protected readonly tableQuery = signal('');
  protected readonly tableStatus = signal<'all' | TableStatus>('all');
  protected readonly sortAscending = signal(true);
  protected readonly tableNotice = signal('');
  protected readonly currentStep = signal(1);
  protected readonly activeNav = signal('dashboard');
  protected readonly cardExpanded = signal(false);
  protected readonly quantity = signal(2);
  protected readonly threshold = signal(4);
  protected readonly tooltipVisible = signal(false);
  protected readonly actionMenuItems: readonly NexaActionMenuItem[] = [
    { id: 'open', label: 'Open request', icon: 'pi-external-link', shortcut: 'Enter' },
    { id: 'duplicate', label: 'Duplicate', icon: 'pi-copy' },
    { id: 'archive', label: 'Archive', icon: 'pi-folder', destructive: true, separatorBefore: true },
    { id: 'disabled', label: 'Unavailable command', icon: 'pi-lock', disabled: true },
  ];
  protected readonly compactActionMenuItems: readonly NexaActionMenuItem[] = [
    { id: 'compact-review', label: 'Review', icon: 'pi-search' },
    { id: 'compact-copy', label: 'Copy link', icon: 'pi-copy' },
  ];
  protected readonly groupedActionMenuItems: readonly NexaActionMenuItem[] = [
    { id: 'group-open', label: 'Open request', icon: 'pi-external-link', shortcut: 'Enter' },
    { id: 'group-duplicate', label: 'Duplicate', icon: 'pi-copy' },
    { id: 'group-archive', label: 'Archive', icon: 'pi-folder', separatorBefore: true },
    { id: 'group-delete', label: 'Delete draft', icon: 'pi-trash', destructive: true, separatorBefore: true },
  ];
  protected readonly longActionMenuItems: readonly NexaActionMenuItem[] = [
    { id: 'long-01', label: 'Open request', icon: 'pi-external-link' },
    { id: 'long-02', label: 'Review documents', icon: 'pi-file' },
    { id: 'long-03', label: 'Assign owner', icon: 'pi-user' },
    { id: 'long-04', label: 'Duplicate request', icon: 'pi-copy' },
    { id: 'long-05', label: 'Export summary', icon: 'pi-download', separatorBefore: true },
    { id: 'long-06', label: 'Archive request', icon: 'pi-folder' },
    { id: 'long-07', label: 'Unavailable command', icon: 'pi-lock', disabled: true },
    { id: 'long-08', label: 'Cancel request', icon: 'pi-ban', destructive: true, separatorBefore: true },
  ];

  protected readonly segmentOptions: readonly NexaSegmentOption[] = [
    { value: 'open', label: 'Open' },
    { value: 'review', label: 'In review' },
    { value: 'closed', label: 'Closed' },
    { value: 'disabled', label: 'Archived', disabled: true },
  ];
  protected readonly statusExamples: readonly { label: string; tone: NexaStatusTone; icon: string; emphasis?: 'subtle' | 'standard' | 'strong' }[] = [
    { label: 'Active', tone: 'success', icon: 'pi-check-circle' },
    { label: 'Inactive', tone: 'neutral', icon: 'pi-minus-circle' },
    { label: 'Available', tone: 'success', icon: 'pi-check' },
    { label: 'Unavailable', tone: 'neutral', icon: 'pi-ban' },
    { label: 'Processing', tone: 'info', icon: 'pi-sync' },
    { label: 'Pending', tone: 'warning', icon: 'pi-clock' },
    { label: 'Awaiting review', tone: 'warning', icon: 'pi-search' },
    { label: 'Completed', tone: 'success', icon: 'pi-check-circle', emphasis: 'standard' },
    { label: 'Blocked', tone: 'danger', icon: 'pi-ban', emphasis: 'standard' },
    { label: 'Cancelled', tone: 'neutral', icon: 'pi-times-circle' },
    { label: 'Error', tone: 'danger', icon: 'pi-exclamation-circle', emphasis: 'standard' },
    { label: 'Warning', tone: 'warning', icon: 'pi-exclamation-triangle', emphasis: 'standard' },
    { label: 'Critical', tone: 'danger', icon: 'pi-shield', emphasis: 'strong' },
  ];
  protected readonly operationPhases: readonly NexaSequencePhase[] = [
    { id: 'ready', label: 'Ready', detail: 'Create order is available.', tone: 'neutral', durationMs: 700 },
    { id: 'processing', label: 'Processing', detail: 'Creating order.', tone: 'info', durationMs: 900 },
    { id: 'success', label: 'Success', detail: 'Order created; adjacent feedback remains.', tone: 'success', terminal: true },
  ];
  protected readonly searchPhases: readonly NexaSequencePhase[] = [
    { id: 'query', label: 'Query', detail: 'A search term is available.', tone: 'neutral', durationMs: 700 },
    { id: 'searching', label: 'Searching', detail: 'The query is being evaluated.', tone: 'info', durationMs: 900 },
    { id: 'results', label: 'Results', detail: 'Matching products are visible.', tone: 'success', terminal: true },
    { id: 'error', label: 'Error', detail: 'Search failed without losing the query.', tone: 'danger', terminal: true },
  ];
  protected readonly progressPhases: readonly NexaSequencePhase[] = [
    { id: 'determinate', label: 'Determinate', detail: 'Known completion amount.', tone: 'info', durationMs: 700 },
    { id: 'paused', label: 'Paused', detail: 'Progress is intentionally paused.', tone: 'warning', durationMs: 700 },
    { id: 'complete', label: 'Complete', detail: 'The operation reached its terminal result.', tone: 'success', terminal: true },
    { id: 'error', label: 'Error', detail: 'The operation needs recovery.', tone: 'danger', terminal: true },
  ];

  protected readonly searchResults = computed(() => {
    const query = this.searchQuery().trim().toLocaleLowerCase();
    return query ? PRODUCTS.filter((product) => product.toLocaleLowerCase().includes(query)) : PRODUCTS;
  });
  protected readonly tableRows = computed(() => {
    const query = this.tableQuery().trim().toLocaleLowerCase();
    const status = this.tableStatus();
    const rows = TABLE_ROWS.filter((row) => {
      const matchesQuery = !query || `${row.id} ${row.buyer}`.toLocaleLowerCase().includes(query);
      return matchesQuery && (status === 'all' || row.status === status);
    });
    return [...rows].sort((left, right) => this.sortAscending() ? left.id.localeCompare(right.id) : right.id.localeCompare(left.id));
  });

  protected buttonLabel(): string {
    return this.buttonState() === 'processing' ? 'Creating…' : this.buttonState() === 'success' ? 'Created' : this.buttonState() === 'error' ? 'Try again' : 'Create Sales Order';
  }
  protected buttonTone(): NexaStatusTone {
    return this.buttonState() === 'success' ? 'success' : this.buttonState() === 'error' ? 'danger' : 'info';
  }
  protected runButton(outcome: 'success' | 'error' = 'success'): void {
    if (this.buttonState() === 'processing') return;
    this.buttonState.set('processing');
    this.buttonNotice.set('Creating sales order. Duplicate activation is blocked.');
    window.setTimeout(() => {
      this.buttonState.set(outcome);
      this.buttonNotice.set(outcome === 'success' ? 'Created. Adjacent feedback confirms the outcome.' : 'Could not create order. Retry keeps current context.');
    }, 650);
  }
  protected resetButton(): void { this.buttonState.set('idle'); this.buttonNotice.set('Choose an action to see a truthful result.'); }
  protected validateField(): void { this.fieldValidated.set(true); }
  protected updateSearch(value: string): void { this.searchQuery.set(value); this.searchState.set('idle'); }
  protected simulateSearch(): void {
    this.searchState.set('searching');
    window.setTimeout(() => this.searchState.set(this.searchQuery().includes('error') ? 'error' : 'idle'), 500);
  }
  protected clearSearch(): void { this.searchQuery.set(''); this.searchState.set('idle'); }
  protected setSelectedOption(event: Event): void { const target = event.target; if (target instanceof HTMLSelectElement) this.selectedOption.set(target.value); }
  protected setPlan(event: Event): void { const target = event.target; if (target instanceof HTMLInputElement) this.selectedPlan.set(target.value); }
  protected toggleFeature(feature: string): void { this.selectedFeatures.update((current) => current.includes(feature) ? current.filter((item) => item !== feature) : [...current, feature]); }
  protected setStatus(status: string): void { this.statusNotice.set(status); }
  protected selectSegment(value: string): void {
    const startedAt = performance.now();
    this.selectedSegment.set(value);
    requestAnimationFrame(() => this.segmentedLatencyMs.set(Number((performance.now() - startedAt).toFixed(2))));
  }
  protected hasTemporalEvidence(): boolean { return ['buttons', 'search-fields', 'progress-indicators'].includes(this.page().id); }
  protected processPhases(): readonly NexaSequencePhase[] {
    return this.page().id === 'search-fields' ? this.searchPhases : this.page().id === 'progress-indicators' ? this.progressPhases : this.operationPhases;
  }
  protected processEvidenceTitle(): string {
    return this.page().id === 'search-fields' ? 'Search operation' : this.page().id === 'progress-indicators' ? 'Progress lifecycle' : 'Button operation';
  }
  protected toneForStatus(status: string): NexaStatusTone { return status === 'Completed' ? 'success' : status === 'Blocked' ? 'danger' : status === 'Awaiting review' ? 'warning' : 'info'; }
  protected dismissAlert(): void { this.alertVisible.set(false); this.alertNotice.set('Alert dismissed. The recovery action restores it.'); }
  protected restoreAlert(): void { this.alertVisible.set(true); this.alertNotice.set(''); }
  protected toggleMenu(): void { this.menuOpen.update((open) => !open); }
  protected chooseMenuAction(action: string): void { this.menuNotice.set(`${action} selected.`); this.menuOpen.set(false); }
  protected openDialog(): void { this.dialogOpen.set(true); }
  protected closeLayers(): void { this.menuOpen.set(false); this.dialogOpen.set(false); this.tooltipVisible.set(false); }
  protected updateTableQuery(event: Event): void { const target = event.target; if (target instanceof HTMLInputElement) this.tableQuery.set(target.value); }
  protected setTableStatus(event: Event): void { const target = event.target; if (target instanceof HTMLSelectElement) this.tableStatus.set(target.value as 'all' | TableStatus); }
  protected toggleSort(): void { this.sortAscending.update((ascending) => !ascending); }
  protected rowAction(id: string): void { this.tableNotice.set(`Reviewing ${id}.`); }
  protected previousStep(): void { this.currentStep.update((step) => Math.max(1, step - 1)); }
  protected nextStep(): void { this.currentStep.update((step) => Math.min(4, step + 1)); }
  protected selectNav(id: string, event: Event): void { event.preventDefault(); this.activeNav.set(id); }
  protected progressPercentage(): number { return (this.currentStep() / 4) * 100; }
}
