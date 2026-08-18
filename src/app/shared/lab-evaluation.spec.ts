import { TestBed } from '@angular/core/testing';
import { NexaLabEvaluation } from './lab-evaluation';

describe('Nexa evaluation modes', () => {
  it('changes root-level contrast, motion, scale and target behavior', () => {
    const evaluation = TestBed.inject(NexaLabEvaluation);
    const root = document.documentElement;

    evaluation.setContrastMode('increased');
    evaluation.setMotionMode('reduced');
    evaluation.setTextScale(2);
    evaluation.setTargetOverlay(true);

    expect(root.dataset['contrastMode']).toBe('increased');
    expect(root.dataset['motionMode']).toBe('reduced');
    expect(root.dataset['targetOverlay']).toBe('true');
    expect(root.style.getPropertyValue('--nexa-doc-text-scale')).toBe('2');

    evaluation.setContrastMode('standard');
    evaluation.setMotionMode('motion');
    evaluation.setTextScale(1);
    evaluation.setTargetOverlay(false);
  });
});
