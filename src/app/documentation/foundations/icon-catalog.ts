export type NexaIconCategory = 'navigation' | 'action' | 'status' | 'domain' | 'input';

export interface NexaIconSpec {
  readonly name: string;
  readonly label: string;
  readonly category: NexaIconCategory;
  readonly usage: string;
  readonly tone: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
}

export const NEXA_ICON_CATALOG: readonly NexaIconSpec[] = [
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

export const NEXA_ICON_CATEGORIES: readonly { readonly value: 'all' | NexaIconCategory; readonly label: string }[] = [
  { value: 'all', label: 'All icons' },
  { value: 'navigation', label: 'Navigation' },
  { value: 'action', label: 'Actions' },
  { value: 'status', label: 'Status' },
  { value: 'domain', label: 'Domain' },
  { value: 'input', label: 'Input' },
];
