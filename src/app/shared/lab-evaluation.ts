import { Injectable, signal } from '@angular/core';

export type ContrastMode = 'standard' | 'increased';
export type MotionMode = 'motion' | 'reduced';

@Injectable({ providedIn: 'root' })
export class NexaLabEvaluation {
  readonly contrastMode = signal<ContrastMode>('standard');
  readonly motionMode = signal<MotionMode>('motion');
  readonly textScale = signal<1 | 1.5 | 2>(1);
  readonly targetOverlay = signal(false);

  setContrastMode(mode: ContrastMode): void {
    this.contrastMode.set(mode);
    document.documentElement.dataset['contrastMode'] = mode;
  }

  setMotionMode(mode: MotionMode): void {
    this.motionMode.set(mode);
    document.documentElement.dataset['motionMode'] = mode;
  }

  setTextScale(scale: 1 | 1.5 | 2): void {
    this.textScale.set(scale);
    document.documentElement.style.setProperty('--nexa-doc-text-scale', String(scale));
  }

  setTargetOverlay(enabled: boolean): void {
    this.targetOverlay.set(enabled);
    document.documentElement.dataset['targetOverlay'] = String(enabled);
  }
}
