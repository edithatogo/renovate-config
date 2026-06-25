# Track Specification: multiec_preset_20260625

## Track Description

Build the production-ready multi-ecosystem Renovate preset.

## Overview

Expand `default.json` from its current 3-rule npm proof-of-concept into a
complete, governed preset covering cross-cutting delivery controls and a
curated starter preferred-library rule for each of the 7 target ecosystems.
Alongside the preset, add supporting repo infrastructure so the repository is
immediately usable by consumer repos via `local>` adoption.

## Goals

1. **Cross-cutting delivery controls** in `default.json`:
   - Weekly update schedule (before 6am on Monday).
   - Dependency Dashboard enabled so updates surface as a single tracking issue
     that flows through the existing issue-driven workflow.
   - Patch + minor auto-merge after CI passes; dev-only dependencies auto-merge
     at any version level; major bumps always require manual review.
   - Update grouping to bundle related updates into fewer PRs.

2. **Curated preferred-library rules** — one realistic, community-standard rule
   per ecosystem (editable later):
   - TypeScript (`npm`)
   - Python (`pip` / `poetry` / `pipenv`)
   - R (`cran`)
   - Rust (`cargo`)
   - C# (`nuget`)
   - Go (`gomod`)
   - Julia (`julia`)

3. **Repo hardening**:
   - `$schema` URL corrected to the official Renovate JSON Schema.
   - `README.md` documenting the `local>` adoption model and the preset's
     policies.
   - GitHub Actions workflow that schema-validates every `*.json` preset on
     every pull request.
   - `.gitignore` and `.editorconfig` for contributor hygiene.

## Non-Goals

- Splitting ecosystem rules into separate preset files (`npm.json`, etc.) —
  deferred until an ecosystem exceeds ~5 rules (see `product-guidelines.md`).
- Self-managing the preset repo's own dev tooling via a root `renovate.json`.
- npm publication — distribution is Git-only (`local>`).

## Acceptance Criteria

- [ ] `default.json` validates cleanly against the official Renovate JSON Schema.
- [ ] Every governed ecosystem has at least one curated `packageRule`.
- [ ] Dependency Dashboard is enabled and the schedule is set.
- [ ] Auto-merge rules distinguish patch/minor (auto) from major (manual) and
      exempt dev dependencies.
- [ ] README documents how a consumer repo extends the preset.
- [ ] CI workflow runs schema validation and fails on an invalid preset.
- [ ] `.gitignore` and `.editorconfig` are present.
