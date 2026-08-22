import type { DocumentationPage } from '../models/documentation-page';
import { COMPONENT_GUIDANCE } from './component-guidance';
import { tokenValue } from './token-reference.generated';
export { APPROVED_CONTRAST_PAIRS } from './contrast-contracts';
export type { ContrastPair } from './contrast-contracts';

export interface DocRow { readonly name: string; readonly value: string; readonly note: string; }
export interface DocAnswer { readonly title: string; readonly copy: string; }
export interface BlueToken { readonly shade: number; readonly token: string; readonly value: string; readonly usage: string; readonly foreground: string; }
export interface TypeToken { readonly role: string; readonly family: string; readonly size: string; readonly weight: string; readonly leading: string; readonly tracking: string; readonly usage: string; }
export interface ColorFamily { readonly name: string; readonly surface: string; readonly border: string; readonly foreground: string; readonly icon: string; readonly example: string; }

export const BLUE_SCALE: readonly BlueToken[] = [
  { shade: 50, token: '--nexa-primitive-blue-50', value: tokenValue('--nexa-primitive-blue-50'), usage: 'Canvas tint and selected surface', foreground: 'Slate 900' },
  { shade: 100, token: '--nexa-primitive-blue-100', value: tokenValue('--nexa-primitive-blue-100'), usage: 'Soft selection and focus halo', foreground: 'Slate 900' },
  { shade: 200, token: '--nexa-primitive-blue-200', value: tokenValue('--nexa-primitive-blue-200'), usage: 'Quiet border and active cue', foreground: 'Slate 900' },
  { shade: 300, token: '--nexa-primitive-blue-300', value: tokenValue('--nexa-primitive-blue-300'), usage: 'Interactive border emphasis', foreground: 'Slate 900' },
  { shade: 400, token: '--nexa-primitive-blue-400', value: tokenValue('--nexa-primitive-blue-400'), usage: 'Hover and supporting action', foreground: 'Slate 900' },
  { shade: 500, token: '--nexa-primitive-blue-500', value: tokenValue('--nexa-primitive-blue-500'), usage: 'Focus and active control edge', foreground: 'White' },
  { shade: 600, token: '--nexa-primitive-blue-600', value: tokenValue('--nexa-primitive-blue-600'), usage: 'Primary action and current step', foreground: 'White' },
  { shade: 700, token: '--nexa-primitive-blue-700', value: tokenValue('--nexa-primitive-blue-700'), usage: 'Action text and hover fill', foreground: 'White' },
  { shade: 800, token: '--nexa-primitive-blue-800', value: tokenValue('--nexa-primitive-blue-800'), usage: 'High-emphasis text on light surfaces', foreground: 'White' },
  { shade: 900, token: '--nexa-primitive-blue-900', value: tokenValue('--nexa-primitive-blue-900'), usage: 'Strong blue text and inverse support', foreground: 'White' },
  { shade: 950, token: '--nexa-primitive-blue-950', value: tokenValue('--nexa-primitive-blue-950'), usage: 'Deep contrast sample', foreground: 'White' },
];

export const NEUTRAL_SCALE: readonly DocRow[] = [
  { name: 'Slate 50', value: tokenValue('--nexa-primitive-slate-50'), note: 'Grouped surface and table header' },
  { name: 'Slate 100', value: tokenValue('--nexa-primitive-slate-100'), note: 'Inset plane and disabled surface' },
  { name: 'Slate 200', value: tokenValue('--nexa-primitive-slate-200'), note: 'Default and structural border' },
  { name: 'Slate 300', value: tokenValue('--nexa-primitive-slate-300'), note: 'Strong border and input boundary' },
  { name: 'Slate 400', value: tokenValue('--nexa-primitive-slate-400'), note: 'Muted metadata; never sole critical cue' },
  { name: 'Slate 500', value: tokenValue('--nexa-primitive-slate-500'), note: 'Secondary text and supporting copy' },
  { name: 'Slate 600', value: tokenValue('--nexa-primitive-slate-600'), note: 'Dense navigation and tertiary text' },
  { name: 'Slate 700', value: tokenValue('--nexa-primitive-slate-700'), note: 'Quiet action and strong secondary text' },
  { name: 'Slate 900', value: tokenValue('--nexa-primitive-slate-900'), note: 'Primary text and headings' },
];

export const COLOR_FAMILIES: readonly ColorFamily[] = [
  { name: 'Success green', surface: tokenValue('--nexa-surface-success'), border: tokenValue('--nexa-color-success-border'), foreground: tokenValue('--nexa-color-success-700'), icon: 'pi-check-circle', example: 'Completed order' },
  { name: 'Attention amber', surface: tokenValue('--nexa-surface-warning'), border: tokenValue('--nexa-color-warning-border'), foreground: tokenValue('--nexa-color-warning-text'), icon: 'pi-clock', example: 'Awaiting review' },
  { name: 'Danger red', surface: tokenValue('--nexa-surface-danger'), border: tokenValue('--nexa-color-danger-subtle-border'), foreground: tokenValue('--nexa-color-danger-text'), icon: 'pi-ban', example: 'Blocked request' },
  { name: 'Operational orange', surface: tokenValue('--nexa-color-attention-surface'), border: tokenValue('--nexa-color-attention-border'), foreground: tokenValue('--nexa-color-attention-text'), icon: 'pi-flag', example: 'High priority' },
  { name: 'Refrigerated sky', surface: tokenValue('--nexa-color-cold-refrigerated-soft'), border: tokenValue('--nexa-color-cold-refrigerated-border'), foreground: tokenValue('--nexa-color-cold-refrigerated-text'), icon: 'pi-cloud', example: 'Refrigerated' },
  { name: 'Frozen indigo', surface: tokenValue('--nexa-color-cold-frozen-soft'), border: tokenValue('--nexa-color-cold-frozen-border'), foreground: tokenValue('--nexa-color-cold-frozen-text'), icon: 'pi-box', example: 'Frozen' },
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
  { name: 'Small control', value: `radius-sm · ${tokenValue('--nexa-radius-sm')}`, note: 'Compact action and dense cue' },
  { name: 'Control', value: `radius-control · ${tokenValue('--nexa-radius-control')}`, note: 'Button, input and toolbar group' },
  { name: 'Card', value: `radius-card · ${tokenValue('--nexa-radius-card')}`, note: 'Bounded object and specimen surface' },
  { name: 'Panel', value: `radius-panel · ${tokenValue('--nexa-radius-panel')}`, note: 'Larger working region' },
  { name: 'Pill', value: `radius-pill · ${tokenValue('--nexa-radius-pill')}`, note: 'Compact status only' },
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

export const MATURITY_ROWS: readonly DocRow[] = [
  { name: 'EXPERIMENTAL', value: 'Exploring', note: 'Useful evidence; API or direction may change.' },
  { name: 'CANDIDATE', value: 'Reviewable', note: 'Behavior and visual contract shown; human review open.' },
  { name: 'FROZEN', value: 'Human direction', note: 'Do not change casually; not production certified.' },
  { name: 'DEPRECATED', value: 'Retire', note: 'Do not use for new documentation or implementation.' },
];

export function componentAnswers(page: DocumentationPage): readonly DocAnswer[] {
  const guidance = COMPONENT_GUIDANCE[page.id];
  if (!guidance) throw new Error(`Missing component guidance for ${page.id}`);
  return [{ title: 'Purpose', copy: page.intro }, ...guidance];
}
