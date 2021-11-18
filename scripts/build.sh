#!/bin/bash
set -euo pipefail
set -x
rimraf dist
npx ttsc
tsc -p tsconfig.cjs.json
find ./cjs/** -name '*.js.map' -exec sh -c 'mv "$0" "${0%.js.map}".cjs.map' {} \;
find ./cjs/** -name '*.d.ts.map' -exec sh -c 'cp "$0" "${0%.d.ts.map}".cjs.d.ts.map' {} \;
find ./cjs/** -name '*.js' -exec sh -c 'mv "$0" "${0%.js}".cjs' {} \;
find ./cjs/** -name '*.d.ts' -exec sh -c 'cp "$0" "${0%.d.ts}".cjs.d.ts' {} \;
