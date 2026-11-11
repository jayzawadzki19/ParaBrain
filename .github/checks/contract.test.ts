import { deepStrictEqual, equal, ok } from 'node:assert/strict';
import { test } from 'node:test';
import { exists, headings, listDir, parseFrontmatter, readText } from './lib/vault.ts';

interface TemplateSpec {
  readonly type: string;
  readonly extraKeys: readonly string[];
  readonly h2: readonly string[];
}

const TEMPLATES: Record<string, TemplateSpec> = {
  project: {
    type: 'project',
    extraKeys: ['linear'],
    h2: ['Goal', 'For whom', 'Definition of done', 'Current state', 'Project knowledge', 'Related'],
  },
  area: {
    type: 'area',
    extraKeys: [],
    h2: ['Current practice', 'Standards to keep', 'Changes', 'Knowledge I use'],
  },
  concept: {
    type: 'concept',
    extraKeys: ['urls'],
    h2: [
      'In short',
      'How it works',
      'Evidence and examples',
      'Caveats and contradictions',
      'Where it applies to me',
      'Related',
      'Open questions',
    ],
  },
  entity: {
    type: 'entity',
    extraKeys: ['kind', 'urls'],
    h2: ['Who or what', 'What they argue or do', 'Where it shows up', 'Where it applies to me'],
  },
  summary: {
    type: 'summary',
    extraKeys: ['period'],
    h2: ['What happened', 'Patterns and observations', 'Carry-forward'],
  },
};
const COMMON_KEYS = ['type', 'created', 'updated', 'status', 'sources'];
const AGENTS_H2 = [
  'Read first',
  'Folders',
  'Who writes what',
  'PARA rules',
  'Linear',
  'Source lifecycle',
  'Every write',
  'Content quality',
  'Page types',
  'Skills',
  'Limits',
];

function section(markdown: string, title: string): string {
  const lines = markdown.split(/\r?\n/);
  const start = lines.findIndex((line) => line === `## ${title}`);
  ok(start !== -1, `missing section: ${title}`);
  const rest = lines.slice(start + 1);
  const end = rest.findIndex((line) => line.startsWith('## '));
  return (end === -1 ? rest : rest.slice(0, end)).join('\n');
}

for (const [name, spec] of Object.entries(TEMPLATES)) {
  test(`${name} template has the common keys, its extra keys, its type and its sections in order`, () => {
    const text = readText(`.agents/templates/${name}.md`);
    const frontmatter = parseFrontmatter(text);
    ok(frontmatter, `${name}.md has no frontmatter`);
    deepStrictEqual(Object.keys(frontmatter).sort(), [...COMMON_KEYS, ...spec.extraKeys].sort());
    equal(frontmatter['type'], spec.type);
    deepStrictEqual(headings(text, 2), [...spec.h2]);
  });

  test(`${name} template explains every section with one italic line`, () => {
    const lines = readText(`.agents/templates/${name}.md`).split(/\r?\n/);
    for (const [i, line] of lines.entries()) {
      if (!line.startsWith('## ')) continue;
      const hint = lines[i + 2] ?? '';
      ok(/^_[^_].*[^_]_$/.test(hint), `"${line}" in ${name}.md needs an italic hint two lines below`);
    }
  });
}

test('decisions template entry has Decision, Why, Rejected alternatives, Source', () => {
  const text = readText('.agents/templates/decisions.md');
  equal(parseFrontmatter(text), null, 'decisions.md must have no frontmatter');
  ok(text.includes('## YYYY-MM-DD - Title'));
  const labels = ['Decision', 'Why', 'Rejected alternatives', 'Source'].map((l) => `**${l}:**`);
  const positions = labels.map((label) => text.indexOf(label));
  ok(positions.every((p) => p !== -1), `missing label in decisions.md: ${labels.join(', ')}`);
  deepStrictEqual(positions, [...positions].sort((a, b) => a - b));
});

test('log template entry has What changed, Why, Next, Source', () => {
  const text = readText('.agents/templates/log.md');
  equal(parseFrontmatter(text), null, 'log.md must have no frontmatter');
  ok(text.includes('## YYYY-MM-DD - Title'));
  const labels = ['What changed', 'Why', 'Next', 'Source'].map((l) => `**${l}:**`);
  const positions = labels.map((label) => text.indexOf(label));
  ok(positions.every((p) => p !== -1), `missing label in log.md: ${labels.join(', ')}`);
  deepStrictEqual(positions, [...positions].sort((a, b) => a - b));
});

test('CLAUDE.md imports AGENTS.md', () => {
  ok(readText('CLAUDE.md').split(/\r?\n/).includes('@AGENTS.md'));
});

test('AGENTS.md has its sections in order', () => {
  deepStrictEqual(headings(readText('AGENTS.md'), 2), AGENTS_H2);
});

test('AGENTS.md links every template', () => {
  const agents = readText('AGENTS.md');
  for (const file of listDir('.agents/templates')) {
    ok(agents.includes(`.agents/templates/${file}`), `AGENTS.md does not link .agents/templates/${file}`);
  }
});

test('AGENTS.md lists every skill that exists', () => {
  if (!exists('.agents/skills')) return;
  const skills = section(readText('AGENTS.md'), 'Skills');
  for (const name of listDir('.agents/skills')) {
    if (name.startsWith('.')) continue;
    ok(skills.includes(`\`${name}\``), `AGENTS.md Skills section does not list ${name}`);
  }
});

test('AGENTS.md carries the twelve numbered content quality rules', () => {
  const rules = section(readText('AGENTS.md'), 'Content quality')
    .split(/\r?\n/)
    .filter((line) => /^\d+\. /.test(line));
  deepStrictEqual(
    rules.map((line) => Number(/^(\d+)\./.exec(line)?.[1])),
    Array.from({ length: 12 }, (_, i) => i + 1),
  );
});

test('AGENTS.md states the write protocol, log format and questions format', () => {
  const agents = readText('AGENTS.md');
  ok(agents.includes('## [YYYY-MM-DD] operation | sources | pages touched'));
  ok(agents.includes('- [ ] question - where it came from (link) - date'));
  ok(agents.includes('sync: human edits'));
});

test('limits.md covers five limits', () => {
  const found = headings(readText('8-System/limits.md'), 2);
  for (const title of [
    'Error compounding',
    'Hallucination does not disappear',
    'Navigation as the vault grows',
    'Cost',
    'Single-model blind spot',
  ]) {
    ok(found.includes(title), `limits.md is missing: ${title}`);
  }
});

test('limits.md credits Super Brain on its last line', () => {
  const lines = readText('8-System/limits.md').trimEnd().split(/\r?\n/);
  equal(lines.at(-1), 'Adapted from Super Brain (MIT), github.com/superhero-tech/super-brain.');
});

test('AGENTS.md covers owner documents, source URLs and the attribution rule', () => {
  const agents = readText('AGENTS.md');
  ok(agents.includes('my-document'), 'AGENTS.md does not mention my-document');
  ok(agents.includes('8-System/templates/My document.md'), 'AGENTS.md does not link the My document template');
  ok(agents.includes('urls'), 'AGENTS.md does not mention urls');
  ok(agents.includes('Co-Authored-By'), 'AGENTS.md does not forbid attribution trailers');
  ok(agents.includes('git mv'), 'AGENTS.md does not move files with git mv');
});


test('content quality rule 5 requires footnotes', () => {
  const rule = section(readText('AGENTS.md'), 'Content quality').split(/\r?\n/).find((line) => line.startsWith('5. '));
  ok(rule?.includes('footnote'));
});

test('compiled example cites with a footnote', () => {
  const example = section(readText('AGENTS.md'), 'Content quality').split('1. **')[0];
  ok(example.includes('[^1]'));
  ok(example.includes('[^1]: [[7-Raw/sources/'));
});
