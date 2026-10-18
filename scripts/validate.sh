#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
for preset in ./*.json; do
  printf 'Validating %s\n' "$preset"
  renovate-config-validator --strict "$preset"
done
