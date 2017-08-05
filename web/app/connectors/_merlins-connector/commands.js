/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {makeFormEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'

import * as homeCommands from './home/commands'
import * as productsCommands from './products/commands'
import * as categoriesCommands from './categories/commands'
import * as cartCommands from './cart/commands'
import * as appCommands from './app/commands'
import * as checkoutCommands from './checkout/commands'
import * as accountCommands from './account/commands'

export const submitNewsletter = (formData) => {
    return makeFormEncodedRequest('/newsletter/subscriber/new/', formData, {method: 'POST'})
}

export default {
    checkout: checkoutCommands,
    home: homeCommands,
    products: productsCommands,
    categories: categoriesCommands,
    cart: cartCommands,
    app: appCommands,
    account: accountCommands,
    submitNewsletter
}
