import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NexaDocumentationFrame } from '../../layout/documentation-page';
import { injectDocumentationRouteContext } from '../../layout/page-context';

interface LegalSection { readonly id: string; readonly title: string; readonly summary: string; }

@Component({
  selector: 'nexa-legal-content-page',
  imports: [NexaDocumentationFrame],
  templateUrl: './legal-content-page.html',
  styleUrls: ['../pattern-foundation.scss', './legal-content-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaLegalContentPage {
  protected readonly context = injectDocumentationRouteContext();
  protected readonly sections: readonly LegalSection[] = [
    { id: 'scope', title: '1. Purpose and scope', summary: 'Synthetic placeholder: describe what the document covers and which audience should read it.' },
    { id: 'information', title: '2. Information and handling', summary: 'Synthetic placeholder: formal policy content must be supplied and approved by the responsible owner.' },
    { id: 'responsibilities', title: '3. Responsibilities', summary: 'Synthetic placeholder: define obligations only after legal and product review.' },
    { id: 'contact', title: '4. Contact and updates', summary: 'Synthetic placeholder: provide an approved support or policy contact.' },
  ];
}
