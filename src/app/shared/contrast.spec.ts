import { contrastRatio, evaluateContrast, parseColor } from './contrast';

describe('Nexa contrast engine', () => {
  it('matches known WCAG black and white ratio', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBe(21);
    expect(evaluateContrast('#000000', '#ffffff', 'normal').pass).toBe(true);
  });

  it('supports hex, rgb and oklch candidate formats', () => {
    expect(parseColor('#fff').red).toBe(1);
    expect(parseColor('rgb(0 128 255)').blue).toBe(1);
    expect(parseColor('oklch(100% 0 0)').green).toBeCloseTo(1, 10);
  });

  it('uses non-text gate for essential indicators', () => {
    const result = evaluateContrast('oklch(54.6% 0.215 262.9)', '#f6faff', 'non-text');
    expect(result.threshold).toBe(3);
    expect(result.ratio).toBeGreaterThan(3);
  });
});
