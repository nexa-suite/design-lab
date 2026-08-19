import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NexaStatusChip } from 'nexa-ui';
import { NexaDocumentationFrame } from '../layout/documentation-page';
import { injectDocumentationRouteContext } from '../layout/page-context';
import { NEXA_TOKEN_SUMMARY } from '../content/token-reference.generated';

interface PublicApiRow {
  readonly name: string;
  readonly exportName: string;
  readonly selector: string;
  readonly contract: string;
  readonly inputs: string;
  readonly outputs: string;
  readonly states: string;
  readonly accessibility: string;
  readonly tokens: string;
  readonly tests: string;
  readonly note: string;
  readonly icon: string;
}

interface EvidenceRow { readonly name: string; readonly value: string; readonly note: string; }

@Component({
  selector: 'nexa-engineering-page',
  imports: [NexaDocumentationFrame, NexaStatusChip],
  templateUrl: './engineering-page.html',
  styleUrls: ['../context/context-documentation.scss', './engineering-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaEngineeringPage {
  protected readonly context = injectDocumentationRouteContext();
  protected readonly architectureEvidence: readonly EvidenceRow[] = [
    { name: 'Named lazy chunks', value: 'Explicit feature imports', note: 'Analytics, Authentication, Dispatch, Buttons, Progress, Quality and Engineering are independently analyzable.' },
    { name: 'Change detection', value: 'OnPush', note: 'Reusable candidates and route features use explicit local signal/model state.' },
    { name: 'Dependency direction', value: 'Library ← app', note: 'nexa-ui never imports documentation or Lab infrastructure.' },
    { name: 'Renderer boundary', value: 'Long-tail only', note: 'The generic component renderer is not used by focused lifecycle features.' },
    { name: 'State model', value: 'signals / computed / model', note: 'Route-local state uses explicit signal state; reusable two-way values use Angular model inputs/outputs.' },
    { name: 'Template contract', value: 'Strict Angular templates', note: 'Standalone imports, typed route data and OnPush change detection are required for page and library features.' },
    { name: 'Bundle evidence', value: 'Build analyzable', note: 'The production build emits focused feature chunks; no runtime route registry or catch-all renderer is used for major pages.' },
    { name: 'Action Menu spike', value: 'KEEP / v0.10', note: 'The manual implementation preserves the frozen presentation and passes keyboard, Escape, outside-click and focus restoration evidence; Angular Aria/CDK remains a bounded future evaluation.' },
    { name: 'Tooltip boundary', value: 'Separate semantics', note: 'Tooltip and Menu are not merged. Shared positioning infrastructure remains a later refinement only if it removes duplication without changing either contract.' },
  ];
  protected readonly tokenFacts: readonly EvidenceRow[] = [
    { name: 'Canonical declarations', value: String(NEXA_TOKEN_SUMMARY.declarations), note: 'Primitive, semantic, component and data-visualization source layers are generated from JSON.' },
    { name: 'Source references', value: String(NEXA_TOKEN_SUMMARY.references), note: 'Source aliases resolve before SCSS parity and cycle checks run.' },
    { name: 'Layer inventory', value: `${NEXA_TOKEN_SUMMARY.layerCounts.primitive} / ${NEXA_TOKEN_SUMMARY.layerCounts.semantic} / ${NEXA_TOKEN_SUMMARY.layerCounts.component} / ${NEXA_TOKEN_SUMMARY.layerCounts['data-visualization']}`, note: 'Primitive / semantic / component / data-visualization declarations.' },
    { name: 'Modes', value: 'Standard + Increased Contrast', note: 'Mode overrides stay semantic; component geometry remains stable.' },
    { name: 'Source boundary', value: 'tokens/*.tokens.json', note: 'Generated SCSS artifacts are checked and are not hand-authored.' },
  ];
  protected readonly testEvidence: readonly EvidenceRow[] = [
    { name: 'Architecture', value: 'npm run validate:architecture', note: 'Boundaries, forbidden CSS, retired imports and tracked FLOW assets.' },
    { name: 'Design tokens', value: 'npm run validate:tokens', note: 'Generation parity, references, duplicates and cycles.' },
    { name: 'Visual contract', value: 'npm run validate:visual', note: 'Canonical route matrix, viewport set, state metadata and artifact schema.' },
    { name: 'Browser evidence', value: 'Local / release gate', note: 'Route interactions and console checks are exercised in the browser; CI keeps the deterministic manifest gate without adding an unapproved browser dependency.' },
    { name: 'Behavior', value: 'npm test + library tests', note: 'Application and reusable candidate contracts remain separately testable.' },
    { name: 'Build', value: 'npm run build:all', note: 'Strict Angular templates, library package and route chunk generation.' },
    { name: 'Human review', value: 'Pending / explicit', note: 'Visual direction, content, screen reader and final adoption remain human decisions.' },
  ];
  protected readonly publicApi: readonly PublicApiRow[] = [
    { name: 'Action Menu', exportName: 'NexaActionMenu', selector: '<nexa-action-menu>', contract: 'items · open · selection · keyboard', inputs: 'triggerId · triggerLabel · menuLabel · size · items', outputs: 'selected(itemId)', states: 'closed · open · highlighted · disabled · destructive', accessibility: 'Named trigger/menu, arrows, Enter, Escape and focus return.', tokens: 'menu surface · focus ring · control radius', tests: 'keyboard / escape', note: 'Frozen presentation; behavior remains owned by the component.', icon: 'pi-list' },
    { name: 'Button', exportName: 'NexaButton', selector: '<nexa-button>', contract: 'variant · size · disabled · loading · routerLink · ariaLabel · fullWidth', inputs: 'variant · size · type · disabled · loading · fullWidth · routerLink · ariaLabel', outputs: 'Native click / submit event; no custom output', states: 'idle · hover · focus · pressed · disabled · loading', accessibility: 'Native button or guarded link, aria-busy and explicit accessible name.', tokens: 'control height · action colors · focus geometry', tests: 'state / link safety / accessible name', note: 'Native button or guarded link semantics.', icon: 'pi-external-link' },
    { name: 'Logo', exportName: 'NexaLogo', selector: '<nexa-logo>', contract: 'alt · decorative', inputs: 'alt · decorative', outputs: 'None', states: 'informative image · decorative image', accessibility: 'Canonical image source with alt or explicit empty alt.', tokens: 'brand asset', tests: 'alt / source', note: 'Canonical Nexa brand asset.', icon: 'pi-image' },
    { name: 'Numeric Stepper', exportName: 'NexaNumericStepper', selector: '<nexa-numeric-stepper>', contract: 'value/model · min · max · step · unit', inputs: 'id · label · value/model · min · max · step · disabled', outputs: 'valueChange(model)', states: 'minimum · middle · maximum · disabled', accessibility: 'Labelled increment/decrement buttons expose quantity and bounds.', tokens: 'control padding · interactive radius', tests: 'clamp / increment', note: 'Quantity changes remain bounded and announced.', icon: 'pi-plus-minus' },
    { name: 'Range Slider', exportName: 'NexaRangeSlider', selector: '<nexa-range-slider>', contract: 'value/model · min · max · step · unit', inputs: 'id · label · value/model · min · max · step · unit · disabled', outputs: 'valueChange(model)', states: 'minimum · middle · maximum · focus · disabled', accessibility: 'Native range input with label, min/max/step and visible output.', tokens: 'focus ring · control geometry', tests: 'value / unit', note: 'Continuous value input with a visible textual value.', icon: 'pi-sliders-h' },
    { name: 'Locale Switcher', exportName: 'NexaLocaleSwitcher', selector: '<nexa-locale-switcher>', contract: 'locale/model · label · EN / ES', inputs: 'label · locale/model', outputs: 'localeChange(model)', states: 'EN selected · ES selected', accessibility: 'One labelled segmented group with pressed-state semantics.', tokens: 'segmented control', tests: 'selection / model', note: 'One reusable language composition for documentation evidence.', icon: 'pi-compass' },
    { name: 'Segmented Control', exportName: 'NexaSegmentedControl', selector: '<nexa-segmented-control>', contract: 'options · selected/model · label', inputs: 'label · options · selected/model · size', outputs: 'selectedChange(model)', states: 'default · selected · focus · disabled option · compact', accessibility: 'Buttons expose aria-pressed and the group exposes its label.', tokens: 'selected surface · control radius', tests: 'immediate model update', note: 'Immediate selection; no async transition is hidden.', icon: 'pi-table' },
    { name: 'Status Chip', exportName: 'NexaStatusChip', selector: '<nexa-status-chip>', contract: 'tone · emphasis', inputs: 'tone · emphasis · projected label', outputs: 'None', states: 'neutral · info · success · warning · danger', accessibility: 'Visible label remains present; icon and hue are supporting cues.', tokens: 'semantic status surfaces', tests: 'tone / emphasis', note: 'Semantic tone remains separate from domain status.', icon: 'pi-tag' },
    { name: 'Surface', exportName: 'NexaSurface', selector: '<nexa-surface>', contract: 'tone · projected content', inputs: 'tone · projected content', outputs: 'None', states: 'default · soft · inset', accessibility: 'Structural wrapper; projected interactive content owns its semantics.', tokens: 'panel radius · surface roles', tests: 'tone rendering', note: 'Bounded surface composition candidate.', icon: 'pi-stop' },
    { name: 'Text Field', exportName: 'NexaTextField', selector: '<nexa-text-field>', contract: 'label · value/model · helper · error', inputs: 'id · label · value/model · placeholder · helper · error · required · disabled · readOnly · leadingIcon · trailingActionLabel', outputs: 'valueChange(model)', states: 'empty · filled · focus · invalid · read-only · disabled', accessibility: 'Native input, label and helper/error association through described-by.', tokens: 'control padding · focus ring · border roles', tests: 'value / associations', note: 'Native input and described validation.', icon: 'pi-pencil' },
    { name: 'Toggle', exportName: 'NexaToggle', selector: '<nexa-toggle>', contract: 'label · checked/model · disabled', inputs: 'id · label · checked/model · disabled', outputs: 'checkedChange(model)', states: 'off · on · focus · disabled', accessibility: 'Native checkbox presentation with switch role and checked state.', tokens: 'interactive radius · status roles', tests: 'switch / model', note: 'Immediate setting with switch semantics.', icon: 'pi-power-off' },
    { name: 'Tooltip', exportName: 'NexaTooltip', selector: '<nexa-tooltip>', contract: 'content · placement · trigger', inputs: 'id · content · triggerLabel', outputs: 'None; visibility is local state', states: 'hidden · visible · delayed hide · Escape dismissed', accessibility: 'Visible trigger, focus/hover reveal and keyboard dismissal.', tokens: 'overlay surface · focus ring', tests: 'visibility / escape', note: 'Tooltip semantics remain separate from menus.', icon: 'pi-question-circle' },
  ];
}
