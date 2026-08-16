import { afterNextRender, ChangeDetectionStrategy, Component, ElementRef, EnvironmentInjector, inject, signal, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface LabNavGroup { readonly label: string; readonly items: readonly { label: string; icon: string; link: string }[]; }

@Component({
  selector: 'nexa-shell', imports: [RouterLink, RouterLinkActive, RouterOutlet], changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './shell.html', styleUrl: './shell.scss', host: { '(document:keydown.escape)': 'closeMobileNav()' },
})
export class NexaDesignLabShell {
  protected readonly mobileNavOpen = signal(false);
  protected readonly drawerClose = viewChild<ElementRef<HTMLButtonElement>>('drawerClose');
  private readonly environmentInjector = inject(EnvironmentInjector);
  private previousFocus: HTMLElement | null = null;
  protected readonly navGroups: readonly LabNavGroup[] = [
    { label: 'GUIDELINES', items: [
      { label: 'Overview', icon: 'pi-th-large', link: '/guidelines/overview' },
      { label: 'Foundations', icon: 'pi-palette', link: '/guidelines/foundations' },
      { label: 'Components', icon: 'pi-sliders-h', link: '/guidelines/components' },
      { label: 'Patterns', icon: 'pi-sitemap', link: '/guidelines/patterns' },
      { label: 'Accessibility', icon: 'pi-universal-access', link: '/guidelines/accessibility' },
      { label: 'Material compatibility', icon: 'pi-box', link: '/guidelines/material' },
    ]},
    { label: 'REFERENCE SCREENS', items: [
      { label: 'Nexa Platform', icon: 'pi-building', link: '/reference/platform/dashboard' },
      { label: 'Buyer Portal', icon: 'pi-shopping-bag', link: '/reference/portal/home' },
      { label: 'Authentication', icon: 'pi-lock', link: '/reference/auth/login' },
    ]},
  ];
  protected openMobileNav(): void { this.previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null; this.mobileNavOpen.set(true); this.afterRender(() => this.drawerClose()?.nativeElement.focus()); }
  protected closeMobileNav(): void { if (!this.mobileNavOpen()) return; this.mobileNavOpen.set(false); this.afterRender(() => this.previousFocus?.focus()); }
  protected navigate(): void { this.closeMobileNav(); }
  private afterRender(callback: () => void): void { afterNextRender(callback, { injector: this.environmentInjector }); }
}
