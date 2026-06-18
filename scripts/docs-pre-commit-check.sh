#!/usr/bin/env bash
# Run the same checks as .github/workflows/ci.yml on files changed vs the base branch.
# Usage: ./scripts/docs-pre-commit-check.sh [base-branch]
#   base-branch defaults to main (override with DOCS_CI_BASE_BRANCH).

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

# shellcheck source=scripts/ensure-vale-config.sh
source "${ROOT}/scripts/ensure-vale-config.sh"

BASE="${1:-${DOCS_CI_BASE_BRANCH:-main}}"
PRETTIER_GLOB='*.md *.mdx *.ts *.tsx *.js *.jsx *.json *.css *.scss *.html *.yml *.yaml'

echo "==> docs-pre-commit-check (diff vs ${BASE})"

if ! git rev-parse --verify "${BASE}" >/dev/null 2>&1; then
  echo "error: base branch '${BASE}' not found. Fetch main or pass a valid branch name." >&2
  exit 1
fi

CHANGED=()
while IFS= read -r f || [ -n "$f" ]; do
  [ -z "$f" ] && continue
  [ -f "$f" ] && CHANGED+=("$f")
done < <(git diff --name-only "${BASE}" -- ${PRETTIER_GLOB} | sort -u)

if [ "${#CHANGED[@]}" -eq 0 ]; then
  echo "No changed documentation or source files vs ${BASE}; skipping file-scoped checks."
else
  echo "Changed files (${#CHANGED[@]}):"
  printf '  %s\n' "${CHANGED[@]}"
fi

echo ""
echo "==> Prettier"
if [ "${#CHANGED[@]}" -eq 0 ]; then
  echo "skip (no matching changed files)"
else
  ./node_modules/.bin/prettier --check "${CHANGED[@]}"
fi

echo ""
echo "==> Vale (Consensys docs-spelling-check)"
MD_CHANGED=()
for f in "${CHANGED[@]}"; do
  case "$f" in
    *.md | *.mdx) MD_CHANGED+=("$f") ;;
  esac
done

if [ "${#MD_CHANGED[@]}" -eq 0 ]; then
  echo "skip (no changed .md/.mdx files)"
else
  if ! command -v vale >/dev/null 2>&1; then
    echo "error: vale not found. Install with: brew install vale" >&2
    exit 1
  fi

  ensure_vale_config
  vale --config "${VALE_CONFIG}" "${MD_CHANGED[@]}"
fi

echo ""
echo "==> ESLint + Stylelint (docs-lint-all)"
if [ ! -d node_modules ]; then
  echo "error: node_modules missing. Run: npm ci" >&2
  exit 1
fi
npm run lint

echo ""
echo "==> TypeScript (docs-lint-all)"
npm run typecheck

echo ""
echo "All docs-pre-commit checks passed."
echo "Optional before opening a PR: npm run build (docs-build) and link check per CONTRIBUTING.md."
