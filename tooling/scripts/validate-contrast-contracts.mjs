import { readFile } from 'node:fs/promises';
import { stripTypeScriptTypes } from 'node:module';
import { resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { evaluateContrast } from '../../src/app/lab/quality/contrast.ts';

const repositoryRoot = resolve(fileURLToPath(new URL('../..', import.meta.url)));
const contractsPath = resolve(repositoryRoot, 'src/app/documentation/content/contrast-contracts.ts');
const tokenReferencePath = resolve(repositoryRoot, 'src/app/documentation/content/token-reference.generated.ts');
const contractsSource = await readFile(contractsPath, 'utf8');
const executableContracts = stripTypeScriptTypes(
  contractsSource.replace(
    "from './token-reference.generated';",
    `from '${pathToFileURL(tokenReferencePath).href}';`,
  ),
  { mode: 'strip' },
);
const { APPROVED_CONTRAST_PAIRS } = await import(
  `data:text/javascript;charset=utf-8,${encodeURIComponent(executableContracts)}`,
);

const results = APPROVED_CONTRAST_PAIRS.map((pair) => ({
  ...pair,
  result: evaluateContrast(pair.foreground, pair.background, pair.gate),
}));

const failures = results.filter(({ result }) => !result.pass);

for (const { label, foregroundToken, backgroundToken, result } of results) {
  console.log(`${result.pass ? 'PASS' : 'FAIL'} ${label}: ${result.ratio}:1 (expected ${result.threshold}:1) [${foregroundToken} on ${backgroundToken}]`);
}

if (failures.length > 0) {
  throw new Error(`${failures.length} approved contrast contract(s) failed.`);
}

console.log(`Contrast contracts valid: ${results.length} pairs passed.`);
