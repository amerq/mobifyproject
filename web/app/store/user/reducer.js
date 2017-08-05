/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayload} from 'progressive-web-sdk/dist/utils/reducer-utils'
import {setLoggedIn, receiveUserCustomContent} from 'progressive-web-sdk/dist/integration-manager/results'

const initialState = Immutable.Map()

const userReducer = handleActions({
    [setLoggedIn]: mergePayload,
    [receiveUserCustomContent]: mergePayload
}, initialState)

export default userReducer
