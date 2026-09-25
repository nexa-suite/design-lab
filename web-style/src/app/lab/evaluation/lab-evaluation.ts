import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';

export type ContrastMode = 'standard' | 'increased';
export type MotionMode = 'motion' | 'reduced';
export type TextScale = 1 | 1.5 | 2 | 4;
export type TextSpacingMode = 'standard' | 'increased';

@Injectable({ providedIn: 'root' })
export class NexaLabEvaluation {
  readonly contrastMode = signal<ContrastMode>('standard');
  readonly motionMode = signal<MotionMode>('motion');
  readonly textScale = signal<TextScale>(1);
  readonly textSpacing = signal<TextSpacingMode>('standard');
  readonly targetOverlay = signal(false);

  private readonly document = inject(DOCUMENT);

  constructor() {
    this.document.documentElement.dataset['contrastMode'] = 'standard';
    this.document.documentElement.dataset['motionMode'] = 'motion';
    this.document.documentElement.dataset['targetOverlay'] = 'false';
    this.document.documentElement.dataset['reflowMode'] = 'false';
    this.document.documentElement.dataset['textSpacing'] = 'standard';
  }

  setContrastMode(mode: ContrastMode): void {
    this.contrastMode.set(mode);
    this.document.documentElement.dataset['contrastMode'] = mode;
  }

  setMotionMode(mode: MotionMode): void {
    this.motionMode.set(mode);
    this.document.documentElement.dataset['motionMode'] = mode;
  }

  setTextScale(scale: TextScale): void {
    this.textScale.set(scale);
    this.document.documentElement.style.setProperty('--nexa-doc-text-scale', String(scale));
    this.document.documentElement.dataset['reflowMode'] = String(scale === 4);
  }

  setTextSpacing(mode: TextSpacingMode): void {
    this.textSpacing.set(mode);
    this.document.documentElement.dataset['textSpacing'] = mode;
  }

  setTargetOverlay(enabled: boolean): void {
    this.targetOverlay.set(enabled);
    this.document.documentElement.dataset['targetOverlay'] = String(enabled);
  }
}
