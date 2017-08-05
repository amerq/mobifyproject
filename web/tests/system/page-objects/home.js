/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

const selectors = {
    wrapper: '.t-home__container',
    skipLinks: '.pw-skip-links',
    skipToMain: '.pw-skip-links__anchor:first-of-type',
    skipToNav: '.pw-skip-links__anchor:nth-child(2n)',
    skipToFooter: '.pw-skip-links__anchor:last-of-type',
    productListItem(index) {
        return `.t-home__category .t-home__category-section:nth-child(${index}) .pw--is-loaded`
    },
    email: '.pw-field__input'
}

const Home = function(browser) {
    this.browser = browser
    this.selectors = selectors
}

Home.prototype.navigateToProductList = function(PRODUCT_LIST_INDEX) {
    // Navigate from Home to ProductList
    this.browser
        .log('Navigating to ProductList')
        .waitForElementVisible(selectors.productListItem(PRODUCT_LIST_INDEX))
        .click(selectors.productListItem(PRODUCT_LIST_INDEX))
    return this
}

export default Home
