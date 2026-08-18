import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, signal } from '@angular/core';

export interface NexaSequencePhase { readonly id: string; readonly label: string; readonly detail: string; readonly tone?: 'neutral' | 'info' | 'success' | 'warning' | 'danger'; }

@Component({
  selector: 'nexa-state-sequence',
  templateUrl: './nexa-state-sequence.html',
  styleUrl: './nexa-state-sequence.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaStateSequence {
  readonly title = input.required<string>();
  readonly phases = input.required<readonly NexaSequencePhase[]>();
  protected readonly currentIndex = signal(0);
  protected readonly playing = signal(false);
  private readonly destroyRef = inject(DestroyRef);
  private timer: number | undefined;

  constructor() {
    this.destroyRef.onDestroy(() => this.stop());
  }

  protected current(): NexaSequencePhase { return this.phases()[this.currentIndex()] ?? this.phases()[0]; }
  protected next(): void { this.currentIndex.update((index) => (index + 1) % this.phases().length); }
  protected reset(): void { this.stop(); this.currentIndex.set(0); }
  protected play(): void {
    if (this.playing()) { this.stop(); return; }
    this.playing.set(true);
    this.timer = window.setInterval(() => this.next(), 900);
  }
  private stop(): void {
    if (this.timer !== undefined) window.clearInterval(this.timer);
    this.timer = undefined;
    this.playing.set(false);
  }
}
