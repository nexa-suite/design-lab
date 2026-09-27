import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NexaDocumentationFrame } from '../layout/documentation-page';
import { injectDocumentationRouteContext } from '../layout/page-context';
import { NexaFoundationDocumentation } from './foundation-documentation';

@Component({
  selector: 'nexa-foundation-page',
  imports: [NexaDocumentationFrame, NexaFoundationDocumentation],
  templateUrl: './foundation-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaFoundationPage {
  protected readonly context = injectDocumentationRouteContext();
}
