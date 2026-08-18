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
const loadPatternPage = () =>
  import('./documentation/patterns/other/pattern-page').then(({ NexaPatternPage }) => NexaPatternPage);
const loadAuthenticationPage = () =>
  import('./documentation/patterns/authentication/authentication-page').then(({ NexaAuthenticationPage }) => NexaAuthenticationPage);
const loadAnalyticsPage = () =>
  import('./documentation/patterns/analytics/analytics-page').then(({ NexaAnalyticsPage }) => NexaAnalyticsPage);
const loadDispatchBoardPage = () =>
  import('./documentation/patterns/dispatch-board/dispatch-board-page').then(({ NexaDispatchBoardPage }) => NexaDispatchBoardPage);

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
      ...pageRoutes(loadComponentPage, [
        ['components/buttons', 'buttons'],
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
        ['components/progress-indicators', 'progress-indicators'],
        ['components/workflow-steps', 'workflow-steps'],
        ['components/numeric-stepper', 'numeric-stepper'],
        ['components/slider', 'slider'],
        ['components/navigation-sidebars', 'navigation-sidebars'],
      ]),
      { path: 'patterns', pathMatch: 'full', redirectTo: 'patterns/forms' },
      ...pageRoutes(loadPatternPage, [
        ['patterns/forms', 'forms'],
        ['patterns/search-filtering', 'search-filtering'],
        ['patterns/async-operations', 'async-operations'],
        ['patterns/empty-loading-error', 'empty-loading-error'],
        ['patterns/legal-content', 'legal-content'],
        ['patterns/payments', 'payments'],
        ['patterns/data-dense-operations', 'data-dense-operations'],
        ['patterns/responsive', 'responsive'],
      ]),
      ...pageRoutes(loadAuthenticationPage, [['patterns/authentication', 'authentication']]),
      ...pageRoutes(loadAnalyticsPage, [['patterns/analytics', 'analytics']]),
      ...pageRoutes(loadDispatchBoardPage, [['patterns/dispatch-board', 'dispatch-board']]),
      { path: 'quality', pathMatch: 'full', redirectTo: 'quality/accessibility-lab' },
      ...pageRoutes(loadContextPage, [
        ['quality/accessibility-lab', 'accessibility-lab'],
        ['quality/contrast-lab', 'contrast-lab'],
        ['quality/heuristics', 'heuristics'],
        ['quality/input-modality', 'input-modality'],
        ['quality/component-maturity', 'component-maturity'],
      ]),
      { path: 'engineering', pathMatch: 'full', redirectTo: 'engineering/angular-architecture' },
      ...pageRoutes(loadContextPage, [
        ['engineering/angular-architecture', 'angular-architecture'],
        ['engineering/design-tokens', 'design-tokens'],
        ['engineering/component-apis', 'component-apis'],
        ['engineering/testing', 'testing'],
        ['engineering/figma-mapping', 'figma-mapping'],
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
