import { TestBed } from '@angular/core/testing';
import { NexaButton } from './nexa-button';
import { NexaNumericStepper } from './nexa-numeric-stepper';
import { NexaRangeSlider } from './nexa-range-slider';
import { NexaSegmentedControl } from './nexa-segmented-control';
import { NexaStateSequence } from './nexa-state-sequence';
import { NexaTextField } from './nexa-text-field';
import { NexaToggle } from './nexa-toggle';

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
});
