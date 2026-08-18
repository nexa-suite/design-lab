import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NexaActionMenu } from '../shared/action-menu';
import { NexaNativeSelect } from '../shared/ui-contracts';

@Component({
  selector: 'nexa-material-bench',
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatTooltipModule,
    NexaActionMenu,
    NexaNativeSelect,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './material-bench.html',
  styleUrl: './material-bench.scss',
})
export class NexaMaterialBench {
  protected readonly selectedStatus = signal('Awaiting review');
  protected readonly reviewEnabled = signal(true);
  protected readonly menuItems = [
    { id: 'detail', label: 'Open detail' },
    { id: 'assign', label: 'Assign reviewer' },
  ];

  protected setStatus(status: string): void {
    this.selectedStatus.set(status);
  }

  protected toggleReview(): void {
    this.reviewEnabled.update((enabled) => !enabled);
  }

  protected selectMenuAction(action: string): void {
    this.selectedStatus.set(action === 'detail' ? 'Detail opened' : 'Reviewer assigned');
  }
}
