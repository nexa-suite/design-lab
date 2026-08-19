import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NexaStatusChip } from 'nexa-ui';
import { NexaDocumentationFrame } from '../layout/documentation-page';
import { injectDocumentationRouteContext } from '../layout/page-context';

interface PublicApiRow { readonly name: string; readonly exportName: string; readonly contract: string; readonly note: string; readonly icon: string; }

@Component({
  selector: 'nexa-engineering-page',
  imports: [NexaDocumentationFrame, NexaStatusChip],
  templateUrl: './engineering-page.html',
  styleUrls: ['../context/context-documentation.scss', './engineering-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaEngineeringPage {
  protected readonly context = injectDocumentationRouteContext();
  protected readonly publicApi: readonly PublicApiRow[] = [
    { name: 'Action Menu', exportName: 'NexaActionMenu', contract: 'items · open · selection · keyboard', note: 'Frozen presentation; behavior remains owned by the component.', icon: 'pi-list' },
    { name: 'Button', exportName: 'NexaButton', contract: 'variant · size · disabled · loading · routerLink', note: 'Native button or guarded link semantics.', icon: 'pi-external-link' },
    { name: 'Logo', exportName: 'NexaLogo', contract: 'variant · alt', note: 'Canonical Nexa brand asset.', icon: 'pi-image' },
    { name: 'Segmented Control', exportName: 'NexaSegmentedControl', contract: 'options · selected/model · label', note: 'Immediate selection; no async transition is hidden.', icon: 'pi-table' },
    { name: 'Status Chip', exportName: 'NexaStatusChip', contract: 'tone · emphasis', note: 'Semantic tone remains separate from domain status.', icon: 'pi-tag' },
    { name: 'Surface', exportName: 'NexaSurface', contract: 'tone · padding · interactive', note: 'Bounded surface composition candidate.', icon: 'pi-stop' },
    { name: 'Text Field', exportName: 'NexaTextField', contract: 'label · value/model · helper · error', note: 'Native input and described validation.', icon: 'pi-pencil' },
    { name: 'Toggle', exportName: 'NexaToggle', contract: 'label · checked/model · disabled', note: 'Immediate setting with switch semantics.', icon: 'pi-power-off' },
    { name: 'Tooltip', exportName: 'NexaTooltip', contract: 'content · placement · trigger', note: 'Tooltip semantics remain separate from menus.', icon: 'pi-question-circle' },
  ];
}
