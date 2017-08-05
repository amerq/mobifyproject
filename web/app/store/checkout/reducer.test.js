/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import Immutable from 'immutable'
import reducer from './reducer'
import * as checkoutActions from 'progressive-web-sdk/dist/integration-manager/checkout/results'

/* eslint-disable newline-per-chained-call */

test('unknown action type leaves state unchanged', () => {
    const action = {
        type: 'qwertyuiop'
    }
    expect(reducer(Immutable.Map(), action)).toEqual(Immutable.Map())
})


test('receiveCheckoutCustomContent updates the custom branch of the checkout state', () => {
    const customContent = {test: 'checkout content'}
    const expectedState = Immutable.fromJS({custom: customContent})
    const action = checkoutActions.receiveCheckoutCustomContent(customContent)

    expect(reducer(Immutable.Map(), action)).toEqual(expectedState)
})

test('receiveLocationsCustomContent updates the custom branch of locations', () => {
    const customContent = {test: 'locations content'}
    const expectedState = {locations: {custom: customContent}}
    const action = checkoutActions.receiveLocationsCustomContent(customContent)

    expect(reducer(Immutable.Map(), action).toJS()).toEqual(expectedState)
})


test('receiveShippingAddressCustomContent updates the custom branch of the shipping address', () => {
    const customContent = {test: 'shipping address content'}
    const expectedState = {shippingAddress: {custom: customContent}}
    const action = checkoutActions.receiveShippingAddressCustomContent(customContent)

    expect(reducer(Immutable.Map(), action).toJS()).toEqual(expectedState)
})


test('receiveBillingAddressCustomContent updates the custom branch of the billing address', () => {
    const customContent = {test: 'billing address content'}
    const expectedState = {billingAddress: {custom: customContent}}
    const action = checkoutActions.receiveBillingAddressCustomContent(customContent)

    expect(reducer(Immutable.Map(), action).toJS()).toEqual(expectedState)
})

