#!/bin/sh
set -x
../../TOOL/PHYX/phyx --newline ".//*.js"
../../TOOL/PHYX/phyx --newline --style --include ".//*.html" --include ".//*.styl"
