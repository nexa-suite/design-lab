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
    return this.allPages().filter((candidate) => candidate.id !== this.page().id && candidate.kind === this.page().kind).slice(0, 4);
  }
  protected pageUrl(candidate: DocumentationPage): string { return `/guidelines/${candidate.path}`; }
}
