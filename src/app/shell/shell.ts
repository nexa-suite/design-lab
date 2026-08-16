import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EnvironmentInjector,
  inject,
  input,
  output,
  runInInjectionContext,
  signal,
  viewChild,
} from '@angular/core';
import { UiAction } from '../shared/ui-action';

interface ShellNavItem {
  readonly label: string;
  readonly icon: string;
  readonly target?: string;
  readonly badge?: number;
  readonly danger?: boolean;
}

interface ShellNavGroup {
  readonly label: string;
  readonly items: readonly ShellNavItem[];
}

@Component({
  selector: 'nexa-shell',
  host: { '(document:keydown.escape)': 'closeMobileNav()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class NexaShell {
  readonly activeSection = input('dashboard');
  readonly sectionChange = output<string>();
  readonly action = output<UiAction>();
  protected readonly mobileNavOpen = signal(false);
  protected readonly drawerClose = viewChild<ElementRef<HTMLButtonElement>>('drawerClose');
  private readonly environmentInjector = inject(EnvironmentInjector);
  private previousFocus: HTMLElement | null = null;

  protected readonly navGroups: readonly ShellNavGroup[] = [
    {
      label: 'WORKSPACE',
      items: [
        { label: 'Sales Dashboard', icon: 'pi-th-large', target: 'dashboard' },
        { label: 'Product Catalog', icon: 'pi-box', target: 'guidelines-catalog' },
      ],
    },
    {
      label: 'SALES',
      items: [
        { label: 'Purchase Requests', icon: 'pi-inbox', target: 'guidelines-patterns', badge: 1 },
        { label: 'Sales Orders', icon: 'pi-file-edit', target: 'guidelines-table', badge: 1 },
        { label: 'Manual Order Entry', icon: 'pi-plus-circle', target: 'guidelines-patterns' },
        { label: 'B2B Clients', icon: 'pi-users', target: 'guidelines-patterns' },
        { label: 'Business Documents', icon: 'pi-file-check', target: 'guidelines-patterns' },
      ],
    },
    {
      label: 'ACCOUNT',
      items: [
        { label: 'My Profile', icon: 'pi-user-edit', target: 'guidelines-accessibility' },
        { label: 'Sign out', icon: 'pi-sign-out', danger: true },
      ],
    },
  ];

  protected navigate(item: ShellNavItem): void {
    this.closeMobileNav();
    if (item.target) {
      this.sectionChange.emit(item.target);
      return;
    }

    this.action.emit({ label: `${item.label} is a preview action` });
  }

  protected openMobileNav(): void {
    this.previousFocus =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    this.mobileNavOpen.set(true);
    this.afterRender(() => this.drawerClose()?.nativeElement.focus());
  }

  protected closeMobileNav(): void {
    if (!this.mobileNavOpen()) {
      return;
    }
    this.mobileNavOpen.set(false);
    this.afterRender(() => this.previousFocus?.focus());
  }

  private afterRender(callback: () => void): void {
    runInInjectionContext(this.environmentInjector, () => afterNextRender(callback));
  }
}
