import { TestBed } from '@angular/core/testing';
import { NexaStatusChip } from './nexa-status-chip';

describe('NexaStatusChip', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [NexaStatusChip] }));

  it('keeps semantic tone and emphasis in the rendered state', () => {
    const fixture = TestBed.createComponent(NexaStatusChip);
    fixture.componentRef.setInput('tone', 'danger');
    fixture.componentRef.setInput('emphasis', 'strong');
    fixture.detectChanges();

    const chip = fixture.nativeElement.querySelector('.nexa-status-chip') as HTMLElement;
    expect(chip.classList.contains('danger')).toBe(true);
    expect(chip.classList.contains('strong')).toBe(true);
  });
});
