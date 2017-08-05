/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
/* eslint-disable import/namespace */
import {Map} from 'immutable'

import reducer from './reducer'
import {showCompanyAndApt} from './actions'

test('unknown action type leaves state unchanged', () => {
    const action = {
        type: 'qwertyuiop'
    }
    const inputState = Map({
        test: true,
        item: false,
    })

    expect(reducer(inputState, action)).toEqual(inputState)
})


test('checkoutShippingActions.showCompanyAndApt sets isCompanyOrAptShown flag', () => {
    const action = showCompanyAndApt({})

    const initialState = Map({
        isCompanyOrAptShown: false,
        bystander: 'data'
    })

    const finalState = Map({
        isCompanyOrAptShown: true,
        bystander: 'data'
    })

    expect(reducer(initialState, action).equals(finalState)).toBe(true)
})
