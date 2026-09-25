import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const registryPath = join(root, 'src', 'app', 'documentation', 'navigation', 'documentation-registry.ts');
const manifestPath = join(root, 'tooling', 'visual-regression', 'manifest.json');
const outputPath = join(root, 'tmp', 'v010-visual-audit.json');
const registry = readFileSync(registryPath, 'utf8');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const sourceSha = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
const matrixViewports = [...new Set([...(manifest.requiredViewports ?? []), ...(manifest.layoutViewports ?? [])])];
const evidenceRoot = join(root, 'tmp', 'visual-regression', sourceSha);
const targetedRoutes = new Set([
  'components/buttons',
  'components/progress-indicators',
  'patterns/forms',
  'patterns/async-operations',
  'patterns/empty-loading-error',
  'patterns/authentication',
  'patterns/analytics',
  'patterns/search-filtering',
  'patterns/payments',
  'patterns/request-builder',
  'patterns/order-flow',
  'patterns/delivery-pod',
  'patterns/map-location',
  'patterns/data-dense-operations',
  'patterns/dispatch-board',
  'patterns/responsive',
  'quality/accessibility-lab',
  'engineering/component-apis',
]);

function readCapture(path, viewport, state = 'default') {
  const relativePath = join('tmp', 'visual-regression', sourceSha, path, String(viewport), `${state}.json`);
  const absolutePath = join(root, relativePath);
  if (!existsSync(absolutePath)) return undefined;
  try {
    return { path: relativePath, ...JSON.parse(readFileSync(absolutePath, 'utf8')) };
  } catch {
    return { path: relativePath, result: { status: 'invalid-artifact' } };
  }
}

function routeEvidence(path) {
  const defaults = matrixViewports.map((viewport) => readCapture(path, viewport)).filter(Boolean);
  const canonical = manifest.canonicalRoutes?.find((route) => route.path === path);
  const states = (canonical?.states ?? [])
    .filter((state) => state !== 'default')
    .map((state) => ({ state, viewports: (manifest.requiredViewports ?? []).filter((viewport) => readCapture(path, viewport, state)).length }))
    .filter(({ viewports }) => viewports > 0);
  const failed = defaults.some((capture) => capture.result?.status === 'fail');
  const complete = defaults.length === matrixViewports.length && !failed;
  return {
    defaultArtifacts: defaults.length,
    requiredDefaultArtifacts: matrixViewports.length,
    canonicalStates: states,
    complete,
    failed,
    root: existsSync(evidenceRoot) ? `tmp/visual-regression/${sourceSha}/${path}` : undefined,
  };
}

const routes = [...registry.matchAll(/\{ id: '([^']+)', path: '([^']+)', label: '([^']+)'[^}]*group: '([^']+)'[^}]*kind: '([^']+)'[^}]*status: '([^']+)'[^}]*\}/g)].map(([, id, path, label, group, kind, maturity]) => {
  const targeted = targetedRoutes.has(path);
  const area = group.toLocaleLowerCase().replaceAll(' ', '-');
  const evidence = routeEvidence(path);
  const status = evidence.failed
    ? 'BROWSER_EVIDENCE_FAIL'
    : evidence.complete
      ? targeted ? 'BROWSER_TARGETED_PASS' : 'BROWSER_MATRIX_PASS'
      : 'AUTOMATED_STRUCTURE_PASS';
  const stateEvidence = evidence.canonicalStates.length
    ? ` ${evidence.canonicalStates.length} canonical state families have captured evidence.`
    : '';
  return {
    route: `/guidelines/${path}`,
    area,
    severity: targeted ? 'medium' : 'low',
    finding: evidence.failed
      ? `${label} has at least one failed browser evidence artifact; inspect the route before release.`
      : `${label} rendered ${evidence.defaultArtifacts}/${evidence.requiredDefaultArtifacts} matrix default artifacts.${stateEvidence}`,
    evidence: `Browser artifact root: ${evidence.root ?? 'not generated'}; default captures ${evidence.defaultArtifacts}/${evidence.requiredDefaultArtifacts}; source ${sourceSha}.`,
    probableSource: `src/app/documentation (${kind} feature) and documentation registry`,
    requiredCorrection: targeted
      ? 'Complete human visual review of captured high-risk states at the required widths; keep any correction tied to the route artifact before final v1.'
      : 'Keep the route in the browser matrix and complete human visual review before final v1; no automated status is a visual approval.',
    status,
    browserEvidence: evidence,
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
  fields: ['route', 'area', 'severity', 'finding', 'evidence', 'probableSource', 'requiredCorrection', 'status'],
  routes,
}, null, 2)}\n`, 'utf8');

console.log(`Visual audit manifest generated: ${routes.length} routes at ${outputPath.replace(`${root}/`, '')} (source ${sourceSha}).`);
