import { deepStrictEqual } from 'node:assert/strict';
import { test } from 'node:test';
import { execFileSync } from 'node:child_process';
import { existsSync, lstatSync, mkdtempSync, readFileSync, readlinkSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { ROOT } from './lib/vault.ts';

const EM_DASH = String.fromCharCode(0x2014);
function readFile(root: string, path: string): Buffer {
  const fullPath = join(root, path);
  return lstatSync(fullPath).isSymbolicLink()
    ? Buffer.from(readlinkSync(fullPath))
    : readFileSync(fullPath);
}

function textFiles(root: string = ROOT): string[] {
  const paths = execFileSync('git', ['ls-files', '-z'], { cwd: root, encoding: 'utf8' });
  return paths.split('\0').filter((path) => path !== '' && existsSync(join(root, path)))
    .filter((path) => !readFile(root, path).subarray(0, 8192).includes(0));
}

test('no em dash in any repository text file', () => {
  const offenders = textFiles().filter((f) => readFile(ROOT, f).toString('utf8').includes(EM_DASH));
  deepStrictEqual(offenders, [], `em dash found in: ${offenders.join(', ')}`);
});

test('no placeholder markers', () => {
  const offenders = textFiles()
    .filter((f) => !f.startsWith('.github/checks/'))
    .filter((f) => /\bTBD\b|\bTODO\b/.test(readFile(ROOT, f).toString('utf8')));
  deepStrictEqual(offenders, [], `placeholder marker found in: ${offenders.join(', ')}`);
});

test('selects tracked text regardless of extension and excludes binary and untracked files', () => {
  const root = mkdtempSync(join(tmpdir(), 'parabrain-text-'));
  try {
    execFileSync('git', ['init', '-q', root]);
    writeFileSync(join(root, 'script'), 'text');
    writeFileSync(join(root, 'run.sh'), 'text');
    writeFileSync(join(root, 'binary.md'), Buffer.from([65, 0, 66]));
    execFileSync('git', ['add', '--', 'script', 'run.sh', 'binary.md'], { cwd: root });
    writeFileSync(join(root, 'untracked.md'), 'text');
    deepStrictEqual(textFiles(root).sort(), ['run.sh', 'script']);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
