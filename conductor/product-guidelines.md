# Product Guidelines

Editorial and structural conventions for the centralised Renovate preset.
These rules govern how the configuration and its documentation are written,
independently of *what* the preset enforces (see `product.md`).

## Tone & Documentation Style

- **Terse and technical.** Assume the reader already understands Renovate.
  Prefer nouns and version ranges over full sentences in machine-facing
  fields.
- **`description` fields** should be short imperative labels, not prose.
  - ✅ `"Pin react and react-dom below v19"`
  - ❌ `"This rule pins the React library to versions below 19 because we have not yet validated compatibility."`
- **`comment` fields** carry the *why* — human-readable rationale shown in the
  PR. Keep to one sentence. Only add a `comment` when the reason is not
  obvious from the rule itself.
- **README and docs** may be fuller prose, but should stay scannable: short
  paragraphs, tables for ecosystem mappings, code blocks for adoption
  snippets.

## Rule Structure

Rules are layered across three granularities, applied together:

### 1. Category blocks (logical grouping)

Within `default.json`, `packageRules` are grouped into named categories so the
file reads as distinct policy blocks. Each category is introduced by a comment
or a description-prefixed sentinel rule. Standard categories:

| Category     | Purpose                                              |
|--------------|------------------------------------------------------|
| Pinning      | `allowedVersions` constraints on critical libs       |
| Replacement  | `replacementName` migration rules                    |
| Blacklist    | `enabled: false` suppression                         |
| Auto-merge   | `automerge` + risk-tier rules                        |
| Grouping     | `groupName` bundling rules                           |

### 2. Flat ordered array (runtime evaluation)

Renovate evaluates `packageRules` as a flat, ordered list — later rules can
override earlier ones. Within and across category blocks, **more specific rules
must come after more general ones** so that overrides take effect. Document any
intentional override ordering with an inline comment.

### 3. Per-ecosystem splitting (scalability)

`default.json` is the orchestrator and entry point. As an ecosystem's rule set
grows beyond ~5 rules, extract it into its own preset file (e.g.
`npm.json`, `python.json`) and pull it back in via:

```json
{
  "extends": ["config:recommended", "local>your-user/renovate-config:npm"]
}
```

Keep `default.json` for cross-ecosystem policies (schedule, auto-merge tiers,
grouping defaults) and the smallest ecosystems.

## Naming Conventions

- **Preset filenames:** lowercase, ecosystem or role name, e.g. `npm.json`,
  `python.json`, `docker.json`. The entry point is always `default.json`.
- **`groupName` values:** kebab-case, ecosystem-scoped, e.g.
  `"typescript-types"`, `"python-dev-deps"`.
- **`description` values:** imperative, capitalised, ≤ ~60 chars.
- **`replacementName` / `replacementVersion`:** always pin the replacement to
  a known-good version range via `replacementVersion` to avoid migrating to an
  unvetted major.

## Version Constraint Style

- Use semver ranges consistently. Prefer `<X.Y.Z` for upper bounds and
  `^X.Y.Z` / `~X.Y.Z` for compatible ranges.
- Never use a bare version (`"19.0.0"`) as an `allowedVersions` value — it
  implies an exact pin that is rarely intended.
- Document *why* a pin exists in the adjacent `comment`, citing the breaking
  change or untested upgrade that motivated it.

## Change Protocol

- Every new `packageRule` should be accompanied by a one-line rationale in its
  `description` or `comment`, so future contributors understand the intent
  before relaxing or removing it.
- Prefer additive changes (new rules) over editing existing constraints; if a
  constraint must change, update its `comment` to record the decision.
