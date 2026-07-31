# Shared Renovate configuration

Repositories extend `github>edithatogo/renovate-config`.

The preset schedules bounded weekly updates, enables vulnerability alerts, automerges low-risk digest/pin/patch changes only through pull requests and platform checks, and keeps major updates independently reviewable. Regex managers track explicitly named Typst, Typstyle and Tectonic toolchain versions in GitHub Actions; document/package versions are intentionally not treated as compiler versions.
