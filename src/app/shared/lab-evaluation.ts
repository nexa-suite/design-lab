import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';

export type ContrastMode = 'standard' | 'increased';
export type MotionMode = 'motion' | 'reduced';

@Injectable({ providedIn: 'root' })
export class NexaLabEvaluation {
  readonly contrastMode = signal<ContrastMode>('standard');
  readonly motionMode = signal<MotionMode>('motion');
  readonly textScale = signal<1 | 1.5 | 2>(1);
  readonly targetOverlay = signal(false);

  private readonly document = inject(DOCUMENT);

  constructor() {
    this.document.documentElement.dataset['contrastMode'] = 'standard';
    this.document.documentElement.dataset['motionMode'] = 'motion';
    this.document.documentElement.dataset['targetOverlay'] = 'false';
  }

  setContrastMode(mode: ContrastMode): void {
    this.contrastMode.set(mode);
    this.document.documentElement.dataset['contrastMode'] = mode;
  }

  setMotionMode(mode: MotionMode): void {
    this.motionMode.set(mode);
    this.document.documentElement.dataset['motionMode'] = mode;
  }

  setTextScale(scale: 1 | 1.5 | 2): void {
    this.textScale.set(scale);
    this.document.documentElement.style.setProperty('--nexa-doc-text-scale', String(scale));
  }

  setTargetOverlay(enabled: boolean): void {
    this.targetOverlay.set(enabled);
    this.document.documentElement.dataset['targetOverlay'] = String(enabled);
  }
}
