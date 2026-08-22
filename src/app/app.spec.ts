import { provideRouter, Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { routes } from './app.routes';
import { APPROVED_CONTRAST_PAIRS } from './documentation/content/contrast-contracts';

describe('Nexa Design Lab v0.10 routes', () => {
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
    expect(buttons.querySelector('.button-playground')).toBeTruthy();
    expect(buttons.querySelector('nexa-state-sequence')).toBeTruthy();

    const contrast = await navigate('/guidelines/quality/contrast-lab');
    expect(contrast.querySelector('h1')?.textContent).toContain('Contrast ratios');
    expect(contrast.querySelectorAll('.contrast-matrix article')).toHaveLength(APPROVED_CONTRAST_PAIRS.length);

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

  it('keeps the checkbox gallery native across state and focus contracts', async () => {
    const checkboxPage = await navigate('/guidelines/components/checkbox');
    const playground = checkboxPage.querySelector('.selection-playground') as HTMLElement;
    const inputs = playground.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');

    expect(inputs).toHaveLength(4);
    expect(inputs[0].checked).toBe(true);
    expect(inputs[1].checked).toBe(false);
    expect(inputs[2].indeterminate).toBe(true);
    expect(inputs[3].disabled).toBe(true);
    inputs[1].focus();
    expect(document.activeElement).toBe(inputs[1]);
    inputs[1].click();
    activeFixture.detectChanges();
    expect(inputs[1].checked).toBe(true);
  });

  it('renders the v0.10 maturity patterns without introducing product routes', async () => {
    const brand = await navigate('/guidelines/foundations/brand-logo');
    expect(brand.querySelector('nexa-logo img')?.getAttribute('src')).toContain('/brand/canonical/logo-nexa.svg');
    expect(brand.querySelectorAll('.brand-logo-grid nexa-logo img')).toHaveLength(2);
    expect(brand.querySelectorAll('.logo-size-grid nexa-logo img')).toHaveLength(3);

    const patterns = [
      ['/guidelines/patterns/async-operations', 'Error keeps context and retry nearby'],
      ['/guidelines/patterns/authentication', 'Authentication feels like Nexa before it asks for access'],
      ['/guidelines/patterns/legal-content', 'Readable policy structure without inventing policy'],
      ['/guidelines/patterns/payments', 'Payment presentation stays safe before provider behavior exists'],
      ['/guidelines/patterns/analytics', 'Every visualization answers a question'],
      ['/guidelines/patterns/dispatch-board', 'Dispatch composition keeps cards readable across columns'],
      ['/guidelines/patterns/data-dense-operations', 'Density carries operational signal without becoming a production route'],
    ] as const;

    for (const [path, heading] of patterns) {
      const page = await navigate(path);
      expect(page.querySelector('h1')).toBeTruthy();
      expect(page.textContent).toContain(heading);
      expect(page.querySelector('.pattern-section')).toBeTruthy();
    }

    const map = await navigate('/guidelines/patterns/map-location');
    expect(map.textContent).toContain('Location evidence answers where and why');
    expect(map.querySelector('.map-composition')).toBeTruthy();
    map.querySelector<HTMLButtonElement>('.map-mode-switcher button:nth-child(3)')?.click();
    activeFixture.detectChanges();
    expect(map.textContent).toContain('Map surface unavailable');
    map.querySelector<HTMLButtonElement>('.map-stop.stop-origin')?.click();
    activeFixture.detectChanges();
    expect(map.querySelector('.location-summary')?.textContent).toContain('Dispatch origin');
  });
});
