#!/bin/bash
set -euo pipefail
set -x
rimraf dist
npx ttsc
tsc -p tsconfig.cjs.json
find ./esm/** -name '*.js' -exec sh -c 'mv "$0" "${0%.js}".mjs' {} \;
