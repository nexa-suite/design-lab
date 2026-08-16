import { Routes } from '@angular/router';
import { NexaDesignLabShell } from './shell/shell';
import { NexaMaterialBench } from './material-bench/material-bench';
import { NexaOperationalTable } from './operational-table/operational-table';
import { NexaDashboard } from './dashboard/dashboard';
import { NexaGuidelinePage } from './guidelines/guideline-page';
import { NexaPlatformShell, NexaPortalShell, NexaAuthShell } from './reference/reference-shell';
import { NexaReferenceScreen } from './reference/reference-screen';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'guidelines/overview' },
  {
    path: 'guidelines',
    component: NexaDesignLabShell,
    children: [
      { path: 'overview', component: NexaGuidelinePage, data: { page: 'overview' } },
      { path: 'foundations', component: NexaGuidelinePage, data: { page: 'foundations' } },
      { path: 'components', component: NexaGuidelinePage, data: { page: 'components' } },
      { path: 'patterns', component: NexaGuidelinePage, data: { page: 'patterns' } },
      { path: 'accessibility', component: NexaGuidelinePage, data: { page: 'accessibility' } },
      { path: 'material', component: NexaMaterialBench },
    ],
  },
  {
    path: 'reference/platform',
    component: NexaPlatformShell,
    children: [
      { path: 'dashboard', component: NexaDashboard },
      ...referenceRoutes('platform'),
      { path: 'sales-orders', component: NexaOperationalTable },
      { path: 'sales-orders/detail', component: NexaReferenceScreen, data: { screen: 'platform-sales-order-detail' } },
    ],
  },
  {
    path: 'reference/portal',
    component: NexaPortalShell,
    children: referenceRoutes('portal'),
  },
  {
    path: 'reference/auth',
    component: NexaAuthShell,
    children: [
      { path: 'login', component: NexaReferenceScreen, data: { screen: 'auth-login' } },
      { path: 'workspace', component: NexaReferenceScreen, data: { screen: 'auth-workspace' } },
      { path: 'organization-setup', component: NexaReferenceScreen, data: { screen: 'auth-organization-setup' } },
    ],
  },
  { path: '**', redirectTo: 'guidelines/overview' },
];

function referenceRoutes(scope: 'platform' | 'portal'): Routes {
  const screens = scope === 'platform'
    ? [
        ['catalog', 'platform-catalog'],
        ['purchase-requests', 'platform-purchase-requests'],
        ['manual-order-entry', 'platform-manual-order'],
        ['inventory', 'logistics-inventory'],
        ['logistics', 'logistics-dashboard'],
        ['dispatch', 'logistics-dispatch'],
        ['pod', 'logistics-pod'],
        ['documents', 'platform-documents'],
        ['clients', 'platform-clients'],
        ['analytics', 'logistics-analytics'],
        ['profile', 'platform-profile'],
      ]
    : [
        ['home', 'portal-home'],
        ['catalog', 'portal-catalog'],
        ['request-builder', 'portal-request-builder'],
        ['requests', 'portal-requests'],
        ['orders', 'portal-orders'],
        ['profile', 'portal-profile'],
        ['support', 'portal-support'],
        ['legal', 'portal-legal'],
      ];

  return screens.map(([path, screen]) => ({
    path,
    component: NexaReferenceScreen,
    data: { screen },
  }));
}
