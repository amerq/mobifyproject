/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Home from '../page-objects/home'

let home

// On the homepage, at least the following skip
// links should be present on the page...
const skipLinkTargets = {
    main: '#app-main',
    nav: '#header-navigation',
    footer: '#app-footer',
}

export default {
    before: (browser) => {
        home = new Home(browser)
    },

    after: (browser) => {
        browser.end()
    },

    'Home Page': (browser) => {
        browser
            .preview()
            .waitForElementVisible(home.selectors.wrapper)
            .assert.visible(home.selectors.wrapper)
    },

    'Skip Links': (browser) => {
        browser
            // Site should have skip links!
            .assert.elementPresent(home.selectors.skipLinks)

            // Skip Links and their target should match
            .assert.elementPresent(skipLinkTargets.main)
            .assert.elementPresent(skipLinkTargets.nav)
            .assert.elementPresent(skipLinkTargets.footer)
            .assert.attributeContains(home.selectors.skipToMain, 'href', skipLinkTargets.main)
            .assert.attributeContains(home.selectors.skipToNav, 'href', skipLinkTargets.nav)
            .assert.attributeContains(home.selectors.skipToFooter, 'href', skipLinkTargets.footer)
    },

    'Email field has email input type': (browser) => {
        browser
            .waitForElementVisible(`${home.selectors.email} [type="email"]`)
            .assert.visible(`${home.selectors.email} [type="email"]`)
    },
}
