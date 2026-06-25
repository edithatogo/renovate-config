# Technology Stack

This document describes the technology stack of the preset repository itself —
the tools used to author, validate, and distribute the Renovate configuration.
It is distinct from the *governed ecosystems* (recorded in `product.md`), which
are the languages whose dependencies the preset manages.

## Repository Format

- **JSON** — Renovate presets are plain JSON files. `default.json` is the
  entry point; ecosystem-specific presets (`npm.json`, `python.json`, etc.)
  are added as the rule set grows (see `product-guidelines.md`).

## Validation & Tooling

| Tool                          | Purpose                                                      |
|-------------------------------|-------------------------------------------------------------|
| Renovate JSON Schema          | Editor autocompletion + CI validation of every preset field |
| `renovate-config-validator`   | CLI that lints preset files against Renovate's expected shape before merge |
| `ajv` (fallback)              | Generic JSON Schema validator, used if the Renovate CLI is unavailable |

Every `*.json` preset is validated against
`https://docs.renovatebot.com/renovate-schema.json` so a typo or unknown field
never ships to consumer repos.

## Distribution

- **Git (`local>`)** — consumer repos adopt the preset via
  `"extends": ["local>your-github-user/renovate-config"]`. No npm registry
  publication is required or planned.

## Continuous Integration

- **GitHub Actions** — a workflow runs `renovate-config-validator` (or schema
  validation) on every pull request touching any `*.json` preset, blocking
  merge on validation failure.

## Version Control

- **Git** — the repository is Git-tracked. The default branch holds the active
  preset; consumer repos pin to a branch or tag for stability.

## Self-Management (Optional)

- A `renovate.json` at the repo root may be added so Renovate manages the
  preset repo's *own* dev tooling (e.g., the validator version). This is
  out of scope for the initial setup but noted for future iteration.
