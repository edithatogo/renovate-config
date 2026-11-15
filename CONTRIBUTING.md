# Contributing to renovate-config

This repository provides shared Renovate presets consumed by other repositories. Contributions should make dependency-update behaviour understandable, bounded and compatible with existing consumers.

## Before you start

Read [README.md](README.md), [AGENTS.md](AGENTS.md) and the affected preset. Reconcile existing issues, pull requests and Conductor work before editing. Explain which consumers and dependency types a rule affects, and distinguish package versions from compiler or toolchain versions.

For bugs, provide the affected version or commit, environment, minimal reproduction, expected result and observed result. For a substantial proposal, describe the use case and compatibility impact before expanding implementation scope. Use existing issue templates when offered.

## Development and validation

Use the Node and exact Renovate validator versions selected by [the validation workflow](.github/workflows/validate.yml) in an appropriate development environment. The repository's check is:

```sh
bash scripts/validate.sh
```

The script validates every root JSON preset with `renovate-config-validator --strict`. Inspect its output for all changed presets. Retain valid JSON and current schema conventions; configuration syntax validation does not by itself prove a proposed matcher affects only the intended dependencies.

For matching rules, provide representative positive and negative examples, including names or version fields that must remain unaffected. Explain scheduling, grouping, update-type, automerge and permission impacts. Preserve separately reviewable major upgrades and existing platform checks. A preset change can affect many repositories, so keep unrelated policy changes separate and document compatibility consequences.

The pinned Conductor plugin is development tooling. Follow the README's submodule instructions only when needed and preserve committed pins.

## Pull requests

Create a focused branch from the current `main` branch and submit a pull request to this repository. Link the relevant issue or existing project task, explain the resulting behaviour, and update affected examples and documentation. Keep unrelated changes in separate pull requests.

Report executed commands, outcomes and the commit they validate. Identify unavailable checks and remaining limitations explicitly. Follow the repository's existing review and automated-check requirements; retain required gates and current ownership. Address findings and verify the final head before integration. Repository changes do not themselves authorise a release or external operational action.

## Security, rights and conduct

Follow the [security policy](https://github.com/edithatogo/.github/blob/main/SECURITY.md). Use private vulnerability reporting if available; otherwise request a private contact without publishing vulnerability details. Keep credentials, personal information and restricted source material out of issues, fixtures, logs and artifacts.

Preserve existing attribution and third-party terms. This guide does not grant a licence; clarify any unclear redistribution rights before contributing external material. Follow the [code of conduct](https://github.com/edithatogo/.github/blob/main/CODE_OF_CONDUCT.md) and keep technical discussions respectful.

## Basis for this guide

This guide follows [GitHub's contribution-guideline guidance](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/setting-guidelines-for-repository-contributors) and the contribution-process and testing principles in [OpenSSF Best Practices](https://www.bestpractices.dev/en/criteria). It does not assert certification.
