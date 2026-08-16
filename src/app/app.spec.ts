import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the normalized Sales Dashboard', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Sales Dashboard');
    expect(compiled.querySelector('#guidelines-title')?.textContent).toContain(
      'Normalized Nexa design foundation',
    );
  });

  it('should expose usable dashboard actions', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const button = fixture.nativeElement.querySelector(
      '.panel-requests .button-small',
    ) as HTMLButtonElement;
    button.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.action-toast')?.textContent).toContain(
      'PR-2026-0001 review opened',
    );
  });

  it('should render operational and compatibility review surfaces', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#orders-table-title')?.textContent).toContain('Sales Orders');
    expect(compiled.querySelector('#material-title')?.textContent).toContain(
      'Material can carry Nexa rules',
    );
    expect(compiled.querySelectorAll('.contrast-card tbody tr')).toHaveLength(9);
    expect(compiled.textContent).not.toContain('Purchase Orders');
  });

  it('should open mobile navigation as a dialog', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const menuButton = fixture.nativeElement.querySelector(
      '.mobile-menu-button',
    ) as HTMLButtonElement;
    menuButton.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.mobile-drawer')?.getAttribute('aria-modal')).toBe(
      'true',
    );
  });
});
