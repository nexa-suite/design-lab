import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NexaStatusChip } from 'nexa-ui';
import type { DocumentationGroup, DocumentationPage } from '../models/documentation-page';
import { MATURITY_ROWS } from '../content/documentation-data';

@Component({
  selector: 'nexa-context-documentation',
  imports: [NexaStatusChip, RouterLink],
  templateUrl: './context-documentation.html',
  styleUrl: './context-documentation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaContextDocumentation {
  readonly page = input.required<DocumentationPage>();
  readonly allPages = input.required<readonly DocumentationPage[]>();
  protected readonly groups = input<readonly DocumentationGroup[]>([]);
  protected readonly maturityRows = MATURITY_ROWS;

  protected pageUrl(candidate: DocumentationPage): string { return `/guidelines/${candidate.path}`; }
  protected groupPages(label: string): readonly DocumentationPage[] { return this.allPages().filter((candidate) => candidate.group === label); }
}
