#!/bin/bash
set -euo pipefail
set -x
rimraf dist
tsc
tsc -p tsconfig.esm.json
