/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import * as checkoutPaymentActions from './actions'
import {receiveHasExistingCard} from 'progressive-web-sdk/dist/integration-manager/checkout/results'
import {DEFAULT_CARD} from './constants'
import {mergePayload} from 'progressive-web-sdk/dist/utils/reducer-utils'

const initialState = Immutable.fromJS({
    isLoading: false,
    isFixedPlaceOrderShown: true,
    cvvType: DEFAULT_CARD
})

const checkoutPayment = handleActions({
    [checkoutPaymentActions.toggleLoadingState]: mergePayload,
    [checkoutPaymentActions.toggleFixedPlaceOrder]: mergePayload,
    [checkoutPaymentActions.toggleCardInputRadio]: mergePayload,
    [checkoutPaymentActions.toggleCompanyAptField]: mergePayload,
    [checkoutPaymentActions.toggleNewAddressFields]: mergePayload,
    [checkoutPaymentActions.setCvvType]: mergePayload,
    [receiveHasExistingCard]: mergePayload
}, initialState)


export default checkoutPayment
