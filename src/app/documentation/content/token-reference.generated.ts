/* Generated from tokens/*.tokens.json; do not edit directly. */
export interface NexaTokenReference {
  readonly name: string;
  readonly layer: 'primitive' | 'semantic' | 'component' | 'data-visualization';
  readonly type: string;
  readonly sourceValue: string;
  readonly value: string;
  readonly description: string;
}

export const NEXA_TOKEN_VALUES: Readonly<Record<string, string>> = {
  "--nexa-primitive-blue-50": "oklch(96.9% 0.014 264.5)",
  "--nexa-primitive-blue-100": "oklch(92.9% 0.034 263.6)",
  "--nexa-primitive-blue-200": "oklch(86% 0.068 262.1)",
  "--nexa-primitive-blue-300": "oklch(77% 0.117 262.4)",
  "--nexa-primitive-blue-400": "oklch(68% 0.168 262.9)",
  "--nexa-primitive-blue-500": "oklch(60% 0.199 262.8)",
  "--nexa-primitive-blue-600": "oklch(54.6% 0.215 262.9)",
  "--nexa-primitive-blue-700": "oklch(48% 0.19 262.9)",
  "--nexa-primitive-blue-800": "oklch(41% 0.15 262.7)",
  "--nexa-primitive-blue-900": "oklch(34.1% 0.11 262.6)",
  "--nexa-primitive-blue-950": "oklch(24.9% 0.075 263)",
  "--nexa-primitive-slate-50": "#f8fafc",
  "--nexa-primitive-slate-100": "#f1f5f9",
  "--nexa-primitive-slate-200": "#e2e8f0",
  "--nexa-primitive-slate-300": "#cbd5e1",
  "--nexa-primitive-slate-400": "#94a3b8",
  "--nexa-primitive-slate-500": "#64748b",
  "--nexa-primitive-slate-600": "#475569",
  "--nexa-primitive-slate-700": "#334155",
  "--nexa-primitive-slate-900": "#0f172a",
  "--nexa-primitive-white": "#ffffff",
  "--nexa-primitive-canvas": "#f6faff",
  "--nexa-primitive-green-50": "#f0fdf4",
  "--nexa-primitive-green-200": "#bbf7d0",
  "--nexa-primitive-green-700": "#15803d",
  "--nexa-primitive-amber-50": "#fffbeb",
  "--nexa-primitive-amber-200": "#fcd34d",
  "--nexa-primitive-amber-600": "#d97706",
  "--nexa-primitive-amber-800": "#92400e",
  "--nexa-primitive-orange-500": "#f97316",
  "--nexa-primitive-orange-50": "#fff7ed",
  "--nexa-primitive-orange-200": "#fed7aa",
  "--nexa-primitive-orange-800": "#9a3412",
  "--nexa-primitive-red-50": "#fef2f2",
  "--nexa-primitive-red-200": "#fecaca",
  "--nexa-primitive-red-600": "#dc2626",
  "--nexa-primitive-red-800": "#991b1b",
  "--nexa-primitive-sky-50": "#f0f9ff",
  "--nexa-primitive-sky-200": "#bae6fd",
  "--nexa-primitive-sky-600": "#0284c7",
  "--nexa-primitive-sky-800": "#075985",
  "--nexa-primitive-indigo-50": "#eef2ff",
  "--nexa-primitive-indigo-200": "#c7d2fe",
  "--nexa-primitive-indigo-600": "#4f46e5",
  "--nexa-primitive-indigo-800": "#3730a3",
  "--nexa-primitive-space-1": "4px",
  "--nexa-primitive-space-2": "8px",
  "--nexa-primitive-space-3": "12px",
  "--nexa-primitive-space-4": "16px",
  "--nexa-primitive-space-5": "20px",
  "--nexa-primitive-space-6": "24px",
  "--nexa-primitive-space-7": "28px",
  "--nexa-primitive-space-8": "32px",
  "--nexa-primitive-space-10": "40px",
  "--nexa-primitive-space-12": "48px",
  "--nexa-primitive-space-16": "64px",
  "--nexa-primitive-radius-sm": "6px",
  "--nexa-primitive-radius-md": "8px",
  "--nexa-primitive-radius-lg": "12px",
  "--nexa-primitive-radius-xl": "16px",
  "--nexa-primitive-radius-control": "10px",
  "--nexa-primitive-radius-card": "16px",
  "--nexa-primitive-radius-panel": "18px",
  "--nexa-primitive-radius-overlay": "18px",
  "--nexa-primitive-radius-dialog": "24px",
  "--nexa-primitive-radius-pill": "999px",
  "--nexa-primitive-shadow-xs": "0 1px 2px rgb(15 23 42 / 5%)",
  "--nexa-primitive-shadow-sm": "0 1px 3px rgb(15 23 42 / 6%), 0 1px 2px rgb(15 23 42 / 4%)",
  "--nexa-primitive-font-display": "'Plus Jakarta Sans', sans-serif",
  "--nexa-primitive-font-body": "'Inter', sans-serif",
  "--nexa-primitive-font-mono": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  "--nexa-color-primary-50": "oklch(96.9% 0.014 264.5)",
  "--nexa-color-primary-100": "oklch(92.9% 0.034 263.6)",
  "--nexa-color-primary-200": "oklch(86% 0.068 262.1)",
  "--nexa-color-primary-300": "oklch(77% 0.117 262.4)",
  "--nexa-color-primary-400": "oklch(68% 0.168 262.9)",
  "--nexa-color-primary-500": "oklch(60% 0.199 262.8)",
  "--nexa-color-primary-600": "oklch(54.6% 0.215 262.9)",
  "--nexa-color-primary-700": "oklch(48% 0.19 262.9)",
  "--nexa-color-primary-800": "oklch(41% 0.15 262.7)",
  "--nexa-color-primary-900": "oklch(34.1% 0.11 262.6)",
  "--nexa-color-primary-950": "oklch(24.9% 0.075 263)",
  "--nexa-color-neutral-50": "#f8fafc",
  "--nexa-color-neutral-100": "#f1f5f9",
  "--nexa-color-neutral-200": "#e2e8f0",
  "--nexa-color-neutral-300": "#cbd5e1",
  "--nexa-color-neutral-400": "#94a3b8",
  "--nexa-color-neutral-500": "#64748b",
  "--nexa-color-neutral-600": "#475569",
  "--nexa-color-neutral-700": "#334155",
  "--nexa-color-neutral-950": "#0f172a",
  "--nexa-color-text-primary": "#0f172a",
  "--nexa-mode-text-secondary": "#64748b",
  "--nexa-mode-text-muted": "#94a3b8",
  "--nexa-mode-border-interactive": "#cbd5e1",
  "--nexa-mode-focus-ring": "oklch(54.6% 0.215 262.9)",
  "--nexa-color-text-secondary": "#64748b",
  "--nexa-color-text-muted": "#94a3b8",
  "--nexa-color-text-inverse": "#ffffff",
  "--nexa-color-border-default": "#e2e8f0",
  "--nexa-color-border-strong": "#cbd5e1",
  "--nexa-color-border-decorative": "#e2e8f0",
  "--nexa-color-border-structural": "#e2e8f0",
  "--nexa-color-border-interactive": "#cbd5e1",
  "--nexa-color-focus-ring": "oklch(54.6% 0.215 262.9)",
  "--nexa-color-info-50": "oklch(96.9% 0.014 264.5)",
  "--nexa-color-info-700": "oklch(48% 0.19 262.9)",
  "--nexa-color-success-50": "#f0fdf4",
  "--nexa-color-success-200": "#bbf7d0",
  "--nexa-color-success-border": "#bbf7d0",
  "--nexa-color-success-700": "#15803d",
  "--nexa-color-role-sales-surface": "#f0fdf4",
  "--nexa-color-role-sales-border": "#bbf7d0",
  "--nexa-color-role-sales-text": "#15803d",
  "--nexa-color-warning-50": "#fffbeb",
  "--nexa-color-warning-600": "#d97706",
  "--nexa-color-warning-text": "#92400e",
  "--nexa-color-warning-border": "#fcd34d",
  "--nexa-color-warning-subtle-background": "#fffbeb",
  "--nexa-color-warning-subtle-border": "#d97706",
  "--nexa-color-warning-subtle-text": "#92400e",
  "--nexa-color-warning-emphasized-background": "#92400e",
  "--nexa-color-warning-emphasized-border": "#92400e",
  "--nexa-color-warning-emphasized-text": "#ffffff",
  "--nexa-color-danger-50": "#fef2f2",
  "--nexa-color-danger-200": "#fecaca",
  "--nexa-color-danger-600": "#dc2626",
  "--nexa-color-danger-text": "#991b1b",
  "--nexa-color-danger-subtle-background": "#fef2f2",
  "--nexa-color-danger-subtle-border": "#fecaca",
  "--nexa-color-danger-subtle-text": "#991b1b",
  "--nexa-color-danger-standard-background": "#fef2f2",
  "--nexa-color-danger-standard-border": "#dc2626",
  "--nexa-color-danger-standard-text": "#991b1b",
  "--nexa-color-danger-strong-background": "#991b1b",
  "--nexa-color-danger-strong-border": "#991b1b",
  "--nexa-color-danger-strong-text": "#ffffff",
  "--nexa-color-attention-500": "#f97316",
  "--nexa-color-attention-surface": "#fff7ed",
  "--nexa-color-attention-border": "#fed7aa",
  "--nexa-color-attention-text": "#9a3412",
  "--nexa-color-sky-600": "#0284c7",
  "--nexa-color-indigo-600": "#4f46e5",
  "--nexa-color-orange-500": "#f97316",
  "--nexa-color-cold-refrigerated": "#0284c7",
  "--nexa-color-cold-refrigerated-text": "#075985",
  "--nexa-color-cold-refrigerated-soft": "#f0f9ff",
  "--nexa-color-cold-refrigerated-border": "#bae6fd",
  "--nexa-color-cold-frozen": "#4f46e5",
  "--nexa-color-cold-frozen-soft": "#eef2ff",
  "--nexa-color-cold-frozen-border": "#c7d2fe",
  "--nexa-color-cold-frozen-text": "#3730a3",
  "--nexa-surface-page": "#f6faff",
  "--nexa-surface-card": "#ffffff",
  "--nexa-surface-inset": "#f1f5f9",
  "--nexa-surface-overlay": "rgb(15 23 42 / 48%)",
  "--nexa-surface-nav-active": "oklch(96.9% 0.014 264.5)",
  "--nexa-surface-info": "oklch(96.9% 0.014 264.5)",
  "--nexa-surface-success": "#f0fdf4",
  "--nexa-surface-warning": "#fffbeb",
  "--nexa-surface-danger": "#fef2f2",
  "--nexa-surface-table-header": "#f8fafc",
  "--nexa-space-1": "4px",
  "--nexa-space-2": "8px",
  "--nexa-space-3": "12px",
  "--nexa-space-4": "16px",
  "--nexa-space-5": "20px",
  "--nexa-space-6": "24px",
  "--nexa-space-7": "28px",
  "--nexa-space-8": "32px",
  "--nexa-space-10": "40px",
  "--nexa-space-12": "48px",
  "--nexa-space-16": "64px",
  "--nexa-radius-sm": "6px",
  "--nexa-radius-md": "8px",
  "--nexa-radius-lg": "12px",
  "--nexa-radius-xl": "16px",
  "--nexa-radius-full": "999px",
  "--nexa-radius-control": "10px",
  "--nexa-radius-card": "16px",
  "--nexa-radius-panel": "18px",
  "--nexa-radius-overlay": "18px",
  "--nexa-radius-dialog": "24px",
  "--nexa-radius-pill": "999px",
  "--nexa-radius-nav-active": "8px",
  "--nexa-shadow-xs": "0 1px 2px rgb(15 23 42 / 5%)",
  "--nexa-shadow-sm": "0 1px 3px rgb(15 23 42 / 6%), 0 1px 2px rgb(15 23 42 / 4%)",
  "--nexa-shadow-overlay": "0 22px 60px rgb(15 23 42 / 18%)",
  "--nexa-shadow-menu": "0 14px 32px rgb(15 23 42 / 14%)",
  "--nexa-font-family-display": "'Plus Jakarta Sans', sans-serif",
  "--nexa-font-family-body": "'Inter', sans-serif",
  "--nexa-font-family-mono": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  "--nexa-font-size-xs": "12px",
  "--nexa-font-size-sm": "13px",
  "--nexa-font-size-base": "14px",
  "--nexa-font-size-md": "16px",
  "--nexa-font-size-lg": "18px",
  "--nexa-font-size-xl": "20px",
  "--nexa-font-size-2xl": "24px",
  "--nexa-font-size-3xl": "30px",
  "--nexa-font-size-5xl": "clamp(36px, 5vw, 64px)",
  "--nexa-font-weight-medium": "500",
  "--nexa-font-weight-semibold": "600",
  "--nexa-font-weight-bold": "700",
  "--nexa-font-weight-extrabold": "800",
  "--nexa-line-height-tight": "1.18",
  "--nexa-line-height-normal": "1.5",
  "--nexa-line-height-relaxed": "1.65",
  "--nexa-layout-sidebar-width": "284px",
  "--nexa-layout-toolbar-height": "56px",
  "--nexa-layout-content-max": "1280px",
  "--nexa-layout-page-gutter": "clamp(18px, 2.2vw, 34px)",
  "--nexa-layout-section-gap": "48px",
  "--nexa-layout-card-padding": "20px",
  "--nexa-layout-nav-item-height": "38px",
  "--nexa-control-height-sm": "34px",
  "--nexa-control-height-md": "40px",
  "--nexa-control-height-lg": "48px",
  "--nexa-control-padding-inline": "16px",
  "--nexa-control-padding-inline-compact": "12px",
  "--nexa-control-gap": "4px",
  "--nexa-panel-padding": "20px",
  "--nexa-card-padding": "16px",
  "--nexa-surface-gap": "16px",
  "--nexa-radius-interactive": "10px",
  "--nexa-focus-width": "3px",
  "--nexa-focus-offset": "3px",
  "--nexa-focus-ring": "0 0 0 3px color-mix(in oklab, oklch(54.6% 0.215 262.9) 24%, transparent)",
  "--nexa-focus-preview-ring": "inset 0 0 0 3px color-mix(in oklab, oklch(54.6% 0.215 262.9) 24%, transparent)",
  "--nexa-auth-grid-line": "color-mix(in oklab, #ffffff 13%, transparent)",
  "--nexa-auth-brand-copy": "color-mix(in oklab, #ffffff 86%, transparent)",
  "--nexa-auth-brand-muted": "color-mix(in oklab, #ffffff 72%, transparent)",
  "--nexa-auth-mark-border": "color-mix(in oklab, #ffffff 45%, transparent)",
  "--nexa-shadow-toast": "0 12px 28px rgb(15 23 42 / 12%)",
  "--nexa-component-sidebar-width": "284px",
  "--nexa-component-drawer-width": "min(320px, 88vw)",
  "--nexa-component-table-row-height": "56px",
  "--nexa-doc-text-scale": "1",
  "--nexa-viz-series-1": "oklch(54.6% 0.215 262.9)",
  "--nexa-viz-series-2": "#0284c7",
  "--nexa-viz-series-3": "#4f46e5",
  "--nexa-viz-series-4": "#f97316",
  "--nexa-viz-series-5": "#15803d",
  "--nexa-viz-series-6": "#d97706",
  "--nexa-viz-sequential-low": "oklch(92.9% 0.034 263.6)",
  "--nexa-viz-sequential-high": "oklch(48% 0.19 262.9)",
  "--nexa-viz-grid": "#e2e8f0",
  "--nexa-viz-axis-text": "#64748b",
  "--nexa-viz-area-fill": "color-mix(in oklab, oklch(54.6% 0.215 262.9) 16%, transparent)"
};

export const NEXA_TOKEN_CATALOG: readonly NexaTokenReference[] = [
  {
    "name": "--nexa-primitive-blue-50",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "oklch(96.9% 0.014 264.5)",
    "value": "oklch(96.9% 0.014 264.5)",
    "description": "Nexa primitive token nexa-primitive-blue-50."
  },
  {
    "name": "--nexa-primitive-blue-100",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "oklch(92.9% 0.034 263.6)",
    "value": "oklch(92.9% 0.034 263.6)",
    "description": "Nexa primitive token nexa-primitive-blue-100."
  },
  {
    "name": "--nexa-primitive-blue-200",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "oklch(86% 0.068 262.1)",
    "value": "oklch(86% 0.068 262.1)",
    "description": "Nexa primitive token nexa-primitive-blue-200."
  },
  {
    "name": "--nexa-primitive-blue-300",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "oklch(77% 0.117 262.4)",
    "value": "oklch(77% 0.117 262.4)",
    "description": "Nexa primitive token nexa-primitive-blue-300."
  },
  {
    "name": "--nexa-primitive-blue-400",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "oklch(68% 0.168 262.9)",
    "value": "oklch(68% 0.168 262.9)",
    "description": "Nexa primitive token nexa-primitive-blue-400."
  },
  {
    "name": "--nexa-primitive-blue-500",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "oklch(60% 0.199 262.8)",
    "value": "oklch(60% 0.199 262.8)",
    "description": "Nexa primitive token nexa-primitive-blue-500."
  },
  {
    "name": "--nexa-primitive-blue-600",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "oklch(54.6% 0.215 262.9)",
    "value": "oklch(54.6% 0.215 262.9)",
    "description": "Nexa primitive token nexa-primitive-blue-600."
  },
  {
    "name": "--nexa-primitive-blue-700",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "oklch(48% 0.19 262.9)",
    "value": "oklch(48% 0.19 262.9)",
    "description": "Nexa primitive token nexa-primitive-blue-700."
  },
  {
    "name": "--nexa-primitive-blue-800",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "oklch(41% 0.15 262.7)",
    "value": "oklch(41% 0.15 262.7)",
    "description": "Nexa primitive token nexa-primitive-blue-800."
  },
  {
    "name": "--nexa-primitive-blue-900",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "oklch(34.1% 0.11 262.6)",
    "value": "oklch(34.1% 0.11 262.6)",
    "description": "Nexa primitive token nexa-primitive-blue-900."
  },
  {
    "name": "--nexa-primitive-blue-950",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "oklch(24.9% 0.075 263)",
    "value": "oklch(24.9% 0.075 263)",
    "description": "Nexa primitive token nexa-primitive-blue-950."
  },
  {
    "name": "--nexa-primitive-slate-50",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "#f8fafc",
    "value": "#f8fafc",
    "description": "Nexa primitive token nexa-primitive-slate-50."
  },
  {
    "name": "--nexa-primitive-slate-100",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "#f1f5f9",
    "value": "#f1f5f9",
    "description": "Nexa primitive token nexa-primitive-slate-100."
  },
  {
    "name": "--nexa-primitive-slate-200",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "#e2e8f0",
    "value": "#e2e8f0",
    "description": "Nexa primitive token nexa-primitive-slate-200."
  },
  {
    "name": "--nexa-primitive-slate-300",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "#cbd5e1",
    "value": "#cbd5e1",
    "description": "Nexa primitive token nexa-primitive-slate-300."
  },
  {
    "name": "--nexa-primitive-slate-400",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "#94a3b8",
    "value": "#94a3b8",
    "description": "Nexa primitive token nexa-primitive-slate-400."
  },
  {
    "name": "--nexa-primitive-slate-500",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "#64748b",
    "value": "#64748b",
    "description": "Nexa primitive token nexa-primitive-slate-500."
  },
  {
    "name": "--nexa-primitive-slate-600",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "#475569",
    "value": "#475569",
    "description": "Nexa primitive token nexa-primitive-slate-600."
  },
  {
    "name": "--nexa-primitive-slate-700",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "#334155",
    "value": "#334155",
    "description": "Nexa primitive token nexa-primitive-slate-700."
  },
  {
    "name": "--nexa-primitive-slate-900",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "#0f172a",
    "value": "#0f172a",
    "description": "Nexa primitive token nexa-primitive-slate-900."
  },
  {
    "name": "--nexa-primitive-white",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "#ffffff",
    "value": "#ffffff",
    "description": "Nexa primitive token nexa-primitive-white."
  },
  {
    "name": "--nexa-primitive-canvas",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "#f6faff",
    "value": "#f6faff",
    "description": "Nexa primitive token nexa-primitive-canvas."
  },
  {
    "name": "--nexa-primitive-green-50",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "#f0fdf4",
    "value": "#f0fdf4",
    "description": "Nexa primitive token nexa-primitive-green-50."
  },
  {
    "name": "--nexa-primitive-green-200",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "#bbf7d0",
    "value": "#bbf7d0",
    "description": "Nexa primitive token nexa-primitive-green-200."
  },
  {
    "name": "--nexa-primitive-green-700",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "#15803d",
    "value": "#15803d",
    "description": "Nexa primitive token nexa-primitive-green-700."
  },
  {
    "name": "--nexa-primitive-amber-50",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "#fffbeb",
    "value": "#fffbeb",
    "description": "Nexa primitive token nexa-primitive-amber-50."
  },
  {
    "name": "--nexa-primitive-amber-200",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "#fcd34d",
    "value": "#fcd34d",
    "description": "Nexa primitive token nexa-primitive-amber-200."
  },
  {
    "name": "--nexa-primitive-amber-600",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "#d97706",
    "value": "#d97706",
    "description": "Nexa primitive token nexa-primitive-amber-600."
  },
  {
    "name": "--nexa-primitive-amber-800",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "#92400e",
    "value": "#92400e",
    "description": "Nexa primitive token nexa-primitive-amber-800."
  },
  {
    "name": "--nexa-primitive-orange-500",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "#f97316",
    "value": "#f97316",
    "description": "Nexa primitive token nexa-primitive-orange-500."
  },
  {
    "name": "--nexa-primitive-orange-50",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "#fff7ed",
    "value": "#fff7ed",
    "description": "Nexa primitive token nexa-primitive-orange-50."
  },
  {
    "name": "--nexa-primitive-orange-200",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "#fed7aa",
    "value": "#fed7aa",
    "description": "Nexa primitive token nexa-primitive-orange-200."
  },
  {
    "name": "--nexa-primitive-orange-800",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "#9a3412",
    "value": "#9a3412",
    "description": "Nexa primitive token nexa-primitive-orange-800."
  },
  {
    "name": "--nexa-primitive-red-50",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "#fef2f2",
    "value": "#fef2f2",
    "description": "Nexa primitive token nexa-primitive-red-50."
  },
  {
    "name": "--nexa-primitive-red-200",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "#fecaca",
    "value": "#fecaca",
    "description": "Nexa primitive token nexa-primitive-red-200."
  },
  {
    "name": "--nexa-primitive-red-600",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "#dc2626",
    "value": "#dc2626",
    "description": "Nexa primitive token nexa-primitive-red-600."
  },
  {
    "name": "--nexa-primitive-red-800",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "#991b1b",
    "value": "#991b1b",
    "description": "Nexa primitive token nexa-primitive-red-800."
  },
  {
    "name": "--nexa-primitive-sky-50",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "#f0f9ff",
    "value": "#f0f9ff",
    "description": "Nexa primitive token nexa-primitive-sky-50."
  },
  {
    "name": "--nexa-primitive-sky-200",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "#bae6fd",
    "value": "#bae6fd",
    "description": "Nexa primitive token nexa-primitive-sky-200."
  },
  {
    "name": "--nexa-primitive-sky-600",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "#0284c7",
    "value": "#0284c7",
    "description": "Nexa primitive token nexa-primitive-sky-600."
  },
  {
    "name": "--nexa-primitive-sky-800",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "#075985",
    "value": "#075985",
    "description": "Nexa primitive token nexa-primitive-sky-800."
  },
  {
    "name": "--nexa-primitive-indigo-50",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "#eef2ff",
    "value": "#eef2ff",
    "description": "Nexa primitive token nexa-primitive-indigo-50."
  },
  {
    "name": "--nexa-primitive-indigo-200",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "#c7d2fe",
    "value": "#c7d2fe",
    "description": "Nexa primitive token nexa-primitive-indigo-200."
  },
  {
    "name": "--nexa-primitive-indigo-600",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "#4f46e5",
    "value": "#4f46e5",
    "description": "Nexa primitive token nexa-primitive-indigo-600."
  },
  {
    "name": "--nexa-primitive-indigo-800",
    "layer": "primitive",
    "type": "color",
    "sourceValue": "#3730a3",
    "value": "#3730a3",
    "description": "Nexa primitive token nexa-primitive-indigo-800."
  },
  {
    "name": "--nexa-primitive-space-1",
    "layer": "primitive",
    "type": "dimension",
    "sourceValue": "4px",
    "value": "4px",
    "description": "Nexa primitive token nexa-primitive-space-1."
  },
  {
    "name": "--nexa-primitive-space-2",
    "layer": "primitive",
    "type": "dimension",
    "sourceValue": "8px",
    "value": "8px",
    "description": "Nexa primitive token nexa-primitive-space-2."
  },
  {
    "name": "--nexa-primitive-space-3",
    "layer": "primitive",
    "type": "dimension",
    "sourceValue": "12px",
    "value": "12px",
    "description": "Nexa primitive token nexa-primitive-space-3."
  },
  {
    "name": "--nexa-primitive-space-4",
    "layer": "primitive",
    "type": "dimension",
    "sourceValue": "16px",
    "value": "16px",
    "description": "Nexa primitive token nexa-primitive-space-4."
  },
  {
    "name": "--nexa-primitive-space-5",
    "layer": "primitive",
    "type": "dimension",
    "sourceValue": "20px",
    "value": "20px",
    "description": "Nexa primitive token nexa-primitive-space-5."
  },
  {
    "name": "--nexa-primitive-space-6",
    "layer": "primitive",
    "type": "dimension",
    "sourceValue": "24px",
    "value": "24px",
    "description": "Nexa primitive token nexa-primitive-space-6."
  },
  {
    "name": "--nexa-primitive-space-7",
    "layer": "primitive",
    "type": "dimension",
    "sourceValue": "28px",
    "value": "28px",
    "description": "Nexa primitive token nexa-primitive-space-7."
  },
  {
    "name": "--nexa-primitive-space-8",
    "layer": "primitive",
    "type": "dimension",
    "sourceValue": "32px",
    "value": "32px",
    "description": "Nexa primitive token nexa-primitive-space-8."
  },
  {
    "name": "--nexa-primitive-space-10",
    "layer": "primitive",
    "type": "dimension",
    "sourceValue": "40px",
    "value": "40px",
    "description": "Nexa primitive token nexa-primitive-space-10."
  },
  {
    "name": "--nexa-primitive-space-12",
    "layer": "primitive",
    "type": "dimension",
    "sourceValue": "48px",
    "value": "48px",
    "description": "Nexa primitive token nexa-primitive-space-12."
  },
  {
    "name": "--nexa-primitive-space-16",
    "layer": "primitive",
    "type": "dimension",
    "sourceValue": "64px",
    "value": "64px",
    "description": "Nexa primitive token nexa-primitive-space-16."
  },
  {
    "name": "--nexa-primitive-radius-sm",
    "layer": "primitive",
    "type": "dimension",
    "sourceValue": "6px",
    "value": "6px",
    "description": "Nexa primitive token nexa-primitive-radius-sm."
  },
  {
    "name": "--nexa-primitive-radius-md",
    "layer": "primitive",
    "type": "dimension",
    "sourceValue": "8px",
    "value": "8px",
    "description": "Nexa primitive token nexa-primitive-radius-md."
  },
  {
    "name": "--nexa-primitive-radius-lg",
    "layer": "primitive",
    "type": "dimension",
    "sourceValue": "12px",
    "value": "12px",
    "description": "Nexa primitive token nexa-primitive-radius-lg."
  },
  {
    "name": "--nexa-primitive-radius-xl",
    "layer": "primitive",
    "type": "dimension",
    "sourceValue": "16px",
    "value": "16px",
    "description": "Nexa primitive token nexa-primitive-radius-xl."
  },
  {
    "name": "--nexa-primitive-radius-control",
    "layer": "primitive",
    "type": "dimension",
    "sourceValue": "10px",
    "value": "10px",
    "description": "Nexa primitive token nexa-primitive-radius-control."
  },
  {
    "name": "--nexa-primitive-radius-card",
    "layer": "primitive",
    "type": "dimension",
    "sourceValue": "16px",
    "value": "16px",
    "description": "Nexa primitive token nexa-primitive-radius-card."
  },
  {
    "name": "--nexa-primitive-radius-panel",
    "layer": "primitive",
    "type": "dimension",
    "sourceValue": "18px",
    "value": "18px",
    "description": "Nexa primitive token nexa-primitive-radius-panel."
  },
  {
    "name": "--nexa-primitive-radius-overlay",
    "layer": "primitive",
    "type": "dimension",
    "sourceValue": "18px",
    "value": "18px",
    "description": "Nexa primitive token nexa-primitive-radius-overlay."
  },
  {
    "name": "--nexa-primitive-radius-dialog",
    "layer": "primitive",
    "type": "dimension",
    "sourceValue": "24px",
    "value": "24px",
    "description": "Nexa primitive token nexa-primitive-radius-dialog."
  },
  {
    "name": "--nexa-primitive-radius-pill",
    "layer": "primitive",
    "type": "dimension",
    "sourceValue": "999px",
    "value": "999px",
    "description": "Nexa primitive token nexa-primitive-radius-pill."
  },
  {
    "name": "--nexa-primitive-shadow-xs",
    "layer": "primitive",
    "type": "shadow",
    "sourceValue": "0 1px 2px rgb(15 23 42 / 5%)",
    "value": "0 1px 2px rgb(15 23 42 / 5%)",
    "description": "Nexa primitive token nexa-primitive-shadow-xs."
  },
  {
    "name": "--nexa-primitive-shadow-sm",
    "layer": "primitive",
    "type": "shadow",
    "sourceValue": "0 1px 3px rgb(15 23 42 / 6%), 0 1px 2px rgb(15 23 42 / 4%)",
    "value": "0 1px 3px rgb(15 23 42 / 6%), 0 1px 2px rgb(15 23 42 / 4%)",
    "description": "Nexa primitive token nexa-primitive-shadow-sm."
  },
  {
    "name": "--nexa-primitive-font-display",
    "layer": "primitive",
    "type": "other",
    "sourceValue": "'Plus Jakarta Sans', sans-serif",
    "value": "'Plus Jakarta Sans', sans-serif",
    "description": "Nexa primitive token nexa-primitive-font-display."
  },
  {
    "name": "--nexa-primitive-font-body",
    "layer": "primitive",
    "type": "other",
    "sourceValue": "'Inter', sans-serif",
    "value": "'Inter', sans-serif",
    "description": "Nexa primitive token nexa-primitive-font-body."
  },
  {
    "name": "--nexa-primitive-font-mono",
    "layer": "primitive",
    "type": "other",
    "sourceValue": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    "value": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    "description": "Nexa primitive token nexa-primitive-font-mono."
  },
  {
    "name": "--nexa-color-primary-50",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-blue-50)",
    "value": "oklch(96.9% 0.014 264.5)",
    "description": "Nexa semantic token nexa-color-primary-50."
  },
  {
    "name": "--nexa-color-primary-100",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-blue-100)",
    "value": "oklch(92.9% 0.034 263.6)",
    "description": "Nexa semantic token nexa-color-primary-100."
  },
  {
    "name": "--nexa-color-primary-200",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-blue-200)",
    "value": "oklch(86% 0.068 262.1)",
    "description": "Nexa semantic token nexa-color-primary-200."
  },
  {
    "name": "--nexa-color-primary-300",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-blue-300)",
    "value": "oklch(77% 0.117 262.4)",
    "description": "Nexa semantic token nexa-color-primary-300."
  },
  {
    "name": "--nexa-color-primary-400",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-blue-400)",
    "value": "oklch(68% 0.168 262.9)",
    "description": "Nexa semantic token nexa-color-primary-400."
  },
  {
    "name": "--nexa-color-primary-500",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-blue-500)",
    "value": "oklch(60% 0.199 262.8)",
    "description": "Nexa semantic token nexa-color-primary-500."
  },
  {
    "name": "--nexa-color-primary-600",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-blue-600)",
    "value": "oklch(54.6% 0.215 262.9)",
    "description": "Nexa semantic token nexa-color-primary-600."
  },
  {
    "name": "--nexa-color-primary-700",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-blue-700)",
    "value": "oklch(48% 0.19 262.9)",
    "description": "Nexa semantic token nexa-color-primary-700."
  },
  {
    "name": "--nexa-color-primary-800",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-blue-800)",
    "value": "oklch(41% 0.15 262.7)",
    "description": "Nexa semantic token nexa-color-primary-800."
  },
  {
    "name": "--nexa-color-primary-900",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-blue-900)",
    "value": "oklch(34.1% 0.11 262.6)",
    "description": "Nexa semantic token nexa-color-primary-900."
  },
  {
    "name": "--nexa-color-primary-950",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-blue-950)",
    "value": "oklch(24.9% 0.075 263)",
    "description": "Nexa semantic token nexa-color-primary-950."
  },
  {
    "name": "--nexa-color-neutral-50",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-slate-50)",
    "value": "#f8fafc",
    "description": "Nexa semantic token nexa-color-neutral-50."
  },
  {
    "name": "--nexa-color-neutral-100",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-slate-100)",
    "value": "#f1f5f9",
    "description": "Nexa semantic token nexa-color-neutral-100."
  },
  {
    "name": "--nexa-color-neutral-200",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-slate-200)",
    "value": "#e2e8f0",
    "description": "Nexa semantic token nexa-color-neutral-200."
  },
  {
    "name": "--nexa-color-neutral-300",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-slate-300)",
    "value": "#cbd5e1",
    "description": "Nexa semantic token nexa-color-neutral-300."
  },
  {
    "name": "--nexa-color-neutral-400",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-slate-400)",
    "value": "#94a3b8",
    "description": "Nexa semantic token nexa-color-neutral-400."
  },
  {
    "name": "--nexa-color-neutral-500",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-slate-500)",
    "value": "#64748b",
    "description": "Nexa semantic token nexa-color-neutral-500."
  },
  {
    "name": "--nexa-color-neutral-600",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-slate-600)",
    "value": "#475569",
    "description": "Nexa semantic token nexa-color-neutral-600."
  },
  {
    "name": "--nexa-color-neutral-700",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-slate-700)",
    "value": "#334155",
    "description": "Nexa semantic token nexa-color-neutral-700."
  },
  {
    "name": "--nexa-color-neutral-950",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-slate-900)",
    "value": "#0f172a",
    "description": "Nexa semantic token nexa-color-neutral-950."
  },
  {
    "name": "--nexa-color-text-primary",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-slate-900)",
    "value": "#0f172a",
    "description": "Nexa semantic token nexa-color-text-primary."
  },
  {
    "name": "--nexa-mode-text-secondary",
    "layer": "semantic",
    "type": "other",
    "sourceValue": "var(--nexa-primitive-slate-500)",
    "value": "#64748b",
    "description": "Nexa semantic token nexa-mode-text-secondary."
  },
  {
    "name": "--nexa-mode-text-muted",
    "layer": "semantic",
    "type": "other",
    "sourceValue": "var(--nexa-primitive-slate-400)",
    "value": "#94a3b8",
    "description": "Nexa semantic token nexa-mode-text-muted."
  },
  {
    "name": "--nexa-mode-border-interactive",
    "layer": "semantic",
    "type": "other",
    "sourceValue": "var(--nexa-primitive-slate-300)",
    "value": "#cbd5e1",
    "description": "Nexa semantic token nexa-mode-border-interactive."
  },
  {
    "name": "--nexa-mode-focus-ring",
    "layer": "semantic",
    "type": "shadow",
    "sourceValue": "var(--nexa-primitive-blue-600)",
    "value": "oklch(54.6% 0.215 262.9)",
    "description": "Nexa semantic token nexa-mode-focus-ring."
  },
  {
    "name": "--nexa-color-text-secondary",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-mode-text-secondary)",
    "value": "#64748b",
    "description": "Nexa semantic token nexa-color-text-secondary."
  },
  {
    "name": "--nexa-color-text-muted",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-mode-text-muted)",
    "value": "#94a3b8",
    "description": "Nexa semantic token nexa-color-text-muted."
  },
  {
    "name": "--nexa-color-text-inverse",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-white)",
    "value": "#ffffff",
    "description": "Nexa semantic token nexa-color-text-inverse."
  },
  {
    "name": "--nexa-color-border-default",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-slate-200)",
    "value": "#e2e8f0",
    "description": "Nexa semantic token nexa-color-border-default."
  },
  {
    "name": "--nexa-color-border-strong",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-slate-300)",
    "value": "#cbd5e1",
    "description": "Nexa semantic token nexa-color-border-strong."
  },
  {
    "name": "--nexa-color-border-decorative",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-slate-200)",
    "value": "#e2e8f0",
    "description": "Nexa semantic token nexa-color-border-decorative."
  },
  {
    "name": "--nexa-color-border-structural",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-slate-200)",
    "value": "#e2e8f0",
    "description": "Nexa semantic token nexa-color-border-structural."
  },
  {
    "name": "--nexa-color-border-interactive",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-mode-border-interactive)",
    "value": "#cbd5e1",
    "description": "Nexa semantic token nexa-color-border-interactive."
  },
  {
    "name": "--nexa-color-focus-ring",
    "layer": "semantic",
    "type": "shadow",
    "sourceValue": "var(--nexa-mode-focus-ring)",
    "value": "oklch(54.6% 0.215 262.9)",
    "description": "Nexa semantic token nexa-color-focus-ring."
  },
  {
    "name": "--nexa-color-info-50",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-blue-50)",
    "value": "oklch(96.9% 0.014 264.5)",
    "description": "Nexa semantic token nexa-color-info-50."
  },
  {
    "name": "--nexa-color-info-700",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-blue-700)",
    "value": "oklch(48% 0.19 262.9)",
    "description": "Nexa semantic token nexa-color-info-700."
  },
  {
    "name": "--nexa-color-success-50",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-green-50)",
    "value": "#f0fdf4",
    "description": "Nexa semantic token nexa-color-success-50."
  },
  {
    "name": "--nexa-color-success-200",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-green-200)",
    "value": "#bbf7d0",
    "description": "Nexa semantic token nexa-color-success-200."
  },
  {
    "name": "--nexa-color-success-border",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-green-200)",
    "value": "#bbf7d0",
    "description": "Nexa semantic token nexa-color-success-border."
  },
  {
    "name": "--nexa-color-success-700",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-green-700)",
    "value": "#15803d",
    "description": "Nexa semantic token nexa-color-success-700."
  },
  {
    "name": "--nexa-color-role-sales-surface",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-green-50)",
    "value": "#f0fdf4",
    "description": "Nexa semantic token nexa-color-role-sales-surface."
  },
  {
    "name": "--nexa-color-role-sales-border",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-green-200)",
    "value": "#bbf7d0",
    "description": "Nexa semantic token nexa-color-role-sales-border."
  },
  {
    "name": "--nexa-color-role-sales-text",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-green-700)",
    "value": "#15803d",
    "description": "Nexa semantic token nexa-color-role-sales-text."
  },
  {
    "name": "--nexa-color-warning-50",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-amber-50)",
    "value": "#fffbeb",
    "description": "Nexa semantic token nexa-color-warning-50."
  },
  {
    "name": "--nexa-color-warning-600",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-amber-600)",
    "value": "#d97706",
    "description": "Nexa semantic token nexa-color-warning-600."
  },
  {
    "name": "--nexa-color-warning-text",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-amber-800)",
    "value": "#92400e",
    "description": "Nexa semantic token nexa-color-warning-text."
  },
  {
    "name": "--nexa-color-warning-border",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-amber-200)",
    "value": "#fcd34d",
    "description": "Subtle warning boundary for documented attention states."
  },
  {
    "name": "--nexa-color-warning-subtle-background",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-surface-warning)",
    "value": "#fffbeb",
    "description": "Nexa semantic token nexa-color-warning-subtle-background."
  },
  {
    "name": "--nexa-color-warning-subtle-border",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-amber-600)",
    "value": "#d97706",
    "description": "Nexa semantic token nexa-color-warning-subtle-border."
  },
  {
    "name": "--nexa-color-warning-subtle-text",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-color-warning-text)",
    "value": "#92400e",
    "description": "Nexa semantic token nexa-color-warning-subtle-text."
  },
  {
    "name": "--nexa-color-warning-emphasized-background",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-amber-800)",
    "value": "#92400e",
    "description": "Nexa semantic token nexa-color-warning-emphasized-background."
  },
  {
    "name": "--nexa-color-warning-emphasized-border",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-amber-800)",
    "value": "#92400e",
    "description": "Nexa semantic token nexa-color-warning-emphasized-border."
  },
  {
    "name": "--nexa-color-warning-emphasized-text",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-color-text-inverse)",
    "value": "#ffffff",
    "description": "Nexa semantic token nexa-color-warning-emphasized-text."
  },
  {
    "name": "--nexa-color-danger-50",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-red-50)",
    "value": "#fef2f2",
    "description": "Nexa semantic token nexa-color-danger-50."
  },
  {
    "name": "--nexa-color-danger-200",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-red-200)",
    "value": "#fecaca",
    "description": "Nexa semantic token nexa-color-danger-200."
  },
  {
    "name": "--nexa-color-danger-600",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-red-600)",
    "value": "#dc2626",
    "description": "Nexa semantic token nexa-color-danger-600."
  },
  {
    "name": "--nexa-color-danger-text",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-red-800)",
    "value": "#991b1b",
    "description": "Nexa semantic token nexa-color-danger-text."
  },
  {
    "name": "--nexa-color-danger-subtle-background",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-surface-danger)",
    "value": "#fef2f2",
    "description": "Nexa semantic token nexa-color-danger-subtle-background."
  },
  {
    "name": "--nexa-color-danger-subtle-border",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-color-danger-200)",
    "value": "#fecaca",
    "description": "Nexa semantic token nexa-color-danger-subtle-border."
  },
  {
    "name": "--nexa-color-danger-subtle-text",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-color-danger-text)",
    "value": "#991b1b",
    "description": "Nexa semantic token nexa-color-danger-subtle-text."
  },
  {
    "name": "--nexa-color-danger-standard-background",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-surface-danger)",
    "value": "#fef2f2",
    "description": "Nexa semantic token nexa-color-danger-standard-background."
  },
  {
    "name": "--nexa-color-danger-standard-border",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-color-danger-600)",
    "value": "#dc2626",
    "description": "Nexa semantic token nexa-color-danger-standard-border."
  },
  {
    "name": "--nexa-color-danger-standard-text",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-color-danger-text)",
    "value": "#991b1b",
    "description": "Nexa semantic token nexa-color-danger-standard-text."
  },
  {
    "name": "--nexa-color-danger-strong-background",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-red-800)",
    "value": "#991b1b",
    "description": "Nexa semantic token nexa-color-danger-strong-background."
  },
  {
    "name": "--nexa-color-danger-strong-border",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-red-800)",
    "value": "#991b1b",
    "description": "Nexa semantic token nexa-color-danger-strong-border."
  },
  {
    "name": "--nexa-color-danger-strong-text",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-color-text-inverse)",
    "value": "#ffffff",
    "description": "Nexa semantic token nexa-color-danger-strong-text."
  },
  {
    "name": "--nexa-color-attention-500",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-orange-500)",
    "value": "#f97316",
    "description": "Nexa semantic token nexa-color-attention-500."
  },
  {
    "name": "--nexa-color-attention-surface",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-orange-50)",
    "value": "#fff7ed",
    "description": "Subtle operational attention surface."
  },
  {
    "name": "--nexa-color-attention-border",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-orange-200)",
    "value": "#fed7aa",
    "description": "Subtle operational attention boundary."
  },
  {
    "name": "--nexa-color-attention-text",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-orange-800)",
    "value": "#9a3412",
    "description": "Operational attention text role."
  },
  {
    "name": "--nexa-color-sky-600",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-sky-600)",
    "value": "#0284c7",
    "description": "Semantic data-visualization accent for sky series."
  },
  {
    "name": "--nexa-color-indigo-600",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-indigo-600)",
    "value": "#4f46e5",
    "description": "Semantic data-visualization accent for indigo series."
  },
  {
    "name": "--nexa-color-orange-500",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-orange-500)",
    "value": "#f97316",
    "description": "Semantic data-visualization accent for orange series."
  },
  {
    "name": "--nexa-color-cold-refrigerated",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-sky-600)",
    "value": "#0284c7",
    "description": "Nexa semantic token nexa-color-cold-refrigerated."
  },
  {
    "name": "--nexa-color-cold-refrigerated-text",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-sky-800)",
    "value": "#075985",
    "description": "Nexa semantic token nexa-color-cold-refrigerated-text."
  },
  {
    "name": "--nexa-color-cold-refrigerated-soft",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-sky-50)",
    "value": "#f0f9ff",
    "description": "Nexa semantic token nexa-color-cold-refrigerated-soft."
  },
  {
    "name": "--nexa-color-cold-refrigerated-border",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-sky-200)",
    "value": "#bae6fd",
    "description": "Cold-chain refrigerated boundary role."
  },
  {
    "name": "--nexa-color-cold-frozen",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-indigo-600)",
    "value": "#4f46e5",
    "description": "Nexa semantic token nexa-color-cold-frozen."
  },
  {
    "name": "--nexa-color-cold-frozen-soft",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-indigo-50)",
    "value": "#eef2ff",
    "description": "Nexa semantic token nexa-color-cold-frozen-soft."
  },
  {
    "name": "--nexa-color-cold-frozen-border",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-indigo-200)",
    "value": "#c7d2fe",
    "description": "Cold-chain frozen boundary role."
  },
  {
    "name": "--nexa-color-cold-frozen-text",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-indigo-800)",
    "value": "#3730a3",
    "description": "Cold-chain frozen text role."
  },
  {
    "name": "--nexa-surface-page",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-canvas)",
    "value": "#f6faff",
    "description": "Nexa semantic token nexa-surface-page."
  },
  {
    "name": "--nexa-surface-card",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-white)",
    "value": "#ffffff",
    "description": "Nexa semantic token nexa-surface-card."
  },
  {
    "name": "--nexa-surface-inset",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-slate-100)",
    "value": "#f1f5f9",
    "description": "Nexa semantic token nexa-surface-inset."
  },
  {
    "name": "--nexa-surface-overlay",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "rgb(15 23 42 / 48%)",
    "value": "rgb(15 23 42 / 48%)",
    "description": "Nexa semantic token nexa-surface-overlay."
  },
  {
    "name": "--nexa-surface-nav-active",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-blue-50)",
    "value": "oklch(96.9% 0.014 264.5)",
    "description": "Nexa semantic token nexa-surface-nav-active."
  },
  {
    "name": "--nexa-surface-info",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-blue-50)",
    "value": "oklch(96.9% 0.014 264.5)",
    "description": "Nexa semantic token nexa-surface-info."
  },
  {
    "name": "--nexa-surface-success",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-green-50)",
    "value": "#f0fdf4",
    "description": "Nexa semantic token nexa-surface-success."
  },
  {
    "name": "--nexa-surface-warning",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-amber-50)",
    "value": "#fffbeb",
    "description": "Nexa semantic token nexa-surface-warning."
  },
  {
    "name": "--nexa-surface-danger",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-red-50)",
    "value": "#fef2f2",
    "description": "Nexa semantic token nexa-surface-danger."
  },
  {
    "name": "--nexa-surface-table-header",
    "layer": "semantic",
    "type": "color",
    "sourceValue": "var(--nexa-primitive-slate-50)",
    "value": "#f8fafc",
    "description": "Nexa semantic token nexa-surface-table-header."
  },
  {
    "name": "--nexa-space-1",
    "layer": "semantic",
    "type": "dimension",
    "sourceValue": "var(--nexa-primitive-space-1)",
    "value": "4px",
    "description": "Nexa semantic token nexa-space-1."
  },
  {
    "name": "--nexa-space-2",
    "layer": "semantic",
    "type": "dimension",
    "sourceValue": "var(--nexa-primitive-space-2)",
    "value": "8px",
    "description": "Nexa semantic token nexa-space-2."
  },
  {
    "name": "--nexa-space-3",
    "layer": "semantic",
    "type": "dimension",
    "sourceValue": "var(--nexa-primitive-space-3)",
    "value": "12px",
    "description": "Nexa semantic token nexa-space-3."
  },
  {
    "name": "--nexa-space-4",
    "layer": "semantic",
    "type": "dimension",
    "sourceValue": "var(--nexa-primitive-space-4)",
    "value": "16px",
    "description": "Nexa semantic token nexa-space-4."
  },
  {
    "name": "--nexa-space-5",
    "layer": "semantic",
    "type": "dimension",
    "sourceValue": "var(--nexa-primitive-space-5)",
    "value": "20px",
    "description": "Nexa semantic token nexa-space-5."
  },
  {
    "name": "--nexa-space-6",
    "layer": "semantic",
    "type": "dimension",
    "sourceValue": "var(--nexa-primitive-space-6)",
    "value": "24px",
    "description": "Nexa semantic token nexa-space-6."
  },
  {
    "name": "--nexa-space-7",
    "layer": "semantic",
    "type": "dimension",
    "sourceValue": "var(--nexa-primitive-space-7)",
    "value": "28px",
    "description": "Nexa semantic token nexa-space-7."
  },
  {
    "name": "--nexa-space-8",
    "layer": "semantic",
    "type": "dimension",
    "sourceValue": "var(--nexa-primitive-space-8)",
    "value": "32px",
    "description": "Nexa semantic token nexa-space-8."
  },
  {
    "name": "--nexa-space-10",
    "layer": "semantic",
    "type": "dimension",
    "sourceValue": "var(--nexa-primitive-space-10)",
    "value": "40px",
    "description": "Nexa semantic token nexa-space-10."
  },
  {
    "name": "--nexa-space-12",
    "layer": "semantic",
    "type": "dimension",
    "sourceValue": "var(--nexa-primitive-space-12)",
    "value": "48px",
    "description": "Nexa semantic token nexa-space-12."
  },
  {
    "name": "--nexa-space-16",
    "layer": "semantic",
    "type": "dimension",
    "sourceValue": "var(--nexa-primitive-space-16)",
    "value": "64px",
    "description": "Nexa semantic token nexa-space-16."
  },
  {
    "name": "--nexa-radius-sm",
    "layer": "semantic",
    "type": "dimension",
    "sourceValue": "var(--nexa-primitive-radius-sm)",
    "value": "6px",
    "description": "Nexa semantic token nexa-radius-sm."
  },
  {
    "name": "--nexa-radius-md",
    "layer": "semantic",
    "type": "dimension",
    "sourceValue": "var(--nexa-primitive-radius-md)",
    "value": "8px",
    "description": "Nexa semantic token nexa-radius-md."
  },
  {
    "name": "--nexa-radius-lg",
    "layer": "semantic",
    "type": "dimension",
    "sourceValue": "var(--nexa-primitive-radius-lg)",
    "value": "12px",
    "description": "Nexa semantic token nexa-radius-lg."
  },
  {
    "name": "--nexa-radius-xl",
    "layer": "semantic",
    "type": "dimension",
    "sourceValue": "var(--nexa-primitive-radius-xl)",
    "value": "16px",
    "description": "Nexa semantic token nexa-radius-xl."
  },
  {
    "name": "--nexa-radius-full",
    "layer": "semantic",
    "type": "dimension",
    "sourceValue": "var(--nexa-primitive-radius-pill)",
    "value": "999px",
    "description": "Nexa semantic token nexa-radius-full."
  },
  {
    "name": "--nexa-radius-control",
    "layer": "semantic",
    "type": "dimension",
    "sourceValue": "var(--nexa-primitive-radius-control)",
    "value": "10px",
    "description": "Nexa semantic token nexa-radius-control."
  },
  {
    "name": "--nexa-radius-card",
    "layer": "semantic",
    "type": "dimension",
    "sourceValue": "var(--nexa-primitive-radius-card)",
    "value": "16px",
    "description": "Nexa semantic token nexa-radius-card."
  },
  {
    "name": "--nexa-radius-panel",
    "layer": "semantic",
    "type": "dimension",
    "sourceValue": "var(--nexa-primitive-radius-panel)",
    "value": "18px",
    "description": "Nexa semantic token nexa-radius-panel."
  },
  {
    "name": "--nexa-radius-overlay",
    "layer": "semantic",
    "type": "dimension",
    "sourceValue": "var(--nexa-primitive-radius-overlay)",
    "value": "18px",
    "description": "Nexa semantic token nexa-radius-overlay."
  },
  {
    "name": "--nexa-radius-dialog",
    "layer": "semantic",
    "type": "dimension",
    "sourceValue": "var(--nexa-primitive-radius-dialog)",
    "value": "24px",
    "description": "Nexa semantic token nexa-radius-dialog."
  },
  {
    "name": "--nexa-radius-pill",
    "layer": "semantic",
    "type": "dimension",
    "sourceValue": "var(--nexa-primitive-radius-pill)",
    "value": "999px",
    "description": "Nexa semantic token nexa-radius-pill."
  },
  {
    "name": "--nexa-radius-nav-active",
    "layer": "semantic",
    "type": "dimension",
    "sourceValue": "var(--nexa-primitive-radius-md)",
    "value": "8px",
    "description": "Nexa semantic token nexa-radius-nav-active."
  },
  {
    "name": "--nexa-shadow-xs",
    "layer": "semantic",
    "type": "shadow",
    "sourceValue": "var(--nexa-primitive-shadow-xs)",
    "value": "0 1px 2px rgb(15 23 42 / 5%)",
    "description": "Nexa semantic token nexa-shadow-xs."
  },
  {
    "name": "--nexa-shadow-sm",
    "layer": "semantic",
    "type": "shadow",
    "sourceValue": "var(--nexa-primitive-shadow-sm)",
    "value": "0 1px 3px rgb(15 23 42 / 6%), 0 1px 2px rgb(15 23 42 / 4%)",
    "description": "Nexa semantic token nexa-shadow-sm."
  },
  {
    "name": "--nexa-shadow-overlay",
    "layer": "semantic",
    "type": "shadow",
    "sourceValue": "0 22px 60px rgb(15 23 42 / 18%)",
    "value": "0 22px 60px rgb(15 23 42 / 18%)",
    "description": "Nexa semantic token nexa-shadow-overlay."
  },
  {
    "name": "--nexa-shadow-menu",
    "layer": "semantic",
    "type": "shadow",
    "sourceValue": "0 14px 32px rgb(15 23 42 / 14%)",
    "value": "0 14px 32px rgb(15 23 42 / 14%)",
    "description": "Nexa semantic token nexa-shadow-menu."
  },
  {
    "name": "--nexa-font-family-display",
    "layer": "semantic",
    "type": "fontFamily",
    "sourceValue": "var(--nexa-primitive-font-display)",
    "value": "'Plus Jakarta Sans', sans-serif",
    "description": "Nexa semantic token nexa-font-family-display."
  },
  {
    "name": "--nexa-font-family-body",
    "layer": "semantic",
    "type": "fontFamily",
    "sourceValue": "var(--nexa-primitive-font-body)",
    "value": "'Inter', sans-serif",
    "description": "Nexa semantic token nexa-font-family-body."
  },
  {
    "name": "--nexa-font-family-mono",
    "layer": "semantic",
    "type": "fontFamily",
    "sourceValue": "var(--nexa-primitive-font-mono)",
    "value": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    "description": "Nexa semantic token nexa-font-family-mono."
  },
  {
    "name": "--nexa-font-size-xs",
    "layer": "component",
    "type": "dimension",
    "sourceValue": "12px",
    "value": "12px",
    "description": "Nexa component token nexa-font-size-xs."
  },
  {
    "name": "--nexa-font-size-sm",
    "layer": "component",
    "type": "dimension",
    "sourceValue": "13px",
    "value": "13px",
    "description": "Nexa component token nexa-font-size-sm."
  },
  {
    "name": "--nexa-font-size-base",
    "layer": "component",
    "type": "dimension",
    "sourceValue": "14px",
    "value": "14px",
    "description": "Nexa component token nexa-font-size-base."
  },
  {
    "name": "--nexa-font-size-md",
    "layer": "component",
    "type": "dimension",
    "sourceValue": "16px",
    "value": "16px",
    "description": "Nexa component token nexa-font-size-md."
  },
  {
    "name": "--nexa-font-size-lg",
    "layer": "component",
    "type": "dimension",
    "sourceValue": "18px",
    "value": "18px",
    "description": "Nexa component token nexa-font-size-lg."
  },
  {
    "name": "--nexa-font-size-xl",
    "layer": "component",
    "type": "dimension",
    "sourceValue": "20px",
    "value": "20px",
    "description": "Nexa component token nexa-font-size-xl."
  },
  {
    "name": "--nexa-font-size-2xl",
    "layer": "component",
    "type": "dimension",
    "sourceValue": "24px",
    "value": "24px",
    "description": "Nexa component token nexa-font-size-2xl."
  },
  {
    "name": "--nexa-font-size-3xl",
    "layer": "component",
    "type": "dimension",
    "sourceValue": "30px",
    "value": "30px",
    "description": "Nexa component token nexa-font-size-3xl."
  },
  {
    "name": "--nexa-font-size-5xl",
    "layer": "component",
    "type": "dimension",
    "sourceValue": "clamp(36px, 5vw, 64px)",
    "value": "clamp(36px, 5vw, 64px)",
    "description": "Nexa component token nexa-font-size-5xl."
  },
  {
    "name": "--nexa-font-weight-medium",
    "layer": "component",
    "type": "number",
    "sourceValue": "500",
    "value": "500",
    "description": "Nexa component token nexa-font-weight-medium."
  },
  {
    "name": "--nexa-font-weight-semibold",
    "layer": "component",
    "type": "number",
    "sourceValue": "600",
    "value": "600",
    "description": "Nexa component token nexa-font-weight-semibold."
  },
  {
    "name": "--nexa-font-weight-bold",
    "layer": "component",
    "type": "number",
    "sourceValue": "700",
    "value": "700",
    "description": "Nexa component token nexa-font-weight-bold."
  },
  {
    "name": "--nexa-font-weight-extrabold",
    "layer": "component",
    "type": "number",
    "sourceValue": "800",
    "value": "800",
    "description": "Nexa component token nexa-font-weight-extrabold."
  },
  {
    "name": "--nexa-line-height-tight",
    "layer": "component",
    "type": "number",
    "sourceValue": "1.18",
    "value": "1.18",
    "description": "Nexa component token nexa-line-height-tight."
  },
  {
    "name": "--nexa-line-height-normal",
    "layer": "component",
    "type": "number",
    "sourceValue": "1.5",
    "value": "1.5",
    "description": "Nexa component token nexa-line-height-normal."
  },
  {
    "name": "--nexa-line-height-relaxed",
    "layer": "component",
    "type": "number",
    "sourceValue": "1.65",
    "value": "1.65",
    "description": "Nexa component token nexa-line-height-relaxed."
  },
  {
    "name": "--nexa-layout-sidebar-width",
    "layer": "component",
    "type": "dimension",
    "sourceValue": "284px",
    "value": "284px",
    "description": "Nexa component token nexa-layout-sidebar-width."
  },
  {
    "name": "--nexa-layout-toolbar-height",
    "layer": "component",
    "type": "dimension",
    "sourceValue": "56px",
    "value": "56px",
    "description": "Nexa component token nexa-layout-toolbar-height."
  },
  {
    "name": "--nexa-layout-content-max",
    "layer": "component",
    "type": "dimension",
    "sourceValue": "1280px",
    "value": "1280px",
    "description": "Nexa component token nexa-layout-content-max."
  },
  {
    "name": "--nexa-layout-page-gutter",
    "layer": "component",
    "type": "dimension",
    "sourceValue": "clamp(18px, 2.2vw, 34px)",
    "value": "clamp(18px, 2.2vw, 34px)",
    "description": "Nexa component token nexa-layout-page-gutter."
  },
  {
    "name": "--nexa-layout-section-gap",
    "layer": "component",
    "type": "dimension",
    "sourceValue": "48px",
    "value": "48px",
    "description": "Nexa component token nexa-layout-section-gap."
  },
  {
    "name": "--nexa-layout-card-padding",
    "layer": "component",
    "type": "dimension",
    "sourceValue": "20px",
    "value": "20px",
    "description": "Nexa component token nexa-layout-card-padding."
  },
  {
    "name": "--nexa-layout-nav-item-height",
    "layer": "component",
    "type": "dimension",
    "sourceValue": "38px",
    "value": "38px",
    "description": "Nexa component token nexa-layout-nav-item-height."
  },
  {
    "name": "--nexa-control-height-sm",
    "layer": "component",
    "type": "dimension",
    "sourceValue": "34px",
    "value": "34px",
    "description": "Nexa component token nexa-control-height-sm."
  },
  {
    "name": "--nexa-control-height-md",
    "layer": "component",
    "type": "dimension",
    "sourceValue": "40px",
    "value": "40px",
    "description": "Nexa component token nexa-control-height-md."
  },
  {
    "name": "--nexa-control-height-lg",
    "layer": "component",
    "type": "dimension",
    "sourceValue": "48px",
    "value": "48px",
    "description": "Nexa component token nexa-control-height-lg."
  },
  {
    "name": "--nexa-control-padding-inline",
    "layer": "component",
    "type": "dimension",
    "sourceValue": "var(--nexa-space-4)",
    "value": "16px",
    "description": "Nexa component token nexa-control-padding-inline."
  },
  {
    "name": "--nexa-control-padding-inline-compact",
    "layer": "component",
    "type": "dimension",
    "sourceValue": "var(--nexa-space-3)",
    "value": "12px",
    "description": "Nexa component token nexa-control-padding-inline-compact."
  },
  {
    "name": "--nexa-control-gap",
    "layer": "component",
    "type": "dimension",
    "sourceValue": "var(--nexa-space-1)",
    "value": "4px",
    "description": "Nexa component token nexa-control-gap."
  },
  {
    "name": "--nexa-panel-padding",
    "layer": "component",
    "type": "dimension",
    "sourceValue": "var(--nexa-layout-card-padding)",
    "value": "20px",
    "description": "Nexa component token nexa-panel-padding."
  },
  {
    "name": "--nexa-card-padding",
    "layer": "component",
    "type": "dimension",
    "sourceValue": "var(--nexa-space-4)",
    "value": "16px",
    "description": "Nexa component token nexa-card-padding."
  },
  {
    "name": "--nexa-surface-gap",
    "layer": "component",
    "type": "dimension",
    "sourceValue": "var(--nexa-space-4)",
    "value": "16px",
    "description": "Nexa component token nexa-surface-gap."
  },
  {
    "name": "--nexa-radius-interactive",
    "layer": "component",
    "type": "dimension",
    "sourceValue": "var(--nexa-radius-control)",
    "value": "10px",
    "description": "Nexa component token nexa-radius-interactive."
  },
  {
    "name": "--nexa-focus-width",
    "layer": "component",
    "type": "dimension",
    "sourceValue": "3px",
    "value": "3px",
    "description": "Nexa component token nexa-focus-width."
  },
  {
    "name": "--nexa-focus-offset",
    "layer": "component",
    "type": "dimension",
    "sourceValue": "3px",
    "value": "3px",
    "description": "Nexa component token nexa-focus-offset."
  },
  {
    "name": "--nexa-focus-ring",
    "layer": "component",
    "type": "shadow",
    "sourceValue": "0 0 0 3px color-mix(in oklab, var(--nexa-color-focus-ring) 24%, transparent)",
    "value": "0 0 0 3px color-mix(in oklab, oklch(54.6% 0.215 262.9) 24%, transparent)",
    "description": "Nexa component token nexa-focus-ring."
  },
  {
    "name": "--nexa-focus-preview-ring",
    "layer": "component",
    "type": "shadow",
    "sourceValue": "inset 0 0 0 3px color-mix(in oklab, var(--nexa-color-focus-ring) 24%, transparent)",
    "value": "inset 0 0 0 3px color-mix(in oklab, oklch(54.6% 0.215 262.9) 24%, transparent)",
    "description": "Documentation-only inset focus specimen ring; preserves the candidate focus geometry without duplicating a derived color."
  },
  {
    "name": "--nexa-auth-grid-line",
    "layer": "component",
    "type": "color",
    "sourceValue": "color-mix(in oklab, var(--nexa-color-text-inverse) 13%, transparent)",
    "value": "color-mix(in oklab, #ffffff 13%, transparent)",
    "description": "Authentication brand-plane grid line; pattern evidence token, not a general surface color."
  },
  {
    "name": "--nexa-auth-brand-copy",
    "layer": "component",
    "type": "color",
    "sourceValue": "color-mix(in oklab, var(--nexa-color-text-inverse) 86%, transparent)",
    "value": "color-mix(in oklab, #ffffff 86%, transparent)",
    "description": "Authentication brand-plane supporting copy color."
  },
  {
    "name": "--nexa-auth-brand-muted",
    "layer": "component",
    "type": "color",
    "sourceValue": "color-mix(in oklab, var(--nexa-color-text-inverse) 72%, transparent)",
    "value": "color-mix(in oklab, #ffffff 72%, transparent)",
    "description": "Authentication brand-plane tertiary copy color."
  },
  {
    "name": "--nexa-auth-mark-border",
    "layer": "component",
    "type": "color",
    "sourceValue": "color-mix(in oklab, var(--nexa-color-text-inverse) 45%, transparent)",
    "value": "color-mix(in oklab, #ffffff 45%, transparent)",
    "description": "Authentication brand mark supporting border color."
  },
  {
    "name": "--nexa-shadow-toast",
    "layer": "component",
    "type": "shadow",
    "sourceValue": "0 12px 28px rgb(15 23 42 / 12%)",
    "value": "0 12px 28px rgb(15 23 42 / 12%)",
    "description": "Nexa component token nexa-shadow-toast."
  },
  {
    "name": "--nexa-component-sidebar-width",
    "layer": "component",
    "type": "dimension",
    "sourceValue": "var(--nexa-layout-sidebar-width)",
    "value": "284px",
    "description": "Nexa component token nexa-component-sidebar-width."
  },
  {
    "name": "--nexa-component-drawer-width",
    "layer": "component",
    "type": "dimension",
    "sourceValue": "min(320px, 88vw)",
    "value": "min(320px, 88vw)",
    "description": "Nexa component token nexa-component-drawer-width."
  },
  {
    "name": "--nexa-component-table-row-height",
    "layer": "component",
    "type": "dimension",
    "sourceValue": "56px",
    "value": "56px",
    "description": "Nexa component token nexa-component-table-row-height."
  },
  {
    "name": "--nexa-doc-text-scale",
    "layer": "component",
    "type": "number",
    "sourceValue": "1",
    "value": "1",
    "description": "Nexa component token nexa-doc-text-scale."
  },
  {
    "name": "--nexa-viz-series-1",
    "layer": "data-visualization",
    "type": "color",
    "sourceValue": "{nexa-color-primary-600}",
    "value": "oklch(54.6% 0.215 262.9)",
    "description": "Primary categorical series."
  },
  {
    "name": "--nexa-viz-series-2",
    "layer": "data-visualization",
    "type": "color",
    "sourceValue": "{nexa-color-sky-600}",
    "value": "#0284c7",
    "description": "Sky categorical series."
  },
  {
    "name": "--nexa-viz-series-3",
    "layer": "data-visualization",
    "type": "color",
    "sourceValue": "{nexa-color-indigo-600}",
    "value": "#4f46e5",
    "description": "Indigo categorical series."
  },
  {
    "name": "--nexa-viz-series-4",
    "layer": "data-visualization",
    "type": "color",
    "sourceValue": "{nexa-color-orange-500}",
    "value": "#f97316",
    "description": "Orange categorical series."
  },
  {
    "name": "--nexa-viz-series-5",
    "layer": "data-visualization",
    "type": "color",
    "sourceValue": "{nexa-color-success-700}",
    "value": "#15803d",
    "description": "Green categorical series."
  },
  {
    "name": "--nexa-viz-series-6",
    "layer": "data-visualization",
    "type": "color",
    "sourceValue": "{nexa-color-warning-600}",
    "value": "#d97706",
    "description": "Amber categorical series."
  },
  {
    "name": "--nexa-viz-sequential-low",
    "layer": "data-visualization",
    "type": "color",
    "sourceValue": "{nexa-color-primary-100}",
    "value": "oklch(92.9% 0.034 263.6)",
    "description": "Sequential low intensity."
  },
  {
    "name": "--nexa-viz-sequential-high",
    "layer": "data-visualization",
    "type": "color",
    "sourceValue": "{nexa-color-primary-700}",
    "value": "oklch(48% 0.19 262.9)",
    "description": "Sequential high intensity."
  },
  {
    "name": "--nexa-viz-grid",
    "layer": "data-visualization",
    "type": "color",
    "sourceValue": "{nexa-color-neutral-200}",
    "value": "#e2e8f0",
    "description": "Chart grid and track."
  },
  {
    "name": "--nexa-viz-axis-text",
    "layer": "data-visualization",
    "type": "color",
    "sourceValue": "{nexa-color-text-secondary}",
    "value": "#64748b",
    "description": "Chart axis and supporting labels."
  },
  {
    "name": "--nexa-viz-area-fill",
    "layer": "data-visualization",
    "type": "color",
    "sourceValue": "color-mix(in oklab, var(--nexa-viz-series-1) 16%, transparent)",
    "value": "color-mix(in oklab, oklch(54.6% 0.215 262.9) 16%, transparent)",
    "description": "Documented low-opacity fill for area-trend evidence; data visualization only."
  }
];

export const NEXA_TOKEN_SUMMARY = {
  "declarations": 249,
  "references": 143,
  "layerCounts": {
    "primitive": 71,
    "semantic": 121,
    "component": 46,
    "data-visualization": 11
  }
} as const;

export function tokenValue(name: string): string {
  const value = NEXA_TOKEN_VALUES[name];
  if (!value) throw new Error(`Unknown Nexa token: ${name}`);
  return value;
}
