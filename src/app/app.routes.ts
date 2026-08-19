import type { Type } from '@angular/core';
import { Routes } from '@angular/router';

const loadLabShell = () =>
  import('./shell/shell').then(({ NexaDesignLabShell }) => NexaDesignLabShell);
const loadContextPage = () =>
  import('./documentation/context/context-page').then(({ NexaContextPage }) => NexaContextPage);
const loadFoundationPage = () =>
  import('./documentation/foundations/foundation-page').then(({ NexaFoundationPage }) => NexaFoundationPage);
const loadComponentPage = () =>
  import('./documentation/components/component-page').then(({ NexaComponentPage }) => NexaComponentPage);
const loadButtonPage = () =>
  import('./documentation/components/button-page').then(({ NexaButtonPage }) => NexaButtonPage);
const loadProgressPage = () =>
  import('./documentation/components/progress-page').then(({ NexaProgressPage }) => NexaProgressPage);
const loadFormsPage = () =>
  import('./documentation/patterns/forms/forms-page').then(({ NexaFormsPage }) => NexaFormsPage);
const loadSearchFilteringPage = () =>
  import('./documentation/patterns/search-filtering/search-filtering-page').then(({ NexaSearchFilteringPage }) => NexaSearchFilteringPage);
const loadAsyncOperationsPage = () =>
  import('./documentation/patterns/async-operations/async-operations-page').then(({ NexaAsyncOperationsPage }) => NexaAsyncOperationsPage);
const loadEmptyLoadingErrorPage = () =>
  import('./documentation/patterns/empty-loading-error/empty-loading-error-page').then(({ NexaEmptyLoadingErrorPage }) => NexaEmptyLoadingErrorPage);
const loadLegalContentPage = () =>
  import('./documentation/patterns/legal-content/legal-content-page').then(({ NexaLegalContentPage }) => NexaLegalContentPage);
const loadPaymentsPage = () =>
  import('./documentation/patterns/payments/payments-page').then(({ NexaPaymentsPage }) => NexaPaymentsPage);
const loadDataDenseOperationsPage = () =>
  import('./documentation/patterns/data-dense-operations/data-dense-operations-page').then(({ NexaDataDenseOperationsPage }) => NexaDataDenseOperationsPage);
const loadResponsiveCompositionPage = () =>
  import('./documentation/patterns/responsive-composition/responsive-composition-page').then(({ NexaResponsiveCompositionPage }) => NexaResponsiveCompositionPage);
const loadCatalogPage = () =>
  import('./documentation/patterns/catalog/catalog-page').then(({ NexaCatalogPage }) => NexaCatalogPage);
const loadRequestBuilderPage = () =>
  import('./documentation/patterns/request-builder/request-builder-page').then(({ NexaRequestBuilderPage }) => NexaRequestBuilderPage);
const loadOrderFlowPage = () =>
  import('./documentation/patterns/order-flow/order-flow-page').then(({ NexaOrderFlowPage }) => NexaOrderFlowPage);
const loadDeliveryPodPage = () =>
  import('./documentation/patterns/delivery-pod/delivery-pod-page').then(({ NexaDeliveryPodPage }) => NexaDeliveryPodPage);
const loadMapLocationPage = () =>
  import('./documentation/patterns/map-location/map-location-page').then(({ NexaMapLocationPage }) => NexaMapLocationPage);
const loadAuthenticationPage = () =>
  import('./documentation/patterns/authentication/authentication-page').then(({ NexaAuthenticationPage }) => NexaAuthenticationPage);
const loadAnalyticsPage = () =>
  import('./documentation/patterns/analytics/analytics-page').then(({ NexaAnalyticsPage }) => NexaAnalyticsPage);
const loadDispatchBoardPage = () =>
  import('./documentation/patterns/dispatch-board/dispatch-board-page').then(({ NexaDispatchBoardPage }) => NexaDispatchBoardPage);
const loadQualityPage = () =>
  import('./documentation/quality/quality-page').then(({ NexaQualityPage }) => NexaQualityPage);
const loadEngineeringPage = () =>
  import('./documentation/engineering/engineering-page').then(({ NexaEngineeringPage }) => NexaEngineeringPage);

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'guidelines/overview' },
  {
    path: 'guidelines',
    loadComponent: loadLabShell,
    children: [
      ...pageRoutes(loadContextPage, [
        ['overview', 'overview'],
        ['principles', 'principles'],
        ['maturity', 'maturity'],
      ]),
      { path: 'foundations', pathMatch: 'full', redirectTo: 'foundations/color' },
      ...pageRoutes(loadFoundationPage, [
        ['foundations/color', 'color'],
        ['foundations/brand-logo', 'brand-logo'],
        ['foundations/typography', 'typography'],
        ['foundations/layout-spacing', 'layout-spacing'],
        ['foundations/shape-radius', 'shape-radius'],
        ['foundations/surfaces', 'surfaces'],
        ['foundations/iconography', 'iconography'],
        ['foundations/motion', 'motion'],
      ]),
      { path: 'components', pathMatch: 'full', redirectTo: 'components/buttons' },
      { path: 'components/buttons', loadComponent: loadButtonPage, data: { page: 'buttons' } },
      { path: 'components/progress-indicators', loadComponent: loadProgressPage, data: { page: 'progress-indicators' } },
      ...pageRoutes(loadComponentPage, [
        ['components/text-fields', 'text-fields'],
        ['components/search-fields', 'search-fields'],
        ['components/select-combobox', 'select-combobox'],
        ['components/checkbox', 'checkbox'],
        ['components/radio', 'radio'],
        ['components/toggle', 'toggle'],
        ['components/segmented-control', 'segmented-control'],
        ['components/status-badges', 'status-badges'],
        ['components/alerts-feedback', 'alerts-feedback'],
        ['components/menus', 'menus'],
        ['components/tooltips', 'tooltips'],
        ['components/dialogs-overlays', 'dialogs-overlays'],
        ['components/cards-surfaces', 'cards-surfaces'],
        ['components/lists-tables', 'lists-tables'],
        ['components/workflow-steps', 'workflow-steps'],
        ['components/numeric-stepper', 'numeric-stepper'],
        ['components/slider', 'slider'],
        ['components/navigation-sidebars', 'navigation-sidebars'],
      ]),
      { path: 'patterns', pathMatch: 'full', redirectTo: 'patterns/forms' },
      ...pageRoutes(loadFormsPage, [['patterns/forms', 'forms']]),
      ...pageRoutes(loadSearchFilteringPage, [['patterns/search-filtering', 'search-filtering']]),
      ...pageRoutes(loadAsyncOperationsPage, [['patterns/async-operations', 'async-operations']]),
      ...pageRoutes(loadEmptyLoadingErrorPage, [['patterns/empty-loading-error', 'empty-loading-error']]),
      ...pageRoutes(loadLegalContentPage, [['patterns/legal-content', 'legal-content']]),
      ...pageRoutes(loadPaymentsPage, [['patterns/payments', 'payments']]),
      ...pageRoutes(loadDataDenseOperationsPage, [['patterns/data-dense-operations', 'data-dense-operations']]),
      ...pageRoutes(loadResponsiveCompositionPage, [['patterns/responsive', 'responsive']]),
      ...pageRoutes(loadCatalogPage, [['patterns/catalog', 'catalog']]),
      ...pageRoutes(loadRequestBuilderPage, [['patterns/request-builder', 'request-builder']]),
      ...pageRoutes(loadOrderFlowPage, [['patterns/order-flow', 'order-flow']]),
      ...pageRoutes(loadDeliveryPodPage, [['patterns/delivery-pod', 'delivery-pod']]),
      ...pageRoutes(loadMapLocationPage, [['patterns/map-location', 'map-location']]),
      ...pageRoutes(loadAuthenticationPage, [['patterns/authentication', 'authentication']]),
      ...pageRoutes(loadAnalyticsPage, [['patterns/analytics', 'analytics']]),
      ...pageRoutes(loadDispatchBoardPage, [['patterns/dispatch-board', 'dispatch-board']]),
      { path: 'quality', pathMatch: 'full', redirectTo: 'quality/accessibility-lab' },
      ...pageRoutes(loadQualityPage, [
        ['quality/accessibility-lab', 'accessibility-lab'],
        ['quality/contrast-lab', 'contrast-lab'],
        ['quality/heuristics', 'heuristics'],
        ['quality/input-modality', 'input-modality'],
        ['quality/component-maturity', 'component-maturity'],
      ]),
      { path: 'engineering', pathMatch: 'full', redirectTo: 'engineering/angular-architecture' },
      ...pageRoutes(loadEngineeringPage, [
        ['engineering/angular-architecture', 'angular-architecture'],
        ['engineering/design-tokens', 'design-tokens'],
        ['engineering/component-apis', 'component-apis'],
        ['engineering/testing', 'testing'],
        ['engineering/design-adoption', 'design-adoption'],
      ]),
      { path: 'foundations/materials', pathMatch: 'full', redirectTo: 'foundations/surfaces' },
      { path: 'components/select-combo', pathMatch: 'full', redirectTo: 'components/select-combobox' },
      { path: 'components/selection', pathMatch: 'full', redirectTo: 'components/checkbox' },
      { path: 'components/overlays', pathMatch: 'full', redirectTo: 'components/dialogs-overlays' },
      { path: 'components/progress-steppers', pathMatch: 'full', redirectTo: 'components/progress-indicators' },
      { path: 'patterns/states', pathMatch: 'full', redirectTo: 'patterns/empty-loading-error' },
      { path: 'quality/accessibility', pathMatch: 'full', redirectTo: 'quality/accessibility-lab' },
      { path: 'engineering/angular-compatibility', pathMatch: 'full', redirectTo: 'engineering/angular-architecture' },
      { path: 'engineering/component-coverage', pathMatch: 'full', redirectTo: 'engineering/testing' },
      { path: 'engineering/figma-mapping', pathMatch: 'full', redirectTo: 'engineering/design-adoption' },
      { path: 'material', pathMatch: 'full', redirectTo: 'engineering/angular-architecture' },
    ],
  },
  { path: '**', redirectTo: 'guidelines/overview' },
];

function pageRoutes(
  loadComponent: () => Promise<Type<unknown>>,
  pages: readonly (readonly [string, string])[],
): Routes {
  return pages.map(([path, page]) => ({ path, loadComponent, data: { page } }));
}
