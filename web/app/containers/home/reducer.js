/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {handleActions} from 'redux-actions'
import {fromJS} from 'immutable'
import {mergePayload} from 'progressive-web-sdk/dist/utils/reducer-utils'

import {receiveHomeData} from 'progressive-web-sdk/dist/integration-manager/results'

const initialState = fromJS({
    banners: []
})

export default handleActions({
    [receiveHomeData]: mergePayload
}, initialState)
