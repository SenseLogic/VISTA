#!/bin/sh
set -x
../../../CHYLE/chyle --include "*.css" --include "*.html" --unused --missing --verbose
