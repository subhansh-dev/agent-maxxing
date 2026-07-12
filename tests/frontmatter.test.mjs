import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'fs';
import { join, extname } from 'path';

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

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const yaml = match[1];
  const pairs = {};
  for (const line of yaml.split('\n')) {
    const m = line.match(/^(\w[\w-]*):\s*(.+)/);
    if (m) pairs[m[1]] = m[2].trim();
  }
  return pairs;
}

const mdFiles = walkMd(ROOT);

describe('YAML Frontmatter', () => {
  const skillDirs = [
    'adaptation', 'agent-meta', 'components', 'content',
    'engineering', 'frontend-design', 'system-prompts', 'visual', 'workflows'
  ];

  for (const dir of skillDirs) {
    const dirPath = join(ROOT, dir);
    let files;
    try {
      files = readdirSync(dirPath).filter(f => f.endsWith('.md'));
    } catch {
      continue;
    }

    for (const file of files) {
      it(`${dir}/${file} has valid YAML frontmatter with name and description`, () => {
        const content = readFileSync(join(dirPath, file), 'utf-8');
        const fm = parseFrontmatter(content);
        assert.ok(fm, `${dir}/${file} missing YAML frontmatter (--- delimiters)`);
        assert.ok(fm.name, `${dir}/${file} missing 'name' in frontmatter`);
        assert.ok(fm.description, `${dir}/${file} missing 'description' in frontmatter`);
        assert.ok(fm.name.length > 0, `${dir}/${file} has empty 'name'`);
        assert.ok(fm.description.length > 10, `${dir}/${file} 'description' too short (<10 chars)`);
      });
    }
  }

  it('root-level skill docs have frontmatter where applicable', () => {
    const rootDocs = ['FINE-TUNE-AGENT.md', 'INTEGRATE.md', 'PROMPT-FINE-TUNE.md', 'PROMPT-INTEGRATE.md'];
    for (const doc of rootDocs) {
      const content = readFileSync(join(ROOT, doc), 'utf-8');
      const fm = parseFrontmatter(content);
      assert.ok(fm, `${doc} missing frontmatter`);
      assert.ok(fm.name || fm.description, `${doc} has frontmatter but no name/description`);
    }
  });
});
