import { APPROVED_CONTRAST_PAIRS } from '../../src/app/guidelines/documentation-data.ts';
import { evaluateContrast } from '../../src/app/shared/contrast.ts';

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
