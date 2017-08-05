/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

const selectors = {
    productDetailsTemplateIdentifier: '.t-product-details',
    addItem: '.t-product-details__add-to-cart:not([disabled])',
    itemAdded: '.m-product-details__item-added-modal',
    goToCheckout: '.m-product-details__item-added-modal .pw--primary'
}

const ProductDetails = function(browser) {
    this.browser = browser
    this.selectors = selectors
}

ProductDetails.prototype.addItemToCart = function() {
    // Add an item to the cart
    this.browser
        .log('Adding item to cart')
        .waitForElementVisible(selectors.addItem)
        .click(selectors.addItem)
        .waitUntilMobified()
    return this
}

ProductDetails.prototype.navigateToCart = function() {
    // Navigate from ProductDetails to Checkout
    this.browser
        .log('Navigating to cart')
        .waitForElementVisible(selectors.goToCheckout)
        .click(selectors.goToCheckout)
        .waitUntilMobified()

    return this
}

export default ProductDetails
