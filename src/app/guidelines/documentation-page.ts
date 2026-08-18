import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  ALL_DOCUMENTATION_PAGES,
  DOCUMENTATION_PAGE_MAP,
  type DocumentationPage,
} from './documentation-registry';

interface DocRow {
  readonly name: string;
  readonly value: string;
  readonly note: string;
  readonly tone?: string;
}

interface DocAnswer {
  readonly title: string;
  readonly copy: string;
}

@Component({
  selector: 'nexa-documentation-page',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './documentation-page.html',
  styleUrl: './documentation-page.scss',
})
export class NexaDocumentationPage {
  private readonly route = inject(ActivatedRoute);

  protected readonly page: DocumentationPage =
    DOCUMENTATION_PAGE_MAP.get(String(this.route.snapshot.data['page'] ?? 'overview')) ??
    DOCUMENTATION_PAGE_MAP.get('overview')!;

  protected readonly allPages = ALL_DOCUMENTATION_PAGES;
  protected readonly paletteRows: readonly DocRow[] = [
    {
      name: 'Brand blue',
      value: '#2563EB · oklch(55% 0.22 258)',
      note: 'Primary action, active navigation, focus',
      tone: 'blue',
    },
    {
      name: 'Neutral slate',
      value: '#0F172A → #F8FAFC',
      note: 'Text, canvas, structural separation',
      tone: 'slate',
    },
    {
      name: 'Success green',
      value: '#15803D · #DCFCE7',
      note: 'Completed, available, healthy',
      tone: 'green',
    },
    {
      name: 'Attention amber',
      value: '#B45309 · #FEF3C7',
      note: 'Awaiting review, pending decision',
      tone: 'amber',
    },
    {
      name: 'Danger red',
      value: '#B91C1C · #FEE2E2',
      note: 'Blocked, invalid, destructive',
      tone: 'red',
    },
    {
      name: 'Orange',
      value: '#C2410C · #FFEDD5',
      note: 'Priority and operational attention',
      tone: 'orange',
    },
    {
      name: 'Cold sky',
      value: '#0369A1 · #E0F2FE',
      note: 'Refrigerated classification only',
      tone: 'sky',
    },
    {
      name: 'Frozen indigo',
      value: '#4338CA · #EEF2FF',
      note: 'Frozen classification only',
      tone: 'indigo',
    },
  ];

  protected readonly typeRows: readonly DocRow[] = [
    {
      name: 'Display',
      value: 'Plus Jakarta Sans · 48/52 · 760',
      note: 'Hero or exceptional orientation only',
    },
    {
      name: 'Large title',
      value: 'Plus Jakarta Sans · 32/38 · 760',
      note: 'Reference screen title',
    },
    {
      name: 'Title',
      value: 'Plus Jakarta Sans · 24/30 · 700',
      note: 'Primary documentation section',
    },
    {
      name: 'Heading',
      value: 'Plus Jakarta Sans · 18/24 · 700',
      note: 'Panel and component title',
    },
    { name: 'Subheading', value: 'Inter · 16/24 · 600', note: 'Supporting hierarchy' },
    { name: 'Body', value: 'Inter · 14/21 · 400', note: 'Operational copy and descriptions' },
    { name: 'Callout', value: 'Inter · 15/24 · 500', note: 'Important guidance or intro' },
    { name: 'Label', value: 'Inter · 12/16 · 600', note: 'Form, table and control label' },
    {
      name: 'Caption',
      value: 'Inter · 11/16 · 500',
      note: 'Secondary metadata; never critical only',
    },
    {
      name: 'Code',
      value: 'JetBrains Mono · 12/18 · 500',
      note: 'IDs, route names and token values',
    },
  ];

  protected readonly surfaceRows: readonly DocRow[] = [
    {
      name: 'Canvas',
      value: '#F6FAFF / #F8FAFC',
      note: 'Application and documentation background',
    },
    { name: 'Primary', value: '#FFFFFF', note: 'Main reading and work surface' },
    { name: 'Grouped', value: '#F8FAFC', note: 'Related blocks with low contrast separation' },
    { name: 'Card', value: '#FFFFFF · 1px border · 12px', note: 'Discrete object or choice' },
    { name: 'Selected', value: '#EFF6FF · #2563EB', note: 'Active route, row or choice' },
    { name: 'Raised', value: '#FFFFFF · shadow-sm', note: 'Only when above the plane' },
    { name: 'Menu / popover', value: '#FFFFFF · shadow-menu', note: 'Transient context' },
    {
      name: 'Dialog / scrim',
      value: '#FFFFFF · 48% slate scrim',
      note: 'Focused decision and dismissal',
    },
  ];

  protected readonly radiusRows: readonly DocRow[] = [
    { name: 'Small control', value: '6–8px', note: 'Compact action, field, active nav row' },
    { name: 'Control', value: '8–10px', note: 'Buttons, inputs, toolbar groups' },
    { name: 'Card', value: '12–16px', note: 'Panels and product/reference surfaces' },
    { name: 'Overlay', value: '16–18px', note: 'Drawer, popover and dialog' },
    { name: 'Pill', value: '9999px', note: 'Status, badge or compact tag only' },
  ];

  protected readonly anatomyRows: readonly DocRow[] = [
    { name: '01', value: 'Context', note: 'Label or heading names the object or scope.' },
    {
      name: '02',
      value: 'Primary content',
      note: 'Value, action or object identity carries the task.',
    },
    { name: '03', value: 'State', note: 'Selected, disabled, loading or error is explicit.' },
    { name: '04', value: 'Recovery', note: 'Back, clear, cancel or retry remains discoverable.' },
    { name: '05', value: 'Assistive name', note: 'Semantic name survives visual simplification.' },
  ];

  protected readonly componentStates: readonly DocRow[] = [
    { name: 'Default', value: 'Resting', note: 'Baseline visual and semantic state' },
    { name: 'Hover', value: 'Pointer over', note: 'Supplemental cue; never sole affordance' },
    { name: 'Pressed', value: 'Activation', note: 'Immediate acknowledgement of input' },
    { name: 'Focus-visible', value: 'Keyboard / voice', note: 'Shared ring; no outline removal' },
    { name: 'Disabled', value: 'Unavailable', note: 'Explain why when the reason is not obvious' },
    {
      name: 'Loading',
      value: 'Work in progress',
      note: 'Keep label and announce meaningful change',
    },
    { name: 'Selected / checked', value: 'Chosen', note: 'Text, shape and state attribute agree' },
    {
      name: 'Error / warning / success',
      value: 'Outcome',
      note: 'Recovery or next action is adjacent',
    },
    { name: 'Empty / read-only', value: 'No edit', note: 'Tell the user what is absent or fixed' },
  ];

  protected readonly patternSteps: readonly DocRow[] = [
    { name: '01', value: 'Orient', note: 'Page title, scope, object identity and task context.' },
    {
      name: '02',
      value: 'Choose',
      note: 'Visible options with domain vocabulary and constraints.',
    },
    { name: '03', value: 'Act', note: 'One primary action, safe secondary exit and feedback.' },
    { name: '04', value: 'Verify', note: 'Review state, status, errors and next destination.' },
    {
      name: '05',
      value: 'Recover',
      note: 'Cancel, back, clear, undo or retry without losing work.',
    },
  ];

  protected readonly heuristicRows: readonly DocRow[] = [
    {
      name: 'H1',
      value: 'Visibility of system status',
      note: 'Show route, loading, selection and outcome.',
    },
    {
      name: 'H2',
      value: 'Match with real world',
      note: 'Use Sales, Buyer Portal and cold-chain vocabulary.',
    },
    {
      name: 'H3',
      value: 'User control and freedom',
      note: 'Back, cancel, close, clear, undo and Escape.',
    },
    {
      name: 'H4',
      value: 'Consistency and standards',
      note: 'Same actions, states, icons and labels keep meaning.',
    },
    {
      name: 'H5',
      value: 'Error prevention',
      note: 'Constraints, review and confirmation before risky commit.',
    },
    {
      name: 'H6',
      value: 'Recognition over recall',
      note: 'Keep context, values and applied filters visible.',
    },
    {
      name: 'H7',
      value: 'Flexibility and efficiency',
      note: 'Keyboard access, search, filters and repeatable actions.',
    },
    {
      name: 'H8',
      value: 'Aesthetic and minimalist design',
      note: 'Remove card soup, fake metrics and decorative noise.',
    },
    {
      name: 'H9',
      value: 'Recognize, diagnose, recover',
      note: 'Plain error, precise cause and constructive path.',
    },
    {
      name: 'H10',
      value: 'Help and documentation',
      note: 'Contextual guidance and searchable design documentation.',
    },
  ];

  protected readonly accessibilityRows: readonly DocRow[] = [
    {
      name: 'Semantics',
      value: 'Landmarks, headings, native controls',
      note: 'The DOM communicates the visible structure.',
    },
    {
      name: 'Keyboard',
      value: 'Tab, Enter, Space, Escape, arrows',
      note: 'Pattern-specific keys are documented and tested.',
    },
    {
      name: 'Focus',
      value: 'Visible, ordered, restored',
      note: 'No focus trap without a deliberate modal contract.',
    },
    {
      name: 'Contrast',
      value: '4.5:1 text / 3:1 non-text',
      note: 'WCAG 2.2 AA target; verify actual token pairs.',
    },
    {
      name: 'Reflow',
      value: '320 CSS px / 400% zoom',
      note: 'Content survives without accidental two-axis scrolling.',
    },
    {
      name: 'Targets',
      value: '44px visual / 48px touch candidate',
      note: 'Hit area may exceed visible icon shape.',
    },
    {
      name: 'Motion',
      value: 'Reduced motion fallback',
      note: 'Meaning remains when transitions are disabled.',
    },
    {
      name: 'Names',
      value: 'Label, role, value, status',
      note: 'Icon-only controls never depend on visual interpretation.',
    },
  ];

  protected readonly angularRows: readonly DocRow[] = [
    {
      name: 'Buttons / fields',
      value: 'Native HTML + Angular forms',
      note: 'Nexa presentation owner; no Material default skin.',
    },
    {
      name: 'Select / combobox',
      value: 'Native first; Angular Aria when needed',
      note: 'Behavior source is selected by complexity.',
    },
    {
      name: 'Menu / toolbar',
      value: 'Angular Aria headless directives',
      note: 'Keyboard and ARIA behavior with Nexa CSS.',
    },
    {
      name: 'Dialog / drawer',
      value: 'CDK Overlay + focus management',
      note: 'Scrim, collision, inertness and return focus.',
    },
    {
      name: 'Navigation',
      value: 'Router + lazy loadComponent',
      note: 'Current location and performance are one contract.',
    },
    {
      name: 'Tables / progress',
      value: 'Semantic HTML + documented states',
      note: 'Avoid generic Material density and semantics.',
    },
  ];

  protected readonly tokenRows: readonly DocRow[] = [
    {
      name: 'Primitive',
      value: 'blue-600 / slate-900 / space-4',
      note: 'Raw scale; no component meaning.',
    },
    {
      name: 'Semantic',
      value: 'color-action-primary / surface-card',
      note: 'Meaning shared across components.',
    },
    {
      name: 'Component',
      value: 'button-primary-bg / nav-active-radius',
      note: 'Local contract derived from semantics.',
    },
    {
      name: 'Figma',
      value: 'Variable collection + mode',
      note: 'Future handoff mapping, not a generated library.',
    },
  ];

  protected readonly coverageRows: readonly DocRow[] = [
    {
      name: 'Documented',
      value: 'Component page + specimen',
      note: 'Designer, engineer and QA can inspect the contract.',
    },
    {
      name: 'Behavior mapped',
      value: 'Angular source candidate',
      note: 'Behavior library is named separately from presentation.',
    },
    {
      name: 'Visual evidence',
      value: 'Vue / FLOW / Angular',
      note: 'Comparable screenshots required before parity claim.',
    },
    { name: 'Status', value: 'CANDIDATE', note: 'Human design approval has not occurred.' },
  ];

  protected readonly answerCards: readonly DocAnswer[] = this.createAnswerCards();

  protected statusClass(): string {
    return this.page.status.toLowerCase().replaceAll(' ', '-');
  }

  protected relatedPages(): readonly DocumentationPage[] {
    return this.allPages
      .filter((candidate) => candidate.id !== this.page.id && candidate.kind === this.page.kind)
      .slice(0, 4);
  }

  protected pageUrl(candidate: DocumentationPage): string {
    return `/guidelines/${candidate.path}`;
  }

  protected toneClass(tone: string | undefined): string {
    return tone ? `swatch-${tone}` : 'swatch-neutral';
  }

  private createAnswerCards(): readonly DocAnswer[] {
    if (this.page.kind !== 'component') return [];

    return [
      {
        title: 'What it is',
        copy: `${this.page.title} is a reusable Nexa contract with visible purpose, semantic state and documented recovery.`,
      },
      { title: 'When to use', copy: this.page.intro },
      { title: 'When not to use', copy: this.page.summary },
      {
        title: 'Anatomy',
        copy: 'Context → primary content → state → recovery → assistive name. The order changes only when the task requires it.',
      },
      {
        title: 'Variants',
        copy: 'Primary/secondary intent, compact/default density and state variants are chosen by consequence, not decoration.',
      },
      {
        title: 'Sizes',
        copy: 'Use the smallest readable visual size that preserves a 44px target; touch contexts may expand the hit area to 48px.',
      },
      {
        title: 'States',
        copy: 'Default, hover, pressed, focus-visible, disabled, loading and meaningful outcome states are covered in the matrix below.',
      },
      {
        title: 'Behavior',
        copy: 'The control communicates cause, result and the next available action. Escape and cancellation follow the pattern.',
      },
      {
        title: 'Content guidance',
        copy: 'Use concise domain vocabulary, sentence case labels and action verbs. Never rely on placeholder or icon alone.',
      },
      {
        title: 'Keyboard',
        copy: 'Native controls keep native keys. Composite controls document Tab, Enter/Space, Escape and arrow-key behavior.',
      },
      {
        title: 'Accessibility',
        copy: 'Name, role, value, focus, contrast, non-color cue, status announcement and error ownership are part of the component.',
      },
      {
        title: 'Responsive / modality',
        copy: 'Mouse, trackpad, touch, keyboard and assistive technology retain the same task model; composition may change.',
      },
      {
        title: 'Tokens',
        copy: 'Primitive scale → semantic role → component property. A literal color or radius is rejected when an intent token exists.',
      },
      { title: 'Angular implementation', copy: this.page.angularUsage },
      { title: 'Real Nexa usage', copy: this.page.vueEvidence },
      {
        title: 'Do / don’t',
        copy: 'Do keep labels and recovery visible. Don’t turn every state into a pill, shadow or color-only cue.',
      },
      {
        title: 'Provenance',
        copy: 'Visual evidence follows human direction → FLOW → rendered Vue → Vue source/CSS/assets → Design Lab.',
      },
      {
        title: 'Design status',
        copy: `${this.page.status}. This page is an auditable candidate, not an approval record.`,
      },
      { title: 'Figma mapping', copy: this.page.figma },
    ];
  }
}
