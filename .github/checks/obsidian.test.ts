import { deepStrictEqual, equal, ok } from 'node:assert/strict';
import { test } from 'node:test';
import { exists, readText } from './lib/vault.ts';

const json = (file: string) => JSON.parse(readText(`.obsidian/${file}`));

test('daily notes go to 1-Journal/Daily with the Daily template', () => {
  deepStrictEqual(json('daily-notes.json'), {
    folder: '1-Journal/Daily',
    format: 'YYYY-MM-DD',
    template: '8-System/templates/Daily',
  });
});

test('attachments go to 7-Raw/assets', () => {
  equal(json('app.json').attachmentFolderPath, '7-Raw/assets');
});

test('templates plugin points at 8-System/templates', () => {
  equal(json('templates.json').folder, '8-System/templates');
});

test('daily-notes and templates core plugins are on', () => {
  const plugins = json('core-plugins.json');
  equal(plugins['daily-notes'], true);
  equal(plugins['templates'], true);
});

test('graph hides raw material', () => {
  const search: string = json('graph.json').search;
  ok(search.includes('-path:7-Raw'), 'graph search must exclude 7-Raw');
  ok(search.includes('-path:1-Journal/Daily'), 'graph search must exclude daily notes');
});

test('graph colours PARA folders and the journal', () => {
  const groups: { query: string; color: { a: number; rgb: number } }[] = json('graph.json').colorGroups;
  deepStrictEqual(
    groups.map((g) => g.query),
    ['path:1-Journal', 'path:3-Projects', 'path:4-Areas', 'path:5-Resources', 'path:6-Archive'],
  );
  equal(new Set(groups.map((g) => g.color.rgb)).size, groups.length, 'colours must be distinct');
  for (const g of groups) equal(g.color.a, 1);
});

test('workspace files are not shipped', () => {
  ok(!exists('.obsidian/workspace.json'));
  ok(!exists('.obsidian/workspace-mobile.json'));
});
