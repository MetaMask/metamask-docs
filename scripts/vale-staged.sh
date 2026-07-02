#!/usr/bin/env bash
# Run Vale (Consensys docs-spelling-check) on files passed by lint-staged.
#
# WARNING: Do NOT re-add this to the Husky pre-commit hook (`lint-staged` in
# package.json). Vale is intentionally CI-only: it produces false positives on
# valid technical content (code identifiers like `wagmi-tab`, product names,
# intentional ellipses) and lints the whole staged file, not just the diff, so
# running it on commit blocks unrelated pre-existing content. Let PR CI run Vale.
# Contributors can still run it on demand with `npm run docs:ci`.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# shellcheck source=scripts/ensure-vale-config.sh
source "${ROOT}/scripts/ensure-vale-config.sh"

if [ "$#" -eq 0 ]; then
  exit 0
fi

files=()
for f in "$@"; do
  [ -f "$f" ] && files+=("$f")
done

if [ "${#files[@]}" -eq 0 ]; then
  exit 0
fi

if ! command -v vale >/dev/null 2>&1; then
  echo "error: vale not found. Install with: brew install vale" >&2
  echo "See https://docs-template.consensys.net/contribute/run-vale" >&2
  exit 1
fi

ensure_vale_config

vale --config "${VALE_CONFIG}" "${files[@]}"
