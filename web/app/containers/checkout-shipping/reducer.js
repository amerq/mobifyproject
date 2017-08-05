/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import {mergePayload} from 'progressive-web-sdk/dist/utils/reducer-utils'
import {showCompanyAndApt, setShowAddNewAddress, setCustomerEmailRecognized} from './actions'

export default handleActions({
    [setCustomerEmailRecognized]: mergePayload,
    [setShowAddNewAddress]: mergePayload,
    [showCompanyAndApt]: (state) => {
        return state.set('isCompanyOrAptShown', true)
    }
}, Immutable.Map())
