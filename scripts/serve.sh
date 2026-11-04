#!/usr/bin/env bash
# Local preview. Ruby 3.5+ removed Object#tainted?, which the Liquid version
# pinned by the github-pages gem still calls; ruby-compat.rb restores it for
# local builds only. GitHub Pages builds with its own Ruby and never runs this.
set -euo pipefail
cd "$(dirname "$0")/.."
export LANG="${LANG:-en_US.UTF-8}" LC_ALL="${LC_ALL:-en_US.UTF-8}"
export RUBYOPT="-r$(pwd)/scripts/ruby-compat.rb ${RUBYOPT:-}"
exec bundle exec jekyll "${@:-serve}"
