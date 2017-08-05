/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import Immutable from 'immutable'
import reducer from './reducer'
import {receiveUserCustomContent} from 'progressive-web-sdk/dist/integration-manager/results'

/* eslint-disable newline-per-chained-call */

test('unknown action type leaves state unchanged', () => {
    const action = {
        type: 'qwertyuiop'
    }
    expect(reducer(Immutable.Map(), action)).toEqual(Immutable.Map())
})


test('receiveUserCustomContent updates the custom branch of the checkout state', () => {
    const customContent = {test: 'user content'}
    const expectedState = Immutable.fromJS({custom: customContent})
    const action = receiveUserCustomContent(customContent)

    expect(reducer(Immutable.Map(), action)).toEqual(expectedState)
})
