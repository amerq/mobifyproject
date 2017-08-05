/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

var Site = {
    /*
     activeProfile defines which environment to run tests against.
     By default, builds on master branch run against production, without preview.
     Builds on any other branch should use preview with local build.
     $TEST_PROFILE can be set in your runner.
     Change activeProfile whenever you need to override the default behaviour.

     This should correspond to the connector being used in main.jsx.
    */
    activeProfile: process.env.TEST_PROFILE || 'local',

    /*
     Define new profiles as needed for different URLs, eg. staging, prod.
    */
    profiles: {
        // sfcc-connector
        sfcc: {
            bundleUrl: 'https://localhost:8443/loader.js',
            siteUrl: 'https://mobify-tech-prtnr-na03-dw.demandware.net/on/demandware.store/Sites-2017refresh-Site/default/Home-Show'
        },
        // merlins-connector
        local: {
            bundleUrl: 'https://localhost:8443/loader.js',
            siteUrl: process.env.npm_package_siteUrl
        },
        production: {
            bundleUrl: '',
            siteUrl: process.env.npm_package_siteUrl,
            production: true
        }
    }
}

module.exports = Site
