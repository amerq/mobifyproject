/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {getCart} from 'progressive-web-sdk/dist/integration-manager/cart/commands'
import {submitForm} from '../../connectors/_merlins-connector/utils'
const UPDATE_ITEM_URL = '/checkout/cart/updatePost/'

// This command overrides the Merlin's connector updateItemQuantity
// instead of submitting the "mini-cart form" from the desktop site,
// this command now submits the "standard" cart form
export const updateItemQuantity = (itemId, itemQuantity) => {
    return (dispatch) => {
        const requestData = {
            update_cart_action: 'update_qty'
        }

        requestData[`cart[${itemId}][qty]`] = itemQuantity

        return submitForm(UPDATE_ITEM_URL, requestData, {method: 'POST'})
            .then(() => dispatch(getCart()))
    }
}

