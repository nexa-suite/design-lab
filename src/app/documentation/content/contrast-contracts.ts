import { tokenValue } from './token-reference.generated';

export interface ContrastPair {
  readonly id: string;
  readonly label: string;
  readonly foregroundToken: string;
  readonly foreground: string;
  readonly backgroundToken: string;
  readonly background: string;
  readonly gate: 'normal' | 'large' | 'non-text';
}

const pair = (
  id: string,
  label: string,
  foregroundToken: string,
  backgroundToken: string,
  gate: ContrastPair['gate'],
): ContrastPair => ({
  id,
  label,
  foregroundToken,
  foreground: tokenValue(foregroundToken),
  backgroundToken,
  background: tokenValue(backgroundToken),
  gate,
});

export const APPROVED_CONTRAST_PAIRS: readonly ContrastPair[] = [
  pair('text-primary-canvas', 'Primary text on canvas', '--nexa-color-text-primary', '--nexa-surface-page', 'normal'),
  pair('text-primary-card', 'Primary text on card', '--nexa-color-text-primary', '--nexa-surface-card', 'normal'),
  pair('text-secondary-card', 'Secondary text on card', '--nexa-color-text-secondary', '--nexa-surface-card', 'normal'),
  pair('text-tertiary-card', 'Tertiary text on card', '--nexa-color-neutral-600', '--nexa-surface-card', 'normal'),
  pair('action-label-primary', 'Action label on primary', '--nexa-color-text-inverse', '--nexa-color-primary-600', 'normal'),
  pair('link-on-card', 'Link on card', '--nexa-color-primary-700', '--nexa-surface-card', 'normal'),
  pair('success-card', 'Success text on success surface', '--nexa-color-success-700', '--nexa-surface-success', 'normal'),
  pair('warning-card', 'Warning text on warning surface', '--nexa-color-warning-text', '--nexa-surface-warning', 'normal'),
  pair('warning-emphasized', 'Warning inverse text on emphasized surface', '--nexa-color-warning-emphasized-text', '--nexa-color-warning-emphasized-background', 'normal'),
  pair('danger-card', 'Danger text on danger surface', '--nexa-color-danger-text', '--nexa-surface-danger', 'normal'),
  pair('danger-strong', 'Danger inverse text on strong surface', '--nexa-color-danger-strong-text', '--nexa-color-danger-strong-background', 'normal'),
  pair('focus-canvas', 'Focus ring against canvas', '--nexa-color-focus-ring', '--nexa-surface-page', 'non-text'),
  pair('input-border-card', 'Focused input border against card', '--nexa-color-primary-500', '--nexa-surface-card', 'non-text'),
  pair('selected-border', 'Selected border against selected surface', '--nexa-color-primary-600', '--nexa-surface-nav-active', 'non-text'),
  pair('viz-axis-text-card', 'Visualization supporting label on card', '--nexa-viz-axis-text', '--nexa-surface-card', 'normal'),
  pair('viz-series-primary-card', 'Primary data series against card', '--nexa-viz-series-1', '--nexa-surface-card', 'non-text'),
  pair('viz-series-sky-card', 'Sky data series against card', '--nexa-viz-series-2', '--nexa-surface-card', 'non-text'),
  pair('viz-series-indigo-card', 'Indigo data series against card', '--nexa-viz-series-3', '--nexa-surface-card', 'non-text'),
  pair('viz-series-success-card', 'Success data series against card', '--nexa-viz-series-5', '--nexa-surface-card', 'non-text'),
  pair('viz-series-warning-card', 'Warning data series against card', '--nexa-viz-series-6', '--nexa-surface-card', 'non-text'),
  pair('viz-status-success-card', 'Semantic success status against card', '--nexa-viz-status-success', '--nexa-surface-card', 'non-text'),
  pair('viz-status-warning-card', 'Semantic warning status against card', '--nexa-viz-status-warning', '--nexa-surface-card', 'non-text'),
  pair('viz-status-danger-card', 'Semantic danger status against card', '--nexa-viz-status-danger', '--nexa-surface-card', 'non-text'),
  pair('viz-status-info-card', 'Semantic information status against card', '--nexa-viz-status-info', '--nexa-surface-card', 'non-text'),
];
