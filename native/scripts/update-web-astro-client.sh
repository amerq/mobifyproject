#!/bin/bash -eu
# -e Exit immediately if a command exits with a non-zero status.
# -u Treat unset variables as an error when substituting.
#  More info can be found by typing `help set` in any bash shell

# the return value of a pipeline is the status of the last command to exit with a non-zero status, or zero if no command exited with a non-zero status
set -o pipefail

# Identifies the path that the script is in (http://stackoverflow.com/a/246128/11807)
MYPATH=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

# ROOT is the root directory of your project. It isn't always needed if your script is at the root of your project, but its a useful convention to adopt so that your scripts can be moved and the only thing that needs to change then is ROOT.
ROOT="$MYPATH/.."

if [ ! -e "$ROOT/node_modules/mobify-progressive-app-sdk/dist/astro-client.js" ]; then
    echo "* It looks like you've installed 'mobify-progressive-app-sdk' from git. Building the astro-client now..."
    # Should only be needed if installing mobify-progressive-app-sdk from git://
    pushd "$ROOT/node_modules/mobify-progressive-app-sdk"
        npm install
        npm run build:astro_client
    popd
fi

cp -f "$ROOT/node_modules/mobify-progressive-app-sdk/dist/astro-client.js" ../web/app/vendor/astro-client.js
cp -f "$ROOT/node_modules/mobify-progressive-app-sdk/dist/es6/astro-detect.js" ../web/app/vendor/astro-detect.js
