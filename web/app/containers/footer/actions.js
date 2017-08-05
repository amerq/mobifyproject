/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import * as constants from './constants'
import * as commands from 'progressive-web-sdk/dist/integration-manager/commands'

export const newsletterSignupComplete = createAction('Newsletter signup complete', ['signupStatus'])

export const signUpToNewsletter = (data) => (dispatch) =>
    commands.submitNewsletter(data)
        .then(() => dispatch(newsletterSignupComplete(constants.SIGNUP_SUCCESSFUL)))
        .catch(() => dispatch(newsletterSignupComplete(constants.SIGNUP_FAILED)))
