import { Routes } from '@angular/router';

const loadLabShell = () =>
  import('./shell/shell').then(({ NexaDesignLabShell }) => NexaDesignLabShell);
const loadDocumentationPage = () =>
  import('./guidelines/documentation-page').then(
    ({ NexaDocumentationPage }) => NexaDocumentationPage,
  );

const loadPlatformShell = () =>
  import('./reference/reference-shell').then(({ NexaPlatformShell }) => NexaPlatformShell);
const loadPortalShell = () =>
  import('./reference/reference-shell').then(({ NexaPortalShell }) => NexaPortalShell);
const loadAuthShell = () =>
  import('./reference/reference-shell').then(({ NexaAuthShell }) => NexaAuthShell);
const loadReferenceScreen = () =>
  import('./reference/reference-screen').then(({ NexaReferenceScreen }) => NexaReferenceScreen);
const loadInventoryReference = () =>
  import('./reference/inventory-reference').then(
    ({ NexaInventoryReference }) => NexaInventoryReference,
  );
const loadManualOrderReference = () =>
  import('./reference/manual-order-reference').then(
    ({ NexaManualOrderReference }) => NexaManualOrderReference,
  );
const loadAnalyticsReference = () =>
  import('./reference/analytics-reference').then(
    ({ NexaAnalyticsReference }) => NexaAnalyticsReference,
  );
const loadPortalOrdersReference = () =>
  import('./reference/portal-orders-reference').then(
    ({ NexaPortalOrdersReference }) => NexaPortalOrdersReference,
  );
const loadPortalHomeReference = () =>
  import('./reference/portal-home-reference').then(
    ({ NexaPortalHomeReference }) => NexaPortalHomeReference,
  );
const loadAuthReference = () =>
  import('./reference/auth-reference').then(({ NexaAuthReference }) => NexaAuthReference);
const loadDashboard = () =>
  import('./dashboard/dashboard').then(({ NexaDashboard }) => NexaDashboard);
const loadOperationalTable = () =>
  import('./operational-table/operational-table').then(
    ({ NexaOperationalTable }) => NexaOperationalTable,
  );

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'guidelines/overview' },
  {
    path: 'guidelines',
    loadComponent: loadLabShell,
    children: [
      { path: 'overview', loadComponent: loadDocumentationPage, data: { page: 'overview' } },
      { path: 'principles', loadComponent: loadDocumentationPage, data: { page: 'principles' } },
      { path: 'foundations', pathMatch: 'full', redirectTo: 'foundations/color' },
      ...documentationRoutes('foundations', [
        ['color', 'color'],
        ['typography', 'typography'],
        ['materials', 'materials'],
        ['layout-spacing', 'layout-spacing'],
        ['shape-radius', 'shape-radius'],
        ['iconography', 'iconography'],
        ['motion', 'motion'],
      ]),
      { path: 'components', pathMatch: 'full', redirectTo: 'components/buttons' },
      ...documentationRoutes('components', [
        ['buttons', 'buttons'],
        ['text-fields', 'text-fields'],
        ['search-fields', 'search-fields'],
        ['select-combo', 'select-combo'],
        ['selection', 'selection'],
        ['status-badges', 'status-badges'],
        ['alerts-feedback', 'alerts-feedback'],
        ['menus', 'menus'],
        ['tooltips', 'tooltips'],
        ['overlays', 'overlays'],
        ['lists-tables', 'lists-tables'],
        ['progress-steppers', 'progress-steppers'],
        ['navigation-sidebars', 'navigation-sidebars'],
        ['cards-panels', 'cards-panels'],
      ]),
      { path: 'patterns', pathMatch: 'full', redirectTo: 'patterns/forms' },
      ...documentationRoutes('patterns', [
        ['forms', 'forms'],
        ['search-filtering', 'search-filtering'],
        ['workflows', 'workflows'],
        ['dashboards', 'dashboards'],
        ['states', 'states'],
        ['authentication', 'authentication'],
        ['responsive', 'responsive'],
      ]),
      { path: 'quality', pathMatch: 'full', redirectTo: 'quality/accessibility' },
      ...documentationRoutes('quality', [
        ['accessibility', 'accessibility'],
        ['heuristics', 'heuristics'],
        ['input-modality', 'input-modality'],
      ]),
      { path: 'engineering', pathMatch: 'full', redirectTo: 'engineering/angular-compatibility' },
      ...documentationRoutes('engineering', [
        ['angular-compatibility', 'angular-compatibility'],
        ['design-tokens', 'design-tokens'],
        ['figma-mapping', 'figma-mapping'],
        ['component-coverage', 'component-coverage'],
      ]),
      { path: 'material', pathMatch: 'full', redirectTo: 'engineering/angular-compatibility' },
    ],
  },
  {
    path: 'reference/platform',
    loadComponent: loadPlatformShell,
    children: [
      { path: 'dashboard', loadComponent: loadDashboard },
      ...referenceRoutes('platform'),
      { path: 'sales-orders', loadComponent: loadOperationalTable },
      {
        path: 'sales-orders/detail',
        loadComponent: loadReferenceScreen,
        data: { screen: 'platform-sales-order-detail' },
      },
    ],
  },
  {
    path: 'reference/portal',
    loadComponent: loadPortalShell,
    children: referenceRoutes('portal'),
  },
  {
    path: 'reference/auth',
    loadComponent: loadAuthShell,
    children: [
      { path: 'login', loadComponent: loadAuthReference, data: { screen: 'auth-login' } },
      { path: 'workspace', loadComponent: loadAuthReference, data: { screen: 'auth-workspace' } },
      {
        path: 'organization-setup',
        loadComponent: loadAuthReference,
        data: { screen: 'auth-organization-setup' },
      },
    ],
  },
  { path: '**', redirectTo: 'guidelines/overview' },
];

function documentationRoutes(
  section: string,
  pages: readonly (readonly [string, string])[],
): Routes {
  return pages.map(([path, page]) => ({
    path: `${section}/${path}`,
    loadComponent: loadDocumentationPage,
    data: { page },
  }));
}

function referenceRoutes(scope: 'platform' | 'portal'): Routes {
  const screens =
    scope === 'platform'
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
    loadComponent:
      path === 'inventory'
        ? loadInventoryReference
        : path === 'manual-order-entry'
          ? loadManualOrderReference
          : path === 'analytics'
            ? loadAnalyticsReference
            : scope === 'portal' && path === 'home'
              ? loadPortalHomeReference
              : scope === 'portal' && path === 'orders'
                ? loadPortalOrdersReference
                : loadReferenceScreen,
    data: { screen },
  }));
}
