import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NexaDocumentationFrame } from '../layout/documentation-page';
import { injectDocumentationRouteContext } from '../layout/page-context';
import { NexaContextDocumentation } from './context-documentation';

@Component({
  selector: 'nexa-context-page',
  imports: [NexaDocumentationFrame, NexaContextDocumentation],
  templateUrl: './context-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaContextPage {
  protected readonly context = injectDocumentationRouteContext();
}
