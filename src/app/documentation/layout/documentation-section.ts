import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'nexa-documentation-section',
  templateUrl: './documentation-section.html',
  styleUrl: './documentation-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.evidence-first]': 'first()',
  },
})
export class NexaDocumentationSection {
  readonly index = input.required<string>();
  readonly kicker = input.required<string>();
  readonly title = input.required<string>();
  readonly intro = input('');
  readonly first = input(false, { transform: booleanAttribute });
  readonly headingId = computed(() => `documentation-section-${this.index().toLowerCase().replace(/[^a-z0-9]+/g, '-')}`);
}
