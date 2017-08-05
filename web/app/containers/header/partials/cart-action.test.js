/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import {shallow, mount} from 'enzyme'
import React from 'react'

import Badge from 'progressive-web-sdk/dist/components/badge'
import Button from 'progressive-web-sdk/dist/components/button'

import ConnectedCartAction from './cart-action'

const CartAction = ConnectedCartAction.WrappedComponent

test('CartAction renders without errors', () => {
    const wrapper = mount(<CartAction />)
    expect(wrapper.length).toBe(1)
})

test('CartAction renders a Button, passing it the onClick prop', () => {
    const onClick = jest.fn()
    const wrapper = shallow(<CartAction onClick={onClick} />)

    const button = wrapper.find(Button)
    expect(button.length).toBe(1)
    expect(button.prop('onClick')).toBe(onClick)
})

test('CartAction renders a Badge with the count if it is nonzero', () => {
    const wrapper = shallow(<CartAction itemCount={5} />)

    const counterBadge = wrapper.find('CartItemCounterBadge')
    expect(counterBadge.length).toBe(1)
    const innerWrapper = counterBadge.shallow()

    const badge = innerWrapper.find(Badge)
    expect(badge.length).toBe(1)
    expect(badge.childAt(0).text()).toBe('5')
})

test('CartAction does not render a Badge if the count is zero or undefined', () => {
    [0, undefined].forEach((itemCount) => {
        const wrapper = shallow(<CartAction itemCount={itemCount} />)

        const counterBadge = wrapper.find('CartItemCounterBadge')
        expect(counterBadge.length).toBe(1)
        const innerWrapper = counterBadge.shallow()

        const badge = innerWrapper.find(Badge)
        expect(badge.length).toBe(0)
    })
})
