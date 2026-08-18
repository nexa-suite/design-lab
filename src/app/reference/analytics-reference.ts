import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NexaPageHeader, NexaStatusChip, NexaSurface } from '../shared/ui-contracts';

interface RingMetric {
  readonly label: string;
  readonly value: number;
  readonly detail: string;
  readonly tone: string;
}

@Component({
  selector: 'nexa-analytics-reference',
  imports: [NexaPageHeader, NexaStatusChip, NexaSurface],
  templateUrl: './analytics-reference.html',
  styleUrl: './analytics-reference.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaAnalyticsReference {
  protected readonly rings: readonly RingMetric[] = [
    { label: 'Fulfillment', value: 0, detail: '0 / 2 orders delivered', tone: 'blue' },
    { label: 'Document readiness', value: 25, detail: '1 / 4 documents ready', tone: 'amber' },
    { label: 'Temperature health', value: 100, detail: '0 records need attention', tone: 'green' },
  ];
  protected readonly statuses = [
    { label: 'Delivered', count: 0, tone: 'green' },
    { label: 'In preparation', count: 1, tone: 'blue' },
    { label: 'Awaiting review', count: 1, tone: 'amber' },
  ];
  protected circumference = 2 * Math.PI * 40;
  protected dash(value: number): string {
    return `${(this.circumference * value) / 100} ${this.circumference}`;
  }
}
