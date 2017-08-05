/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import * as checkoutConfirmationActions from './actions'
import {realReceiveCheckoutConfirmationData} from 'progressive-web-sdk/dist/integration-manager/checkout/results'
import {mergePayload} from 'progressive-web-sdk/dist/utils/reducer-utils'
import {receiveOrderConfirmationContents} from 'progressive-web-sdk/dist/integration-manager/results'

export default handleActions({
    [receiveOrderConfirmationContents]: mergePayload,
    [realReceiveCheckoutConfirmationData]: mergePayload,
    [checkoutConfirmationActions.hideRegistrationForm]: (state) => {
        return state.set('isRegistrationFormHidden', true)
    }
}, Immutable.Map())
