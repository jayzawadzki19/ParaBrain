import { deepStrictEqual, ok } from 'node:assert/strict';
import { test } from 'node:test';
import { exists, headings, listDir, readText } from './lib/vault.ts';

const README_H2 = [
  'What it is', 'How it works', 'Daily use', 'Setup: local', 'Setup: other devices',
  'Privacy', 'Updating', 'Credits', 'License',
];

test('README has its sections in order', () => {
  ok(exists('README.md'), 'missing README.md');
  deepStrictEqual(headings(readText('README.md'), 2), README_H2);
});

test('README names every skill', () => {
  ok(exists('README.md'), 'missing README.md');
  const readme = readText('README.md');
  for (const skill of listDir('.agents/skills')) {
    ok(readme.includes(skill), `README is missing ${skill}`);
  }
});

test('README links what it claims', () => {
  ok(exists('README.md'), 'missing README.md');
  const readme = readText('README.md');
  for (const text of ['help.obsidian.md/sync/headless', 'upstream', 'Obsidian Sync']) {
    ok(readme.includes(text), `README is missing ${text}`);
  }
});
