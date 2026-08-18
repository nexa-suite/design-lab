import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, signal } from '@angular/core';

export type NexaSequenceTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
export type NexaSequencePosition = 'future' | 'current' | 'visited';

export interface NexaSequencePhase {
  readonly id: string;
  readonly label: string;
  readonly detail: string;
  readonly tone?: NexaSequenceTone;
  readonly durationMs?: number;
  readonly terminal?: boolean;
}

const EMPTY_PHASE: NexaSequencePhase = {
  id: 'empty',
  label: 'No phase selected',
  detail: 'Add a phase to show evidence.',
};

@Component({
  selector: 'nexa-state-sequence',
  templateUrl: './nexa-state-sequence.html',
  styleUrl: './nexa-state-sequence.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaStateSequence {
  readonly title = input.required<string>();
  readonly phases = input.required<readonly NexaSequencePhase[]>();
  readonly retryLabel = input('');
  readonly autoplayDelayMs = input(900);
  protected readonly currentIndex = signal(0);
  protected readonly playing = signal(false);
  private readonly destroyRef = inject(DestroyRef);
  private timer: number | undefined;

  constructor() {
    this.destroyRef.onDestroy(() => this.stop());
  }

  protected current(): NexaSequencePhase {
    const phases = this.phases();
    return phases[this.currentIndex()] ?? phases[0] ?? EMPTY_PHASE;
  }

  protected phasePosition(index: number): NexaSequencePosition {
    if (index === this.currentIndex()) return 'current';
    return index < this.currentIndex() ? 'visited' : 'future';
  }

  protected isTerminal(): boolean {
    const phase = this.current();
    if (phase.terminal !== undefined) return phase.terminal;
    return ['success', 'error', 'cancelled'].includes(phase.id.toLowerCase());
  }

  protected next(): void {
    const phases = this.phases();
    if (this.isTerminal() || phases.length < 2) {
      this.stop();
      return;
    }

    const nextIndex = Math.min(this.currentIndex() + 1, phases.length - 1);
    this.currentIndex.set(nextIndex);
    if (this.isTerminal() || nextIndex === phases.length - 1) this.stop();
  }

  protected reset(): void {
    this.stop();
    this.currentIndex.set(0);
  }

  protected retry(): void {
    const retryIndex = this.phases().findIndex((phase) => phase.id === 'retry' || phase.id === 'processing');
    this.stop();
    this.currentIndex.set(retryIndex >= 0 ? retryIndex : 0);
  }

  protected play(): void {
    if (this.playing()) {
      this.stop();
      return;
    }
    if (this.isTerminal() || this.phases().length < 2) return;

    this.playing.set(true);
    this.scheduleNext();
  }

  private scheduleNext(): void {
    if (!this.playing() || this.isTerminal()) return;

    const delay = this.current().durationMs ?? this.autoplayDelayMs();
    this.timer = window.setTimeout(() => {
      this.timer = undefined;
      this.next();
      if (this.playing()) this.scheduleNext();
    }, Math.max(0, delay));
  }

  private stop(): void {
    if (this.timer !== undefined) window.clearTimeout(this.timer);
    this.timer = undefined;
    this.playing.set(false);
  }
}
