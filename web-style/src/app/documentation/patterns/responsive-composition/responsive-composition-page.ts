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
    { width: 1440, label: 'MacBook / desktop', behavior: 'Full navigation, two-column work area.', className: 'desktop' },
    { width: 1024, label: 'iPad landscape', behavior: 'Gutters contract; hierarchy unchanged.', className: 'ipad-landscape' },
    { width: 768, label: 'iPad portrait', behavior: 'Secondary column moves below primary.', className: 'ipad-portrait' },
    { width: 390, label: 'iPhone portrait', behavior: 'Controls stack; data scrolls locally.', className: 'iphone' },
    { width: 320, label: 'Compact iPhone', behavior: 'No page overflow; actions remain reachable.', className: 'iphone-compact' },
  ];
}
