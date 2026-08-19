import { execFileSync, spawn } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { chromium } from '@playwright/test';

const root = process.cwd();
const manifest = JSON.parse(readFileSync(join(root, 'tooling', 'visual-regression', 'manifest.json'), 'utf8'));
const registry = readFileSync(join(root, 'src', 'app', 'documentation', 'navigation', 'documentation-registry.ts'), 'utf8');
const sourceSha = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
const baseUrl = process.env.NEXA_BROWSER_BASE_URL ?? 'http://127.0.0.1:4301';
const ownsServer = !process.env.NEXA_BROWSER_BASE_URL;
const serverCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const routes = [...registry.matchAll(/\{ id: '([^']+)', path: '([^']+)', label: '([^']+)'[^}]*group: '([^']+)'[^}]*kind: '([^']+)'[^}]*status: '([^']+)'[^}]*\}/g)]
  .map(([, id, path, label, group, kind, maturity]) => ({ id, path, label, group, kind, maturity }));
const viewports = [...new Set([...(manifest.requiredViewports ?? []), ...(manifest.layoutViewports ?? [])])]
  .map((width) => ({ width, height: width <= 390 ? 844 : 900 }));
const failures = [];
let server;
let browser;

function artifactPath(route, viewport, state) {
  return join('tmp', 'visual-regression', sourceSha, route.path, String(viewport.width), `${state}.json`);
}

function writeResult(route, viewport, state, result) {
  const relativeArtifact = artifactPath(route, viewport, state);
  const absoluteArtifact = join(root, relativeArtifact);
  mkdirSync(dirname(absoluteArtifact), { recursive: true });
  writeFileSync(absoluteArtifact, `${JSON.stringify({
    route: `/guidelines/${route.path}`,
    area: route.group.toLocaleLowerCase().replaceAll(' ', '-'),
    viewport: viewport.width,
    state,
    artifact: relativeArtifact,
    result,
    sourceSha,
  }, null, 2)}\n`, 'utf8');
}

async function waitForServer(url) {
  const deadline = Date.now() + 120_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // The Angular dev server is still starting.
    }
    await delay(500);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function inspectRoute(page, route, viewport) {
  const consoleIssues = [];
  const pageIssues = [];
  const onConsole = (message) => {
    if (message.type() === 'error') consoleIssues.push(message.text());
  };
  const onPageError = (error) => pageIssues.push(error.message);
  page.on('console', onConsole);
  page.on('pageerror', onPageError);

  try {
    await page.setViewportSize(viewport);
    await page.goto(`${baseUrl}/guidelines/${route.path}`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
    await page.waitForSelector('.lab-content', { state: 'visible', timeout: 30_000 });
    await page.waitForFunction(() => (document.querySelector('.lab-content')?.textContent?.trim().length ?? 0) > 80, null, { timeout: 30_000 });
    await page.waitForTimeout(100);

    const evidence = await page.evaluate(() => {
      const root = document.documentElement;
      const content = document.querySelector('.lab-content');
      const heading = content?.querySelector('h1, h2, [role="heading"]');
      return {
        clientWidth: root.clientWidth,
        scrollWidth: root.scrollWidth,
        contentTextLength: content?.textContent?.trim().length ?? 0,
        heading: heading?.textContent?.trim() ?? '',
        activeNavigation: document.querySelectorAll('.lab-nav-item.active').length,
      };
    });

    assert(evidence.contentTextLength > 80, 'documentation content is empty');
    assert(evidence.heading.length > 0, 'documentation page has no visible heading');
    assert(evidence.scrollWidth <= evidence.clientWidth + 1, `horizontal overflow ${evidence.scrollWidth - evidence.clientWidth}px`);
    assert(evidence.activeNavigation > 0, 'documentation route has no active navigation item');
    assert(consoleIssues.length === 0, `console errors: ${consoleIssues.join(' | ')}`);
    assert(pageIssues.length === 0, `page errors: ${pageIssues.join(' | ')}`);

    writeResult(route, viewport, 'default', {
      status: 'pass',
      checks: { content: true, heading: true, activeNavigation: true, noOverflow: true, console: true, pageErrors: true },
      evidence,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    failures.push(`${route.path} @ ${viewport.width}px: ${message}`);
    writeResult(route, viewport, 'default', { status: 'fail', error: message, consoleIssues, pageIssues });
  } finally {
    page.off('console', onConsole);
    page.off('pageerror', onPageError);
  }
}

async function smokeInteraction(page, path, action) {
  await page.goto(`${baseUrl}/guidelines/${path}`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  await page.waitForSelector('.lab-content', { state: 'visible', timeout: 30_000 });
  await action();
}

async function runInteractionSmoke(page) {
  const checks = [];
  const consoleIssues = [];
  const pageIssues = [];
  const onConsole = (message) => { if (message.type() === 'error') consoleIssues.push(message.text()); };
  const onPageError = (error) => pageIssues.push(error.message);
  page.on('console', onConsole);
  page.on('pageerror', onPageError);

  await smokeInteraction(page, 'components/segmented-control', async () => {
    await page.getByRole('button', { name: 'In review', exact: true }).first().click();
    await page.getByText('Current view: review', { exact: false }).waitFor({ state: 'visible' });
    const latency = await page.locator('.demo-status strong').last().textContent();
    assert(Number.parseFloat(latency ?? 'Infinity') < 100, `segmented selection rendered too slowly: ${latency}`);
    checks.push('segmented control immediate selection');
  });

  await smokeInteraction(page, 'patterns/analytics', async () => {
    await page.getByRole('button', { name: 'Error', exact: true }).click();
    await page.getByRole('button', { name: 'Retry', exact: true }).click();
    await page.getByText('Loading review evidence', { exact: true }).waitFor({ state: 'visible' });
    checks.push('analytics error → retry');
  });

  await smokeInteraction(page, 'patterns/authentication', async () => {
    await page.getByRole('button', { name: 'Form invalid', exact: true }).click();
    await page.getByText('Enter a work email to continue.', { exact: true }).waitFor({ state: 'visible' });
    await page.getByRole('button', { name: 'ES', exact: true }).click();
    await page.getByText('Ingresa a tu workspace', { exact: true }).waitFor({ state: 'visible' });
    checks.push('authentication invalid + locale');
  });

  await smokeInteraction(page, 'patterns/dispatch-board', async () => {
    await page.locator('.dispatch-card-select').first().click();
    await page.getByRole('button', { name: 'Move selected card', exact: true }).click();
    await page.getByRole('button', { name: 'Mark movement complete', exact: true }).click();
    await page.getByText('Candidate movement completed', { exact: true }).waitFor({ state: 'visible' });
    checks.push('dispatch select + movement');
  });

  await smokeInteraction(page, 'components/progress-indicators', async () => {
    await page.getByRole('button', { name: 'Reduced', exact: true }).click();
    await page.getByText('Activity remains labeled and stable', { exact: true }).waitFor({ state: 'visible' });
    await page.getByText('Circular determinate', { exact: true }).waitFor({ state: 'visible' });
    await page.getByText('Content skeleton', { exact: true }).waitFor({ state: 'visible' });
    checks.push('progress reduced motion');
  });

  await smokeInteraction(page, 'components/menus', async () => {
    const trigger = page.locator('nexa-action-menu .menu-trigger').first();
    await trigger.press('Enter');
    await page.getByRole('menu').waitFor({ state: 'visible' });
    await page.keyboard.press('Escape');
    await page.getByRole('menu').waitFor({ state: 'hidden' });
    checks.push('action menu keyboard + escape');
  });

  await smokeInteraction(page, 'components/tooltips', async () => {
    const trigger = page.locator('nexa-tooltip .tooltip-trigger');
    await trigger.focus();
    await page.getByRole('tooltip').waitFor({ state: 'visible' });
    await page.keyboard.press('Escape');
    await page.getByRole('tooltip').waitFor({ state: 'hidden' });
    checks.push('tooltip focus + escape');
  });

  await smokeInteraction(page, 'components/buttons', async () => {
    const sequence = page.locator('nexa-state-sequence').last();
    const next = sequence.getByRole('button', { name: 'Next state', exact: true });
    await next.click();
    await next.click();
    await sequence.getByRole('status').getByText('Success', { exact: true }).waitFor({ state: 'visible' });
    assert(await next.isDisabled(), 'success phase did not stop the sequence');
    checks.push('state sequence success terminal');
  });

  await smokeInteraction(page, 'patterns/async-operations', async () => {
    const recovery = page.locator('nexa-state-sequence').nth(1);
    const next = recovery.getByRole('button', { name: 'Next state', exact: true });
    await next.click();
    await next.click();
    await recovery.getByRole('status').getByText('Error', { exact: true }).waitFor({ state: 'visible' });
    await recovery.getByRole('button', { name: 'Retry', exact: true }).click();
    await recovery.getByRole('status').getByText('Processing', { exact: true }).waitFor({ state: 'visible' });

    const cancelled = page.locator('nexa-state-sequence').nth(2);
    const cancelledNext = cancelled.getByRole('button', { name: 'Next state', exact: true });
    await cancelledNext.click();
    await cancelledNext.click();
    await cancelledNext.click();
    await cancelledNext.click();
    await cancelled.getByRole('status').getByText('Cancelled', { exact: true }).waitFor({ state: 'visible' });
    assert(await cancelledNext.isDisabled(), 'cancelled phase did not stop the sequence');
    checks.push('state sequence error retry + cancelled terminal');
  });

  await smokeInteraction(page, 'quality/accessibility-lab', async () => {
    await page.getByRole('button', { name: 'Increased contrast', exact: true }).last().click();
    await page.getByRole('button', { name: '200%', exact: true }).click();
    await page.getByRole('button', { name: 'Reduced motion', exact: true }).click();
    const modes = await page.evaluate(() => ({
      contrast: document.documentElement.dataset['contrastMode'],
      motion: document.documentElement.dataset['motionMode'],
      scale: document.documentElement.style.getPropertyValue('--nexa-doc-text-scale'),
    }));
    assert(modes.contrast === 'increased' && modes.motion === 'reduced' && modes.scale === '2', 'evaluation modes did not apply');
    checks.push('increased contrast + text scale + reduced motion');
  });

  await smokeInteraction(page, 'foundations/motion', async () => {
    await page.getByRole('button', { name: 'Next state', exact: true }).click();
    await page.getByRole('status').getByText('Hover', { exact: true }).waitFor({ state: 'visible' });
    checks.push('motion manual stepping');
  });

  assert(consoleIssues.length === 0, `interaction console errors: ${consoleIssues.join(' | ')}`);
  assert(pageIssues.length === 0, `interaction page errors: ${pageIssues.join(' | ')}`);
  page.off('console', onConsole);
  page.off('pageerror', onPageError);
  return checks;
}

try {
  if (ownsServer) {
    server = spawn(serverCommand, ['run', 'start', '--', '--configuration', 'production', '--host', '127.0.0.1', '--port', '4301'], {
      cwd: root,
      stdio: 'ignore',
      env: { ...process.env, NG_CLI_ANALYTICS: 'false' },
    });
  }

  await waitForServer(`${baseUrl}/guidelines/overview`);
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: viewports[0] });

  for (const route of routes) {
    for (const viewport of viewports) await inspectRoute(page, route, viewport);
  }

  const interactionChecks = await runInteractionSmoke(page);
  const summaryPath = join(root, 'tmp', 'visual-regression', sourceSha, 'browser-gate.json');
  mkdirSync(dirname(summaryPath), { recursive: true });
  writeFileSync(summaryPath, `${JSON.stringify({ sourceSha, routes: routes.length, viewports: viewports.map(({ width }) => width), interactionChecks, failures }, null, 2)}\n`, 'utf8');

  if (failures.length) {
    console.error(`Browser visual gate failed with ${failures.length} failure(s).`);
    for (const failure of failures) console.error(`- ${failure}`);
    process.exitCode = 1;
  } else {
    console.log(`Browser visual gate passed: ${routes.length} routes × ${viewports.length} viewports; ${interactionChecks.length} interaction checks.`);
  }
} finally {
  if (browser) await browser.close().catch(() => undefined);
  if (server && !server.killed) server.kill('SIGTERM');
}
