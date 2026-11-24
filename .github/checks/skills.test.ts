import { deepStrictEqual, equal, ok } from 'node:assert/strict';
import { readlinkSync, realpathSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { ROOT, exists, headings, isSymlink, listDir, parseFrontmatter, readText } from './lib/vault.ts';

// Each skill task appends its name here.
const EXPECTED_SKILLS = ['process-inbox', 'review-journal', 'manage-project', 'ask-brain', 'check-health', 'start-journey', 'capture-to-inbox'];

test('.claude/skills is a symlink to ../.agents/skills', () => {
  ok(exists('.claude/skills'), '.claude/skills is missing or dangling');
  ok(isSymlink('.claude/skills'), '.claude/skills must be a symlink');
  equal(readlinkSync(join(ROOT, '.claude/skills')), '../.agents/skills');
  equal(realpathSync(join(ROOT, '.claude/skills')), realpathSync(join(ROOT, '.agents/skills')));
});

test('skill set is exactly EXPECTED_SKILLS', () => {
  deepStrictEqual(listDir('.agents/skills'), [...EXPECTED_SKILLS].sort());
});

test('each skill has valid frontmatter', () => {
  for (const skill of EXPECTED_SKILLS) {
    const fm = parseFrontmatter(readText(`.agents/skills/${skill}/SKILL.md`));
    ok(fm, `${skill}: SKILL.md has no frontmatter`);
    equal(fm.name, skill, `${skill}: name must equal the folder name`);
    ok(/^[a-z0-9-]{1,64}$/.test(fm.name ?? ''), `${skill}: invalid name`);
    const description = fm.description ?? '';
    ok(description.length >= 1 && description.length <= 1024, `${skill}: description must be 1-1024 characters`);
    ok(description.startsWith('Use when'), `${skill}: description must start with "Use when"`);
  }
});

test('each skill ends with a self-check', () => {
  for (const skill of EXPECTED_SKILLS) {
    const h2 = headings(readText(`.agents/skills/${skill}/SKILL.md`), 2);
    ok(h2.includes('Self-check'), `${skill}: missing "## Self-check" section`);
    equal(h2.at(-1), 'Self-check', `${skill}: "Self-check" must be the last section`);
  }
});

test('each relative path a skill mentions exists', () => {
  for (const skill of EXPECTED_SKILLS) {
    const text = readText(`.agents/skills/${skill}/SKILL.md`);
    const paths = new Set<string>();
    for (const m of text.matchAll(/`(references\/[^`\s]+)`/g)) paths.add(`.agents/skills/${skill}/${m[1]}`);
    for (const m of text.matchAll(/`(\.agents\/templates\/[^`\s]+)`/g)) paths.add(m[1]!);
    for (const path of paths) ok(exists(path), `${skill}: mentioned path does not exist: ${path}`);
  }
});
