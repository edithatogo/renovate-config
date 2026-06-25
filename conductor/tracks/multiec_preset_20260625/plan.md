# Implementation Plan: multiec_preset_20260625

**Track:** Build the production-ready multi-ecosystem Renovate preset

---

## Phase 1: Cross-Cutting Delivery Controls

- [x] Task: Write tests for `default.json` structure validation
    - [ ] Create a test script that loads `default.json` and asserts the presence and correctness of cross-cutting fields: `extends`, `schedule`, `dependencyDashboard`, and the `packageRules` auto-merge block.
    - [ ] Run the test and confirm it fails (Red) — the fields do not yet exist.
- [x] Task: Add cross-cutting delivery controls to `default.json`
    - [ ] Set `schedule` to `["before 6am on Monday"]`.
    - [ ] Set `dependencyDashboard: true`.
    - [ ] Add a `packageRules` block for auto-merge: patch + minor auto-merge (`matchUpdateTypes`, `automerge: true`); dev-dependency exemption (`matchDepTypes`, `automerge: true`); majors remain manual (default).
    - [ ] Add a `packageRules` block for grouping (e.g., bundle all minor/patch updates, and a TypeScript `@types/*` group).
    - [ ] Correct the `$schema` URL to `https://docs.renovatebot.com/renovate-schema.json`.
    - [ ] Re-run the structure test and confirm it passes (Green).
- [ ] Task: Conductor - User Manual Verification 'Cross-Cutting Delivery Controls' (Protocol in workflow.md)

---

## Phase 2: Curated Ecosystem Preferred-Library Rules

- [ ] Task: Extend structure tests to assert one curated rule per ecosystem
    - [ ] Augment the test script to assert that `packageRules` contains at least one rule matching each manager: `npm`, `pip`/`poetry`/`pipenv`, `cran`, `cargo`, `nuget`, `gomod`, `julia`.
    - [ ] Run the test and confirm it fails (Red) — only npm rules currently exist.
- [ ] Task: Add curated preferred-library rules for all 7 ecosystems
    - [ ] **TypeScript (`npm`):** keep existing `react`/`react-dom` pin, `axios`→`ky` replacement, `moment` blacklist.
    - [ ] **Python (`pip`):** e.g., pin `requests` to a safe range; blacklist a deprecated package (e.g., `distro` superseded lib) or suggest `httpx` as a replacement target.
    - [ ] **R (`cran`):** e.g., pin a critical package or suggest a modern alternative to a deprecated one.
    - [ ] **Rust (`cargo`):** e.g., blacklist a known-deprecated crate; suggest a maintained replacement.
    - [ ] **C# (`nuget`):** e.g., pin a core library or suggest replacement of a legacy package.
    - [ ] **Go (`gomod`):** e.g., suggest migration from a deprecated module to its maintained successor.
    - [ ] **Julia (`julia`):** e.g., pin a core package to a safe range.
    - [ ] Re-run the ecosystem test and confirm it passes (Green).
- [ ] Task: Conductor - User Manual Verification 'Curated Ecosystem Preferred-Library Rules' (Protocol in workflow.md)

---

## Phase 3: Repo Hardening

- [ ] Task: Write tests for repo-hygiene file presence
    - [ ] Create a test script asserting the existence of `README.md`, `.gitignore`, `.editorconfig`, and the GitHub Actions workflow file under `.github/workflows/`.
    - [ ] Run the test and confirm it fails (Red).
- [ ] Task: Add `.gitignore` and `.editorconfig`
    - [ ] `.gitignore`: OS files (`.DS_Store`), editor folders (`.idea/`, `.vscode/`), and `node_modules/` for future tooling.
    - [ ] `.editorconfig`: enforce 2-space indentation, LF line endings, UTF-8, and trailing newline for `*.json`.
- [ ] Task: Write the README documenting adoption and policies
    - [ ] Summarise the preset's purpose (link to `conductor/product.md` themes).
    - [ ] Document the `local>` adoption snippet for consumer repos.
    - [ ] List governed ecosystems and the policy categories enforced.
- [ ] Task: Write the GitHub Actions schema-validation workflow
    - [ ] Trigger on pull requests touching `*.json`.
    - [ ] Run `renovate-config-validator` (or `ajv` against the official schema) and fail the check on validation error.
- [ ] Task: Re-run hygiene tests and confirm pass (Green)
- [ ] Task: Conductor - User Manual Verification 'Repo Hardening' (Protocol in workflow.md)

---

## Phase 4: Final Validation & Commit

- [ ] Task: Run full validation suite against the completed `default.json`
    - [ ] Validate `default.json` end-to-end against the Renovate JSON Schema.
    - [ ] Run all structure/hygiene/ecosystem tests; confirm >90% coverage of any test code.
- [ ] Task: Stage and commit all changes with a summary commit message
    - [ ] Fold the task summary (track, files changed, rationale) into the commit message per the customised workflow.
- [ ] Task: Conductor - User Manual Verification 'Final Validation & Commit' (Protocol in workflow.md)
