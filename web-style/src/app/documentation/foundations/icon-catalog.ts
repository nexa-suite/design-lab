export type NexaIconCategory = 'navigation' | 'action' | 'status' | 'domain' | 'input';
export type NexaIconRole = 'semantic' | 'decorative';
export type NexaIconLabelPolicy = 'visible-label' | 'aria-label' | 'decorative';
export type NexaIconAlignment = 'leading' | 'trailing' | 'centered' | 'inline';
export type NexaIconSize = '12px' | '16px' | '20px';

export interface NexaIconSpec {
  readonly name: string;
  readonly label: string;
  readonly category: NexaIconCategory;
  readonly usage: string;
  readonly tone: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
  readonly render: 'PrimeIcon <i>';
  readonly role: NexaIconRole;
  readonly size: NexaIconSize;
  readonly alignment: NexaIconAlignment;
  readonly labelPolicy: NexaIconLabelPolicy;
  readonly semanticColor: string;
  readonly hitTarget: '44px when interactive' | 'not interactive';
}

type NexaIconSeed = Omit<NexaIconSpec, 'render' | 'role' | 'size' | 'alignment' | 'labelPolicy' | 'semanticColor' | 'hitTarget'>;

const CURATED_ICON_CATALOG: readonly NexaIconSeed[] = [
  { name: 'pi-th-large', label: 'Overview', category: 'navigation', usage: 'Workspace overview and dashboard entry.', tone: 'primary' },
  { name: 'pi-bars', label: 'Menu', category: 'navigation', usage: 'Open or collapse navigation.', tone: 'neutral' },
  { name: 'pi-chevron-right', label: 'Forward', category: 'navigation', usage: 'Move through a hierarchy or step.', tone: 'neutral' },
  { name: 'pi-search', label: 'Search', category: 'input', usage: 'Search field or query action.', tone: 'primary' },
  { name: 'pi-filter', label: 'Filter', category: 'input', usage: 'Narrow a visible result set.', tone: 'primary' },
  { name: 'pi-sliders-h', label: 'Adjust', category: 'input', usage: 'Tune a range or composition.', tone: 'neutral' },
  { name: 'pi-check', label: 'Complete', category: 'status', usage: 'Pair with a visible completed label.', tone: 'success' },
  { name: 'pi-check-circle', label: 'Confirmed', category: 'status', usage: 'Successful outcome with supporting text.', tone: 'success' },
  { name: 'pi-clock', label: 'Awaiting review', category: 'status', usage: 'Pending or time-sensitive work.', tone: 'warning' },
  { name: 'pi-exclamation-triangle', label: 'Warning', category: 'status', usage: 'Attention required before proceeding.', tone: 'warning' },
  { name: 'pi-exclamation-circle', label: 'Error', category: 'status', usage: 'Failed state with recovery action.', tone: 'danger' },
  { name: 'pi-ban', label: 'Blocked', category: 'status', usage: 'Blocked state; never rely on color alone.', tone: 'danger' },
  { name: 'pi-box', label: 'Product', category: 'domain', usage: 'Product, catalog or inventory context.', tone: 'primary' },
  { name: 'pi-inbox', label: 'Requests', category: 'domain', usage: 'Queue, empty state or incoming work.', tone: 'neutral' },
  { name: 'pi-truck', label: 'Dispatch', category: 'domain', usage: 'Delivery and dispatch context.', tone: 'primary' },
  { name: 'pi-file', label: 'Document', category: 'domain', usage: 'Business document or attachment context.', tone: 'neutral' },
  { name: 'pi-credit-card', label: 'Payment', category: 'domain', usage: 'Provider-neutral payment context.', tone: 'neutral' },
  { name: 'pi-user', label: 'Profile', category: 'domain', usage: 'Person or workspace identity.', tone: 'neutral' },
  { name: 'pi-plus', label: 'Add', category: 'action', usage: 'Create or add a local item.', tone: 'primary' },
  { name: 'pi-refresh', label: 'Retry', category: 'action', usage: 'Recover a failed operation.', tone: 'primary' },
  { name: 'pi-download', label: 'Download', category: 'action', usage: 'Export or retrieve a document.', tone: 'primary' },
  { name: 'pi-copy', label: 'Copy', category: 'action', usage: 'Copy a value with confirmation.', tone: 'neutral' },
  { name: 'pi-ellipsis-h', label: 'More actions', category: 'action', usage: 'Open an action menu with a visible label.', tone: 'neutral' },
  { name: 'pi-sign-out', label: 'Sign out', category: 'action', usage: 'Leave the current authenticated session.', tone: 'danger' },
];

const CANONICAL_PRIME_ICON_NAMES = [
  'pi-align-left', 'pi-arrow-right', 'pi-arrows-alt', 'pi-ban', 'pi-bars', 'pi-bell', 'pi-bolt', 'pi-book', 'pi-bookmark', 'pi-box',
  'pi-briefcase', 'pi-calendar', 'pi-chart-bar', 'pi-check', 'pi-check-circle', 'pi-check-square', 'pi-chevron-down', 'pi-chevron-right',
  'pi-circle', 'pi-circle-fill', 'pi-clock', 'pi-code', 'pi-compass', 'pi-copy', 'pi-credit-card', 'pi-desktop', 'pi-directions', 'pi-download',
  'pi-ellipsis-h', 'pi-exclamation-circle', 'pi-exclamation-triangle', 'pi-external-link', 'pi-eye', 'pi-file', 'pi-file-edit', 'pi-filter',
  'pi-flag', 'pi-microchip', 'pi-folder', 'pi-grid-2', 'pi-mobile', 'pi-image', 'pi-inbox', 'pi-info-circle', 'pi-key', 'pi-list', 'pi-lock',
  'pi-minus', 'pi-minus-circle', 'pi-palette', 'pi-pause', 'pi-pencil', 'pi-play', 'pi-plus',
  'pi-power-off', 'pi-question-circle', 'pi-refresh', 'pi-search', 'pi-shield', 'pi-sign-in', 'pi-sign-out', 'pi-shopping-cart', 'pi-sitemap',
  'pi-sliders-h', 'pi-cloud', 'pi-sort-amount-down', 'pi-sort-amount-up', 'pi-spin', 'pi-spinner', 'pi-stop', 'pi-stop-circle', 'pi-sun',
  'pi-sync', 'pi-table', 'pi-tag', 'pi-th-large', 'pi-times', 'pi-times-circle', 'pi-trash', 'pi-truck', 'pi-undo', 'pi-user', 'pi-users',
  'pi-window-maximize',
] as const;

const CURATED_ICON_BY_NAME = new Map(CURATED_ICON_CATALOG.map((icon) => [icon.name, icon]));

function iconLabel(name: string): string {
  return name.replace(/^pi-/, '').split('-').map((part) => part.charAt(0).toLocaleUpperCase() + part.slice(1)).join(' ');
}

function inferredCategory(name: string): NexaIconCategory {
  if (['pi-bars', 'pi-chevron-down', 'pi-chevron-right', 'pi-compass', 'pi-directions', 'pi-grid-2', 'pi-mobile', 'pi-sitemap', 'pi-table', 'pi-th-large', 'pi-window-maximize'].includes(name)) return 'navigation';
  if (['pi-align-left', 'pi-filter', 'pi-desktop', 'pi-search', 'pi-sliders-h', 'pi-sort-amount-down', 'pi-sort-amount-up'].includes(name)) return 'input';
  if (['pi-ban', 'pi-check', 'pi-check-circle', 'pi-check-square', 'pi-circle', 'pi-circle-fill', 'pi-clock', 'pi-exclamation-circle', 'pi-exclamation-triangle', 'pi-info-circle', 'pi-minus-circle', 'pi-shield', 'pi-sun', 'pi-tag', 'pi-times-circle'].includes(name)) return 'status';
  if (['pi-box', 'pi-briefcase', 'pi-calendar', 'pi-chart-bar', 'pi-credit-card', 'pi-file', 'pi-file-edit', 'pi-folder', 'pi-inbox', 'pi-lock', 'pi-cloud', 'pi-shopping-cart', 'pi-truck', 'pi-user', 'pi-users'].includes(name)) return 'domain';
  return 'action';
}

function inferredTone(name: string): NexaIconSpec['tone'] {
  if (name.includes('check') || name === 'pi-sun') return 'success';
  if (name.includes('clock') || name.includes('warning') || name.includes('exclamation-triangle')) return 'warning';
  if (name.includes('ban') || name.includes('trash') || name.includes('times')) return 'danger';
  if (inferredCategory(name) === 'navigation' || inferredCategory(name) === 'input') return 'primary';
  return 'neutral';
}

function iconContract(name: string, category: NexaIconCategory, tone: NexaIconSpec['tone']): Pick<NexaIconSpec, 'render' | 'role' | 'size' | 'alignment' | 'labelPolicy' | 'semanticColor' | 'hitTarget'> {
  const decorative = ['pi-arrow-right', 'pi-chevron-down', 'pi-chevron-right', 'pi-circle', 'pi-circle-fill', 'pi-sort-amount-down', 'pi-sort-amount-up'].includes(name);
  const interactive = ['navigation', 'action', 'input'].includes(category);
  return {
    render: 'PrimeIcon <i>',
    role: decorative ? 'decorative' : 'semantic',
    size: category === 'status' ? '16px' : category === 'domain' ? '20px' : '16px',
    alignment: category === 'navigation' || category === 'status' ? 'leading' : interactive ? 'inline' : 'centered',
    labelPolicy: decorative ? 'decorative' : interactive ? 'visible-label' : 'aria-label',
    semanticColor: tone === 'neutral' ? 'currentColor' : `status/${tone}`,
    hitTarget: interactive ? '44px when interactive' : 'not interactive',
  };
}

export const NEXA_ICON_CATALOG: readonly NexaIconSpec[] = CANONICAL_PRIME_ICON_NAMES
  .filter((name) => name !== 'pi-spin')
  .map((name) => {
    const seed = CURATED_ICON_BY_NAME.get(name) ?? {
      name,
      label: iconLabel(name),
      category: inferredCategory(name),
      usage: 'Available PrimeIcon in the local Nexa catalog.',
      tone: inferredTone(name),
    };
    return { ...seed, ...iconContract(name, seed.category, seed.tone) };
  });

export const NEXA_ICON_CATEGORIES: readonly { readonly value: 'all' | NexaIconCategory; readonly label: string }[] = [
  { value: 'all', label: 'All icons' },
  { value: 'navigation', label: 'Navigation' },
  { value: 'action', label: 'Actions' },
  { value: 'status', label: 'Status' },
  { value: 'domain', label: 'Domain' },
  { value: 'input', label: 'Input' },
];
