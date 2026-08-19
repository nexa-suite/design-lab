import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { NexaStateSequence, type NexaSequencePhase } from '../../lab/evidence/state-sequence/nexa-state-sequence';
import { NexaLogo, NexaStatusChip } from 'nexa-ui';
import { evaluateContrast, type ContrastResult } from '../../lab/quality/contrast';
import type { DocumentationPage } from '../models/documentation-page';
import { APPROVED_CONTRAST_PAIRS, BLUE_SCALE, COLOR_FAMILIES, NEUTRAL_SCALE, RADIUS_ROWS, SURFACE_ROWS, TYPE_ROWS } from '../content/documentation-data';
import { NEXA_ICON_CATEGORIES, NEXA_ICON_CATALOG, type NexaIconCategory } from './icon-catalog';

@Component({
  selector: 'nexa-foundation-documentation',
  imports: [NexaLogo, NexaStateSequence, NexaStatusChip],
  templateUrl: './foundation-documentation.html',
  styleUrl: './foundation-documentation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaFoundationDocumentation {
  readonly page = input.required<DocumentationPage>();
  protected readonly blueScale = BLUE_SCALE;
  protected readonly neutralScale = NEUTRAL_SCALE;
  protected readonly colorFamilies = COLOR_FAMILIES;
  protected readonly typeRows = TYPE_ROWS;
  protected readonly surfaceRows = SURFACE_ROWS;
  protected readonly radiusRows = RADIUS_ROWS;
  protected readonly contrastPairs = APPROVED_CONTRAST_PAIRS;
  protected readonly iconCatalog = NEXA_ICON_CATALOG;
  protected readonly iconCategories = NEXA_ICON_CATEGORIES;
  protected readonly iconQuery = signal('');
  protected readonly iconCategory = signal<'all' | NexaIconCategory>('all');
  protected readonly filteredIcons = computed(() => {
    const query = this.iconQuery().trim().toLocaleLowerCase();
    const category = this.iconCategory();
    return this.iconCatalog.filter((icon) => {
      const matchesCategory = category === 'all' || icon.category === category;
      const haystack = `${icon.name} ${icon.label} ${icon.usage}`.toLocaleLowerCase();
      return matchesCategory && (!query || haystack.includes(query));
    });
  });
  protected readonly motionMode = signal<'standard' | 'reduced'>('standard');
  protected readonly motionPhases: readonly NexaSequencePhase[] = [
    { id: 'rest', label: 'Rest', detail: 'Stable baseline.', tone: 'neutral' },
    { id: 'hover', label: 'Hover', detail: 'Pointer cue appears.', tone: 'info' },
    { id: 'pressed', label: 'Pressed', detail: 'Input acknowledged.', tone: 'info' },
    { id: 'feedback', label: 'Feedback', detail: 'Outcome stays visible.', tone: 'success' },
  ];

  protected contrast(pairId: string): ContrastResult {
    const pair = this.contrastPairs.find((candidate) => candidate.id === pairId) ?? this.contrastPairs[0];
    return evaluateContrast(pair.foreground, pair.background, pair.gate);
  }

  protected setIconCategory(value: string): void { this.iconCategory.set(value as 'all' | NexaIconCategory); }

  protected textStyle(row: (typeof TYPE_ROWS)[number]): Record<string, string> {
    return {
      'font-family': row.family === 'Inter' ? 'var(--nexa-font-family-body)' : row.family === 'JetBrains Mono' ? 'var(--nexa-font-family-mono)' : 'var(--nexa-font-family-display)',
      'font-size': row.size,
      'font-weight': row.weight,
      'line-height': row.leading,
      'letter-spacing': row.tracking,
    };
  }
}
