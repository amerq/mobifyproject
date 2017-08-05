/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable no-unused-vars */

import * as accountCommands from './account/commands'
import * as appCommands from './app/commands'
import * as cartCommands from './cart/commands'
import * as categoriesCommands from './categories/commands'
import * as checkoutCommands from './checkout/commands'
import * as homeCommands from './home/commands'
import * as productsCommands from './products/commands'

export const submitNewsletter = (formData) => (dispatch) => {
    console.log('[Stub Connector] Called submitNewsletter stub with arguments:', formData)

    return Promise.resolve()
}
export const getSearchSuggestions = (query) => (dispatch) => {
    console.log('[Stub Connector] Called getSearchSuggestions stub with arguments:', query)

    return Promise.resolve()
}

export default {
    account: accountCommands,
    app: appCommands,
    cart: cartCommands,
    categories: categoriesCommands,
    checkout: checkoutCommands,
    home: homeCommands,
    products: productsCommands,
    submitNewsletter,
    getSearchSuggestions
}
