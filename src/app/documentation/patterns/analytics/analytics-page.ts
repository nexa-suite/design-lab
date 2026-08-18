import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NexaButton } from '../../../design-system/button/nexa-button';
import { NexaDocumentationFrame } from '../../layout/documentation-page';
import { injectDocumentationRouteContext } from '../../layout/page-context';

type AnalyticsTone = 'success' | 'warning' | 'danger';
type AnalyticsState = 'ready' | 'loading' | 'empty' | 'error';

interface AnalyticsBar {
  readonly label: string;
  readonly value: string;
  readonly width: number;
  readonly tone: AnalyticsTone;
}

@Component({
  selector: 'nexa-analytics-page',
  imports: [NexaButton, NexaDocumentationFrame],
  templateUrl: './analytics-page.html',
  styleUrl: './analytics-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaAnalyticsPage {
  protected readonly context = injectDocumentationRouteContext();
  protected readonly analyticsState = signal<AnalyticsState>('ready');
  protected readonly analyticsBars: readonly AnalyticsBar[] = [
    { label: 'Completed', value: '64%', width: 64, tone: 'success' },
    { label: 'Awaiting review', value: '22%', width: 22, tone: 'warning' },
    { label: 'Blocked', value: '14%', width: 14, tone: 'danger' },
  ];

  protected setAnalyticsState(state: AnalyticsState): void { this.analyticsState.set(state); }
  protected clearScope(): void { this.analyticsState.set('empty'); }
  protected retry(): void { this.analyticsState.set('loading'); window.setTimeout(() => this.analyticsState.set('ready'), 320); }
}
