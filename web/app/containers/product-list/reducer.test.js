/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import Immutable from 'immutable'
import reducer from './reducer'

const initialState = Immutable.fromJS({
    test: true,
    a: 'b',
    anything: 'else'
})

describe('The Product List reducer', () => {
    test('does nothing for unknown action types', () => {
        const action = {type: 'qwertyuiop'}
        expect(reducer(initialState, action)).toBe(initialState)
    })
})
