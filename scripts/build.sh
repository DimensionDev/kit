#!/bin/bash
set -euo pipefail
set -x
rimraf dist
npx ttsc
tsc -p tsconfig.cjs.json
find ./esm/** -name '*.js.map' -exec sh -c 'mv "$0" "${0%.js.map}".mjs.map' {} \;
find ./esm/** -name '*.d.ts.map' -exec sh -c 'cp "$0" "${0%.d.ts.map}".mjs.d.ts.map' {} \;
find ./esm/** -name '*.js' -exec sh -c 'mv "$0" "${0%.js}".mjs' {} \;
find ./esm/** -name '*.d.ts' -exec sh -c 'cp "$0" "${0%.d.ts}".mjs.d.ts' {} \;
