/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {getCheckoutConfigObject} from '../../../utils/magento-utils'
import {buildSearchURL} from '../config'

export const parseLoginStatus = ($html) => {
    if ($html.find('.customer-welcome').length > 0) {
        return true
    }
    // We may be on a checkout page so check the checkout config object
    const config = getCheckoutConfigObject($html)
    return (config && config.customerData) ? config.customerData.constructor !== Array : false
}

export const parseSearchSuggestions = (json) => {
    if (!json.length) {
        return null
    }

    const suggestions = json.map((data) => {
        const searchTerm = data.title
        const numResults = data.num_results
        return {
            href: buildSearchURL(searchTerm),
            children: searchTerm,
            endAction: `${numResults} result${numResults > 1 ? 's' : ''}`
        }
    })

    return suggestions
}
