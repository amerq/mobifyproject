/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import React from 'react'
import ConnectedCartWishlistModal from './container.jsx'
import {mount, shallow} from 'enzyme'

const CartWishlistModal = ConnectedCartWishlistModal.WrappedComponent

test('renders without errors', () => {
    const wrapper = mount(<CartWishlistModal />)

    expect(wrapper.length).toBe(1)
})

test('renders without errors with one item', () => {
    const wrapper = mount(<CartWishlistModal />)

    expect(wrapper.length).toBe(1)
})

const ROOT_CLASS = 'm-cart__wishlist-modal'

test('renders the component class correctly', () => {
    const wrapper = shallow(<CartWishlistModal />)

    expect(wrapper.hasClass(ROOT_CLASS)).toBe(true)
})
