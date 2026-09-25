import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..', '..');
const tokenRoot = join(root, 'tokens');
const styleRoot = join(root, 'src', 'styles');
const checkOnly = process.argv.includes('--check');

const sources = [
  ['primitive.tokens.json', '_tokens-primitives.scss'],
  ['semantic.tokens.json', '_tokens-semantic.scss'],
  ['component.tokens.json', '_tokens-components.scss'],
  ['data-visualization.tokens.json', '_tokens-data-visualization.scss'],
];
const tokenReferenceTarget = join(root, 'src', 'app', 'documentation', 'content', 'token-reference.generated.ts');

const toCssValue = (value) => String(value)
  .replace(/\{([a-z0-9-]+)\}/g, 'var(--$1)');

const entries = (document) => Object.entries(document)
  .filter(([name]) => !name.startsWith('$'));

const declarationBlock = (document) => entries(document)
  .map(([name, token]) => `  --${name}: ${toCssValue(token.$value)};`)
  .join('\n');

const generatedHeader = (source) => `/* Generated from tokens/${source}; do not edit directly. */\n`;

const tokenDocuments = new Map();
const tokenDefinitions = new Map();
for (const [source] of sources) {
  const document = JSON.parse(await readFile(join(tokenRoot, source), 'utf8'));
  tokenDocuments.set(source, document);
  for (const [name, token] of entries(document)) {
    tokenDefinitions.set(`--${name}`, { name, source, token });
  }
}

const resolveTokenValue = (value, path = []) => {
  const cssValue = toCssValue(value);
  return cssValue.replace(/var\((--[a-z0-9-]+)\)/g, (reference, tokenName) => {
    const definition = tokenDefinitions.get(tokenName);
    if (!definition || path.includes(tokenName)) return reference;
    return resolveTokenValue(definition.token.$value, [...path, tokenName]);
  });
};

const generateTokenReference = () => {
  const catalog = [...tokenDefinitions.values()].map(({ name, source, token }) => ({
    name: `--${name}`,
    layer: source.replace('.tokens.json', ''),
    type: token.$type,
    sourceValue: String(token.$value),
    value: resolveTokenValue(token.$value),
    description: token.$description,
  }));
  const values = Object.fromEntries(catalog.map((token) => [token.name, token.value]));
  const references = catalog.reduce(
    (total, token) => total + (token.sourceValue.match(/var\(--[a-z0-9-]+\)|\{[a-z0-9-]+\}/g)?.length ?? 0),
    0,
  );
  const layerCounts = Object.fromEntries(
    [...new Set(catalog.map((token) => token.layer))].map((layer) => [layer, catalog.filter((token) => token.layer === layer).length]),
  );
  const lines = [
    '/* Generated from tokens/*.tokens.json; do not edit directly. */',
    'export interface NexaTokenReference {',
    '  readonly name: string;',
    "  readonly layer: 'primitive' | 'semantic' | 'component' | 'data-visualization';",
    '  readonly type: string;',
    '  readonly sourceValue: string;',
    '  readonly value: string;',
    '  readonly description: string;',
    '}',
    '',
    `export const NEXA_TOKEN_VALUES: Readonly<Record<string, string>> = ${JSON.stringify(values, null, 2)};`,
    '',
    `export const NEXA_TOKEN_CATALOG: readonly NexaTokenReference[] = ${JSON.stringify(catalog, null, 2)};`,
    '',
    `export const NEXA_TOKEN_SUMMARY = ${JSON.stringify({ declarations: catalog.length, references, layerCounts }, null, 2)} as const;`,
    '',
    'export function tokenValue(name: string): string {',
    '  const value = NEXA_TOKEN_VALUES[name];',
    '  if (!value) throw new Error(`Unknown Nexa token: ${name}`);',
    '  return value;',
    '}',
  ];
  return `${lines.join('\n')}\n`;
};

const generate = (source, target, document) => {
  let output = `${generatedHeader(source)}:root {\n${declarationBlock(document)}\n}`;

  if (source === 'semantic.tokens.json') {
    const mode = document.$extensions?.nexa?.modes?.['contrast-increased'];
    if (mode) {
      output += `\n\n:root[data-contrast-mode='increased'] {\n${declarationBlock(mode)}\n}`;
    }
  }

  return { target: join(styleRoot, target), output: `${output}\n` };
};

const mismatches = [];
for (const [source, target] of sources) {
  const document = tokenDocuments.get(source);
  const { target: destination, output } = generate(source, target, document);
  const current = await readFile(destination, 'utf8').catch(() => null);

  if (checkOnly) {
    if (current !== output) mismatches.push(target);
    continue;
  }

  if (current !== output) await writeFile(destination, output);
}

const tokenReferenceOutput = generateTokenReference();
const currentTokenReference = await readFile(tokenReferenceTarget, 'utf8').catch(() => null);
if (checkOnly) {
  if (currentTokenReference !== tokenReferenceOutput) mismatches.push('token-reference.generated.ts');
} else if (currentTokenReference !== tokenReferenceOutput) {
  await writeFile(tokenReferenceTarget, tokenReferenceOutput);
}

if (mismatches.length) {
  console.error(`Generated token artifacts are stale:\n${mismatches.map((file) => `- ${file === 'token-reference.generated.ts' ? 'src/app/documentation/content/' : 'src/styles/'}${file}`).join('\n')}`);
  process.exitCode = 1;
} else if (checkOnly) {
  console.log('Generated token artifacts are up to date.');
} else {
  console.log('Generated primitive, semantic, component and data-visualization token artifacts.');
}
