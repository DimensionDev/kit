#!/bin/bash
set -euo pipefail
set -x
rimraf dist
tsc
tsc -p tsconfig.esm.json
find ./esm/** -name '*.js' -exec sh -c 'mv "$0" "${0%.js}".mjs' {} \;
