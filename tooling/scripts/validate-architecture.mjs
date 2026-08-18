import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const sourceRoot = join(root, 'src', 'app');
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
const reusableFiles = source(filesUnder(join(sourceRoot, 'design-system')));

for (const { relative: file, text } of reusableFiles) {
  const rawColor = text.match(/#[0-9a-f]{3,8}\b|\b(?:rgb|rgba|hsl|hsla|oklch)\s*\(/i);
  if (rawColor) add(file, 'raw design color outside token layer', rawColor);
}

for (const { relative: file, text } of appFiles) {
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
for (const file of trackedFiles) {
  if (/(^|\/)FLOW(\/|\.|$)/.test(file)) add(file, 'tracked FLOW asset', { index: 0 });
}

if (violations.length > 0) {
  console.error('Architecture validation failed.');
  for (const violation of violations) console.error(`- ${violation}`);
  process.exit(1);
}

console.log('Architecture validation passed.');
console.log('Checked reusable token boundaries, forbidden CSS, dependency direction, tracked FLOW assets and retired imports.');
