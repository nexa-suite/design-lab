import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const manifest = JSON.parse(readFileSync(join(root, 'tokens', 'icons.tokens.json'), 'utf8'));
const catalogPath = join(root, 'src', 'app', 'documentation', 'foundations', 'icon-catalog.ts');
const catalog = readFileSync(catalogPath, 'utf8');
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
