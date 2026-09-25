import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const registryPath = join(root, 'src', 'app', 'documentation', 'navigation', 'documentation-registry.ts');
const routesPath = join(root, 'src', 'app', 'app.routes.ts');
const visualManifestPath = join(root, 'tooling', 'visual-regression', 'manifest.json');
const registry = readFileSync(registryPath, 'utf8');
const routes = readFileSync(routesPath, 'utf8');
const violations = [];
function filesUnder(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesUnder(path) : /\.(?:ts|html|scss)$/.test(entry.name) ? [path] : [];
  });
}

const ids = [...registry.matchAll(/\bid:\s*'([^']+)'/g)].map((match) => match[1]);
const paths = [...registry.matchAll(/\bpath:\s*'([^']+)'/g)].map((match) => match[1]);
if (new Set(ids).size !== ids.length) violations.push('documentation registry contains duplicate ids');
if (new Set(paths).size !== paths.length) violations.push('documentation registry contains duplicate paths');
const registryEntries = registry.split('\n').filter((line) => /^\s*\{ id:/.test(line));
const validKinds = new Set(['overview', 'principles', 'foundation', 'component', 'pattern', 'quality', 'engineering']);
const validStatuses = new Set(['FROZEN', 'CANDIDATE', 'EXPERIMENTAL', 'DEPRECATED']);
if (registryEntries.length !== ids.length) violations.push('documentation registry contains an entry that is not shaped as explicit route metadata');
for (const entry of registryEntries) {
  const field = (name) => entry.match(new RegExp(`${name}: '([^']+)'`))?.[1];
  const id = field('id') ?? 'unknown';
  for (const required of ['id', 'path', 'label', 'icon', 'group', 'kind', 'status', 'searchText']) {
    if (!field(required)) violations.push(`documentation metadata is missing ${required} for ${id}`);
  }
  if (field('kind') && !validKinds.has(field('kind'))) violations.push(`documentation metadata has an unknown kind for ${id}`);
  if (field('status') && !validStatuses.has(field('status'))) violations.push(`documentation metadata has an unknown maturity status for ${id}`);
  const related = entry.match(/relatedPageIds:\s*\[([^\]]*)\]/)?.[1]?.match(/'([^']+)'/g)?.map((value) => value.slice(1, -1)) ?? [];
  for (const relatedId of related) {
    if (!ids.includes(relatedId)) violations.push(`broken related-page reference ${id} -> ${relatedId}`);
  }
}
for (const path of paths) {
  if (!routes.includes(`'${path}'`)) violations.push(`registered documentation path has no Angular route: ${path}`);
}
const routePageIds = [
  ...[...routes.matchAll(/\[\s*'[^']+'\s*,\s*'([^']+)'\s*\]/g)].map((match) => match[1]),
  ...[...routes.matchAll(/data:\s*\{\s*page:\s*'([^']+)'/g)].map((match) => match[1]),
];
for (const pageId of routePageIds) {
  if (!ids.includes(pageId)) violations.push(`Angular route has no documentation metadata: ${pageId}`);
}
if (/figma-mapping/.test(registry)) violations.push('retired Figma Mapping remains in primary navigation metadata');
if (!/design-adoption/.test(registry) || !/Design Adoption/.test(registry)) violations.push('Design Adoption & Handoff is missing from primary navigation');
if (!existsSync(visualManifestPath)) violations.push('visual evidence manifest is missing');
const generatedTokenReference = join(root, 'src', 'app', 'documentation', 'content', 'token-reference.generated.ts');
if (!existsSync(generatedTokenReference) || !readFileSync(generatedTokenReference, 'utf8').startsWith('/* Generated from tokens/*.tokens.json')) {
  violations.push('documentation token reference is not generated from canonical token sources');
}
const contentFiles = ['start-here-content.ts', 'foundations-content.ts', 'components-content.ts', 'patterns-content.ts', 'quality-content.ts', 'engineering-content.ts'];
const contentIds = contentFiles.flatMap((file) => [...readFileSync(join(root, 'src', 'app', 'documentation', 'content', file), 'utf8').matchAll(/\bid:\s*'([^']+)'/g)].map((match) => match[1]));
if (new Set(contentIds).size !== contentIds.length) violations.push('documentation content contains duplicate ids');
for (const id of ids) if (!contentIds.includes(id)) violations.push(`documentation route metadata has no substantive content: ${id}`);
for (const id of contentIds) if (!ids.includes(id)) violations.push(`documentation content is not reachable from navigation metadata: ${id}`);
if (/patterns\/other|loadPatternPage/.test(routes)) violations.push('catch-all pattern renderer remains in routing');
if (!/import\('\.\/documentation\/patterns\/analytics\/analytics-page'/.test(routes)) violations.push('Analytics route does not use an explicit feature import');
if (!/import\('\.\/documentation\/patterns\/authentication\/authentication-page'/.test(routes)) violations.push('Authentication route does not use an explicit feature import');
if (!/import\('\.\/documentation\/patterns\/dispatch-board\/dispatch-board-page'/.test(routes)) violations.push('Dispatch Board route does not use an explicit feature import');

const requiredPages = [
  'documentation/context/context-documentation.html',
  'documentation/foundations/foundation-documentation.html',
  'documentation/components/component-documentation.html',
  'documentation/components/button-page.html',
  'documentation/components/progress-page.html',
  'documentation/patterns/forms/forms-page.html',
  'documentation/patterns/search-filtering/search-filtering-page.html',
  'documentation/patterns/async-operations/async-operations-page.html',
  'documentation/patterns/empty-loading-error/empty-loading-error-page.html',
  'documentation/patterns/legal-content/legal-content-page.html',
  'documentation/patterns/responsive-composition/responsive-composition-page.html',
  'documentation/patterns/authentication/authentication-page.html',
  'documentation/patterns/catalog/catalog-page.html',
  'documentation/patterns/request-builder/request-builder-page.html',
  'documentation/patterns/order-flow/order-flow-page.html',
  'documentation/patterns/delivery-pod/delivery-pod-page.html',
  'documentation/patterns/map-location/map-location-page.html',
  'documentation/patterns/data-dense-operations/data-dense-operations-page.html',
  'documentation/patterns/payments/payments-page.html',
  'documentation/patterns/analytics/analytics-page.html',
  'documentation/patterns/dispatch-board/dispatch-board-page.html',
  'documentation/quality/quality-page.html',
  'documentation/engineering/engineering-page.html',
];
for (const page of requiredPages) {
  const path = join(root, 'src', 'app', page);
  if (!existsSync(path)) {
    violations.push(`${page} is missing`);
    continue;
  }
  const html = readFileSync(path, 'utf8');
  if (!/<h2\b/.test(html) && !/<nexa-documentation-section\b[^>]*\btitle=/.test(html)) violations.push(`${page} has no substantive heading`);
  if (!/<(?:article|button|table|svg|nexa-)/.test(html)) violations.push(`${page} has no rendered evidence or interaction`);
}

const evidenceContracts = [
  ['documentation/components/button-page.html', ['ACTION CONTRACT', 'STATE MATRIX', 'TEMPORAL EVIDENCE']],
  ['documentation/components/progress-page.html', ['PROGRESS FAMILY', 'Reduced Motion', 'Content skeleton']],
  ['documentation/patterns/forms/forms-page.html', ['FIELD GROUP', 'SUBMISSION CONTRACT', 'submissionStates']],
  ['documentation/patterns/search-filtering/search-filtering-page.html', ['QUERY / SCOPE / FILTER GROUPS', 'RESULT STATES', 'Retry']],
  ['documentation/patterns/async-operations/async-operations-page.html', ['HAPPY PATH', 'FAILURE / RECOVERY', 'WARNING / CANCELLATION']],
  ['documentation/patterns/empty-loading-error/empty-loading-error-page.html', ['STATE COMPOSITION', 'STATE TAXONOMY', 'Cancelled']],
  ['documentation/patterns/legal-content/legal-content-page.html', ['LEGAL CONTENT REQUIRES FORMAL APPROVAL.', 'SYNTHETIC DOCUMENT / REVIEW ONLY', 'Document contents']],
  ['documentation/patterns/responsive-composition/responsive-composition-page.html', ['VIEWPORT MATRIX', 'SAME COMPOSITION / DEVICE FRAMES', '200% and 400% checks']],
  ['documentation/patterns/authentication/authentication-page.html', ['BRAND PLANE', 'STATE COVERAGE', 'nexa-locale-switcher']],
  ['documentation/patterns/catalog/catalog-page.html', ['CATALOG BROWSING', 'PRODUCT DETAIL', 'Browsing never reserves inventory']],
  ['documentation/patterns/request-builder/request-builder-page.html', ['CART / DRAFT', 'REQUEST BUILDER', 'Cart ≠ request ≠ order']],
  ['documentation/patterns/order-flow/order-flow-page.html', ['ORDER / TRACKING STATUS', 'BUSINESS DOCUMENTS', 'nexa-state-sequence']],
  ['documentation/patterns/delivery-pod/delivery-pod-page.html', ['DELIVERY / POD', 'RECEIPT DETAILS', 'Driver and mobile execution remain runway evidence']],
  ['documentation/patterns/map-location/map-location-page.html', ['MAP / LOCATION', 'ACCESSIBLE ALTERNATIVE', 'provider-unavailable']],
  ['documentation/patterns/data-dense-operations/data-dense-operations-page.html', ['DATA-DENSE OPERATIONS', 'Table state', '<table']],
  ['documentation/patterns/payments/payments-page.html', ['PAYMENT COMPOSITION', 'SYNTHETIC ENTRY', 'USER-SAFE FAILURE']],
  ['documentation/patterns/analytics/analytics-page.html', ['VISUALIZATION GRAMMAR', '<table', 'Analytics evidence state']],
  ['documentation/patterns/dispatch-board/dispatch-board-page.html', ['MOVEMENT', 'dispatch-card-select', 'Move selected card']],
  ['documentation/quality/quality-page.html', ['EVALUATION MODES', 'SEMANTIC INTERACTION EVIDENCE', 'SCREEN READER']],
  ['documentation/engineering/engineering-page.html', ['FEATURE AREAS', 'TOKEN GRAPH', 'PUBLIC CONTRACTS']],
];
for (const [relativePath, markers] of evidenceContracts) {
  const path = join(root, 'src', 'app', relativePath);
  const html = readFileSync(path, 'utf8');
  for (const marker of markers) {
    if (!html.includes(marker)) violations.push(`${relativePath} is missing substantive evidence marker: ${marker}`);
  }
}

const catchAll = join(root, 'src', 'app', 'documentation', 'patterns', 'other');
if (statSync(catchAll, { throwIfNoEntry: false })) violations.push('patterns/other catch-all ownership directory remains');
const componentHtml = readFileSync(join(root, 'src', 'app', 'documentation', 'components', 'component-documentation.html'), 'utf8');
if (/generic process evidence/i.test(componentHtml)) violations.push('generic Process Evidence filler remains in component documentation');
if (!/hasTemporalEvidence/.test(componentHtml)) violations.push('component documentation does not gate temporal evidence by component behavior');
const componentContent = readFileSync(join(root, 'src', 'app', 'documentation', 'content', 'components-content.ts'), 'utf8');
const componentGuidance = readFileSync(join(root, 'src', 'app', 'documentation', 'content', 'component-guidance.ts'), 'utf8');
const requiredComponentFields = ['title', 'intro', 'summary', 'decision', 'foundation', 'angularContract', 'adoptionMapping'];
const requiredGuidanceTitles = ['Anatomy', 'States', 'Accessibility', 'Tokens', 'Use it when'];
function componentEntry(id) {
  const marker = `id: '${id}'`;
  const start = componentContent.lastIndexOf('{', componentContent.indexOf(marker));
  const end = componentContent.indexOf('\n  },', componentContent.indexOf(marker));
  return start >= 0 && end >= 0 ? componentContent.slice(start, end) : '';
}
function guidanceEntry(id) {
  const markers = [`${id}: [`, `'${id}': [`];
  const start = markers.map((marker) => componentGuidance.indexOf(marker)).find((index) => index >= 0);
  if (start === undefined) return '';
  const end = componentGuidance.indexOf('\n  ],', start);
  return end >= 0 ? componentGuidance.slice(start, end) : '';
}
for (const [, id] of componentContent.matchAll(/id:\s*'([^']+)'[^\n]+kind:\s*'component'/g)) {
  const entry = componentEntry(id);
  for (const field of requiredComponentFields) {
    if (!new RegExp(`\\b${field}:`).test(entry)) violations.push(`component metadata is missing ${field} for ${id}`);
  }
  const guidance = guidanceEntry(id);
  if (!guidance) {
    violations.push(`component guidance is missing for ${id}`);
    continue;
  }
  for (const title of requiredGuidanceTitles) {
    if (!guidance.includes(`title: '${title}'`)) violations.push(`component guidance is missing ${title} evidence for ${id}`);
  }
}
for (const file of filesUnder(join(root, 'src', 'app', 'documentation'))) {
  const text = readFileSync(file, 'utf8');
  if (/figmaMapping|\bFigma mapping\b/i.test(text)) violations.push(`${relative(root, file)} retains retired Figma Mapping terminology`);
  if (/^\s*<h1\b/m.test(text) && !/<(?:article|button|table|svg|nexa-)/.test(text)) violations.push(`${relative(root, file)} appears to be a heading-only documentation page`);
}
for (const stylesheet of [
  'documentation/foundations/foundation-documentation.scss',
  'documentation/context/context-documentation.scss',
  'documentation/patterns/pattern-foundation.scss',
]) {
  const source = readFileSync(join(root, 'src', 'app', stylesheet), 'utf8');
  if (/section-heading::before|section-heading:before/.test(source)) violations.push(`${stylesheet} owns a duplicate section divider pseudo-element`);
}

if (violations.length) {
  console.error('Documentation validation failed.');
  for (const violation of violations) console.error(`- ${violation}`);
  process.exit(1);
}

console.log(`Documentation validation passed: ${ids.length} registered pages, focused route features, no catch-all renderer or duplicate section divider.`);
