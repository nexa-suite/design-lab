import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { NexaButton } from './nexa-button';

describe('NexaButton', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [NexaButton], providers: [provideRouter([])] }));

  it('keeps a loading button disabled and truthful', () => {
    const fixture = TestBed.createComponent(NexaButton);
    fixture.componentRef.setInput('loading', true);
    fixture.componentRef.setInput('variant', 'secondary');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    expect(button.getAttribute('aria-busy')).toBe('true');
    expect(button.querySelector('.spinner')).toBeTruthy();
  });

  it('does not navigate when a router link is disabled or loading', async () => {
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/');
    const fixture = TestBed.createComponent(NexaButton);
    fixture.componentRef.setInput('routerLink', '/blocked-target');
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const link = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    expect(link.getAttribute('aria-disabled')).toBe('true');
    expect(link.getAttribute('href')).toBeNull();
    link.click();
    await fixture.whenStable();
    expect(router.url).toBe('/');
  });
});
