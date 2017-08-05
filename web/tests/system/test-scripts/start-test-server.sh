#!/bin/bash -eu
set -o pipefail
set -o nounset

# Start the local test server if the current git branch is not master
# or if there is no git branch.
# Assumes that tests on master branch should run against production. 

if git rev-parse ; then
    # Get the current branch on CircleCI or local
    CURRENT_BRANCH=${CIRCLE_BRANCH:-$(git branch | grep "*" | awk '{ print $2 }')}
    if [ "$CURRENT_BRANCH" == "master" ]; then
        echo "On production branch, test server not needed."   
        exit 0 
    fi
fi

# Kill background processes when this script exits.
trap 'kill $(jobs -pr)' EXIT
echo "Building project"
npm run prod:build
echo "Running Test Server."
npm run test:server
