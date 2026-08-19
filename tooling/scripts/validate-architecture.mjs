import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const sourceRoot = join(root, 'src', 'app');
const libraryRoot = join(root, 'projects', 'nexa-ui', 'src', 'lib');
const violations = [];

function filesUnder(directory) {
  if (!statSync(directory, { throwIfNoEntry: false })) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesUnder(path) : /\.(?:ts|html|scss)$/.test(entry.name) ? [path] : [];
  });
}

function source(files) {
  return files.map((file) => ({ file, relative: relative(root, file), text: readFileSync(file, 'utf8') }));
}

function add(file, rule, match) {
  violations.push(`${rule}: ${file}${match?.index !== undefined ? `:${match.index}` : ''}`);
}

const appFiles = source(filesUnder(sourceRoot));
const reusableFiles = source(filesUnder(libraryRoot));
const allSourceFiles = [...appFiles, ...reusableFiles];

for (const { relative: file, text } of reusableFiles) {
  const rawColor = text.match(/#[0-9a-f]{3,8}\b|\b(?:rgb|rgba|hsl|hsla|oklch)\s*\(/i);
  if (rawColor) add(file, 'raw design color outside token layer', rawColor);

  const primitiveReference = text.match(/--nexa-primitive-[a-z0-9-]+/i);
  if (primitiveReference) add(file, 'reusable component must consume semantic/component tokens, not primitives', primitiveReference);

  const rawRadius = [...text.matchAll(/border-radius\s*:\s*([^;{}]+)/gi)].find((match) => {
    const value = match[1].trim();
    return !value.startsWith('var(--nexa-radius-') && value !== 'inherit' && value !== '50%';
  });
  if (rawRadius) add(file, 'reusable geometry must use a radius token, inherit or circular geometry', rawRadius);
}

for (const { relative: file, text } of allSourceFiles) {
  const deep = text.match(/::ng-deep/);
  if (deep) add(file, '::ng-deep is forbidden', deep);

  const important = text.match(/!important/);
  if (important) add(file, '!important is forbidden', important);

  const none = text.match(/ViewEncapsulation\.None/);
  if (none) add(file, 'ViewEncapsulation.None requires an explicit architecture exception', none);

  const negativeMargin = text.match(/margin(?:-block|-inline|-top|-right|-bottom|-left)?\s*:\s*[^;{}]*-\s*\d+(?:px|rem|em|%|vh|vw|ch)\b/);
  if (negativeMargin) add(file, 'negative-margin layout hack', negativeMargin);

  const retiredReference = text.match(/(?:from\s+['"]|import\s*\(['"])[^'"]*(?:reference-screen|reference_screen|referenceScreen|Reference Screen)/i);
  if (retiredReference) add(file, 'retired Reference Screen import', retiredReference);
}

for (const { relative: file, text } of reusableFiles) {
  const forbiddenDirection = text.match(/(?:from|import\s*\()\s*['"][^'"]*(?:documentation|\/lab\/)/);
  if (forbiddenDirection) add(file, 'design-system cannot depend on documentation or Lab', forbiddenDirection);
}

const trackedFiles = execFileSync('git', ['ls-files'], { cwd: root, encoding: 'utf8' }).split('\n').filter(Boolean);
const trackedPackageManifests = trackedFiles.filter((file) => /(?:^|\/)package\.json$/.test(file));
const trackedLockfiles = trackedFiles.filter((file) => /(?:package-lock\.json|npm-shrinkwrap\.json)$/.test(file));
const expectedPackageManifests = new Set(['package.json', 'projects/nexa-ui/package.json']);
const expectedLockfiles = new Set(['package-lock.json']);
for (const file of trackedPackageManifests) {
  if (!expectedPackageManifests.has(file)) add(file, 'duplicate package source of truth');
}
for (const file of trackedLockfiles) {
  if (!expectedLockfiles.has(file)) add(file, 'duplicate package lock source of truth');
}
if (![...expectedPackageManifests].every((file) => trackedPackageManifests.includes(file))) add('package.json', 'canonical package manifest is missing');
if (![...expectedLockfiles].every((file) => trackedLockfiles.includes(file))) add('package-lock.json', 'canonical package lock is missing');
try {
  const rootPackage = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
  const libraryPackage = JSON.parse(readFileSync(join(root, 'projects', 'nexa-ui', 'package.json'), 'utf8'));
  if (rootPackage.version !== libraryPackage.version) add('projects/nexa-ui/package.json', 'library and workspace package versions diverge');
  if (libraryPackage.name !== 'nexa-ui') add('projects/nexa-ui/package.json', 'published library package identity is not canonical');
} catch (error) {
  add('package.json', `package manifest cannot be parsed: ${error.message}`);
}
for (const file of trackedFiles) {
  if (/(^|\/)FLOW(\/|\.|$)/.test(file)) add(file, 'tracked FLOW asset', { index: 0 });
}

if (violations.length > 0) {
  console.error('Architecture validation failed.');
  for (const violation of violations) console.error(`- ${violation}`);
  process.exit(1);
}

console.log('Architecture validation passed.');
console.log('Checked reusable token boundaries, geometry integrity, forbidden CSS, dependency direction, package-source singularity, tracked FLOW assets and retired imports.');
