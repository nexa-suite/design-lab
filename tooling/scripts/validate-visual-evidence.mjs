import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const manifestPath = join(root, 'tooling', 'visual-regression', 'manifest.json');
const registryPath = join(root, 'src', 'app', 'documentation', 'navigation', 'documentation-registry.ts');
const routesPath = join(root, 'src', 'app', 'app.routes.ts');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const registry = readFileSync(registryPath, 'utf8');
const routes = readFileSync(routesPath, 'utf8');
const violations = [];

const registryPaths = [...registry.matchAll(/\bpath:\s*'([^']+)'/g)].map((match) => match[1]);
const canonical = manifest.canonicalRoutes ?? [];
const screenshotEvidence = manifest.screenshotEvidence ?? [];
const canonicalPaths = canonical.map((route) => route.path);
const requiredViewports = [...(manifest.requiredViewports ?? []), ...(manifest.layoutViewports ?? [])];
const unique = (values) => new Set(values).size === values.length;

if (manifest.schemaVersion !== 1) violations.push('unsupported visual evidence manifest schema');
if (manifest.sourceSha !== 'git-head-at-capture') violations.push('manifest must bind evidence to the capture source SHA');
if (!manifest.evidenceRoot?.startsWith('tmp/')) violations.push('generated visual evidence must stay under ignored tmp/');
if (!unique(manifest.requiredViewports) || !unique(manifest.layoutViewports)) violations.push('viewport matrix contains duplicates');
if (!manifest.requiredViewports.includes(1440) || !manifest.requiredViewports.includes(390)) violations.push('canonical desktop/mobile viewports are incomplete');
for (const width of [1024, 768, 320]) if (!manifest.layoutViewports.includes(width)) violations.push(`layout viewport ${width} is missing`);
if (!unique(canonicalPaths)) violations.push('canonical visual routes contain duplicates');
if (canonical.length < 10) violations.push('canonical visual route coverage is too small');
if (!manifest.highRiskStates?.includes('selected') || !manifest.highRiskStates?.includes('focus') || !manifest.highRiskStates?.includes('error')) violations.push('high-risk state matrix is incomplete');
if (manifest.artifactTemplate?.includes('{route}') !== true || manifest.artifactTemplate?.includes('{viewport}') !== true || manifest.artifactTemplate?.includes('{state}') !== true || manifest.artifactTemplate?.includes('{sourceSha}') !== true) violations.push('artifact template does not bind route, viewport, state and source SHA');
if (screenshotEvidence.length < 10) violations.push('screenshot evidence subset is too small');
if (manifest.screenshotArtifactTemplate?.endsWith('.png') !== true || manifest.screenshotArtifactTemplate?.includes('{sourceSha}') !== true) violations.push('screenshot artifact template must bind source SHA and emit PNG evidence');
for (const field of ['route', 'viewport', 'state', 'artifact', 'result', 'sourceSha']) if (!manifest.testResultFields?.includes(field)) violations.push(`test result field ${field} is missing`);
if (!manifest.testResultFields?.includes('screenshot')) violations.push('test result screenshot field is missing');

for (const route of canonical) {
  if (!route.path || !route.area || !Array.isArray(route.states) || route.states.length === 0) violations.push(`canonical route ${route.path ?? '<unknown>'} has incomplete state metadata`);
  if (!registryPaths.includes(route.path)) violations.push(`canonical route ${route.path} is absent from the documentation registry`);
  if (!routes.includes(`'${route.path}'`)) violations.push(`canonical route ${route.path} is absent from Angular route declarations`);
  if (route.path === 'engineering/figma-mapping') violations.push('retired Figma Mapping route is present in visual evidence');
}

if (registryPaths.length < 1) violations.push('documentation registry is empty');
if (canonical.some((route) => route.states.some((state) => state.trim().length === 0))) violations.push('visual state metadata contains an empty state');
for (const evidence of screenshotEvidence) {
  if (!evidence.path || !evidence.state || !evidence.purpose) violations.push('screenshot evidence entries require path, state and purpose');
  if (evidence.path && !registryPaths.includes(evidence.path)) violations.push(`screenshot evidence route ${evidence.path} is absent from the documentation registry`);
  const route = canonical.find((candidate) => candidate.path === evidence.path);
  if (route && !route.states.includes(evidence.state) && evidence.state !== 'default') violations.push(`screenshot evidence state ${evidence.path}:${evidence.state} is absent from canonical state metadata`);
}

if (violations.length) {
  console.error('Visual evidence validation failed.');
  for (const violation of violations) console.error(`- ${violation}`);
  process.exit(1);
}

console.log(`Visual evidence contract valid: ${registryPaths.length} documentation routes, ${canonical.length} canonical route matrices, viewports ${requiredViewports.join(', ')}.`);
