import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EnvironmentInjector,
  inject,
  signal,
  viewChild,
  computed,
} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  DOCUMENTATION_GROUPS,
} from '../documentation/navigation/documentation-registry';
import type { DocumentationGroup, DocumentationPageMetadata } from '../documentation/models/documentation-page';
import { NexaLabEvaluation } from '../lab/evaluation/lab-evaluation';
import { NexaLogo } from 'nexa-ui';

@Component({
  selector: 'nexa-shell',
  imports: [NexaLogo, RouterLink, RouterLinkActive, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
  host: { '(document:keydown.escape)': 'closeMobileNav()' },
})
export class NexaDesignLabShell {
  protected readonly mobileNavOpen = signal(false);
  protected readonly drawerClose = viewChild<ElementRef<HTMLButtonElement>>('drawerClose');
  protected readonly searchTerm = signal('');
  protected readonly documentationGroups = DOCUMENTATION_GROUPS;
  protected readonly evaluation = inject(NexaLabEvaluation);
  protected readonly expandedGroups = signal<Record<string, boolean>>(
    Object.fromEntries(DOCUMENTATION_GROUPS.map((group) => [this.groupId(group), true])),
  );
  protected readonly filteredDocumentationGroups = computed(() => {
    const term = this.searchTerm().trim().toLocaleLowerCase();
    if (!term) return this.documentationGroups;

    return this.documentationGroups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => this.matchesSearch(item, term)),
      }))
      .filter((group) => group.items.length > 0);
  });
  protected readonly hasSearchResults = computed(
    () => this.filteredDocumentationGroups().length > 0,
  );

  private readonly environmentInjector = inject(EnvironmentInjector);
  private previousFocus: HTMLElement | null = null;

  protected setSearch(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    this.searchTerm.set(input?.value ?? '');
  }

  protected clearSearch(): void {
    this.searchTerm.set('');
  }

  protected toggleGroup(group: DocumentationGroup): void {
    const key = this.groupId(group);
    this.expandedGroups.update((groups) => ({ ...groups, [key]: !groups[key] }));
  }

  protected groupOpen(group: DocumentationGroup): boolean {
    return this.expandedGroups()[this.groupId(group)] ?? false;
  }

  protected groupId(group: DocumentationGroup): string {
    return `documentation-group-${group.label.toLocaleLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  }

  protected navigationLink(item: DocumentationPageMetadata): string {
    return `/guidelines/${item.path}`;
  }

  protected openMobileNav(): void {
    this.previousFocus =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    this.mobileNavOpen.set(true);
    this.afterRender(() => this.drawerClose()?.nativeElement.focus());
  }

  protected closeMobileNav(): void {
    if (!this.mobileNavOpen()) return;
    this.mobileNavOpen.set(false);
    this.afterRender(() => this.previousFocus?.focus());
  }

  protected navigate(): void {
    this.closeMobileNav();
  }

  private matchesSearch(item: DocumentationPageMetadata, term: string): boolean {
    return item.searchText.toLocaleLowerCase().includes(term);
  }

  private afterRender(callback: () => void): void {
    afterNextRender(callback, { injector: this.environmentInjector });
  }
}
