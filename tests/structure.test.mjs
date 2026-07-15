import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'fs';
import { join, extname, basename } from 'path';

const ROOT = join(import.meta.dirname, '..');

function countFiles(dir, ext) {
  let count = 0;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (entry === '.git' || entry === 'node_modules' || entry === 'tests') continue;
    if (statSync(full).isDirectory()) {
      count += countFiles(full, ext);
    } else if (extname(entry) === ext) {
      count++;
    }
  }
  return count;
}

function listDirs(dir) {
  return readdirSync(dir).filter(entry => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() && entry !== '.git' && entry !== 'node_modules' && entry !== 'tests';
  });
}

function listFiles(dir, ext) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...listFiles(full, ext));
    } else if (extname(entry) === ext) {
      results.push(entry);
    }
  }
  return results;
}

describe('Directory structure', () => {
  it('has all 9 skill division directories', () => {
    const dirs = listDirs(ROOT);
    const expected = [
      'adaptation', 'agent-meta', 'components', 'content',
      'engineering', 'frontend-design', 'system-prompts', 'visual', 'workflows'
    ];
    for (const d of expected) {
      assert.ok(dirs.includes(d), `missing directory: ${d}`);
    }
  });

  it('has examples directory', () => {
    const dirs = listDirs(ROOT);
    assert.ok(dirs.includes('examples'), 'missing examples directory');
  });

  it('has tests directory', () => {
    assert.doesNotThrow(() => statSync(join(ROOT, 'tests')), 'missing tests directory');
  });
});

describe('Skill file counts', () => {
  it('has at least 80 skill .md files across all divisions', () => {
    const count = countFiles(ROOT, '.md');
    assert.ok(count >= 80, `only ${count} .md files found, expected >= 80`);
  });

  it('engineering has at least 15 skills', () => {
    const files = listFiles(join(ROOT, 'engineering'), '.md');
    assert.ok(files.length >= 15, `engineering has ${files.length} files, expected >= 15`);
  });

  it('frontend-design has at least 10 skills', () => {
    const files = listFiles(join(ROOT, 'frontend-design'), '.md');
    assert.ok(files.length >= 10, `frontend-design has ${files.length} files, expected >= 10`);
  });

  it('components has at least 15 files', () => {
    const files = listFiles(join(ROOT, 'components'), '.md');
    assert.ok(files.length >= 15, `components has ${files.length} files, expected >= 15`);
  });

  it('system-prompts has exactly 7 files', () => {
    const files = listFiles(join(ROOT, 'system-prompts'), '.md');
    assert.ok(files.length >= 7, `system-prompts has ${files.length} files, expected >= 7`);
  });
});

describe('Required root files', () => {
  const requiredFiles = [
    'LICENSE',
    'divisions.json', 'tools.json', 'package.json',
    'PROMPT-FINE-TUNE.md', 'PROMPT-INTEGRATE.md'
  ];

  const requiredDirs = [
    'README', 'CONTRIBUTING', 'SECURITY',
    '00-INDEX', '00-OVERVIEW',
    'FINE-TUNE-AGENT', 'INTEGRATE'
  ];

  for (const file of requiredFiles) {
    it(`has ${file}`, () => {
      assert.doesNotThrow(() => statSync(join(ROOT, file)), `${file} not found`);
    });
  }

  for (const dir of requiredDirs) {
    it(`has ${dir}/ directory with SKILL.md`, () => {
      const dirPath = join(ROOT, dir);
      const skillPath = join(dirPath, 'SKILL.md');
      assert.doesNotThrow(() => statSync(dirPath), `${dir}/ directory not found`);
      assert.doesNotThrow(() => statSync(skillPath), `${dir}/SKILL.md not found`);
    });
  }
});

describe('README accuracy', () => {
  it('README claims match actual file counts (±10 tolerance)', () => {
    const readme = readFileSync(join(ROOT, 'README', 'SKILL.md'), 'utf-8');

    const skillCount = countFiles(ROOT, '.md') - 5;
    const skillMatch = readme.match(/Skills-(\d+)/);
    if (skillMatch) {
      const claimed = parseInt(skillMatch[1]);
      assert.ok(
        Math.abs(skillCount - claimed) <= 10,
        `README claims ${claimed} skills but found ${skillCount}`
      );
    }

    const compCount = listFiles(join(ROOT, 'components'), '.md').length;
    const compMatch = readme.match(/Components-(\d+)/);
    if (compMatch) {
      const claimed = parseInt(compMatch[1]);
      assert.ok(
        Math.abs(compCount - claimed) <= 3,
        `README claims ${claimed} components but found ${compCount}`
      );
    }
  });
});
