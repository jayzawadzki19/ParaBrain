import { deepStrictEqual, equal, ok } from 'node:assert/strict';
import { test } from 'node:test';
import { exists, headings, listDir, parseFrontmatter, readText } from './lib/vault.ts';

const FOLDERS = [
  '1-Journal/Daily',
  '1-Journal/Weekly',
  '1-Journal/Monthly',
  '2-Inbox',
  '3-Projects',
  '4-Areas',
  '5-Resources',
  '6-Archive',
  '7-Raw/sources',
  '7-Raw/assets',
  '8-System/templates',
];
const ROOT_FILES = ['index.md', 'log.md', 'questions.md', 'LICENSE'];

test('every vault folder exists', () => {
  for (const folder of FOLDERS) {
    ok(exists(folder), `missing folder: ${folder}`);
  }
});

test('content folders ship empty', () => {
  for (const folder of FOLDERS.filter((f) => f !== '8-System/templates')) {
    deepStrictEqual(listDir(folder), ['.gitkeep'], `${folder} must contain only .gitkeep`);
  }
});

test('root files exist', () => {
  for (const file of ROOT_FILES) {
    ok(exists(file), `missing root file: ${file}`);
  }
});

test('AGENTS.md and CLAUDE.md exist', () => {
  ok(exists('AGENTS.md'), 'missing AGENTS.md');
  ok(exists('CLAUDE.md'), 'missing CLAUDE.md');
});

test('README.md exists', () => {
  ok(exists('README.md'), 'missing README.md');
});

test('index.md has the six sections in order', () => {
  deepStrictEqual(headings(readText('index.md'), 2), [
    'Projects',
    'Areas',
    'Concepts',
    'Entities',
    'Summaries',
    'My documents',
  ]);
});

test('.claude/settings.json empties the commit and pull request attribution', () => {
  const settings = JSON.parse(readText('.claude/settings.json')) as {
    attribution?: { commit?: unknown; pr?: unknown };
  };
  equal(settings.attribution?.commit, '');
  equal(settings.attribution?.pr, '');
});

test('my-document template has only type: my-document in its frontmatter, then a title heading', () => {
  const text = readText('8-System/templates/My document.md');
  deepStrictEqual(parseFrontmatter(text), { type: 'my-document' });
  ok(/^# \S/m.test(text.replace(/^---[\s\S]*?---\r?\n/, '')), 'My document.md needs a title heading after the frontmatter');
});

test('log.md documents the line format', () => {
  ok(readText('log.md').includes('## [YYYY-MM-DD] operation | sources | pages touched'));
});

test('questions.md documents the line format', () => {
  ok(readText('questions.md').includes('- [ ] question - where it came from (link) - date'));
});

test('daily template has optional reflection prompts and no title', () => {
  deepStrictEqual(readText('8-System/templates/Daily.md').trim(), '## Reflection (optional)\n\n- Energy and mood:\n- What I noticed about myself:\n- What I am grateful for:');
});

test('no 8-System/about.md is shipped', () => {
  ok(!exists('8-System/about.md'), '8-System/about.md is created by start-journey, not shipped');
});
