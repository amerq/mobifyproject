/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {handleActions} from 'redux-actions'
import {mergePayload} from 'progressive-web-sdk/dist/utils/reducer-utils'
import {receiveFormInfo, receiveEntityID, receiveFormKey} from './actions'

import Immutable from 'immutable'

const initialState = Immutable.Map()

// Add Merlin's-specific actions here
const reducer = handleActions({
    [receiveFormInfo]: mergePayload,
    [receiveEntityID]: mergePayload,
    [receiveFormKey]: mergePayload
}, initialState)

export default reducer
