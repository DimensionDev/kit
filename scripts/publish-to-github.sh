#!/bin/bash
set -euo pipefail
set -x

npm run build

VERSION=$(jq -r '.version' package.json)
npm --no-git-tag-version version "$VERSION-$BUILD_VERSION"
npm publish
