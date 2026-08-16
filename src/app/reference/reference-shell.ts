import { afterNextRender, ChangeDetectionStrategy, Component, ElementRef, EnvironmentInjector, inject, Signal, signal, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface ReferenceNavItem { readonly label: string; readonly icon: string; readonly link: string; readonly badge?: string; }
interface ReferenceNavGroup { readonly label: string; readonly items: readonly ReferenceNavItem[]; }

abstract class ReferenceShellBase {
  protected readonly mobileNavOpen = signal(false);
  protected abstract readonly drawerClose: Signal<ElementRef<HTMLButtonElement> | undefined>;
  protected readonly environmentInjector = inject(EnvironmentInjector);
  private previousFocus: HTMLElement | null = null;
  protected abstract readonly navigation: readonly ReferenceNavGroup[];
  protected abstract readonly shellTitle: string;
  protected abstract readonly shellContext: string;
  protected abstract readonly isPortal: boolean;
  protected openMobileNav(): void { this.previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null; this.mobileNavOpen.set(true); this.afterRender(() => this.drawerClose()?.nativeElement.focus()); }
  protected closeMobileNav(): void { if (!this.mobileNavOpen()) return; this.mobileNavOpen.set(false); this.afterRender(() => this.previousFocus?.focus()); }
  protected navigate(): void { this.closeMobileNav(); }
  private afterRender(callback: () => void): void { afterNextRender(callback, { injector: this.environmentInjector }); }
}

@Component({ selector: 'nexa-platform-shell', imports: [RouterLink, RouterLinkActive, RouterOutlet], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './reference-shell.html', styleUrl: './reference-shell.scss', host: { '(document:keydown.escape)': 'closeMobileNav()' } })
export class NexaPlatformShell extends ReferenceShellBase {
  protected readonly drawerClose = viewChild<ElementRef<HTMLButtonElement>>('drawerClose');
  protected readonly isPortal = false;
  protected readonly shellTitle = 'Nexa Platform'; protected readonly shellContext = 'ICISA Distribuciones · Sales and Logistics';
  protected readonly navigation: readonly ReferenceNavGroup[] = [
    { label: 'WORKSPACE', items: [{ label: 'Sales Dashboard', icon: 'pi-th-large', link: '/reference/platform/dashboard' }, { label: 'Product Catalog', icon: 'pi-box', link: '/reference/platform/catalog' }] },
    { label: 'SALES', items: [{ label: 'Purchase Requests', icon: 'pi-inbox', link: '/reference/platform/purchase-requests', badge: '1' }, { label: 'Manual Order Entry', icon: 'pi-plus-circle', link: '/reference/platform/manual-order-entry' }, { label: 'Sales Orders', icon: 'pi-file-edit', link: '/reference/platform/sales-orders' }, { label: 'B2B Clients', icon: 'pi-users', link: '/reference/platform/clients' }, { label: 'Business Documents', icon: 'pi-file-check', link: '/reference/platform/documents' }] },
    { label: 'LOGISTICS', items: [{ label: 'Inventory Control', icon: 'pi-table', link: '/reference/platform/inventory' }, { label: 'Dispatch Orders', icon: 'pi-send', link: '/reference/platform/dispatch' }, { label: 'Proof of Delivery', icon: 'pi-check-square', link: '/reference/platform/pod' }, { label: 'Analytics', icon: 'pi-chart-line', link: '/reference/platform/analytics' }] },
    { label: 'ACCOUNT', items: [{ label: 'My Profile', icon: 'pi-user-edit', link: '/reference/platform/profile' }] },
  ];
}

@Component({ selector: 'nexa-portal-shell', imports: [RouterLink, RouterLinkActive, RouterOutlet], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './reference-shell.html', styleUrl: './reference-shell.scss', host: { '(document:keydown.escape)': 'closeMobileNav()' } })
export class NexaPortalShell extends ReferenceShellBase {
  protected readonly drawerClose = viewChild<ElementRef<HTMLButtonElement>>('drawerClose');
  protected readonly isPortal = true;
  protected readonly shellTitle = 'Buyer Portal'; protected readonly shellContext = 'ICISA Distribuciones · Buyer workspace';
  protected readonly navigation: readonly ReferenceNavGroup[] = [
    { label: 'YOUR WORKSPACE', items: [{ label: 'Home', icon: 'pi-home', link: '/reference/portal/home' }, { label: 'Product Catalog', icon: 'pi-box', link: '/reference/portal/catalog' }, { label: 'Request Builder', icon: 'pi-plus-circle', link: '/reference/portal/request-builder' }] },
    { label: 'ACTIVITY', items: [{ label: 'My Requests', icon: 'pi-inbox', link: '/reference/portal/requests' }, { label: 'My Sales Orders', icon: 'pi-file-edit', link: '/reference/portal/orders' }] },
    { label: 'HELP', items: [{ label: 'Support', icon: 'pi-question-circle', link: '/reference/portal/support' }, { label: 'Profile', icon: 'pi-user', link: '/reference/portal/profile' }, { label: 'Terms and privacy', icon: 'pi-file', link: '/reference/portal/legal' }] },
  ];
}

@Component({ selector: 'nexa-auth-shell', imports: [RouterOutlet, RouterLink], changeDetection: ChangeDetectionStrategy.OnPush, template: '<div class="auth-shell"><header class="auth-topbar"><a routerLink="/guidelines/overview" class="auth-brand">nexa <span>reference screen</span></a><a routerLink="/reference/auth/workspace">Workspace detection</a></header><router-outlet /></div>', styleUrl: './reference-shell.scss' })
export class NexaAuthShell {}
