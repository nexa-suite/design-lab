import { provideRouter, Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { routes } from './app.routes';

describe('Nexa Design Lab v0.7 routes', () => {
  let activeFixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  async function navigate(path: string): Promise<HTMLElement> {
    const fixture = TestBed.createComponent(App);
    activeFixture = fixture;
    const router = TestBed.inject(Router);
    await router.navigateByUrl(path);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('creates the application with the evidence route tree', () => {
    expect(TestBed.createComponent(App).componentInstance).toBeTruthy();
  });

  it('renders foundations, components, quality and engineering evidence', async () => {
    const color = await navigate('/guidelines/foundations/color');
    expect(color.querySelector('nexa-shell')).toBeTruthy();
    expect(color.querySelector('h1')?.textContent).toContain('Color communicates');
    expect(color.querySelectorAll('.blue-token-card')).toHaveLength(11);

    const buttons = await navigate('/guidelines/components/buttons');
    expect(buttons.querySelector('h1')?.textContent).toContain('Buttons make one next action');
    expect(buttons.querySelector('.specimen-board')).toBeTruthy();
    expect(buttons.querySelector('nexa-state-sequence')).toBeTruthy();

    const contrast = await navigate('/guidelines/quality/contrast-lab');
    expect(contrast.querySelector('h1')?.textContent).toContain('Contrast ratios');
    expect(contrast.querySelectorAll('.contrast-matrix article')).toHaveLength(12);

    const architecture = await navigate('/guidelines/engineering/angular-architecture');
    expect(architecture.querySelector('h1')?.textContent).toContain('Feature areas');
    expect(architecture.textContent).toContain('signal / computed / model');
  });

  it('keeps RC2 documentation aliases inside the active lab', async () => {
    const alias = await navigate('/guidelines/components/selection');
    expect(alias.querySelector('h1')?.textContent).toContain('Checkbox supports');
    expect(alias.querySelector('nexa-platform-shell')).toBeNull();
    expect(alias.textContent).not.toContain('Reference Screen');
  });

  it('keeps grouped documentation links aligned with their lazy routes', async () => {
    const overview = await navigate('/guidelines/overview');
    expect(overview.querySelector('a[href="/guidelines/foundations/color"]')).toBeTruthy();
    expect(overview.querySelector('a[href="/guidelines/components/buttons"]')).toBeTruthy();
    expect(overview.querySelector('a[href="/guidelines/quality/contrast-lab"]')).toBeTruthy();
    expect(overview.querySelector('a[href="/guidelines/engineering/angular-architecture"]')).toBeTruthy();
  });

  it('keeps search, menu and toggle specimens interactive', async () => {
    const search = await navigate('/guidelines/components/search-fields');
    const searchInput = search.querySelector('nexa-text-field input[type="search"]') as HTMLInputElement;
    searchInput.value = 'not-a-product';
    searchInput.dispatchEvent(new Event('input', { bubbles: true }));
    activeFixture.detectChanges();
    expect(search.textContent).toContain('No products found');

    const menu = await navigate('/guidelines/components/menus');
    menu.querySelector<HTMLButtonElement>('.menu-trigger')?.click();
    activeFixture.detectChanges();
    expect(menu.querySelector('[role="menu"]')).toBeTruthy();

    const toggle = await navigate('/guidelines/components/toggle');
    const toggleInput = toggle.querySelector('nexa-toggle input[role="switch"]') as HTMLInputElement;
    const before = toggleInput.checked;
    toggleInput.click();
    activeFixture.detectChanges();
    expect(toggleInput.checked).toBe(!before);
  });
});
