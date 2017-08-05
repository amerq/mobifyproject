/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import {submitPayment} from './actions'
import Immutable from 'immutable'

jest.mock('progressive-web-sdk/dist/integration-manager/checkout/commands')
import {submitPayment as submitPaymentCommand} from 'progressive-web-sdk/dist/integration-manager/checkout/commands'
jest.mock('progressive-web-sdk/dist/routing')
import {browserHistory} from 'progressive-web-sdk/dist/routing'

import {PAYMENT_FORM_NAME} from '../../store/form/constants'

test('submitPayment calls submitPayment command', () => {
    const mockDispatch = jest.fn()
    mockDispatch.mockImplementation((...args) => args[0])
    const mockGetState = () => ({
        checkout: Immutable.Map({
            email: 'test@email.com'
        }),
        form: {
            [PAYMENT_FORM_NAME]: {
                values: {
                    billingSameAsShipping: false,
                    name: 'Test Name'
                }
            }
        }
    })
    submitPaymentCommand.mockClear()
    submitPaymentCommand.mockReturnValueOnce(Promise.resolve('test/url'))
    browserHistory.push.mockClear()
    browserHistory.push.mockReturnValueOnce(Promise.resolve())

    const thunk = submitPayment()
    expect(typeof thunk).toBe('function')

    return thunk(mockDispatch, mockGetState)
        .then(() => {
            expect(mockDispatch).toBeCalled()
            expect(submitPaymentCommand).toBeCalled()
        })
})
