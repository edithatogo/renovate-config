# Specification - Core Renovate Preset

## 1. Objective
Establish a centralized Renovate configuration preset file `default.json` that implements base configuration extensions and structured package rules (pinning, replacements, and blacklisting).

## 2. Scope & Features
- Extend `config:recommended` as the baseline.
- Implement structured `packageRules` categories:
  - **Pinning:** Limit specific package versions.
  - **Replacement:** Propose migration paths for unapproved libraries.
  - **Blacklist:** Suppress/disable updates for deprecated or unapproved packages.
- Validate all presets against the official Renovate JSON Schema.
