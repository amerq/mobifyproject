/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import {receiveNavigationData, setLoggedIn} from 'progressive-web-sdk/dist/integration-manager/results'
import {mergePayload} from 'progressive-web-sdk/dist/utils/reducer-utils'
import {setNavigationPath} from './actions'
import {LOGGED_IN_NAV, GUEST_NAV} from './constants'

const CATEGORY_PLACEHOLDER_COUNT = 6
const INITIAL_ROOT = new Array(CATEGORY_PLACEHOLDER_COUNT).fill({
    isCategoryLink: true
})

// Insert blank object at start to act as placeholder for "sign in"
INITIAL_ROOT.unshift({})

export const initialState = Immutable.fromJS({
    path: undefined,
    root: {
        children: INITIAL_ROOT,
    },
})

export const reducer = handleActions({
    [receiveNavigationData]: mergePayload,
    [setNavigationPath]: mergePayload,
    [setLoggedIn]: (state, {payload: {isLoggedIn}}) => {
        const accountNodePath = ['root', 'children', 0]

        // Don't create the navigation object if it doesn't exist already
        if (!state.hasIn(accountNodePath)) {
            return state
        }

        return state.mergeDeepIn(accountNodePath, isLoggedIn ? LOGGED_IN_NAV : GUEST_NAV)
    }
}, initialState)

export default reducer
