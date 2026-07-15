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
    let skillFiles;
    try {
      skillFiles = walkMd(dirPath);
    } catch {
      continue;
    }

    for (const filePath of skillFiles) {
      const rel = filePath.replace(ROOT + '\\', '').replace(ROOT + '/', '');
      it(`${rel} has valid YAML frontmatter with name and description`, () => {
        const content = readFileSync(filePath, 'utf-8');
        const fm = parseFrontmatter(content);
        assert.ok(fm, `${rel} missing YAML frontmatter (--- delimiters)`);
        assert.ok(fm.name, `${rel} missing 'name' in frontmatter`);
        assert.ok(fm.description, `${rel} missing 'description' in frontmatter`);
        assert.ok(fm.name.length > 0, `${rel} has empty 'name'`);
        assert.ok(fm.description.length > 10, `${rel} 'description' too short (<10 chars)`);
      });
    }
  }

  it('root-level skill docs have frontmatter where applicable', () => {
    const rootDocs = ['FINE-TUNE-AGENT', 'INTEGRATE', 'PROMPT-FINE-TUNE', 'PROMPT-INTEGRATE'];
    for (const doc of rootDocs) {
      const skillPath = join(ROOT, doc, 'SKILL.md');
      const flatPath = join(ROOT, doc + '.md');
      const filePath = statSync(skillPath, { throwIfNoEntry: false }) !== undefined ? skillPath : flatPath;
      const content = readFileSync(filePath, 'utf-8');
      const fm = parseFrontmatter(content);
      assert.ok(fm, `${doc} missing frontmatter`);
      assert.ok(fm.name || fm.description, `${doc} has frontmatter but no name/description`);
    }
  });
});
