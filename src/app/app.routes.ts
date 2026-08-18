import { Routes } from '@angular/router';

const loadLabShell = () =>
  import('./shell/shell').then(({ NexaDesignLabShell }) => NexaDesignLabShell);
const loadDocumentationPage = () =>
  import('./guidelines/documentation-page').then(
    ({ NexaDocumentationPage }) => NexaDocumentationPage,
  );

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'guidelines/overview' },
  {
    path: 'guidelines',
    loadComponent: loadLabShell,
    children: [
      { path: 'overview', loadComponent: loadDocumentationPage, data: { page: 'overview' } },
      { path: 'principles', loadComponent: loadDocumentationPage, data: { page: 'principles' } },
      { path: 'maturity', loadComponent: loadDocumentationPage, data: { page: 'maturity' } },
      { path: 'foundations', pathMatch: 'full', redirectTo: 'foundations/color' },
      ...documentationRoutes('foundations', [
        ['color', 'color'],
        ['typography', 'typography'],
        ['layout-spacing', 'layout-spacing'],
        ['shape-radius', 'shape-radius'],
        ['surfaces', 'surfaces'],
        ['iconography', 'iconography'],
        ['motion', 'motion'],
      ]),
      { path: 'components', pathMatch: 'full', redirectTo: 'components/buttons' },
      ...documentationRoutes('components', [
        ['buttons', 'buttons'],
        ['text-fields', 'text-fields'],
        ['search-fields', 'search-fields'],
        ['select-combobox', 'select-combobox'],
        ['checkbox', 'checkbox'],
        ['radio', 'radio'],
        ['toggle', 'toggle'],
        ['segmented-control', 'segmented-control'],
        ['status-badges', 'status-badges'],
        ['alerts-feedback', 'alerts-feedback'],
        ['menus', 'menus'],
        ['tooltips', 'tooltips'],
        ['dialogs-overlays', 'dialogs-overlays'],
        ['cards-surfaces', 'cards-surfaces'],
        ['lists-tables', 'lists-tables'],
        ['progress-indicators', 'progress-indicators'],
        ['workflow-steps', 'workflow-steps'],
        ['numeric-stepper', 'numeric-stepper'],
        ['slider', 'slider'],
        ['navigation-sidebars', 'navigation-sidebars'],
      ]),
      { path: 'patterns', pathMatch: 'full', redirectTo: 'patterns/forms' },
      ...documentationRoutes('patterns', [
        ['forms', 'forms'],
        ['search-filtering', 'search-filtering'],
        ['async-operations', 'async-operations'],
        ['empty-loading-error', 'empty-loading-error'],
        ['authentication', 'authentication'],
        ['responsive', 'responsive'],
      ]),
      { path: 'quality', pathMatch: 'full', redirectTo: 'quality/accessibility-lab' },
      ...documentationRoutes('quality', [
        ['accessibility-lab', 'accessibility-lab'],
        ['contrast-lab', 'contrast-lab'],
        ['heuristics', 'heuristics'],
        ['input-modality', 'input-modality'],
        ['component-maturity', 'component-maturity'],
      ]),
      { path: 'engineering', pathMatch: 'full', redirectTo: 'engineering/angular-architecture' },
      ...documentationRoutes('engineering', [
        ['angular-architecture', 'angular-architecture'],
        ['design-tokens', 'design-tokens'],
        ['component-apis', 'component-apis'],
        ['testing', 'testing'],
        ['figma-mapping', 'figma-mapping'],
      ]),
      // Incoming RC2 links keep resolving without recreating any retired runtime screen.
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
