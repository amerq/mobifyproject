/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

const selectors = {
    checkoutTemplateIdentifier: '.t-checkout-shipping.t--loaded',

    email: 'input[name="username"]',
    password: 'input[name="password"][type="password"]',
    signIn: '.qa-checkout__sign-in',

    // Shipping info
    name: 'input[name="name"]',
    address: 'input[name="addressLine1"]',
    city: 'input[name*="city"]',
    country: 'select[name*="country"]',
    state: '[name*="region"]',
    postCode: 'input[name*="code"]',
    phone: 'input[name*="phone"]',
    addressListOption: '.t-checkout-shipping__shipping-address .pw-field-row',
    shippingMethod: '.t-checkout-shipping__shipping-method .pw--checked',
    continueToPayment: '.qa-checkout__continue-to-payment',

    paymentTemplate: '.t-app--checkingPayment',
    creditCardName: 'input[name="ccname"]',
    creditCardNumber: '.pw-card-input input',
    expiry: '.pw-expiry-date input',
    cvv: '.pw-card-verification input',

    placeOrder: '.qa-checkout__place-order:enabled'
}

const userData = {
    // Export a test email and password as environment variables with the following names
    email: 'mobifyautomation@gmail.com',
    password: 'p4ssword',

    name: 'John Doe',
    address: '725 Granville St',
    city: 'Vancouver',
    state: 'BC',
    country: 'Canada',
    postCode: 'V7Y 1L1',
    phone: '604 343 4696',

    creditCardNumber: '4111111111111111',
    expiry: '0920',
    cvv: '123'
}

const Checkout = function(browser) {
    this.browser = browser
    this.selectors = selectors
    this.userData = userData
}

Checkout.prototype.continueAsGuest = function() {
    // Select Continue as Guest / Guest Checkout
    this.browser
        .log('Navigating to Guest Checkout')
        .waitForElementVisible(selectors.continueAsGuest)
        .click(selectors.continueAsGuest)
        .waitUntilMobified()
    return this
}

Checkout.prototype.continueAsRegistered = function() {
    // Sign in to continue Registered Checkout
    this.browser
        .log('Navigating to Registered Checkout')
        .waitForElementVisible(selectors.email)
        .setValue(selectors.email, userData.email)
        // The password field is not displayed to the user until focus is
        // removed from the email field.
        .click(selectors.checkoutTemplateIdentifier)
        .waitForElementVisible(selectors.password)
        .setValue(selectors.password, userData.password)
        .waitForElementVisible(selectors.signIn)
        .click(selectors.signIn)
        // Workaround. The login experience is currently not ideal.
        .pause(3000)
        .refresh()
    return this
}

Checkout.prototype.continueToPayment = function() {
    this.browser
        .log('Continue to Payment')
        .waitForElementVisible(selectors.continueToPayment)
        .click(selectors.continueToPayment)
    return this
}

Checkout.prototype.fillShippingInfo = function() {
    // Fill out Shipping info form fields
    this.browser
        .log('Fill out Shipping Info form fields')
        .waitForElementVisible(selectors.email)
        .clearValue(selectors.email)
        .clearValue(selectors.name)
        .clearValue(selectors.address)
        .clearValue(selectors.city)
        .clearValue(selectors.postCode)
        .clearValue(selectors.phone)

        .setValue(selectors.email, userData.email)
        .setValue(selectors.name, userData.name)
        .setValue(selectors.address, userData.address)
        .setValue(selectors.city, userData.city)
        .setValue(selectors.country, userData.country)
        .setValue(selectors.state, userData.state)
        .setValue(selectors.postCode, userData.postCode)
        .setValue(selectors.phone, userData.phone)
    return this
}

Checkout.prototype.chooseShippingInfo = function() {
    // For registered users who have a list of shipping addresses to choose
    this.browser
        .log('Choose shipping address')
        .waitForElementVisible(selectors.addressListOption)
        .click(selectors.addressListOption)
        .waitForElementVisible(selectors.shippingMethod)
    return this
}

Checkout.prototype.fillPaymentInfo = function() {
    // Fill out Payment Infos form fields
    this.browser
        .log('Fill out Payment Info form fields')
        .waitForElementVisible(selectors.creditCardName)
        .clearValue(selectors.creditCardName)
        .clearValue(selectors.creditCardNumber)
        .clearValue(selectors.expiry)
        .clearValue(selectors.cvv)

        .setValue(selectors.creditCardName, userData.name)
        .setValue(selectors.creditCardNumber, userData.creditCardNumber)
        .setValue(selectors.expiry, userData.expiry)
        .setValue(selectors.cvv, userData.cvv)
    return this
}

export default Checkout
