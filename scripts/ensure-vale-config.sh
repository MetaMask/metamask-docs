#!/usr/bin/env bash
# Ensure Consensys docs-spelling-check Vale config is available locally.
# Cached under .cache/consensys-vale/ (gitignored).

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VALE_DIR="${ROOT}/.cache/consensys-vale"
VALE_CONFIG="${VALE_DIR}/docs-spelling-check/.vale.ini"

ensure_vale_config() {
  if [ -f "${VALE_CONFIG}" ]; then
    return 0
  fi

  if ! command -v git >/dev/null 2>&1; then
    echo "error: git is required to fetch the Consensys Vale config." >&2
    exit 1
  fi

  # Remove partial or outdated cache (for example, nested docs-spelling-check paths).
  rm -rf "${VALE_DIR}"

  echo "Fetching Consensys Vale config into .cache/consensys-vale ..."
  mkdir -p "${VALE_DIR}"
  git clone --depth 1 https://github.com/Consensys/github-actions.git "${VALE_DIR}/repo"
  mv "${VALE_DIR}/repo/docs-spelling-check" "${VALE_DIR}/docs-spelling-check"
  rm -rf "${VALE_DIR}/repo"

  if [ ! -f "${VALE_CONFIG}" ]; then
    echo "error: Vale config missing at ${VALE_CONFIG}" >&2
    exit 1
  fi

  if ! command -v vale >/dev/null 2>&1; then
    echo "error: vale not found. Install with: brew install vale" >&2
    echo "See https://docs-template.consensys.net/contribute/run-vale" >&2
    exit 1
  fi

  (cd "${VALE_DIR}/docs-spelling-check" && vale sync)
}

export ROOT VALE_DIR VALE_CONFIG
