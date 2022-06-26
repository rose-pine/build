#!/usr/bin/env bash

# Update issue label names and colors, deleting unused defaults.
#
# Usage
# $ sh update-labels.sh <repo-name>
# $ sh update-labels.sh neovim

owner="rose-pine"
repo="$1"

# Update labels

gh api \
	--method PATCH \
	-H "Accept: application/vnd.github.v3+json" \
	"/repos/$owner/$repo/labels/bug" \
	-f new_name='bug' \
	-f description='' \
	-f color='eb6f92'

gh api \
	--method PATCH \
	-H "Accept: application/vnd.github.v3+json" \
	"/repos/$owner/$repo/labels/documentation" \
	-f new_name='documentation' \
	-f description='' \
	-f color='f6c177'

gh api \
	--method PATCH \
	-H "Accept: application/vnd.github.v3+json" \
	"/repos/$owner/$repo/labels/enhancement" \
	-f new_name='enhancement' \
	-f description='' \
	-f color='ebbcba'

gh api \
	--method PATCH \
	-H "Accept: application/vnd.github.v3+json" \
	"/repos/$owner/$repo/labels/good first issue" \
	-f new_name='good first issue' \
	-f description='' \
	-f color='31748f'

gh api \
	--method PATCH \
	-H "Accept: application/vnd.github.v3+json" \
	"/repos/$owner/$repo/labels/help wanted" \
	-f new_name='help wanted' \
	-f description='' \
	-f color='9ccfd8'

gh api \
	--method PATCH \
	-H "Accept: application/vnd.github.v3+json" \
	"/repos/$owner/$repo/labels/question" \
	-f new_name='question' \
	-f description='' \
	-f color='c4a7e7'

# Delete unused labels

gh api \
	--method DELETE \
	-H "Accept: application/vnd.github.v3+json" \
	"/repos/$owner/$repo/labels/duplicate"

gh api \
	--method DELETE \
	-H "Accept: application/vnd.github.v3+json" \
	"/repos/$owner/$repo/labels/wontfix"

gh api \
	--method DELETE \
	-H "Accept: application/vnd.github.v3+json" \
	"/repos/$owner/$repo/labels/invalid"
