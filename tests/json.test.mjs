import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..');

function loadJson(relPath) {
  const raw = readFileSync(join(ROOT, relPath), 'utf-8');
  return JSON.parse(raw);
}

describe('divisions.json', () => {
  it('is valid JSON', () => {
    assert.doesNotThrow(() => loadJson('divisions.json'));
  });

  it('has a divisions object with entries', () => {
    const data = loadJson('divisions.json');
    assert.ok(data.divisions, 'missing divisions key');
    assert.ok(typeof data.divisions === 'object');
    assert.ok(Object.keys(data.divisions).length > 0, 'divisions is empty');
  });

  it('each division has label, icon, color, description', () => {
    const data = loadJson('divisions.json');
    for (const [key, div] of Object.entries(data.divisions)) {
      assert.ok(div.label, `${key} missing label`);
      assert.ok(div.icon, `${key} missing icon`);
      assert.ok(div.color, `${key} missing color`);
      assert.ok(div.description, `${key} missing description`);
      assert.ok(/^#[0-9A-Fa-f]{6}$/.test(div.color), `${key} color "${div.color}" is not a valid hex`);
    }
  });

  it('has all 9 expected divisions', () => {
    const data = loadJson('divisions.json');
    const expected = [
      'frontend-design', 'engineering', 'content', 'visual',
      'agent-meta', 'workflows', 'adaptation', 'components', 'system-prompts'
    ];
    for (const d of expected) {
      assert.ok(data.divisions[d], `missing division: ${d}`);
    }
  });
});

describe('tools.json', () => {
  it('is valid JSON', () => {
    assert.doesNotThrow(() => loadJson('tools.json'));
  });

  it('has a tools object with entries', () => {
    const data = loadJson('tools.json');
    assert.ok(data.tools, 'missing tools key');
    assert.ok(Object.keys(data.tools).length > 0, 'tools is empty');
  });

  it('each tool has label, installPath, format, detect', () => {
    const data = loadJson('tools.json');
    for (const [key, tool] of Object.entries(data.tools)) {
      assert.ok(tool.label, `${key} missing label`);
      assert.ok(tool.installPath, `${key} missing installPath`);
      assert.ok(tool.format, `${key} missing format`);
      assert.ok(Array.isArray(tool.detect), `${key} detect is not an array`);
      assert.ok(tool.detect.length > 0, `${key} detect array is empty`);
    }
  });
});

describe('templates.json', () => {
  it('is valid JSON', () => {
    assert.doesNotThrow(() => loadJson('visual/templates.json'));
  });

  it('is a non-empty array', () => {
    const data = loadJson('visual/templates.json');
    assert.ok(Array.isArray(data));
    assert.ok(data.length > 0, 'templates array is empty');
  });

  it('each template has required fields', () => {
    const data = loadJson('visual/templates.json');
    for (const t of data) {
      assert.ok(t.id, `template missing id`);
      assert.ok(t.name, `template "${t.id}" missing name`);
      assert.ok(t.imgflipId, `template "${t.id}" missing imgflipId`);
      assert.ok(t.imageUrl, `template "${t.id}" missing imageUrl`);
      assert.ok(Array.isArray(t.fields), `template "${t.id}" fields is not array`);
      assert.ok(Array.isArray(t.boxes), `template "${t.id}" boxes is not array`);
      assert.ok(t.boxes.length > 0, `template "${t.id}" has no boxes`);
    }
  });

  it('template IDs are unique', () => {
    const data = loadJson('visual/templates.json');
    const ids = data.map(t => t.id);
    const unique = new Set(ids);
    assert.equal(ids.length, unique.size, 'duplicate template IDs found');
  });
});
