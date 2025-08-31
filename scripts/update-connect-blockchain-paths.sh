#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
TARGET_DIR="$ROOT_DIR/embedded-wallets/connect-blockchain"

if [[ ! -d "$TARGET_DIR" ]]; then
  echo "Target directory not found: $TARGET_DIR" >&2
  exit 1
fi

# Gather files containing tile paths starting with /connect-blockchain
TMP_LIST="$(mktemp)"
# shellcheck disable=SC2039
find "$TARGET_DIR" -type f -name "*.mdx" -print0 | xargs -0 grep -Il "path: '/connect-blockchain" > "$TMP_LIST" || true

COUNT=$(wc -l < "$TMP_LIST" | tr -d '[:space:]')
if [[ "${COUNT}" == "0" ]]; then
  echo "No files needed updates."
  rm -f "$TMP_LIST"
  exit 0
fi

echo "Updating paths in ${COUNT} files..."
while IFS= read -r file; do
  [ -z "$file" ] && continue
  # BSD sed (macOS) requires an empty string after -i for in-place
  sed -i '' "s|path: '/connect-blockchain|path: '/embedded-wallets/connect-blockchain|g" "$file"
  echo "Updated: $file"
done < "$TMP_LIST"

rm -f "$TMP_LIST"
echo "Done."
