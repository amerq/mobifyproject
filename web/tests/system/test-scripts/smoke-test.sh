#!/bin/bash -eu
set -o pipefail
set -o nounset

# Run automated system tests to verify that checkout still works.

# This script starts the local dev server if the current branch is not master.
# The TEST_PROFILE environment variable defines which testing environment
# should be used in tests/system/site.js.

# If the project is not using git, assume we want to test the local build.

if git rev-parse ; then
    # Get the current branch on CircleCI or local
    CURRENT_BRANCH=${CIRCLE_BRANCH:-$(git branch | grep "*" | awk '{ print $2 }')}
else
    CURRENT_BRANCH=develop
fi

# Start preview if branch is not master.
if [ "$CURRENT_BRANCH" != "master" ]; then
    echo "Running tests against local build"
    # Kill background processes when this script exits.
    trap 'kill $(jobs -p)' EXIT > /dev/null 2>&1
    export TEST_PROFILE=local
    npm run prod:build
    npm run test:server > /dev/null 2>&1 &
else
    echo "Running tests against production"
    export TEST_PROFILE=production
fi

# Run the tests to verify that checkout flow still works.
# If on CIRCLE, it will find all test files under /workflows to distribute evenly among machines for parallelism
# If there is not, then it will run locally
VALUE=${CIRCLECI:-}

if [[  -z "${VALUE}" ]]; then
    npm run test:e2e
else
  testfiles=$(find ./tests/system/workflows/ -name '*.js'| sort | awk "NR % ${CIRCLE_NODE_TOTAL} == ${CIRCLE_NODE_INDEX}")
  if [ -z "$testfiles" ]
  then
      echo "more parallelism than tests"
  else
      npm run test:e2e --tests $testfiles
  fi
fi

