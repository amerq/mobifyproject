/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import reducer, {initialState} from './reducer'
import * as actions from './actions'

describe('The Header reducer', () => {

    test('collapses the header content', () => {
        expect(initialState.get('isCollapsed')).toEqual(false) // Sanity check

        // Collapse...
        const newState = reducer(initialState, actions.toggleHeader(true))
        expect(newState.get('isCollapsed')).toEqual(true)
    })

    test('expands the header content', () => {
        let newState
        expect(initialState.get('isCollapsed')).toEqual(false) // Sanity check

        // Collapse...
        newState = reducer(initialState, actions.toggleHeader(true))

        // Expand...
        newState = reducer(initialState, actions.toggleHeader(false))
        expect(newState.get('isCollapsed')).toEqual(false)
    })

})
