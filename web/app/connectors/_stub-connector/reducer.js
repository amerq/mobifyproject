/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {handleActions} from 'redux-actions'
import {mergePayload} from 'progressive-web-sdk/dist/utils/reducer-utils'
import {exampleAction, receiveFormInfo} from './actions'

import Immutable from 'immutable'

const initialState = Immutable.Map()

// Add project-specific actions here
const reducer = handleActions({
    // At least one action needs to be present for the reducer to combine correctly
    // Replace this example action once you have a project specific action
    [exampleAction]: mergePayload,
    [receiveFormInfo]: mergePayload
}, initialState)

export default reducer
