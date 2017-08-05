#!/usr/bin/env bash

npm i

# Remove this once we release Astro version 0.19 that will include the `dist` folder in the release 
pushd node_modules/mobify-progressive-app-sdk
    npm i
    npm run build:astro_client
popd

pushd ../web
    npm i
    npm run prod:build
popd


