import { TestBed } from '@angular/core/testing';
import { NexaStateSequence } from './nexa-state-sequence';

describe('NexaStateSequence', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [NexaStateSequence] }));

  it('steps manually without modulo looping and resets', () => {
    const fixture = TestBed.createComponent(NexaStateSequence);
    fixture.componentRef.setInput('title', 'Order operation');
    fixture.componentRef.setInput('phases', [
      { id: 'ready', label: 'Ready', detail: 'Available.' },
      { id: 'done', label: 'Done', detail: 'Completed.', tone: 'success' as const, terminal: true },
    ]);
    fixture.detectChanges();
    const actions = fixture.nativeElement.querySelectorAll('.sequence-actions button') as NodeListOf<HTMLButtonElement>;
    actions[1].click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="status"]')?.textContent).toContain('Done');
    expect(actions[1].disabled).toBe(true);
    actions[2].click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="status"]')?.textContent).toContain('Ready');
  });

  it('stops timed playback at a terminal state without looping', async () => {
    const fixture = TestBed.createComponent(NexaStateSequence);
    fixture.componentRef.setInput('title', 'Timed operation');
    fixture.componentRef.setInput('autoplayDelayMs', 1);
    fixture.componentRef.setInput('phases', [
      { id: 'ready', label: 'Ready', detail: 'Available.', durationMs: 1 },
      { id: 'success', label: 'Success', detail: 'Complete.', tone: 'success' as const, terminal: true },
    ]);
    fixture.detectChanges();
    (fixture.nativeElement.querySelector('.sequence-actions button') as HTMLButtonElement).click();
    await new Promise((resolve) => setTimeout(resolve, 12));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="status"]')?.textContent).toContain('Success');
    expect((fixture.nativeElement.querySelector('.sequence-actions button') as HTMLButtonElement).disabled).toBe(true);
    await new Promise((resolve) => setTimeout(resolve, 12));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="status"]')?.textContent).toContain('Success');
  });

  it('keeps error terminal and exposes explicit retry recovery', () => {
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
    expect(next.disabled).toBe(true);
    const retry = fixture.nativeElement.querySelector('.sequence-recovery') as HTMLButtonElement;
    retry.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="status"]')?.textContent).toContain('Processing');
  });

  it('renders a cancelled terminal phase with its explicit danger tone', () => {
    const fixture = TestBed.createComponent(NexaStateSequence);
    fixture.componentRef.setInput('title', 'Cancel operation');
    fixture.componentRef.setInput('phases', [
      { id: 'ready', label: 'Ready', detail: 'Available.' },
      { id: 'cancelled', label: 'Cancelled', detail: 'Stopped.', tone: 'danger' as const, terminal: true },
    ]);
    fixture.detectChanges();
    (fixture.nativeElement.querySelectorAll('.sequence-actions button')[1] as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('li.current')?.classList.contains('phase-danger')).toBe(true);
  });
});
