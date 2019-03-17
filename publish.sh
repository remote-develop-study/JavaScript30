#!/usr/bin/env bash
excludes=(
  '.git/*'
  '.idea/*'
  '.gitignore'
  'yarn.lock'
  'publish.sh'
  'package.json'
  'yarn.lock'
  'PULL_REQUEST_TEMPLATE.md'
  'readme.md'
  'node_modules/*'
  '.prettierrc'
)

aws s3 sync \
"${excludes[@]/#/--exclude=}" \
--acl public-read \
--profile default \
. s3://static.doondoony.com/javascript30