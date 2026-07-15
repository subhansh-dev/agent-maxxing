import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'fs';
import { join, extname, dirname, resolve } from 'path';

const ROOT = join(import.meta.dirname, '..');

function walkMd(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (entry === '.git' || entry === 'node_modules' || entry === 'tests') continue;
    if (statSync(full).isDirectory()) {
      results.push(...walkMd(full));
    } else if (extname(entry) === '.md') {
      results.push(full);
    }
  }
  return results;
}

function extractMdLinks(content) {
  const links = [];
  const regex = /\[([^\]]*)\]\(([^)]+)\)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    links.push({ text: match[1], href: match[2] });
  }
  return links;
}

describe('Internal markdown links', () => {
  const mdFiles = walkMd(ROOT);

  for (const file of mdFiles.slice(0, 30)) {
    const rel = file.replace(ROOT + '\\', '').replace(ROOT + '/', '');
    it(`${rel} has no broken internal .md links`, () => {
      const content = readFileSync(file, 'utf-8');
      const links = extractMdLinks(content);
      const fileDir = dirname(file);

      for (const link of links) {
        if (link.href.startsWith('http://') || link.href.startsWith('https://') || link.href.startsWith('#')) {
          continue;
        }
        const target = resolve(fileDir, link.href);
        const targetExists = statSync(target, { throwIfNoEntry: false }) !== undefined;
        // Also check if it's a directory with SKILL.md inside (directory-based skill structure)
        const dirWithSkill = resolve(fileDir, link.href.replace(/\.md$/, ''), 'SKILL.md');
        const dirSkillExists = statSync(dirWithSkill, { throwIfNoEntry: false }) !== undefined;
        assert.ok(
          targetExists || dirSkillExists,
          `broken link: [${link.text}](${link.href}) in ${rel}`
        );
      }
    });
  }
});

describe('Division consistency', () => {
  it('each division directory contains only .md files and optionally a SKILL.md', () => {
    const divisions = [
      'adaptation', 'agent-meta', 'components', 'content',
      'engineering', 'frontend-design', 'system-prompts', 'visual', 'workflows'
    ];
    for (const dir of divisions) {
      const dirPath = join(ROOT, dir);
      const files = readdirSync(dirPath);
      for (const f of files) {
        const full = join(dirPath, f);
        if (statSync(full).isDirectory()) {
          continue;
        }
        assert.ok(
          f.endsWith('.md') || f.endsWith('.json'),
          `${dir}/${f} is not a .md or .json file`
        );
      }
    }
  });
});

describe('Frontmatter name consistency', () => {
  const divisions = [
    'adaptation', 'agent-meta', 'components', 'content',
    'engineering', 'frontend-design', 'system-prompts', 'visual', 'workflows'
  ];

  for (const dir of divisions) {
    const dirPath = join(ROOT, dir);
    let files;
    try {
      files = readdirSync(dirPath).filter(f => f.endsWith('.md'));
    } catch { continue; }

    for (const file of files) {
      it(`${dir}/${file} frontmatter name matches filename stem`, () => {
        const content = readFileSync(join(dirPath, file), 'utf-8');
        const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
        if (!match) return;

        const yaml = match[1];
        const nameMatch = yaml.match(/^name:\s*(.+)/m);
        if (!nameMatch) return;

        const name = nameMatch[1].trim().toLowerCase();
        const stem = file.replace('.md', '').toLowerCase().replace(/^\d+-/, '');
        assert.equal(
          name, stem,
          `frontmatter name "${name}" doesn't match filename stem "${stem}"`
        );
      });
    }
  }
});
