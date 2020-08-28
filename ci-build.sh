#!/usr/bin/env bash

set -x
set -e
set -u
set -o pipefail

if [ -z "$ALGOLIA_API_KEY" ] || [ -z "$ALGOLIA_INDEX_NAME" ]
then
  printf "ERROR: %s\\n" "Algolia API key or index name not set." >&2
  exit 1
fi

yarn exec cross-env \
  ALGOLIA_API_KEY="$ALGOLIA_API_KEY" \
  ALGOLIA_INDEX_NAME="$ALGOLIA_INDEX_NAME" \
  vuepress build docs
