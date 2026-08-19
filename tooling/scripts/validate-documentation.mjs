import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const registryPath = join(root, 'src', 'app', 'documentation', 'navigation', 'documentation-registry.ts');
const routesPath = join(root, 'src', 'app', 'app.routes.ts');
const registry = readFileSync(registryPath, 'utf8');
const routes = readFileSync(routesPath, 'utf8');
const violations = [];

const ids = [...registry.matchAll(/\bid:\s*'([^']+)'/g)].map((match) => match[1]);
const paths = [...registry.matchAll(/\bpath:\s*'([^']+)'/g)].map((match) => match[1]);
if (new Set(ids).size !== ids.length) violations.push('documentation registry contains duplicate ids');
if (new Set(paths).size !== paths.length) violations.push('documentation registry contains duplicate paths');
if (/figma-mapping/.test(registry)) violations.push('retired Figma Mapping remains in primary navigation metadata');
if (!/design-adoption/.test(registry) || !/Design Adoption/.test(registry)) violations.push('Design Adoption & Handoff is missing from primary navigation');
if (/patterns\/other|loadPatternPage/.test(routes)) violations.push('catch-all pattern renderer remains in routing');
if (!/import\('\.\/documentation\/patterns\/analytics\/analytics-page'/.test(routes)) violations.push('Analytics route does not use an explicit feature import');
if (!/import\('\.\/documentation\/patterns\/authentication\/authentication-page'/.test(routes)) violations.push('Authentication route does not use an explicit feature import');
if (!/import\('\.\/documentation\/patterns\/dispatch-board\/dispatch-board-page'/.test(routes)) violations.push('Dispatch Board route does not use an explicit feature import');

const requiredPages = [
  'documentation/context/context-documentation.html',
  'documentation/foundations/foundation-documentation.html',
  'documentation/components/component-documentation.html',
  'documentation/patterns/forms/forms-page.html',
  'documentation/patterns/search-filtering/search-filtering-page.html',
  'documentation/patterns/empty-loading-error/empty-loading-error-page.html',
  'documentation/patterns/responsive-composition/responsive-composition-page.html',
  'documentation/patterns/authentication/authentication-page.html',
  'documentation/patterns/catalog/catalog-page.html',
  'documentation/patterns/request-builder/request-builder-page.html',
  'documentation/patterns/order-flow/order-flow-page.html',
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
  if (!/<h2\b/.test(html)) violations.push(`${page} has no substantive heading`);
  if (!/<(?:article|button|table|svg|nexa-)/.test(html)) violations.push(`${page} has no rendered evidence or interaction`);
}

const catchAll = join(root, 'src', 'app', 'documentation', 'patterns', 'other');
if (statSync(catchAll, { throwIfNoEntry: false }) && readdirSync(catchAll).some((entry) => /\.(?:ts|html|scss)$/.test(entry))) {
  violations.push('patterns/other still contains renderer files');
}
const componentHtml = readFileSync(join(root, 'src', 'app', 'documentation', 'components', 'component-documentation.html'), 'utf8');
if (/generic process evidence/i.test(componentHtml)) violations.push('generic Process Evidence filler remains in component documentation');
if (!/hasTemporalEvidence/.test(componentHtml)) violations.push('component documentation does not gate temporal evidence by component behavior');
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
