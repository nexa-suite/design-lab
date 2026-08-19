import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NexaButton, NexaStatusChip } from 'nexa-ui';
import { NexaDocumentationFrame } from '../../layout/documentation-page';
import { injectDocumentationRouteContext } from '../../layout/page-context';

@Component({
  selector: 'nexa-map-location-page',
  imports: [NexaButton, NexaDocumentationFrame, NexaStatusChip],
  templateUrl: './map-location-page.html',
  styleUrls: ['../pattern-foundation.scss', './map-location-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaMapLocationPage {
  protected readonly context = injectDocumentationRouteContext();
  protected readonly selectedStop = signal('ICISA Distribuciones');
}
