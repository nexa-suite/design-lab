import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const publicApiPath = join(root, 'projects', 'nexa-ui', 'src', 'public-api.ts');
const publicApi = readFileSync(publicApiPath, 'utf8');
const violations = [];
const expectedExports = [
  'NexaActionMenu', 'NexaLogo', 'NexaButton', 'NexaNumericStepper', 'NexaRangeSlider',
  'NexaLocaleSwitcher', 'NexaSegmentedControl', 'NexaStatusChip', 'NexaSurface',
  'NexaTextField', 'NexaToggle', 'NexaTooltip',
];

for (const exportName of expectedExports) {
  if (!new RegExp(`\\b${exportName}\\b`).test(publicApi)) violations.push(`missing public export ${exportName}`);
}
if (/documentation|\/lab\/|src\/app/.test(publicApi)) violations.push('public API leaks documentation or Lab ownership');
if (/export \* from/.test(publicApi)) violations.push('public API must use explicit exports, not export *');

function filesUnder(directory) {
  if (!statSync(directory, { throwIfNoEntry: false })) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesUnder(path) : /\.(?:ts|html|scss)$/.test(entry.name) ? [path] : [];
  });
}

for (const file of filesUnder(join(root, 'src', 'app'))) {
  const source = readFileSync(file, 'utf8');
  if (/(?:from|import\s*\()\s*['"][^'"]*projects\/nexa-ui\/src\/lib/.test(source)) {
    violations.push(`${relative(root, file)} imports a library implementation path`);
  }
}

if (violations.length) {
  console.error('Public API validation failed.');
  for (const violation of violations) console.error(`- ${violation}`);
  process.exit(1);
}

console.log(`Public API validation passed: ${expectedExports.length} explicit reusable exports and no documentation/Lab leakage.`);
