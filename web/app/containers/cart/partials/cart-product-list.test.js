/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import React from 'react'
import ConnectedCartProductList from './cart-product-list'
import {mount, shallow} from 'enzyme'

const CartProductList = ConnectedCartProductList.WrappedComponent

test('renders without errors', () => {
    const wrapper = mount(<CartProductList items={[]} />)

    expect(wrapper.length).toBe(1)
})

test('renders without errors with one item', () => {
    const wrapper = mount(<CartProductList items={[
        {
            id: '1',
            productId: 'Product1',
            product: {id: 'Product1', title: 'Eye of Newt', price: '$14.99'},
            quantity: 2,
            itemPrice: '14.99',
            linePrice: '$29.98'
        }]}
        summary_count={2} />)

    expect(wrapper.length).toBe(1)
})

const ROOT_CLASS = 't-cart__product-list'

test('renders the component class correctly', () => {
    const wrapper = shallow(<CartProductList items={[]} />)

    expect(wrapper.hasClass(ROOT_CLASS)).toBe(true)
})
