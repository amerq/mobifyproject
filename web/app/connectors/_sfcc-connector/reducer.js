/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {handleActions} from 'redux-actions'

import Immutable from 'immutable'

// This is an example action. It can be deleted.
import {exampleAction} from './actions'

const initialState = Immutable.Map()

// Add SFCC-specific actions here
const reducer = handleActions({
    [exampleAction]: (state, {payload}) => state.mergeDeep(payload)
}, initialState)

export default reducer
