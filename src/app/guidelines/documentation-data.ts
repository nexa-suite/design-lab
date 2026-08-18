import type { DocumentationPage } from './documentation-registry';

export interface DocRow { readonly name: string; readonly value: string; readonly note: string; }
export interface DocAnswer { readonly title: string; readonly copy: string; }
export interface BlueToken { readonly shade: number; readonly token: string; readonly value: string; readonly usage: string; readonly foreground: string; }
export interface TypeToken { readonly role: string; readonly family: string; readonly size: string; readonly weight: string; readonly leading: string; readonly tracking: string; readonly usage: string; }
export interface ColorFamily { readonly name: string; readonly surface: string; readonly border: string; readonly foreground: string; readonly icon: string; readonly example: string; }
export interface ContrastPair { readonly id: string; readonly label: string; readonly foregroundToken: string; readonly foreground: string; readonly backgroundToken: string; readonly background: string; readonly gate: 'normal' | 'large' | 'non-text'; }

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

export const NEUTRAL_SCALE: readonly DocRow[] = [
  { name: 'Slate 50', value: '#f8fafc', note: 'Grouped surface and table header' },
  { name: 'Slate 100', value: '#f1f5f9', note: 'Inset plane and disabled surface' },
  { name: 'Slate 200', value: '#e2e8f0', note: 'Default and structural border' },
  { name: 'Slate 300', value: '#cbd5e1', note: 'Strong border and input boundary' },
  { name: 'Slate 400', value: '#94a3b8', note: 'Muted metadata; never sole critical cue' },
  { name: 'Slate 500', value: '#64748b', note: 'Secondary text and supporting copy' },
  { name: 'Slate 600', value: '#475569', note: 'Dense navigation and tertiary text' },
  { name: 'Slate 700', value: '#334155', note: 'Quiet action and strong secondary text' },
  { name: 'Slate 900', value: '#0f172a', note: 'Primary text and headings' },
];

export const COLOR_FAMILIES: readonly ColorFamily[] = [
  { name: 'Success green', surface: '#f0fdf4', border: '#bbf7d0', foreground: '#15803d', icon: 'pi-check-circle', example: 'Completed order' },
  { name: 'Attention amber', surface: '#fffbeb', border: '#fcd34d', foreground: '#92400e', icon: 'pi-clock', example: 'Awaiting review' },
  { name: 'Danger red', surface: '#fef2f2', border: '#fecaca', foreground: '#991b1b', icon: 'pi-ban', example: 'Blocked request' },
  { name: 'Operational orange', surface: '#fff7ed', border: '#fed7aa', foreground: '#9a3412', icon: 'pi-flag', example: 'High priority' },
  { name: 'Refrigerated sky', surface: '#f0f9ff', border: '#bae6fd', foreground: '#075985', icon: 'pi-snowflake', example: 'Refrigerated' },
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

export const SURFACE_ROWS: readonly DocRow[] = [
  { name: 'Canvas', value: 'surface-page', note: 'Documentation background and page plane' },
  { name: 'Primary', value: 'surface-card', note: 'Main reading or work surface' },
  { name: 'Grouped', value: 'surface-inset', note: 'Related blocks with quiet separation' },
  { name: 'Selected', value: 'surface-nav-active', note: 'Active route, row or choice' },
  { name: 'Raised', value: 'surface-card + shadow-sm', note: 'Object above the plane' },
  { name: 'Menu / Popover', value: 'surface-card + shadow-menu', note: 'Transient context' },
  { name: 'Dialog / Scrim', value: 'surface-card + surface-overlay', note: 'Focused decision' },
];

export const RADIUS_ROWS: readonly DocRow[] = [
  { name: 'Small control', value: 'radius-sm · 6px', note: 'Compact action and dense cue' },
  { name: 'Control', value: 'radius-control · 10px', note: 'Button, input and toolbar group' },
  { name: 'Card', value: 'radius-card · 16px', note: 'Bounded object and specimen surface' },
  { name: 'Panel', value: 'radius-panel · 18px', note: 'Larger working region' },
  { name: 'Pill', value: 'radius-pill · 999px', note: 'Compact status only' },
];

export const COMPONENT_STATES: readonly DocRow[] = [
  { name: 'Rest', value: 'Baseline', note: 'Default visual and semantic contract' },
  { name: 'Hover', value: 'Pointer over', note: 'Supplemental cue; never sole affordance' },
  { name: 'Focus-visible', value: 'Keyboard / voice', note: 'Shared visible ring owned by control geometry' },
  { name: 'Pressed', value: 'Activation', note: 'Immediate acknowledgement of input' },
  { name: 'Selected', value: 'Chosen', note: 'Text, shape and state attribute agree' },
  { name: 'Processing', value: 'Work in progress', note: 'Stable geometry and truthful announcement' },
  { name: 'Disabled', value: 'Unavailable', note: 'Action unavailable; reason stays understandable' },
  { name: 'Success / warning / error', value: 'Outcome', note: 'Intensity matches consequence and recovery' },
];

export const HEURISTIC_ROWS: readonly DocRow[] = [
  { name: 'H1', value: 'Visibility of system status', note: 'Processing and success sequence' },
  { name: 'H2', value: 'Match with real world', note: 'Sales, buyer and cold-chain vocabulary' },
  { name: 'H3', value: 'User control and freedom', note: 'Cancel, clear, close and Escape' },
  { name: 'H4', value: 'Consistency and standards', note: 'Shared control and state language' },
  { name: 'H5', value: 'Error prevention', note: 'Review and consequence preview' },
  { name: 'H6', value: 'Recognition over recall', note: 'Visible selected filter and context' },
  { name: 'H7', value: 'Flexibility and efficiency', note: 'Keyboard, search and repeatable actions' },
  { name: 'H8', value: 'Aesthetic and minimalist design', note: 'No decorative card or metric noise' },
  { name: 'H9', value: 'Recovery from errors', note: 'Specific error with retry path' },
  { name: 'H10', value: 'Help and documentation', note: 'Concise rationale beside live proof' },
];

export const OPERATION_PHASES = [
  { id: 'ready', label: 'Ready', detail: 'Action is available.', tone: 'neutral' as const },
  { id: 'pressed', label: 'Pressed', detail: 'Input acknowledged.', tone: 'info' as const },
  { id: 'processing', label: 'Processing', detail: 'Work is in progress.', tone: 'info' as const },
  { id: 'success', label: 'Success', detail: 'Operation completed.', tone: 'success' as const },
];

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

export const MATURITY_ROWS: readonly DocRow[] = [
  { name: 'EXPERIMENTAL', value: 'Exploring', note: 'Useful evidence; API or direction may change.' },
  { name: 'CANDIDATE', value: 'Reviewable', note: 'Behavior and visual contract shown; human review open.' },
  { name: 'FROZEN', value: 'Human direction', note: 'Do not change casually; not production certified.' },
  { name: 'DEPRECATED', value: 'Retire', note: 'Do not use for new documentation or implementation.' },
];

export function componentAnswers(page: DocumentationPage): readonly DocAnswer[] {
  return [
    { title: 'Overview', copy: `${page.title} is a candidate Nexa contract with visible purpose, state and recovery.` },
    { title: 'Anatomy', copy: 'Context, primary content, state, recovery and assistive name stay inspectable.' },
    { title: 'Variants', copy: 'Intent, density and state variants follow consequence, not decoration.' },
    { title: 'Accessibility', copy: 'Name, role, value, focus, contrast, non-color cue and target are evidence.' },
    { title: 'Tokens', copy: 'Primitive scale feeds semantic roles; component tokens appear only when intent needs them.' },
    { title: 'Usage', copy: page.decision },
  ];
}
