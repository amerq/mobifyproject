/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {mount, shallow} from 'enzyme'
/* eslint-env jest */
import React from 'react'

import ProductTile from './index.jsx'
import ProductItem from '../product-item/index.jsx'

test('ProductTile renders without errors', () => {
    const wrapper = mount(<ProductTile />)
    expect(wrapper.length).toBe(1)
})

/* eslint-disable newline-per-chained-call */
test('includes the component class name with no className prop', () => {
    const wrapper = shallow(<ProductTile />)

    expect(wrapper.hasClass('c-product-tile')).toBe(true)
})

test('does not render an \'undefined\' class with no className', () => {
    const wrapper = shallow(<ProductTile />)

    expect(wrapper.hasClass('undefined')).toBe(false)
})

test('renders the contents of the className prop if present', () => {
    [
        'test',
        'test another'
    ].forEach((name) => {
        const wrapper = shallow(<ProductTile className={name} />)
        expect(wrapper.find(ProductItem).hasClass(name)).toBe(true)
    })
})
