import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UiAction } from '../shared/ui-action';

interface DashboardKpi {
  readonly label: string;
  readonly value: string;
  readonly note: string;
  readonly icon: string;
  readonly tone: 'blue' | 'amber' | 'cyan' | 'red';
}

interface DashboardAction {
  readonly label: string;
  readonly icon: string;
  readonly target?: string;
}

@Component({
  selector: 'nexa-dashboard',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class NexaDashboard {
  readonly action = output<UiAction>();
  protected readonly lastAction = signal('');

  protected readonly kpis: readonly DashboardKpi[] = [
    {
      label: 'New Purchase Requests',
      value: '1',
      note: 'Buyer Portal and manual entries',
      icon: 'pi-inbox',
      tone: 'blue',
    },
    {
      label: 'In validation',
      value: '1',
      note: 'Sales Orders with pending conditions',
      icon: 'pi-search',
      tone: 'amber',
    },
    {
      label: 'Pending Docs',
      value: '0',
      note: 'Business documents requiring review',
      icon: 'pi-file',
      tone: 'cyan',
    },
    {
      label: 'Blocked',
      value: '0',
      note: 'Credit, stock or incident',
      icon: 'pi-ban',
      tone: 'red',
    },
  ];

  protected readonly quickActions: readonly DashboardAction[] = [
    { label: 'Manual Order Entry', icon: 'pi-plus', target: '/reference/platform/manual-order-entry' },
    { label: 'Purchase Requests', icon: 'pi-inbox', target: '/reference/platform/purchase-requests' },
    { label: 'Sales Orders', icon: 'pi-file-edit', target: '/reference/platform/sales-orders' },
  ];

  protected readonly recentActivity = [
    {
      title: 'PR-2026-0001 submitted',
      detail: 'La Cava Fría · buyer request',
      time: '12 min ago',
      icon: 'pi-inbox',
    },
    {
      title: 'Credit case assigned',
      detail: 'La Cava Fría · Sales review',
      time: '36 min ago',
      icon: 'pi-user-edit',
    },
    {
      title: 'Catalog reference refreshed',
      detail: '6 products · ICISA Distribuciones',
      time: 'Yesterday',
      icon: 'pi-box',
    },
  ] as const;

  protected emitAction(label: string, target?: string): void {
    this.lastAction.set(label);
    this.action.emit({ label, target });
  }
}
