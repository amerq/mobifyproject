/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import {signUpToNewsletter, newsletterSignupComplete} from './actions'
import {SIGNUP_SUCCESSFUL, SIGNUP_FAILED} from './constants'

jest.mock('progressive-web-sdk/dist/integration-manager/commands')
import {submitNewsletter} from 'progressive-web-sdk/dist/integration-manager/commands'

test('signUpToNewsletter submits the form and dispatches the success action on success', () => {
    const mockDispatch = jest.fn()
    mockDispatch.mockImplementation((...args) => args[0])
    submitNewsletter.mockClear()
    submitNewsletter.mockImplementation(() => Promise.resolve())

    const thunk = signUpToNewsletter('/test-form', 'POST', {thing: 'test'})
    expect(typeof thunk).toBe('function')

    return thunk(mockDispatch)
        .then(() => {
            expect(mockDispatch).toBeCalled()
            expect(submitNewsletter).toBeCalled()
            expect(mockDispatch.mock.calls[0][0]).toEqual(newsletterSignupComplete(SIGNUP_SUCCESSFUL))
        })
})

test('signUpToNewsletter submits the form and dispatches the failure action on failure', () => {
    submitNewsletter.mockClear()
    submitNewsletter.mockReturnValueOnce(Promise.reject())

    const thunk = signUpToNewsletter('/test-form', 'POST', {thing: 'test'})
    expect(typeof thunk).toBe('function')

    const mockDispatch = jest.fn()
    return thunk(mockDispatch)
        .then(() => {
            expect(submitNewsletter).toBeCalled()
            expect(mockDispatch).toBeCalled()
            expect(mockDispatch.mock.calls[0][0]).toEqual(newsletterSignupComplete(SIGNUP_FAILED))
        })
})
