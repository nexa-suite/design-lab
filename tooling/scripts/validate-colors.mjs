import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const violations = [];
const colorPattern = /#[0-9a-f]{3,8}\b|\b(?:rgb|rgba|hsl|hsla|oklch)\s*\(/gi;
const derivedColorPattern = /\bcolor-mix\s*\(/gi;

function filesUnder(directory) {
  if (!statSync(directory, { throwIfNoEntry: false })) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesUnder(path) : /\.(?:ts|html|scss|css)$/.test(entry.name) ? [path] : [];
  });
}

function scan(directory, { allowEvidence = false } = {}) {
  for (const file of filesUnder(directory)) {
    const source = readFileSync(file, 'utf8');
    for (const match of source.matchAll(colorPattern)) {
      const fileName = relative(root, file);
      const generatedTokenReference = fileName === 'src/app/documentation/content/token-reference.generated.ts';
      if (allowEvidence && (generatedTokenReference || fileName.startsWith('src/app/lab/quality/'))) continue;
      violations.push(`${fileName}:${match.index + 1} raw color ${match[0]} is outside the token/evidence layer`);
    }
    for (const match of source.matchAll(derivedColorPattern)) {
      const fileName = relative(root, file);
      const generatedTokenReference = fileName === 'src/app/documentation/content/token-reference.generated.ts';
      if (allowEvidence && (generatedTokenReference || fileName.startsWith('src/app/lab/quality/'))) continue;
      violations.push(`${fileName}:${match.index + 1} derived color ${match[0]} is outside canonical token sources`);
    }
  }
}

scan(join(root, 'projects', 'nexa-ui', 'src', 'lib'));
scan(join(root, 'src', 'app'), { allowEvidence: true });

const tokenFiles = ['primitive.tokens.json', 'semantic.tokens.json', 'component.tokens.json', 'data-visualization.tokens.json'];
for (const tokenFile of tokenFiles) {
  const path = join(root, 'tokens', tokenFile);
  const tokens = JSON.parse(readFileSync(path, 'utf8'));
  for (const [name, definition] of Object.entries(tokens)) {
    if (name.startsWith('$')) continue;
    if (!definition.$description) violations.push(`tokens/${tokenFile}:${name} is missing $description`);
  }
}

const dataVisualization = JSON.parse(readFileSync(join(root, 'tokens', 'data-visualization.tokens.json'), 'utf8'));
if (!Object.keys(dataVisualization).some((name) => name.includes('series'))) {
  violations.push('tokens/data-visualization.tokens.json must define a documented series palette');
}

if (violations.length) {
  console.error('Color validation failed.');
  for (const violation of violations) console.error(`- ${violation}`);
  process.exit(1);
}

console.log('Color validation passed: reusable and documentation UI colors resolve through documented tokens; evidence-only color math is isolated.');
