/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

const selectors = {
    miniCart: '.qa-header__cart',
    miniCartContent: '.m-mini-cart__content',
    viewCart: '.m-mini-cart__content .pw--tertiary',
    cartTemplateIdentifier: '.t-cart.t--loaded',
    cartCheckout: '.qa-cart__checkout',
    removeItem: '.qa-cart__remove-item',
    confirmRemove: '.m-cart__remove-item-confirmation-modal .pw--secondary',
    emptyCart: '.t-cart__empty',
    emptyMiniCart: '.m-mini-cart__empty-content'
}

const Cart = function(browser) {
    this.browser = browser
    this.selectors = selectors
}

Cart.prototype.navigateToCheckout = function() {
    // Navigate from Cart to Checkout
    this.browser
        .log('Navigating to Checkout')
        .waitForElementVisible(selectors.cartCheckout)
        .click(selectors.cartCheckout)
        .waitUntilMobified()
    return this
}

Cart.prototype.removeItems = function() {
    // Remove all items from the cart
    const self = this
    this.browser
        .preview()
        .log('Opening mini cart')
        .waitForElementVisible(selectors.miniCart)
        .click(selectors.miniCart)
        .waitForElementVisible(selectors.miniCartContent)
        .element('css selector', selectors.viewCart, (result) => {
            if (result.value && result.value.ELEMENT) {
                self.browser
                    .log('View cart')
                    .waitForElementVisible(selectors.viewCart)
                    .click(selectors.viewCart)
                    .log('Removing item from cart')
                    .execute(`document.querySelector('${selectors.removeItem}').click()`)
                    .waitForElementVisible(selectors.confirmRemove)
                    .execute(`document.querySelector('${selectors.confirmRemove}').click()`)
                    .waitForAjaxCompleted()
                self.removeItems()
            }
        })
        .waitForElementVisible(selectors.emptyMiniCart)
    return this
}

export default Cart
