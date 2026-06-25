// Ecosystem coverage test for the Renovate preset.
// Run with: node --test "tests/*.test.js"
// Asserts that default.json contains at least one curated packageRule
// governing each of the 7 target ecosystems (track multiec_preset_20260625,
// Phase 2). A rule "covers" an ecosystem when its matchManagers includes one
// of the managers registered for that ecosystem, OR (for npm) when it has no
// matchManagers but matches npm-specific package patterns/names.
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const presetPath = path.join(__dirname, '..', 'default.json');

function loadPreset() {
  return JSON.parse(fs.readFileSync(presetPath, 'utf8'));
}

// Maps each ecosystem to the Renovate managers it registers.
const ECOSYSTEMS = {
  TypeScript: ['npm'],
  Python: ['pip', 'poetry', 'pipenv', 'setup.py'],
  R: ['cran'],
  Rust: ['cargo'],
  'C#': ['nuget'],
  Go: ['gomod'],
  Julia: ['julia'],
};

function ruleMatchesManager(rule, manager) {
  // Explicit manager match.
  if (Array.isArray(rule.matchManagers) && rule.matchManagers.includes(manager)) {
    return true;
  }
  // npm is the default manager when no manager is specified and the rule
  // targets npm-style package names/patterns.
  if (
    manager === 'npm' &&
    !Array.isArray(rule.matchManagers) &&
    (rule.matchPackageNames || rule.matchPackagePatterns || rule.matchPackagePrefixes)
  ) {
    return true;
  }
  return false;
}

for (const [ecosystem, managers] of Object.entries(ECOSYSTEMS)) {
  test(`ecosystem "${ecosystem}" has at least one curated packageRule`, () => {
    const preset = loadPreset();
    const rules = preset.packageRules || [];
    const covered = rules.some((r) => managers.some((m) => ruleMatchesManager(r, m)));
    assert.ok(
      covered,
      `no packageRule covers the ${ecosystem} ecosystem (managers: ${managers.join(', ')})`
    );
  });
}
