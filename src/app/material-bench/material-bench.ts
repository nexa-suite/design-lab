import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'nexa-material-bench',
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatTooltipModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './material-bench.html',
  styleUrl: './material-bench.scss',
  host: { '(document:keydown.escape)': 'closeActionMenu()' },
})
export class NexaMaterialBench {
  protected readonly selectedStatus = signal('Awaiting review');
  protected readonly reviewEnabled = signal(true);
  protected readonly actionMenuOpen = signal(false);

  protected setStatus(status: string): void {
    this.selectedStatus.set(status);
  }

  protected toggleReview(): void {
    this.reviewEnabled.update((enabled) => !enabled);
  }

  protected toggleActionMenu(): void {
    this.actionMenuOpen.update((open) => !open);
  }

  protected closeActionMenu(): void {
    this.actionMenuOpen.set(false);
  }
}
