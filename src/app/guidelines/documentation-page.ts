import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NexaComponentDocumentation } from './documentation-components';
import { NexaContextDocumentation } from './documentation-context';
import { NexaFoundationDocumentation } from './documentation-foundations';
import { ALL_DOCUMENTATION_PAGES, DOCUMENTATION_PAGE_MAP, type DocumentationPage } from './documentation-registry';

@Component({
  selector: 'nexa-documentation-page',
  imports: [NexaComponentDocumentation, NexaContextDocumentation, NexaFoundationDocumentation, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './documentation-page.html',
  styleUrl: './documentation-page.scss',
})
export class NexaDocumentationPage {
  private readonly route = inject(ActivatedRoute);
  protected readonly page: DocumentationPage = DOCUMENTATION_PAGE_MAP.get(String(this.route.snapshot.data['page'] ?? 'overview')) ?? DOCUMENTATION_PAGE_MAP.get('overview')!;
  protected readonly allPages = ALL_DOCUMENTATION_PAGES;
  protected statusClass(): string { return this.page.status.toLowerCase().replaceAll(' ', '-'); }
  protected relatedPages(): readonly DocumentationPage[] { return this.allPages.filter((candidate) => candidate.id !== this.page.id && candidate.kind === this.page.kind).slice(0, 4); }
  protected pageUrl(candidate: DocumentationPage): string { return `/guidelines/${candidate.path}`; }
}
