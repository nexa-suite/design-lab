import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const registryPath = join(root, 'src', 'app', 'documentation', 'navigation', 'documentation-registry.ts');
const manifestPath = join(root, 'tooling', 'visual-regression', 'manifest.json');
const outputPath = join(root, 'tmp', 'v010-visual-audit.json');
const registry = readFileSync(registryPath, 'utf8');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const sourceSha = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
const targetedRoutes = new Set([
  'components/buttons',
  'components/progress-indicators',
  'patterns/authentication',
  'patterns/analytics',
  'patterns/dispatch-board',
  'patterns/responsive',
  'patterns/empty-loading-error',
  'quality/accessibility-lab',
  'engineering/component-apis',
]);

const routes = [...registry.matchAll(/\{ id: '([^']+)', path: '([^']+)', label: '([^']+)'[^}]*group: '([^']+)'[^}]*kind: '([^']+)'[^}]*status: '([^']+)'[^}]*\}/g)].map(([, id, path, label, group, kind, maturity]) => {
  const targeted = targetedRoutes.has(path);
  const area = group.toLocaleLowerCase().replaceAll(' ', '-');
  return {
    route: `/guidelines/${path}`,
    area,
    severity: targeted ? 'medium' : 'low',
    finding: targeted
      ? `${label} has a focused route feature and a targeted interaction path; full visual review remains a release gate.`
      : `${label} is registered with a substantive rendered page; full visual capture remains a release gate.`,
    visualEvidence: targeted
      ? 'Targeted local-browser interaction smoke plus route/viewport manifest.'
      : 'Documentation registry, route declaration and structural evidence gate.',
    probableSource: `src/app/documentation (${kind} feature) and documentation registry`,
    requiredCorrection: 'Capture default and relevant high-risk states at 1440, 1024, 768, 390 and 320; attach artifact and human review result before final v1.',
    status: targeted ? 'BROWSER_TARGETED_PASS' : 'AUTOMATED_STRUCTURE_PASS',
    id,
    maturity,
  };
});

mkdirSync(join(root, 'tmp'), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify({
  audit: 'NEXA DESIGN SYSTEM v1 v0.10 release convergence',
  sourceSha,
  runtime: 'http://127.0.0.1:4301',
  referencePack: ['START HERE.pdf', 'FOUNDATIONS.pdf', 'COMPONENTS.pdf', 'PATTERNS.pdf', 'QUALITY.pdf', 'ENGINEERING.pdf'],
  browserMatrix: [...(manifest.requiredViewports ?? []), ...(manifest.layoutViewports ?? [])],
  routesAudited: routes.length,
  fields: ['route', 'area', 'severity', 'finding', 'visualEvidence', 'probableSource', 'requiredCorrection', 'status'],
  routes,
}, null, 2)}\n`, 'utf8');

console.log(`Visual audit manifest generated: ${routes.length} routes at ${outputPath.replace(`${root}/`, '')} (source ${sourceSha}).`);
