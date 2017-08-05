#!/usr/bin/env bash
# Run the Lighthouse test against the dev build

# Location to save the generated report.
OUTPUT_PATH=tests/system/test-scripts/lighthouse/reports/audit-local
# See package.json's siteUrl key.
URL=${1-$npm_package_siteUrl}
# Append Mobify Hash to the URL to force the Mobify Tag to load the local bundle.
PREVIEW=#mobify-override\&mobify-path=true\&mobify-url=https://localhost:8443/loader.js\&mobify-global=true\&mobify-domain=\&mobify-all=true\&mobify=1\&mobify-debug=1\&mobify-js=1

# Lighthouse uses your local installation of Chrome, which should be at least
# version 54.0. Use a custom user agent containing "MobifyPreview" so that
# Preview will accept our requests, and disable device emulation so that the
# "MobifyPreview" user agent does not get overridden.

# Finally, parse the HTML report for the Lighthouse score.
# CI will fail the build if the score is below a threshold.
# See min_lighthouse_score in package.json

# --ignore-certificate-errors thanks to https://github.com/GoogleChrome/lighthouse/issues/559
lighthouse \
	--quiet \
    --chrome-flags='--user-agent="MobifyPreview" --allow-insecure-localhost --ignore-certificate-errors' \
	--output json \
	--output html \
	--output-path ${OUTPUT_PATH} \
	--disable-device-emulation=true \
	"${URL}${PREVIEW}" > /dev/null 2>&1

npm run test:check-lighthouse-score
