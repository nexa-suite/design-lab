import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ALL_DOCUMENTATION_PAGES, DOCUMENTATION_PAGE_MAP } from '../content/page-content';
import type { DocumentationPage } from '../models/documentation-page';

export interface DocumentationRouteContext {
  readonly page: DocumentationPage;
  readonly allPages: readonly DocumentationPage[];
}

export function injectDocumentationRouteContext(): DocumentationRouteContext {
  const route = inject(ActivatedRoute);
  const page = DOCUMENTATION_PAGE_MAP.get(String(route.snapshot.data['page'] ?? 'overview'))
    ?? DOCUMENTATION_PAGE_MAP.get('overview');
  if (!page) throw new Error('Documentation route metadata missing overview page.');
  return { page, allPages: ALL_DOCUMENTATION_PAGES };
}
