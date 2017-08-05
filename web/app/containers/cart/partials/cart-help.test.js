/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import React from 'react'
import CartHelp from './cart-help'
import {mount, shallow} from 'enzyme'

// Mock the mutation observer used to update the accordion's height
// The tests don't use the mutation observer, so we can use a minimal mock
beforeAll(() => {
    window.MutationObserver = function() {
        this.observe = () => {}
    }
})

afterAll(() => {
    delete window.MutationObserver
})

test('renders without errors', () => {
    const wrapper = mount(<CartHelp />)

    expect(wrapper.length).toBe(1)
})

const ROOT_CLASS = 't-cart__help'

test('renders the component class correctly', () => {
    const wrapper = shallow(<CartHelp />)

    expect(wrapper.hasClass(ROOT_CLASS)).toBe(true)
})
