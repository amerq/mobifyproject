#!/usr/bin/env bash

OUTPUT_PATH=tests/system/test-scripts/lighthouse/reports/audit-prod
# See package.json's siteUrl key.
URL=${1-$npm_package_siteUrl}

lighthouse \
	--view \
	--quiet \
	--output json \
	--output html \
	--output-path $OUTPUT_PATH \
	$URL > /dev/null 2>&1

npm run test:check-lighthouse-score
