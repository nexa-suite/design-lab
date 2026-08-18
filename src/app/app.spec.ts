import { provideRouter, Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { routes } from './app.routes';

describe('Nexa Design Lab v0.6 routes', () => {
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

  it('renders the routed documentation system and keeps reference shells separate', async () => {
    const guidelines = await navigate('/guidelines/foundations/color');
    expect(guidelines.querySelector('nexa-shell')).toBeTruthy();
    expect(guidelines.querySelector('h1')?.textContent).toContain('Color communicates');

    const buttons = await navigate('/guidelines/components/buttons');
    expect(buttons.querySelector('h1')?.textContent).toContain('Buttons make one next action');
    expect(buttons.querySelector('.specimen-board')).toBeTruthy();

    const engineering = await navigate('/guidelines/engineering/angular-compatibility');
    expect(engineering.querySelector('h1')?.textContent).toContain(
      'Behavior source and visual owner',
    );

    const platform = await navigate('/reference/platform/inventory');
    expect(platform.querySelector('nexa-platform-shell')).toBeTruthy();
    expect(platform.querySelector('h1')?.textContent).toContain('Inventory Control');

    const portal = await navigate('/reference/portal/request-builder');
    expect(portal.querySelector('nexa-portal-shell')).toBeTruthy();
    expect(portal.querySelector('h1')?.textContent).toContain('Build a purchase request');
  });

  it('keeps the compatibility alias and authentication reference route usable', async () => {
    const materialAlias = await navigate('/guidelines/material');
    expect(materialAlias.querySelector('h1')?.textContent).toContain(
      'Behavior source and visual owner',
    );

    const auth = await navigate('/reference/auth/login');
    expect(auth.querySelector('h2')?.textContent).toContain('Sign in to your workspace');
    expect(auth.querySelector('form')).toBeTruthy();
  });
});
