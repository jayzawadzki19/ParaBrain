import { execFileSync } from 'node:child_process';
import { existsSync, lstatSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export const ROOT: string = join(import.meta.dirname, '..', '..', '..');

export function readText(rel: string): string {
  return readFileSync(join(ROOT, rel), 'utf8');
}

export function exists(rel: string): boolean {
  return existsSync(join(ROOT, rel));
}

export function isSymlink(rel: string): boolean {
  return lstatSync(join(ROOT, rel)).isSymbolicLink();
}

export function listDir(rel: string): string[] {
  return readdirSync(join(ROOT, rel)).sort();
}

export function parseFrontmatter(text: string): Record<string, string> | null {
  const lines = text.split(/\r?\n/);
  if (lines[0]?.trim() !== '---') return null;
  const end = lines.findIndex((line, i) => i > 0 && line.trim() === '---');
  if (end === -1) return null;
  const result: Record<string, string> = {};
  for (const line of lines.slice(1, end)) {
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    result[line.slice(0, colon).trim()] = line.slice(colon + 1).trim();
  }
  return result;
}

export function headings(text: string, level: 2 | 3): string[] {
  const prefix = '#'.repeat(level) + ' ';
  const result: string[] = [];
  let fence: { char: string; length: number } | null = null;
  for (const line of text.split(/\r?\n/)) {
    if (fence === null) {
      const open = /^ {0,3}(`{3,}|~{3,})/.exec(line)?.[1];
      if (open) {
        fence = { char: open[0]!, length: open.length };
        continue;
      }
      if (line.startsWith(prefix)) result.push(line.slice(prefix.length).trim());
    } else {
      const close = /^ {0,3}(`{3,}|~{3,})\s*$/.exec(line)?.[1];
      if (close && close[0] === fence.char && close.length >= fence.length) fence = null;
    }
  }
  return result;
}

export function repoFiles(root: string = ROOT): string[] {
  const out = execFileSync('git', ['ls-files', '-z', '--cached', '--others', '--exclude-standard'], {
    cwd: root,
    encoding: 'utf8',
  });
  return out.split('\0').filter((f) => f !== '' && existsSync(join(root, f)));
}
