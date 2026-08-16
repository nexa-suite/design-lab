import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { referenceProducts } from '../demo-data';
import { UiAction } from '../shared/ui-action';

interface ColorToken {
  readonly name: string;
  readonly value: string;
  readonly className: string;
  readonly use: string;
}

interface GuidelineSection {
  readonly id: string;
  readonly label: string;
  readonly description: string;
}

interface ContrastRow {
  readonly usage: string;
  readonly foreground: string;
  readonly background: string;
  readonly ratio: string;
  readonly result: 'PASS' | 'FAIL';
  readonly note: string;
}

@Component({
  selector: 'nexa-style-guidelines',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './style-guidelines.html',
  styleUrl: './style-guidelines.scss',
})
export class NexaStyleGuidelines {
  readonly action = output<UiAction>();

  protected readonly selectedButton = signal('Primary');
  protected readonly searchTerm = signal('');
  protected readonly referenceProducts = referenceProducts;

  protected readonly sections: readonly GuidelineSection[] = [
    {
      id: 'guidelines-foundations',
      label: 'Foundations',
      description: 'Color, type, spacing, shape and icon rules.',
    },
    {
      id: 'guidelines-components',
      label: 'Components',
      description: 'Buttons, fields, badges, cards and tables.',
    },
    {
      id: 'guidelines-contrast',
      label: 'Contrast Lab',
      description: 'Active semantic combinations and known debt.',
    },
    {
      id: 'guidelines-patterns',
      label: 'Patterns',
      description: 'Shell, dashboard, workflow and catalog composition.',
    },
    {
      id: 'guidelines-accessibility',
      label: 'States & accessibility',
      description: 'Interaction states, responsive behavior and inclusive defaults.',
    },
    {
      id: 'guidelines-material',
      label: 'Material bench',
      description: 'Supported Angular Material candidates with Nexa theming.',
    },
  ];

  protected readonly colors: readonly ColorToken[] = [
    {
      name: 'Primary',
      value: '#2563EB',
      className: 'swatch-primary',
      use: 'Primary actions and active navigation.',
    },
    {
      name: 'Text',
      value: '#0F172A',
      className: 'swatch-text',
      use: 'Headings and operational content.',
    },
    {
      name: 'Border',
      value: '#E2E8F0',
      className: 'swatch-border',
      use: 'Quiet separation between surfaces.',
    },
    {
      name: 'Success',
      value: '#15803D',
      className: 'swatch-success',
      use: 'Confirmed states and Sales role.',
    },
    {
      name: 'Warning',
      value: '#D97706',
      className: 'swatch-warning',
      use: 'Validation attention and pending work.',
    },
    {
      name: 'Danger',
      value: '#DC2626',
      className: 'swatch-danger',
      use: 'Blocked states and destructive intent.',
    },
    {
      name: 'Refrigerated',
      value: '#0284C7',
      className: 'swatch-cold',
      use: 'Cold-chain refrigerated temperature context.',
    },
  ];

  protected readonly spacingScale = [
    { token: 'space-1', value: '4px', width: '16px' },
    { token: 'space-2', value: '8px', width: '28px' },
    { token: 'space-3', value: '12px', width: '40px' },
    { token: 'space-4', value: '16px', width: '56px' },
    { token: 'space-6', value: '24px', width: '80px' },
    { token: 'space-8', value: '32px', width: '104px' },
  ] as const;

  protected readonly blueScale = [
    {
      token: 'blue-50',
      hex: '#F0F5FF',
      oklch: '96.9% 0.014 264.5',
      white: '1.09',
      dark: '16.33',
      safe: 'dark text / surface',
    },
    {
      token: 'blue-100',
      hex: '#DCE8FF',
      oklch: '92.9% 0.034 263.6',
      white: '1.23',
      dark: '14.48',
      safe: 'dark text / surface',
    },
    {
      token: 'blue-200',
      hex: '#B9D2FF',
      oklch: '86% 0.068 262.1',
      white: '1.53',
      dark: '11.67',
      safe: 'dark text / surface',
    },
    {
      token: 'blue-300',
      hex: '#8CB4FF',
      oklch: '77% 0.117 262.4',
      white: '2.08',
      dark: '8.58',
      safe: 'dark text / surface',
    },
    {
      token: 'blue-400',
      hex: '#5F94FF',
      oklch: '68% 0.168 262.9',
      white: '2.93',
      dark: '6.09',
      safe: 'dark text / surface',
    },
    {
      token: 'blue-500',
      hex: '#3B77F5',
      oklch: '60% 0.199 262.8',
      white: '4.08',
      dark: '4.37',
      safe: 'large white / dark text',
    },
    {
      token: 'blue-600',
      hex: '#2563EB',
      oklch: '54.6% 0.215 262.9',
      white: '5.17',
      dark: '3.45',
      safe: 'white text / brand action',
    },
    {
      token: 'blue-700',
      hex: '#1D52C6',
      oklch: '48% 0.190 262.9',
      white: '6.83',
      dark: '2.61',
      safe: 'white text',
    },
    {
      token: 'blue-800',
      hex: '#1A439A',
      oklch: '41% 0.150 262.7',
      white: '9.08',
      dark: '1.97',
      safe: 'white text',
    },
    {
      token: 'blue-900',
      hex: '#173470',
      oklch: '34.1% 0.110 262.6',
      white: '11.92',
      dark: '1.50',
      safe: 'white text',
    },
    {
      token: 'blue-950',
      hex: '#0D1F45',
      oklch: '24.9% 0.075 263',
      white: '16.17',
      dark: '1.10',
      safe: 'white text',
    },
  ] as const;

  protected readonly contrastRows: readonly ContrastRow[] = [
    {
      usage: 'Body text',
      foreground: '#0F172A',
      background: '#FFFFFF',
      ratio: '17.85:1',
      result: 'PASS',
      note: 'Normal text',
    },
    {
      usage: 'Secondary text',
      foreground: '#64748B',
      background: '#FFFFFF',
      ratio: '4.76:1',
      result: 'PASS',
      note: 'Normal text',
    },
    {
      usage: 'Muted metadata',
      foreground: '#94A3B8',
      background: '#FFFFFF',
      ratio: '2.56:1',
      result: 'FAIL',
      note: 'Use only non-essential decoration',
    },
    {
      usage: 'Primary action',
      foreground: '#FFFFFF',
      background: '#2563EB',
      ratio: '5.17:1',
      result: 'PASS',
      note: 'Normal text',
    },
    {
      usage: 'Warning status',
      foreground: '#92400E',
      background: '#FFFBEB',
      ratio: '6.84:1',
      result: 'PASS',
      note: 'Normalized semantic text',
    },
    {
      usage: 'Danger status',
      foreground: '#991B1B',
      background: '#FEF2F2',
      ratio: '7.60:1',
      result: 'PASS',
      note: 'Normalized semantic text',
    },
    {
      usage: 'Cold-chain status',
      foreground: '#075985',
      background: '#F0F9FF',
      ratio: '7.09:1',
      result: 'PASS',
      note: 'Separate from workflow status',
    },
    {
      usage: 'Subtle border',
      foreground: '#E2E8F0',
      background: '#FFFFFF',
      ratio: '1.23:1',
      result: 'FAIL',
      note: 'Decorative separation only; strengthen boundary when required',
    },
    {
      usage: 'Focus indicator',
      foreground: '#2563EB',
      background: '#FFFFFF',
      ratio: '5.17:1',
      result: 'PASS',
      note: 'Non-text focus indicator',
    },
  ];

  protected readonly componentRules = [
    {
      name: 'Button',
      rule: 'One clear action per control; use a real button, visible focus and a meaningful label.',
    },
    {
      name: 'Card',
      rule: 'White surface, 1px border and restrained radius; elevation is optional, never decorative.',
    },
    {
      name: 'Status',
      rule: 'Status color supports text; never communicate workflow state with color alone.',
    },
    {
      name: 'Icon',
      rule: 'PrimeIcons are quiet 16px line icons; icons clarify, they do not compete with labels.',
    },
    {
      name: 'Table',
      rule: 'Align values, preserve scan paths and expose the primary identifier first.',
    },
  ] as const;

  protected filteredProducts() {
    const query = this.searchTerm().trim().toLowerCase();
    return this.referenceProducts.filter(
      (product) =>
        !query || `${product.name} ${product.brand} ${product.sku}`.toLowerCase().includes(query),
    );
  }

  protected setButton(name: string): void {
    this.selectedButton.set(name);
    this.action.emit({ label: `${name} button state selected` });
  }

  protected updateSearch(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  protected emitAction(label: string, target?: string): void {
    this.action.emit({ label, target });
  }
}
