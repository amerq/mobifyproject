/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import * as footerActions from './actions'
import * as constants from './constants'

import {mergePayload} from 'progressive-web-sdk/dist/utils/reducer-utils'

export const initialState = Immutable.fromJS({
    signupStatus: constants.SIGNUP_NOT_ATTEMPTED
})

const footer = handleActions({
    [footerActions.newsletterSignupComplete]: mergePayload
}, initialState)


export default footer
