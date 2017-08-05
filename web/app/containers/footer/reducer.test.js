/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import reducer, {initialState} from './reducer'
import * as actions from './actions'
import * as constants from './constants'

describe('The Footer reducer', () => {
    test('sets the signup status on newsletterSignupComplete', () => {
        const status = constants.SIGNUP_SUCCESSFUL
        expect(initialState.get('signupStatus')).not.toEqual(status) // Sanity check
        const newState = reducer(initialState, actions.newsletterSignupComplete(status))
        expect(newState.get('signupStatus')).toEqual(status)
    })

    test('does nothing for unknown action types', () => {
        const action = {type: 'qwertyuiop'}
        expect(reducer(initialState, action)).toBe(initialState)
    })

})
