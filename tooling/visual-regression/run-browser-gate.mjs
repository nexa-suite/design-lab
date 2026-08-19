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
const canonicalRoutes = manifest.canonicalRoutes ?? [];
const routesByPath = new Map(routes.map((route) => [route.path, route]));
const viewports = [...new Set([...(manifest.requiredViewports ?? []), ...(manifest.layoutViewports ?? [])])]
  .map((width) => ({ width, height: width <= 390 ? 844 : 900 }));
const canonicalViewports = (manifest.requiredViewports ?? [])
  .map((width) => ({ width, height: width <= 390 ? 844 : 900 }));
const failures = [];
const capturedStates = [];
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

async function visitEvidenceRoute(page, route, viewport) {
  await page.setViewportSize(viewport);
  await page.goto(`${baseUrl}/guidelines/${route.path}`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  await page.waitForSelector('.lab-content', { state: 'visible', timeout: 30_000 });
  await page.waitForFunction(() => (document.querySelector('.lab-content')?.textContent?.trim().length ?? 0) > 80, null, { timeout: 30_000 });
  await page.waitForTimeout(80);
}

async function assertVisibleText(page, text, message = text) {
  const candidates = page.getByText(text, { exact: false });
  const deadline = Date.now() + 5_000;
  while (Date.now() < deadline) {
    for (let index = 0; index < await candidates.count(); index += 1) {
      if (await candidates.nth(index).isVisible()) return;
    }
    await delay(80);
  }
  throw new Error(`visible text not found: ${message}`);
}

async function activateCanonicalState(page, route, state) {
  switch (route.path) {
    case 'overview':
      if (state === 'focus') await page.locator('.lab-content a, .lab-content button, .lab-content input').first().focus();
      break;
    case 'foundations/color':
      if (state === 'semantic') await assertVisibleText(page, 'Semantic map');
      break;
    case 'foundations/motion':
      if (state === 'standard') await assertVisibleText(page, 'Short meaningful transitions');
      if (state === 'reduced') await assertVisibleText(page, 'Immediate, still understandable');
      break;
    case 'components/buttons':
      if (state === 'focus') {
        await page.locator('.forced-focus .nexa-button').first().focus();
        return;
      }
      await assertVisibleText(page, state === 'pressed' ? 'Pressed' : state === 'success' ? 'Success feedback' : state === 'error' ? 'Error recovery' : state.charAt(0).toLocaleUpperCase() + state.slice(1));
      break;
    case 'components/progress-indicators':
      await assertVisibleText(page, state === 'determinate' ? 'Linear determinate' : state === 'indeterminate' ? 'Linear indeterminate' : state === 'skeleton' ? 'Content skeleton' : state.charAt(0).toLocaleUpperCase() + state.slice(1));
      break;
    case 'patterns/authentication': {
      const labels = {
        default: 'Default',
        focus: 'Field focus',
        invalid: 'Form invalid',
        authenticating: 'Authenticating',
        credentials: 'Invalid credentials',
        workspace: 'Workspace detected',
        success: 'Success / continue',
      };
      await page.getByRole('button', { name: labels[state], exact: true }).click();
      if (state === 'focus') await page.getByRole('textbox', { name: 'Work email', exact: true }).focus();
      if (state === 'invalid') await assertVisibleText(page, 'Enter a work email to continue.');
      if (state === 'credentials') await assertVisibleText(page, 'The credentials could not be verified.');
      if (state === 'workspace') await assertVisibleText(page, 'Workspace detected');
      if (state === 'success') await assertVisibleText(page, 'Continue to workspace');
      break;
    }
    case 'patterns/analytics': {
      const labels = { ready: 'Ready', loading: 'Loading', empty: 'No data', error: 'Error' };
      await page.getByRole('button', { name: labels[state], exact: true }).click();
      if (state === 'ready') await assertVisibleText(page, 'Status distribution');
      if (state === 'loading') await assertVisibleText(page, 'Loading review evidence');
      if (state === 'empty') await assertVisibleText(page, 'No review data');
      if (state === 'error') await assertVisibleText(page, 'Review evidence could not load');
      break;
    }
    case 'patterns/dispatch-board':
      if (state === 'empty') await assertVisibleText(page, 'No cards in this column.');
      if (state === 'selected') {
        await page.locator('.dispatch-card-select').first().click();
        assert((await page.locator('.dispatch-card.selected').count()) > 0, 'dispatch card selection did not render');
      }
      if (state === 'source') await assertVisibleText(page, 'Movement source');
      if (state === 'destination') await assertVisibleText(page, 'Movement destination');
      if (state === 'completed') {
        await page.getByRole('button', { name: 'Move selected card', exact: true }).click();
        await page.getByRole('button', { name: 'Mark movement complete', exact: true }).click();
        await assertVisibleText(page, 'Candidate movement completed');
      }
      if (state === 'warning') await assertVisibleText(page, 'Documents pending');
      if (state === 'critical') await assertVisibleText(page, 'Critical exception');
      if (state === 'blocked') await assertVisibleText(page, 'Blocked');
      break;
    case 'patterns/catalog':
      if (state === 'selected') {
        await page.locator('.product-select').nth(1).click();
        assert((await page.locator('.product-card.selected').count()) === 1, 'catalog selection did not render');
      }
      if (state === 'detail') await assertVisibleText(page, 'Add to draft request');
      break;
    case 'patterns/responsive':
      if (state === 'desktop') await assertVisibleText(page, 'MacBook / desktop');
      if (state === 'tablet') await assertVisibleText(page, 'iPad landscape');
      if (state === 'mobile') await assertVisibleText(page, 'iPhone portrait');
      if (state === 'reflow') await assertVisibleText(page, '200% and 400% checks');
      break;
    case 'quality/accessibility-lab':
      if (state === 'focus') await page.locator('.lab-content button[autofocus], .lab-content button, .lab-content input').first().focus();
      if (state === 'contrast') await page.locator('[aria-label="Contrast mode"]').getByRole('button', { name: 'Increased contrast', exact: true }).click();
      if (state === 'text-200') await page.getByRole('button', { name: '200%', exact: true }).click();
      if (state === 'reflow-400') await assertVisibleText(page, '400% reflow');
      if (state === 'reduced-motion') await assertVisibleText(page, 'Reduced motion');
      break;
    case 'engineering/component-apis':
      if (state === 'inventory') await assertVisibleText(page, 'Public candidate');
      if (state === 'boundary') await assertVisibleText(page, 'Lab-only evidence');
      break;
    default:
      throw new Error(`No canonical evidence adapter for ${route.path}`);
  }
}

async function captureCanonicalState(page, route, viewport, state) {
  try {
    await visitEvidenceRoute(page, route, viewport);
    await activateCanonicalState(page, route, state);
    const evidence = await page.evaluate((expectedState) => {
      const root = document.documentElement;
      const content = document.querySelector('.lab-content');
      const active = document.activeElement;
      return {
        expectedState,
        contentTextLength: content?.textContent?.trim().length ?? 0,
        activeElement: active instanceof HTMLElement ? `${active.tagName.toLowerCase()}${active.id ? `#${active.id}` : ''}` : '',
        activeInsideContent: Boolean(content && active && content.contains(active)),
        clientWidth: root.clientWidth,
        scrollWidth: root.scrollWidth,
      };
    }, state);
    assert(evidence.contentTextLength > 80, 'canonical state content is empty');
    assert(evidence.scrollWidth <= evidence.clientWidth + 1, `canonical state overflow ${evidence.scrollWidth - evidence.clientWidth}px`);
    if (state === 'focus') assert(evidence.activeInsideContent, 'focus state did not focus a content control');
    writeResult(route, viewport, state, {
      status: 'pass',
      checks: { route: true, viewport: true, state: true, noOverflow: true, artifactBinding: true },
      evidence,
    });
    capturedStates.push(`${route.path}:${viewport.width}:${state}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    failures.push(`${route.path} @ ${viewport.width}px [${state}]: ${message}`);
    writeResult(route, viewport, state, { status: 'fail', error: message });
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

  await smokeInteraction(page, 'patterns/forms', async () => {
    const buyer = page.getByRole('textbox', { name: 'Buyer name', exact: true });
    await buyer.fill('');
    await assertVisibleText(page, 'Unsaved changes');
    await page.getByRole('button', { name: 'Validate buyer', exact: true }).click();
    await assertVisibleText(page, 'Use at least 3 characters.');
    await buyer.fill('Buyer review');
    await page.getByRole('button', { name: 'Validate buyer', exact: true }).click();
    await assertVisibleText(page, 'Buyer identity accepted.');
    checks.push('forms dirty context + validation recovery');
  });

  await smokeInteraction(page, 'patterns/search-filtering', async () => {
    await page.getByRole('button', { name: 'Searching', exact: true }).click();
    await page.getByText('Searching orders', { exact: true }).waitFor({ state: 'visible' });
    await page.getByRole('button', { name: 'Error', exact: true }).click();
    await page.getByRole('button', { name: 'Retry', exact: true }).click();
    await page.getByText('La Cava Fría', { exact: true }).waitFor({ state: 'visible' });
    checks.push('search query states + retry');
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

  for (const canonical of canonicalRoutes) {
    const route = routesByPath.get(canonical.path);
    assert(route, `canonical route is not registered: ${canonical.path}`);
    for (const viewport of canonicalViewports) {
      for (const state of canonical.states) {
        if (state === 'default') continue;
        await captureCanonicalState(page, route, viewport, state);
      }
    }
  }

  const interactionChecks = await runInteractionSmoke(page);
  const summaryPath = join(root, 'tmp', 'visual-regression', sourceSha, 'browser-gate.json');
  mkdirSync(dirname(summaryPath), { recursive: true });
  writeFileSync(summaryPath, `${JSON.stringify({ sourceSha, routes: routes.length, viewports: viewports.map(({ width }) => width), canonicalStates: capturedStates, interactionChecks, failures }, null, 2)}\n`, 'utf8');

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
