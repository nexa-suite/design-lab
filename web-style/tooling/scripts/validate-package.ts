import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const packageDirectory = join(root, 'dist', 'nexa-ui');
const violations = [];

if (!existsSync(packageDirectory)) {
  violations.push('dist/nexa-ui is missing; build the Angular library before validating the package');
} else {
  const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const result = spawnSync(npmCommand, ['pack', '--dry-run', '--json'], {
    cwd: packageDirectory,
    encoding: 'utf8',
  });

  if (result.status !== 0) {
    violations.push(`npm pack --dry-run failed: ${(result.stderr || result.stdout).trim()}`);
  } else {
    try {
      const [manifest] = JSON.parse(result.stdout);
      const files = manifest?.files?.map(({ path }) => path) ?? [];
      const requiredFiles = ['README.md', 'fesm2022/nexa-ui.mjs', 'package.json', 'types/nexa-ui.d.ts'];
      for (const requiredFile of requiredFiles) {
        if (!files.includes(requiredFile)) violations.push(`published package is missing ${requiredFile}`);
      }
      if (files.length === 0) violations.push('published package contains no files');
      for (const path of files) {
        if (/(?:documentation|(?:^|\/)lab(?:\/|$)|src\/lib|token-reference)/i.test(path)) {
          violations.push(`published package leaks Lab/documentation source: ${path}`);
        }
      }
      if (manifest?.name !== 'nexa-ui') violations.push(`published package name is ${manifest?.name ?? 'missing'}, expected nexa-ui`);
    } catch (error) {
      violations.push(`could not parse npm pack manifest: ${error.message}`);
    }
  }
}

if (violations.length) {
  console.error('Package validation failed.');
  for (const violation of violations) console.error(`- ${violation}`);
  process.exit(1);
}

console.log('Package validation passed: nexa-ui distribution contains only the public library artifacts.');
