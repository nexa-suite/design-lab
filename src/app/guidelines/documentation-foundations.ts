import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NexaStateSequence, type NexaSequencePhase } from '../shared/nexa-state-sequence';
import { NexaLogo } from '../shared/nexa-logo';
import { NexaStatusChip } from '../shared/nexa-status-chip';
import { evaluateContrast, type ContrastResult } from '../shared/contrast';
import type { DocumentationPage } from './documentation-registry';
import { APPROVED_CONTRAST_PAIRS, BLUE_SCALE, COLOR_FAMILIES, NEUTRAL_SCALE, RADIUS_ROWS, SURFACE_ROWS, TYPE_ROWS } from './documentation-data';

@Component({
  selector: 'nexa-foundation-documentation',
  imports: [NexaLogo, NexaStateSequence, NexaStatusChip],
  templateUrl: './documentation-foundations.html',
  styleUrl: './documentation-foundations.scss',
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
