#!/bin/sh
set -x
../../../CYLUS/cylus --include "*.css" --include "*.html" --unused --missing --verbose
