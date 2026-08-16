import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NexaDashboard } from './dashboard/dashboard';
import { NexaMaterialBench } from './material-bench/material-bench';
import { NexaOperationalTable } from './operational-table/operational-table';
import { NexaStyleGuidelines } from './style-guidelines/style-guidelines';
import { NexaShell } from './shell/shell';
import { UiAction } from './shared/ui-action';

@Component({
  selector: 'app-root',
  imports: [NexaDashboard, NexaMaterialBench, NexaOperationalTable, NexaShell, NexaStyleGuidelines],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly activeSection = signal('dashboard');
  protected readonly actionNotice = signal<string | null>(null);

  protected handleSectionChange(section: string): void {
    this.activeSection.set(section);
    const behavior: ScrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto'
      : 'smooth';
    document.getElementById(section)?.scrollIntoView({ behavior, block: 'start' });
  }

  protected handleAction(action: UiAction): void {
    this.actionNotice.set(action.label);
    if (action.target) {
      this.handleSectionChange(action.target);
    }
  }

  protected dismissNotice(): void {
    this.actionNotice.set(null);
  }
}
