#!/bin/sh
set -x
../../TOOL/PHYX/phyx --newline --include ".//*.js"
../../TOOL/PHYX/phyx --newline --style --include ".//*.html" --include ".//*.styl"
