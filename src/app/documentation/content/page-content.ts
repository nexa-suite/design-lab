import { ALL_DOCUMENTATION_PAGE_METADATA } from '../navigation/documentation-registry';
import type { DocumentationPage, DocumentationPageContent } from '../models/documentation-page';
import { START_HERE_CONTENT } from './start-here-content';
import { FOUNDATIONS_CONTENT } from './foundations-content';
import { COMPONENTS_CONTENT } from './components-content';
import { PATTERNS_CONTENT } from './patterns-content';
import { QUALITY_CONTENT } from './quality-content';
import { ENGINEERING_CONTENT } from './engineering-content';
import { DOCUMENTATION_ADOPTION_BY_ID } from './documentation-adoption';

const CONTENT_BY_ID = new Map<string, DocumentationPageContent>([
  ...START_HERE_CONTENT,
  ...FOUNDATIONS_CONTENT,
  ...COMPONENTS_CONTENT,
  ...PATTERNS_CONTENT,
  ...QUALITY_CONTENT,
  ...ENGINEERING_CONTENT,
].map((content) => [content.id, content]));

export const ALL_DOCUMENTATION_PAGES: readonly DocumentationPage[] = ALL_DOCUMENTATION_PAGE_METADATA.map((metadata) => {
  const content = CONTENT_BY_ID.get(metadata.id);
  if (!content) throw new Error('Missing documentation content for ' + metadata.id);
  const adoption = DOCUMENTATION_ADOPTION_BY_ID[metadata.id];
  if (!adoption) throw new Error('Missing documentation adoption for ' + metadata.id);
  return { ...content, ...metadata, adoption };
});

export const DOCUMENTATION_PAGE_MAP = new Map(
  ALL_DOCUMENTATION_PAGES.map((documentationPage) => [documentationPage.id, documentationPage]),
);
