import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NexaDocumentationFrame } from '../layout/documentation-page';
import { injectDocumentationRouteContext } from '../layout/page-context';
import { NexaComponentDocumentation } from './component-documentation';

@Component({
  selector: 'nexa-component-page',
  imports: [NexaDocumentationFrame, NexaComponentDocumentation],
  templateUrl: './component-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaComponentPage {
  protected readonly context = injectDocumentationRouteContext();
}
