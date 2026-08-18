import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

type GuidelinePageId = 'overview' | 'foundations' | 'components' | 'patterns' | 'accessibility';

@Component({
  selector: 'nexa-guideline-page',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './guideline-page.html',
  styleUrl: './guideline-page.scss',
})
export class NexaGuidelinePage {
  protected readonly page = inject(ActivatedRoute).snapshot.data['page'] as GuidelinePageId;
  protected readonly pageMeta: Record<
    GuidelinePageId,
    { eyebrow: string; title: string; intro: string }
  > = {
    overview: {
      eyebrow: 'NEXA DESIGN LAB / v0.5.0-RC.1',
      title: 'Legacy visual contracts, converged for Angular',
      intro:
        'Human decisions and Legacy Vue/FLOW remain visual authority. These guidelines record current reusable contracts after product-quality convergence.',
    },
    foundations: {
      eyebrow: '01 / FOUNDATIONS',
      title: 'The rules extracted from Legacy',
      intro:
        'Color, type, spacing, shape, surfaces and icon weight preserve Nexa recognition before a component is introduced.',
    },
    components: {
      eyebrow: '02 / COMPONENTS',
      title: 'The actual Nexa component families',
      intro:
        'Buttons, native selects, menus, cards, product cards, status and data display follow the restored reference screens.',
    },
    patterns: {
      eyebrow: '03 / PATTERNS',
      title: 'Compositions copied from operational flows',
      intro:
        'Page headers, filters, tables, dialogs, wizards and portal layouts compose the product without generic Material defaults.',
    },
    accessibility: {
      eyebrow: '04 / ACCESSIBILITY',
      title: 'Accessible behavior is part of the contract',
      intro:
        'Contrast, keyboard, focus, target size and reduced motion are implementation checks for every reference screen.',
    },
  };
  protected readonly colors = [
    ['Brand', '#2563EB', 'Primary action, active navigation and focus'],
    ['Neutral', 'slate scale', 'Text, surfaces and structural separation'],
    ['Workflow', 'semantic status', 'Submitted, attention, blocked and complete'],
    ['Role', 'responsibility', 'Sales or operational responsibility, never workflow state'],
    ['Cold-chain', 'classification', 'Refrigerated or frozen context, never workflow state'],
  ] as const;
  protected readonly spacing = [
    ['space-2', '8px', 'icon gaps'],
    ['space-3', '12px', 'compact control groups'],
    ['space-4', '16px', 'local component rhythm'],
    ['space-6', '24px', 'work surface padding'],
    ['space-12', '48px', 'documentation section rhythm'],
  ] as const;
  protected readonly rules = [
    ['PageHeader', 'identity, context and primary actions share one alignment context'],
    ['FilterBar', 'filters stay together and preserve their state when the table scrolls'],
    [
      'OperationalTable',
      'semantic table first; horizontal overflow before row-card transformation',
    ],
    ['EntityHeader', 'the object identity comes before secondary metadata or actions'],
    ['Wizard', 'one current phase, clear back/next actions, review before submission'],
    ['Summary', 'show the decision-relevant facts without exposing internal allocation mechanics'],
  ] as const;
  protected readonly contrast = [
    ['Body text', 'slate-900 / white', 'Pass'],
    ['Readable metadata', 'slate-500 / white', 'Pass'],
    ['Decorative neutral', 'slate-400 / white', 'Decorative only'],
    ['Primary action', 'white / blue-600', 'Pass'],
    ['Focus ring', 'blue-600 / any surface', 'Visible boundary'],
  ] as const;
}
