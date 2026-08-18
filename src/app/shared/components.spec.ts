import { TestBed } from '@angular/core/testing';
import { NexaButton } from './nexa-button';
import { NexaActionMenu, type NexaActionMenuItem } from './nexa-action-menu';
import { NexaNumericStepper } from './nexa-numeric-stepper';
import { NexaRangeSlider } from './nexa-range-slider';
import { NexaSegmentedControl } from './nexa-segmented-control';
import { NexaStateSequence } from './nexa-state-sequence';
import { NexaTextField } from './nexa-text-field';
import { NexaToggle } from './nexa-toggle';
import { NexaTooltip } from './nexa-tooltip';

describe('Nexa candidate controls', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      NexaNumericStepper,
      NexaRangeSlider,
      NexaSegmentedControl,
      NexaStateSequence,
      NexaTextField,
      NexaToggle,
      NexaButton,
      NexaActionMenu,
      NexaTooltip,
    ],
  }));

  it('keeps text field value and support associations truthful', () => {
    const fixture = TestBed.createComponent(NexaTextField);
    fixture.componentRef.setInput('id', 'email');
    fixture.componentRef.setInput('label', 'Email');
    fixture.componentRef.setInput('helper', 'Use your work address.');
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = 'person@nexa.test';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();

    expect(fixture.componentInstance.value()).toBe('person@nexa.test');
    expect(input.getAttribute('aria-describedby')).toBe('email-help');
  });

  it('keeps button geometry truthful while loading', () => {
    const fixture = TestBed.createComponent(NexaButton);
    fixture.componentRef.setInput('loading', true);
    fixture.componentRef.setInput('variant', 'secondary');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    expect(button.getAttribute('aria-busy')).toBe('true');
    expect(button.querySelector('.spinner')).toBeTruthy();
  });

  it('updates toggle and segmented selection through user actions', () => {
    const toggleFixture = TestBed.createComponent(NexaToggle);
    toggleFixture.componentRef.setInput('id', 'alerts');
    toggleFixture.componentRef.setInput('label', 'Alerts');
    toggleFixture.detectChanges();
    const toggleInput = toggleFixture.nativeElement.querySelector('input[role="switch"]') as HTMLInputElement;
    toggleInput.click();
    toggleFixture.detectChanges();
    expect(toggleFixture.componentInstance.checked()).toBe(true);

    const segmentedFixture = TestBed.createComponent(NexaSegmentedControl);
    segmentedFixture.componentRef.setInput('label', 'View');
    segmentedFixture.componentRef.setInput('options', [
      { value: 'list', label: 'List' },
      { value: 'cards', label: 'Cards' },
    ]);
    segmentedFixture.componentRef.setInput('selected', 'list');
    segmentedFixture.detectChanges();
    (segmentedFixture.nativeElement.querySelectorAll('button')[1] as HTMLButtonElement).click();
    segmentedFixture.detectChanges();
    expect(segmentedFixture.componentInstance.selected()).toBe('cards');
  });

  it('clamps numeric values and reports slider values', () => {
    const stepperFixture = TestBed.createComponent(NexaNumericStepper);
    stepperFixture.componentRef.setInput('id', 'quantity');
    stepperFixture.componentRef.setInput('label', 'Quantity');
    stepperFixture.componentRef.setInput('min', 1);
    stepperFixture.componentRef.setInput('max', 2);
    stepperFixture.componentInstance.value.set(2);
    stepperFixture.detectChanges();
    (stepperFixture.nativeElement.querySelectorAll('button')[1] as HTMLButtonElement).click();
    expect(stepperFixture.componentInstance.value()).toBe(2);

    const sliderFixture = TestBed.createComponent(NexaRangeSlider);
    sliderFixture.componentRef.setInput('id', 'temperature');
    sliderFixture.componentRef.setInput('label', 'Temperature');
    sliderFixture.componentRef.setInput('unit', '°C');
    sliderFixture.detectChanges();
    const slider = sliderFixture.nativeElement.querySelector('input[type="range"]') as HTMLInputElement;
    slider.value = '7';
    slider.dispatchEvent(new Event('input', { bubbles: true }));
    sliderFixture.detectChanges();
    expect(sliderFixture.componentInstance.value()).toBe(7);
    expect(sliderFixture.nativeElement.querySelector('output')?.textContent).toContain('7°C');
  });

  it('advances and resets a state sequence without autoplay', () => {
    const fixture = TestBed.createComponent(NexaStateSequence);
    fixture.componentRef.setInput('title', 'Order operation');
    fixture.componentRef.setInput('phases', [
      { id: 'ready', label: 'Ready', detail: 'Available.' },
      { id: 'done', label: 'Done', detail: 'Completed.', tone: 'success' as const },
    ]);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="status"]')?.textContent).toContain('Ready');
    (fixture.nativeElement.querySelectorAll('button')[1] as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="status"]')?.textContent).toContain('Done');
    (fixture.nativeElement.querySelectorAll('button')[2] as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="status"]')?.textContent).toContain('Ready');
  });

  it('recovers a failed state sequence through its explicit retry action', () => {
    const fixture = TestBed.createComponent(NexaStateSequence);
    fixture.componentRef.setInput('title', 'Recover order');
    fixture.componentRef.setInput('retryLabel', 'Retry operation');
    fixture.componentRef.setInput('phases', [
      { id: 'ready', label: 'Ready', detail: 'Available.' },
      { id: 'processing', label: 'Processing', detail: 'Working.', tone: 'info' as const },
      { id: 'error', label: 'Error', detail: 'Failed safely.', tone: 'danger' as const },
    ]);
    fixture.detectChanges();
    const next = fixture.nativeElement.querySelectorAll('.sequence-actions button')[1] as HTMLButtonElement;
    next.click();
    next.click();
    fixture.detectChanges();

    const retry = fixture.nativeElement.querySelector('.sequence-recovery') as HTMLButtonElement;
    expect(retry).toBeTruthy();
    retry.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="status"]')?.textContent).toContain('Processing');
  });

  it('keeps action menu selection, disabled items and keyboard escape truthful', async () => {
    const items: readonly NexaActionMenuItem[] = [
      { id: 'review', label: 'Review request', shortcut: 'Enter' },
      { id: 'disabled', label: 'Unavailable command', disabled: true },
      { id: 'cancel', label: 'Cancel request', destructive: true },
    ];
    const fixture = TestBed.createComponent(NexaActionMenu);
    fixture.componentRef.setInput('triggerId', 'test-menu');
    fixture.componentRef.setInput('triggerLabel', 'Commands');
    fixture.componentRef.setInput('menuLabel', 'Request commands');
    fixture.componentRef.setInput('items', items);
    let selected = '';
    fixture.componentInstance.selected.subscribe((id) => selected = id);
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('.menu-trigger') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const menuItems = fixture.nativeElement.querySelectorAll('.menu-item') as NodeListOf<HTMLButtonElement>;
    expect(fixture.nativeElement.querySelector('[role="menu"]')).toBeTruthy();
    expect(menuItems[1].disabled).toBe(true);
    expect(document.activeElement).toBe(menuItems[0]);

    menuItems[0].click();
    fixture.detectChanges();
    expect(selected).toBe('review');
    expect(fixture.nativeElement.querySelector('[role="menu"]')).toBeNull();

    trigger.click();
    fixture.detectChanges();
    const openMenu = fixture.nativeElement.querySelector('[role="menu"]') as HTMLElement;
    openMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    const reopenedItems = fixture.nativeElement.querySelectorAll('.menu-item') as NodeListOf<HTMLButtonElement>;
    expect(document.activeElement).toBe(reopenedItems[2]);
    openMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="menu"]')).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it('renders compact long menus with disabled and destructive command states', async () => {
    const items: readonly NexaActionMenuItem[] = Array.from({ length: 10 }, (_, index) => ({
      id: `command-${index}`,
      label: `Command ${index + 1}`,
      disabled: index === 7,
      destructive: index === 8,
      separatorBefore: index === 5,
    }));
    const fixture = TestBed.createComponent(NexaActionMenu);
    fixture.componentRef.setInput('triggerId', 'long-menu');
    fixture.componentRef.setInput('triggerLabel', 'Long commands');
    fixture.componentRef.setInput('menuLabel', 'Long command list');
    fixture.componentRef.setInput('size', 'compact');
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('.menu-trigger') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    const menu = fixture.nativeElement.querySelector('[role="menu"]') as HTMLElement;

    expect(fixture.nativeElement.querySelector('.menu-anchor.compact')).toBeTruthy();
    expect(menu).toBeTruthy();
    expect(menu.querySelectorAll('.menu-item')).toHaveLength(10);
    expect(menu.querySelectorAll('.menu-separator')).toHaveLength(1);
    expect(menu.querySelector<HTMLButtonElement>('[disabled]')?.textContent).toContain('Command 8');
    expect(menu.querySelector('.destructive')?.textContent).toContain('Command 9');
  });

  it('exposes tooltip semantics only while the tooltip is visible and restores focus on escape', async () => {
    const fixture = TestBed.createComponent(NexaTooltip);
    fixture.componentRef.setInput('id', 'test-tooltip');
    fixture.componentRef.setInput('triggerLabel', 'Explain status');
    fixture.componentRef.setInput('content', 'This status needs review.');
    fixture.detectChanges();
    const trigger = fixture.nativeElement.querySelector('.tooltip-trigger') as HTMLButtonElement;
    expect(trigger.getAttribute('aria-describedby')).toBeNull();

    trigger.focus();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="tooltip"]')).toBeTruthy();
    expect(trigger.getAttribute('aria-describedby')).toBe('test-tooltip');

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="tooltip"]')).toBeNull();
    expect(trigger.getAttribute('aria-describedby')).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });
});
