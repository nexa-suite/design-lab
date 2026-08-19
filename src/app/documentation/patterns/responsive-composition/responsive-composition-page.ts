import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NexaDocumentationFrame } from '../../layout/documentation-page';
import { NexaDocumentationSection } from '../../layout/documentation-section';
import { injectDocumentationRouteContext } from '../../layout/page-context';

interface ViewportEvidence { readonly width: number; readonly label: string; readonly behavior: string; readonly className: string; }

@Component({
  selector: 'nexa-responsive-composition-page',
  imports: [NexaDocumentationFrame, NexaDocumentationSection],
  templateUrl: './responsive-composition-page.html',
  styleUrls: ['../pattern-foundation.scss', './responsive-composition-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaResponsiveCompositionPage {
  protected readonly context = injectDocumentationRouteContext();
  protected readonly viewports: readonly ViewportEvidence[] = [
    { width: 1440, label: 'Desktop browser', behavior: 'Full navigation, two-column work area.', className: 'wide' },
    { width: 1024, label: 'Laptop browser', behavior: 'Gutters contract; hierarchy unchanged.', className: 'laptop' },
    { width: 768, label: 'Tablet landscape', behavior: 'Secondary column moves below primary.', className: 'tablet' },
    { width: 390, label: 'Phone portrait', behavior: 'Controls stack; data scrolls locally.', className: 'mobile' },
    { width: 320, label: 'Compact phone', behavior: 'No page overflow; actions remain reachable.', className: 'small' },
  ];
}
