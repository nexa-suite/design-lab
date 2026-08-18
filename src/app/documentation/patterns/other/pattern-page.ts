import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NexaDocumentationFrame } from '../../layout/documentation-page';
import { injectDocumentationRouteContext } from '../../layout/page-context';
import { NexaPatternDocumentation } from './pattern-documentation';

@Component({
  selector: 'nexa-pattern-page',
  imports: [NexaDocumentationFrame, NexaPatternDocumentation],
  templateUrl: './pattern-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaPatternPage {
  protected readonly context = injectDocumentationRouteContext();
}
