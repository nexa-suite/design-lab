/**
 * NEXA DESIGN SYSTEM CANONICAL GUIDELINE DATA
 * Extracted from nexa-suite/design-lab (v1.0.2)
 * Authority: tokens/*.tokens.json & src/app/documentation/content/documentation-data.ts
 */

export interface BlueToken {
  readonly shade: number;
  readonly token: string;
  readonly value: string;
  readonly usage: string;
  readonly foreground: string;
}

export interface NeutralToken {
  readonly name: string;
  readonly token: string;
  readonly value: string;
  readonly note: string;
}

export interface ColorFamily {
  readonly name: string;
  readonly surface: string;
  readonly border: string;
  readonly foreground: string;
  readonly icon: string;
  readonly example: string;
}

export interface TypeToken {
  readonly role: string;
  readonly family: string;
  readonly size: string;
  readonly weight: string;
  readonly leading: string;
  readonly tracking: string;
  readonly usage: string;
}

export interface SurfaceToken {
  readonly name: string;
  readonly value: string;
  readonly note: string;
}

export interface RadiusToken {
  readonly name: string;
  readonly token: string;
  readonly value: string;
  readonly note: string;
}

export interface ContrastContract {
  readonly id: string;
  readonly label: string;
  readonly foregroundToken: string;
  readonly foreground: string;
  readonly backgroundToken: string;
  readonly background: string;
  readonly gate: 'normal' | 'large' | 'non-text';
  readonly ratio: number;
  readonly pass: boolean;
}

export const BLUE_SCALE: readonly BlueToken[] = [
  { shade: 50, token: '--nexa-primitive-blue-50', value: 'oklch(96.9% 0.014 264.5)', usage: 'Canvas tint and selected surface', foreground: 'Slate 900' },
  { shade: 100, token: '--nexa-primitive-blue-100', value: 'oklch(92.9% 0.034 263.6)', usage: 'Soft selection and focus halo', foreground: 'Slate 900' },
  { shade: 200, token: '--nexa-primitive-blue-200', value: 'oklch(86% 0.068 262.1)', usage: 'Quiet border and active cue', foreground: 'Slate 900' },
  { shade: 300, token: '--nexa-primitive-blue-300', value: 'oklch(77% 0.117 262.4)', usage: 'Interactive border emphasis', foreground: 'Slate 900' },
  { shade: 400, token: '--nexa-primitive-blue-400', value: 'oklch(68% 0.168 262.9)', usage: 'Hover and supporting action', foreground: 'Slate 900' },
  { shade: 500, token: '--nexa-primitive-blue-500', value: 'oklch(60% 0.199 262.8)', usage: 'Focus and active control edge', foreground: 'White' },
  { shade: 600, token: '--nexa-primitive-blue-600', value: 'oklch(54.6% 0.215 262.9)', usage: 'Primary action and current step', foreground: 'White' },
  { shade: 700, token: '--nexa-primitive-blue-700', value: 'oklch(48% 0.19 262.9)', usage: 'Action text and hover fill', foreground: 'White' },
  { shade: 800, token: '--nexa-primitive-blue-800', value: 'oklch(41% 0.15 262.7)', usage: 'High-emphasis text on light surfaces', foreground: 'White' },
  { shade: 900, token: '--nexa-primitive-blue-900', value: 'oklch(34.1% 0.11 262.6)', usage: 'Strong blue text and inverse support', foreground: 'White' },
  { shade: 950, token: '--nexa-primitive-blue-950', value: 'oklch(24.9% 0.075 263)', usage: 'Deep contrast sample', foreground: 'White' },
];

export const NEUTRAL_SCALE: readonly NeutralToken[] = [
  { name: 'Slate 50', token: '--nexa-primitive-slate-50', value: '#f8fafc', note: 'Grouped surface and table header' },
  { name: 'Slate 100', token: '--nexa-primitive-slate-100', value: '#f1f5f9', note: 'Inset plane and disabled surface' },
  { name: 'Slate 200', token: '--nexa-primitive-slate-200', value: '#e2e8f0', note: 'Default and structural border' },
  { name: 'Slate 300', token: '--nexa-primitive-slate-300', value: '#cbd5e1', note: 'Strong border and input boundary' },
  { name: 'Slate 400', token: '--nexa-primitive-slate-400', value: '#94a3b8', note: 'Muted metadata; never sole critical cue' },
  { name: 'Slate 500', token: '--nexa-primitive-slate-500', value: '#64748b', note: 'Secondary text and supporting copy' },
  { name: 'Slate 600', token: '--nexa-primitive-slate-600', value: '#475569', note: 'Dense navigation and tertiary text' },
  { name: 'Slate 700', token: '--nexa-primitive-slate-700', value: '#334155', note: 'Quiet action and strong secondary text' },
  { name: 'Slate 900', token: '--nexa-primitive-slate-900', value: '#0f172a', note: 'Primary text and headings' },
];

export const COLOR_FAMILIES: readonly ColorFamily[] = [
  { name: 'Success green', surface: '#f0fdf4', border: '#bbf7d0', foreground: '#15803d', icon: 'pi-check-circle', example: 'Completed order' },
  { name: 'Attention amber', surface: '#fffbeb', border: '#fcd34d', foreground: '#92400e', icon: 'pi-clock', example: 'Awaiting review' },
  { name: 'Danger red', surface: '#fef2f2', border: '#fecaca', foreground: '#991b1b', icon: 'pi-ban', example: 'Blocked request' },
  { name: 'Operational orange', surface: '#fff7ed', border: '#fed7aa', foreground: '#9a3412', icon: 'pi-flag', example: 'High priority' },
  { name: 'Refrigerated sky', surface: '#f0f9ff', border: '#bae6fd', foreground: '#075985', icon: 'pi-cloud', example: 'Refrigerated' },
  { name: 'Frozen indigo', surface: '#eef2ff', border: '#c7d2fe', foreground: '#3730a3', icon: 'pi-box', example: 'Frozen' },
];

export const TYPE_ROWS: readonly TypeToken[] = [
  { role: 'Display', family: 'Plus Jakarta Sans', size: '48px', weight: '760', leading: '52px', tracking: '-0.05em', usage: 'Orientation only' },
  { role: 'Large Title', family: 'Plus Jakarta Sans', size: '32px', weight: '760', leading: '38px', tracking: '-0.04em', usage: 'Page title' },
  { role: 'Title', family: 'Plus Jakarta Sans', size: '24px', weight: '700', leading: '30px', tracking: '-0.03em', usage: 'Section title' },
  { role: 'Heading', family: 'Plus Jakarta Sans', size: '18px', weight: '700', leading: '24px', tracking: '-0.02em', usage: 'Panel title' },
  { role: 'Subheading', family: 'Inter', size: '16px', weight: '600', leading: '24px', tracking: '0', usage: 'Supporting hierarchy' },
  { role: 'Body', family: 'Inter', size: '14px', weight: '400', leading: '21px', tracking: '0', usage: 'Operational copy' },
  { role: 'Callout', family: 'Inter', size: '15px', weight: '500', leading: '24px', tracking: '0', usage: 'Important guidance' },
  { role: 'Label', family: 'Inter', size: '12px', weight: '600', leading: '16px', tracking: '0.01em', usage: 'Control and table label' },
  { role: 'Caption', family: 'Inter', size: '11px', weight: '500', leading: '16px', tracking: '0', usage: 'Secondary metadata' },
  { role: 'Code', family: 'JetBrains Mono', size: '12px', weight: '500', leading: '18px', tracking: '0', usage: 'IDs and tokens' },
];

export const SURFACE_ROWS: readonly SurfaceToken[] = [
  { name: 'Canvas', value: 'var(--nexa-surface-page) · #f6faff', note: 'Documentation background and page plane' },
  { name: 'Primary Card', value: 'var(--nexa-surface-card) · #ffffff', note: 'Main reading or work surface' },
  { name: 'Grouped Inset', value: 'var(--nexa-surface-inset) · #f1f5f9', note: 'Related blocks with quiet separation' },
  { name: 'Active Row', value: 'var(--nexa-surface-nav-active) · Blue 50', note: 'Active route, row or choice' },
  { name: 'Raised', value: 'var(--nexa-surface-card) + shadow-sm', note: 'Object elevated above the plane' },
  { name: 'Menu / Popover', value: 'var(--nexa-surface-card) + shadow-menu', note: 'Transient floating context' },
  { name: 'Dialog / Scrim', value: 'var(--nexa-surface-card) + overlay', note: 'Focused decision layer' },
];

export const RADIUS_ROWS: readonly RadiusToken[] = [
  { name: 'Small control', token: '--nexa-radius-sm', value: '6px', note: 'Compact action and dense cue' },
  { name: 'Standard control', token: '--nexa-radius-control', value: '10px', note: 'Button, input, and toolbar group' },
  { name: 'Medium layout', token: '--nexa-radius-md', value: '8px', note: 'Internal containers and active tabs' },
  { name: 'Card surface', token: '--nexa-radius-card', value: '16px', note: 'Bounded object and specimen surface' },
  { name: 'Panel region', token: '--nexa-radius-panel', value: '18px', note: 'Larger working region and tool docks' },
  { name: 'Dialog / Modal', token: '--nexa-radius-dialog', value: '24px', note: 'High-elevation decision dialog' },
  { name: 'Pill / Badge', token: '--nexa-radius-pill', value: '999px', note: 'Compact status chip only' },
];

export const SPACING_ROWS = [
  { token: '--nexa-space-1', value: '4px', role: 'Icon gap & dense inline offset' },
  { token: '--nexa-space-2', value: '8px', role: 'Tight element gap' },
  { token: '--nexa-space-3', value: '12px', role: 'Control interior padding (compact)' },
  { token: '--nexa-space-4', value: '16px', role: 'Standard control padding & card inset' },
  { token: '--nexa-space-5', value: '20px', role: 'Panel padding & module separation' },
  { token: '--nexa-space-6', value: '24px', role: 'Section internal rhythm' },
  { token: '--nexa-space-8', value: '32px', role: 'Panel gap & composition spacing' },
  { token: '--nexa-space-10', value: '40px', role: 'Major layout gutter' },
  { token: '--nexa-space-12', value: '48px', role: 'Section gap' },
  { token: '--nexa-space-16', value: '64px', role: 'Hero composition interval' },
];

export const CONTRAST_CONTRACTS: readonly ContrastContract[] = [
  { id: 'text-primary-canvas', label: 'Primary text on canvas', foregroundToken: '--nexa-color-text-primary', foreground: '#0f172a', backgroundToken: '--nexa-surface-page', background: '#f6faff', gate: 'normal', ratio: 15.2, pass: true },
  { id: 'text-primary-card', label: 'Primary text on card', foregroundToken: '--nexa-color-text-primary', foreground: '#0f172a', backgroundToken: '--nexa-surface-card', background: '#ffffff', gate: 'normal', ratio: 15.9, pass: true },
  { id: 'text-secondary-card', label: 'Secondary text on card', foregroundToken: '--nexa-color-text-secondary', foreground: '#64748b', backgroundToken: '--nexa-surface-card', background: '#ffffff', gate: 'normal', ratio: 4.8, pass: true },
  { id: 'action-label-primary', label: 'Action label on primary blue', foregroundToken: '--nexa-color-text-inverse', foreground: '#ffffff', backgroundToken: '--nexa-color-primary-600', background: 'oklch(54.6% 0.215 262.9)', gate: 'normal', ratio: 5.6, pass: true },
  { id: 'link-on-card', label: 'Link on card', foregroundToken: '--nexa-color-primary-700', foreground: 'oklch(48% 0.19 262.9)', backgroundToken: '--nexa-surface-card', background: '#ffffff', gate: 'normal', ratio: 7.2, pass: true },
  { id: 'success-card', label: 'Success text on success surface', foregroundToken: '--nexa-color-success-700', foreground: '#15803d', backgroundToken: '--nexa-surface-success', background: '#f0fdf4', gate: 'normal', ratio: 5.4, pass: true },
  { id: 'warning-card', label: 'Warning text on warning surface', foregroundToken: '--nexa-color-warning-text', foreground: '#92400e', backgroundToken: '--nexa-surface-warning', background: '#fffbeb', gate: 'normal', ratio: 5.8, pass: true },
  { id: 'danger-card', label: 'Danger text on danger surface', foregroundToken: '--nexa-color-danger-text', foreground: '#991b1b', backgroundToken: '--nexa-surface-danger', background: '#fef2f2', gate: 'normal', ratio: 6.2, pass: true },
];
