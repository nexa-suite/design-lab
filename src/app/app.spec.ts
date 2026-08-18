import { provideRouter, Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { routes } from './app.routes';

describe('Nexa Design Lab v0.5 routes', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  async function navigate(path: string): Promise<HTMLElement> {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl(path);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('creates the application with the documented route tree', () => {
    expect(TestBed.createComponent(App).componentInstance).toBeTruthy();
  });

  it('separates Design Lab documentation from Platform and Portal shells', async () => {
    const guidelines = await navigate('/guidelines/foundations');
    expect(guidelines.querySelector('nexa-shell')).toBeTruthy();
    expect(guidelines.querySelector('h1')?.textContent).toContain(
      'The rules extracted from Legacy',
    );

    const platform = await navigate('/reference/platform/inventory');
    expect(platform.querySelector('nexa-platform-shell')).toBeTruthy();
    expect(platform.querySelector('h1')?.textContent).toContain('Inventory Control');

    const portal = await navigate('/reference/portal/request-builder');
    expect(portal.querySelector('nexa-portal-shell')).toBeTruthy();
    expect(portal.querySelector('h1')?.textContent).toContain('Build a purchase request');
  });

  it('renders real Material and authentication reference routes', async () => {
    const material = await navigate('/guidelines/material');
    expect(material.querySelector('h1')?.textContent).toContain('Material compatibility');
    expect(material.querySelectorAll('nexa-native-select').length).toBe(1);
    expect(material.querySelector('nexa-native-select select')).toBeTruthy();

    const auth = await navigate('/reference/auth/login');
    expect(auth.querySelector('h2')?.textContent).toContain('Sign in to your workspace');
    expect(auth.querySelector('form')).toBeTruthy();
  });
});
