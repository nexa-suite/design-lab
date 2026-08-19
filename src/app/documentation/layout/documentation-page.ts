import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { DocumentationPage } from '../models/documentation-page';

@Component({
  selector: 'nexa-documentation-frame',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './documentation-page.html',
  styleUrl: './documentation-page.scss',
})
export class NexaDocumentationFrame {
  readonly page = input.required<DocumentationPage>();
  readonly allPages = input.required<readonly DocumentationPage[]>();

  protected statusClass(): string { return this.page().status.toLowerCase().replaceAll(' ', '-'); }
  protected relatedPages(): readonly DocumentationPage[] {
    const relatedPageIds = this.page().relatedPageIds;
    if (relatedPageIds?.length) {
      return relatedPageIds
        .map((id) => this.allPages().find((candidate) => candidate.id === id))
        .filter((candidate): candidate is DocumentationPage => Boolean(candidate));
    }
    return this.allPages().filter((candidate) => candidate.id !== this.page().id && candidate.kind === this.page().kind).slice(0, 4);
  }
  protected pageUrl(candidate: DocumentationPage): string { return `/guidelines/${candidate.path}`; }
}
