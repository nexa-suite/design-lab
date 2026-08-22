import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const manifest = JSON.parse(readFileSync(join(root, 'tokens', 'icons.tokens.json'), 'utf8'));
const catalogPath = join(root, 'src', 'app', 'documentation', 'foundations', 'icon-catalog.ts');
const catalog = readFileSync(catalogPath, 'utf8');
const globalStyles = readFileSync(join(root, 'src', 'styles.scss'), 'utf8');
const angularConfig = JSON.parse(readFileSync(join(root, 'angular.json'), 'utf8'));
const primeIconsStylesheet = readFileSync(join(root, 'node_modules', 'primeicons', 'primeicons.css'), 'utf8');
const renderableIcons = new Set([...primeIconsStylesheet.matchAll(/\.((?:pi)-[a-z0-9-]+):before/g)].map((match) => match[1]));
const allowed = new Set(manifest.icons);
const violations = [];

function filesUnder(directory) {
  if (!statSync(directory, { throwIfNoEntry: false })) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesUnder(path) : /\.(?:ts|html|scss|css)$/.test(entry.name) ? [path] : [];
  });
}

const roots = [join(root, 'src'), join(root, 'projects', 'nexa-ui')];
for (const directory of roots) {
  for (const file of filesUnder(directory)) {
    const text = readFileSync(file, 'utf8');
    for (const match of text.matchAll(/\bpi-[a-z0-9-]+\b/g)) {
      if (!allowed.has(match[0])) violations.push(`${relative(root, file)} uses unapproved ${match[0]}`);
      if (match[0] !== 'pi-spin' && !renderableIcons.has(match[0])) violations.push(`${relative(root, file)} uses a PrimeIcon class missing from the pinned stylesheet: ${match[0]}`);
    }
    if (/material-(?:icons|symbols)|unpkg\.com\/primeicons|fonts\.googleapis\.com\/icon/.test(text)) {
      violations.push(`${relative(root, file)} references a non-canonical icon font or remote PrimeIcons asset`);
    }
  }
}

const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
if (packageJson.dependencies?.primeicons !== '8.0.0') {
  violations.push('package.json must pin primeicons to 8.0.0');
}

if (!/@use\s+['"]primeicons\/primeicons\.css['"]\s*;/.test(globalStyles)) {
  violations.push('src/styles.scss must load the pinned local PrimeIcons stylesheet');
}

const appStyles = angularConfig.projects?.['nexa-design-lab']?.architect?.build?.options?.styles ?? [];
if (appStyles.some((style) => String(style).includes('primeicons/primeicons.css'))) {
  violations.push('PrimeIcons must be loaded through src/styles.scss, not as a second global stylesheet entry');
}

for (const icon of manifest.icons) {
  if (icon !== 'pi-spin' && !renderableIcons.has(icon)) violations.push(`tokens/icons.tokens.json lists a class missing from the pinned stylesheet: ${icon}`);
}

if (new Set(manifest.icons).size !== manifest.icons.length) {
  violations.push('tokens/icons.tokens.json contains duplicate icon names');
}

for (const field of ['render', 'role', 'size', 'alignment', 'labelPolicy', 'semanticColor', 'hitTarget']) {
  if (!catalog.includes(`${field}:`)) violations.push(`icon explorer contract is missing ${field} metadata`);
}
if (!catalog.includes('function iconContract')) violations.push('icon explorer does not centralize render and accessibility metadata');

if (violations.length) {
  console.error('Icon validation failed.');
  for (const violation of violations) console.error(`- ${violation}`);
  process.exit(1);
}

console.log(`Icon validation passed: ${manifest.icons.length} approved PrimeIcons, local asset pipeline, no Material icon glyphs.`);
