// Zero-dependency structural test for the Renovate preset.
// Run with: node --test tests/
// Validates that default.json contains the cross-cutting delivery controls
// required by track multiec_preset_20260625 (Phase 1).
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const presetPath = path.join(__dirname, '..', 'default.json');

function loadPreset() {
  const raw = fs.readFileSync(presetPath, 'utf8');
  return JSON.parse(raw);
}

test('default.json exists and is valid JSON', () => {
  const preset = loadPreset();
  assert.ok(preset, 'preset must parse to a non-null object');
});

test('$schema points at the official Renovate JSON Schema', () => {
  const preset = loadPreset();
  assert.strictEqual(
    preset.$schema,
    'https://docs.renovatebot.com/renovate-schema.json',
    '$schema must be the official Renovate schema URL'
  );
});

test('extends the recommended baseline', () => {
  const preset = loadPreset();
  assert.ok(
    Array.isArray(preset.extends) && preset.extends.includes('config:recommended'),
    'extends must include config:recommended'
  );
});

test('schedule is set to before 6am on Monday', () => {
  const preset = loadPreset();
  assert.ok(
    Array.isArray(preset.schedule) && preset.schedule.includes('before 6am on Monday'),
    'schedule must include "before 6am on Monday"'
  );
});

test('dependency dashboard is enabled', () => {
  const preset = loadPreset();
  assert.strictEqual(preset.dependencyDashboard, true, 'dependencyDashboard must be true');
});

test('auto-merge rules distinguish patch/minor (auto) from major (manual)', () => {
  const preset = loadPreset();
  const rules = preset.packageRules || [];
  // At least one rule auto-merges patch or minor updates.
  const autoRule = rules.some(
    (r) => r.automerge === true &&
      Array.isArray(r.matchUpdateTypes) &&
      r.matchUpdateTypes.some((t) => ['patch', 'minor'].includes(t))
  );
  assert.ok(autoRule, 'a packageRule must auto-merge patch and/or minor updates');
});

test('dev dependencies are exempted to auto-merge at any level', () => {
  const preset = loadPreset();
  const rules = preset.packageRules || [];
  const devRule = rules.some(
    (r) => r.automerge === true &&
      Array.isArray(r.matchDepTypes) &&
      r.matchDepTypes.some((t) => t.toLowerCase().includes('dev'))
  );
  assert.ok(devRule, 'a packageRule must auto-merge dev dependencies at any level');
});

test('at least one grouping rule is defined', () => {
  const preset = loadPreset();
  const rules = preset.packageRules || [];
  const groupRule = rules.some((r) => typeof r.groupName === 'string' && r.groupName.length > 0);
  assert.ok(groupRule, 'at least one packageRule must define a groupName');
});
