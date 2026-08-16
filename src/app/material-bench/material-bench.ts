import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'nexa-material-bench',
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTooltipModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './material-bench.html',
  styleUrl: './material-bench.scss',
})
export class NexaMaterialBench {
  protected readonly selectedStatus = signal('Awaiting review');
  protected readonly reviewEnabled = signal(true);

  protected setStatus(status: string): void {
    this.selectedStatus.set(status);
  }

  protected toggleReview(): void {
    this.reviewEnabled.update((enabled) => !enabled);
  }
}
