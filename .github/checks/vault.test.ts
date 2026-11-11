import { deepStrictEqual } from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, describe, test } from 'node:test';
import { headings, repoFiles } from './lib/vault.ts';

describe('repoFiles', () => {
  const dir = mkdtempSync(join(tmpdir(), 'parabrain-vault-'));
  after(() => rmSync(dir, { recursive: true, force: true }));

  test('lists tracked and untracked non-ASCII paths unquoted, skips ignored and deleted', () => {
    const git = (...args: string[]) =>
      execFileSync('git', ['-c', 'core.quotepath=true', ...args], { cwd: dir, stdio: 'pipe' });
    git('init', '-q');
    writeFileSync(join(dir, '.gitignore'), 'ignored.md\n');
    mkdirSync(join(dir, '4-Areas'));
    writeFileSync(join(dir, 'Zdrowie i sport.md'), 'x');
    writeFileSync(join(dir, '4-Areas', 'Zażółć gęślą jaźń.md'), 'x');
    writeFileSync(join(dir, 'ignored.md'), 'x');
    writeFileSync(join(dir, 'gone.md'), 'x');
    git('add', 'gone.md', 'Zdrowie i sport.md');
    rmSync(join(dir, 'gone.md'));
    writeFileSync(join(dir, 'untracked ąę.md'), 'x');

    deepStrictEqual(repoFiles(dir).sort(), [
      '.gitignore',
      '4-Areas/Zażółć gęślą jaźń.md',
      'Zdrowie i sport.md',
      'untracked ąę.md',
    ]);
  });
});

describe('headings', () => {
  test('reads H2 or H3 outside fences', () => {
    const text = '# T\n## A\n### a1\n## B\n';
    deepStrictEqual(headings(text, 2), ['A', 'B']);
    deepStrictEqual(headings(text, 3), ['a1']);
  });

  test('a shorter fence does not close a longer one', () => {
    const text = '## Before\n````md\n```\n## inside\n```\n## still inside\n````\n## After\n';
    deepStrictEqual(headings(text, 2), ['Before', 'After']);
  });

  test('a longer fence closes a shorter one', () => {
    const text = '```\n## inside\n`````\n## After\n';
    deepStrictEqual(headings(text, 2), ['After']);
  });

  test('tilde fences: backticks do not close them and vice versa', () => {
    const text = '~~~~\n```\n## in tilde\n```\n~~~\n## still in tilde\n~~~~\n## A\n```\n~~~\n## in backtick\n~~~\n```\n## B\n';
    deepStrictEqual(headings(text, 2), ['A', 'B']);
  });

  test('a fence line with an info string does not close an open fence', () => {
    const text = '```\n```js\n## inside\n```\n## After\n';
    deepStrictEqual(headings(text, 2), ['After']);
  });
});
