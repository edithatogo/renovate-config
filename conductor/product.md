# Product Guide

## Initial Concept

A centralised Renovate configuration repository that enforces preferred
company-wide or personal library standards via a `default.json` preset. The
preset extends the official `config:recommended` baseline and layers in
`packageRules` that govern which dependencies consumer projects may adopt:
pinning critical core libraries to safe version ranges, automatically migrating
away from unapproved libraries toward preferred standards, and blacklisting
deprecated/unauthorized packages entirely.

## Purpose & Scope

This repository serves as the single source of truth for dependency governance
across the author's personal GitHub account and all owned repositories. Rather
than maintaining divergent Renovate configurations per project, each repo opts
into this shared preset, inheriting a consistent set of dependency policies:
which versions are permitted, which packages are preferred or forbidden, when
updates are evaluated, and how they are delivered.

## Consumers & Adoption Model

- **Audience:** Personal — the author's own GitHub account and repositories.
- **Adoption mechanism:** Consumer repos extend the preset via
  `"extends": ["local>your-github-user/renovate-config"]`, pulling in the rules
  defined in `default.json`. No npm publication is required.

## Ecosystem Coverage

The preset governs dependency updates across every common language used by the
author's projects:

| Language    | Renovate Manager(s)                          |
|-------------|---------------------------------------------|
| TypeScript  | `npm`                                       |
| Python      | `pip`, `poetry`, `pipenv`, `setup.py`       |
| R           | `cran`                                      |
| Rust        | `cargo`                                     |
| C#          | `nuget`                                     |
| Go          | `gomod`                                      |
| Julia       | `julia` (Project.toml / Manifest.toml)      |

New ecosystems can be added by appending `packageRules` scoped to the relevant
manager; the baseline configuration applies sensible defaults to any manager
not explicitly governed.

## Governance Behaviours

The preset enforces four categories of dependency policy:

1. **Version pinning (allowed versions):** Critical core libraries are
   constrained to a vetted semver range (e.g., `react` < 19.0.0) to prevent
   untested major upgrades from being proposed.
2. **Replacement / migration:** Unapproved or superseded libraries are flagged
   with an automatic replacement PR pointing at the preferred standard
   (e.g., `axios` → `ky`), including a human-readable rationale comment.
3. **Blacklisting:** Deprecated or unauthorized packages have updates disabled
   entirely (`enabled: false`) so Renovate never opens PRs for them
   (e.g., `moment`).
4. **Delivery controls:**
   - **Scheduling:** Renovate evaluates and opens update PRs on a fixed
     schedule (by default, before 6am on Monday) to keep update noise
     predictable and out of active working hours.
   - **Auto-merge:** Low-risk updates — patch/minor versions and dev-only
     dependencies — are merged automatically once CI passes. Major version
     bumps always require manual review.
   - **Grouping:** Related updates are bundled into a single PR (e.g., all
     `@types/*` packages, or all minor/patch updates within one ecosystem)
     to reduce the total number of PRs a consumer repo receives.

## Non-Goals

- This is not a published npm package; distribution is via Git (`local>`).
- The preset does not itself run Renovate against its own dependencies beyond
  the dev tooling needed to validate the configuration.
