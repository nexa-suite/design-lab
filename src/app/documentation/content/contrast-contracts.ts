export interface ContrastPair {
  readonly id: string;
  readonly label: string;
  readonly foregroundToken: string;
  readonly foreground: string;
  readonly backgroundToken: string;
  readonly background: string;
  readonly gate: 'normal' | 'large' | 'non-text';
}

export const APPROVED_CONTRAST_PAIRS: readonly ContrastPair[] = [
  { id: 'text-primary-canvas', label: 'Primary text on canvas', foregroundToken: '--nexa-color-text-primary', foreground: '#0f172a', backgroundToken: '--nexa-surface-page', background: '#f6faff', gate: 'normal' },
  { id: 'text-primary-card', label: 'Primary text on card', foregroundToken: '--nexa-color-text-primary', foreground: '#0f172a', backgroundToken: '--nexa-surface-card', background: '#ffffff', gate: 'normal' },
  { id: 'text-secondary-card', label: 'Secondary text on card', foregroundToken: '--nexa-color-text-secondary', foreground: '#64748b', backgroundToken: '--nexa-surface-card', background: '#ffffff', gate: 'normal' },
  { id: 'text-tertiary-card', label: 'Tertiary text on card', foregroundToken: '--nexa-color-neutral-600', foreground: '#475569', backgroundToken: '--nexa-surface-card', background: '#ffffff', gate: 'normal' },
  { id: 'action-label-primary', label: 'Action label on primary', foregroundToken: '--nexa-color-text-inverse', foreground: '#ffffff', backgroundToken: '--nexa-color-primary-600', background: 'oklch(54.6% 0.215 262.9)', gate: 'normal' },
  { id: 'link-on-card', label: 'Link on card', foregroundToken: '--nexa-color-primary-700', foreground: 'oklch(48% 0.19 262.9)', backgroundToken: '--nexa-surface-card', background: '#ffffff', gate: 'normal' },
  { id: 'success-card', label: 'Success text on success surface', foregroundToken: '--nexa-color-success-700', foreground: '#15803d', backgroundToken: '--nexa-surface-success', background: '#f0fdf4', gate: 'normal' },
  { id: 'warning-card', label: 'Warning text on warning surface', foregroundToken: '--nexa-color-warning-text', foreground: '#92400e', backgroundToken: '--nexa-surface-warning', background: '#fffbeb', gate: 'normal' },
  { id: 'warning-emphasized', label: 'Warning inverse text on emphasized surface', foregroundToken: '--nexa-color-warning-emphasized-text', foreground: '#ffffff', backgroundToken: '--nexa-color-warning-emphasized-background', background: '#92400e', gate: 'normal' },
  { id: 'danger-card', label: 'Danger text on danger surface', foregroundToken: '--nexa-color-danger-text', foreground: '#991b1b', backgroundToken: '--nexa-surface-danger', background: '#fef2f2', gate: 'normal' },
  { id: 'danger-strong', label: 'Danger inverse text on strong surface', foregroundToken: '--nexa-color-danger-strong-text', foreground: '#ffffff', backgroundToken: '--nexa-color-danger-strong-background', background: '#991b1b', gate: 'normal' },
  { id: 'focus-canvas', label: 'Focus ring against canvas', foregroundToken: '--nexa-color-focus-ring', foreground: 'oklch(54.6% 0.215 262.9)', backgroundToken: '--nexa-surface-page', background: '#f6faff', gate: 'non-text' },
  { id: 'input-border-card', label: 'Focused input border against card', foregroundToken: '--nexa-color-primary-500', foreground: 'oklch(60% 0.199 262.8)', backgroundToken: '--nexa-surface-card', background: '#ffffff', gate: 'non-text' },
  { id: 'selected-border', label: 'Selected border against selected surface', foregroundToken: '--nexa-color-primary-600', foreground: 'oklch(54.6% 0.215 262.9)', backgroundToken: '--nexa-surface-nav-active', background: 'oklch(96.9% 0.014 264.5)', gate: 'non-text' },
];
