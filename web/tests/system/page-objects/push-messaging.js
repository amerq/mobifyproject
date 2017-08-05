/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

const selectors = {
    dismissButton: '.pw-push-messaging__default-ask-actions-dismiss',
    yesPlease: '.pw-push-messaging__default-ask-actions-accept'
}

const PushMessaging = function(browser) {
    this.browser = browser
    this.selectors = selectors
}

PushMessaging.prototype.dismissDefaultAsk = function() {
    const self = this
    this.browser
        .log('Checking if Push Messaging is enabled')
        .element('css selector', selectors.dismissButton, (result) => {
            if (result.value && result.value.ELEMENT) {
                self.browser
                    .log('Dismissing Push Messaging default ask')
                    .waitForElementVisible(selectors.dismissButton)
                    .click(selectors.dismissButton)
                    .waitForElementNotPresent(selectors.dismissButton)
            }
        })
    return this
}

PushMessaging.prototype.acceptDefaultAsk = function() {
    const self = this
    this.browser
        .log('Checking if Push Messaging is enabled')
        .element('css selector', selectors.yesPlease, (result) => {
            if (result.value && result.value.ELEMENT) {
                self.browser
                    .log('Accepting Push Messaging default ask')
                    .waitForElementVisible(selectors.yesPlease)
                    .click(selectors.yesPlease)
                    .waitForElementNotPresent(selectors.yesPlease)
            }
        })
    return this
}

PushMessaging.prototype.assertSubscribed = function() {
    const self = this
    this.browser
        .executeAsync((_, done) => {
            // 10 attempts; 200ms after each failure - 2 seconds total
            let attempt = 1

            const checkForSubscription = () => {
                const status = window.Progressive.MessagingClient.LocalStorage.get('mobifyMessagingClientSubscriptionStatus')

                if (status === 'subscribed' || attempt >= 10) {
                    done(status)
                } else {
                    attempt++
                    setTimeout(checkForSubscription, 200)
                }
            }

            checkForSubscription()
        },
        ['unusedValue'], // see https://github.com/nightwatchjs/nightwatch/issues/616
        ({value}) => {
            self.browser.assert.equal(value, 'subscribed')
        })
    return this
}

export default PushMessaging
