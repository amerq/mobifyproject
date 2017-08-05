/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'

/**
 * Extract all of the JSON pieces in 'text/x-magento-init' script
 * elements, and merge them together into a single configuration object
 *
 * Returns an Immutable Map ready for the Redux store.
 */
export const extractMagentoJson = ($html) => {
    return $html
        .find('script[x-type="text/x-magento-init"]')
        .map((_, item) => item.innerHTML)
        .get()
        .map(JSON.parse)
        .map((item) => Immutable.fromJS(item))
        .reduce((summary, item) => summary.mergeDeep(item), Immutable.Map())
}

const SHIPPING_STEP_PATH = ['#checkout', 'Magento_Ui/js/core/app', 'components', 'checkout', 'children', 'steps', 'children', 'shipping-step', 'children', 'shippingAddress']

export const extractMagentoShippingStepData = ($html) => {
    return extractMagentoJson($html).getIn(SHIPPING_STEP_PATH)
}

export const getCheckoutConfigObject = ($html) => {
    const $configScript = $html.find('script:contains(window.checkoutConfig)')

    if ($configScript.length) {
        const objectMatch = /window\.checkoutConfig\s*=\s*([^;]+);/.exec($configScript.html())
        return objectMatch ? JSON.parse(objectMatch[1]) : {}
    }

    return {}
}

export const parseCheckoutEntityID = ($html) => {
    const configObject = getCheckoutConfigObject($html)

    return configObject && configObject.quoteData ? configObject.quoteData.entity_id : ''
}

// From Magento page-cache.js
const generateRandomString = (chars, length) => {
    let result = ''
    length = length > 0 ? length : 1

    while (length--) {
        result += chars[Math.round(Math.random() * (chars.length - 1))]
    }

    return result
}

// Set the cookie and returns the value
export const generateFormKeyCookie = () => {
    // From Magento page-cache.js
    const allowedCharacters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const length = 16
    const generatedKey = generateRandomString(allowedCharacters, length)
    const lifetime = 3600
    const expires = new Date((new Date().getTime()) + lifetime * 1000)
    document.cookie = `form_key=${encodeURIComponent(generatedKey)}; expires=${expires.toGMTString()}; domain=.${window.location.hostname}`
    return generatedKey
}
