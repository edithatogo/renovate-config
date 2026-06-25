#!/usr/bin/env bash
set -euo pipefail

echo "Validating Renovate presets..."
# We validate default.json
npx --package renovate renovate-config-validator default.json
