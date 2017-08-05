/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import {mount, shallow} from 'enzyme'
import React from 'react'

import ProductItem from './index.jsx'

test('ProductItem renders without errors', () => {
    const wrapper = mount(<ProductItem title="I am product!" />)
    expect(wrapper.length).toBe(1)
})

/* eslint-disable newline-per-chained-call */
test('includes the component class name with no className prop', () => {
    const wrapper = shallow(<ProductItem title="I am product!" />)

    expect(wrapper.hasClass('c-product-item')).toBe(true)
})

test('does not render an \'undefined\' class with no className', () => {
    const wrapper = shallow(<ProductItem title="I am product!" />)

    expect(wrapper.hasClass('undefined')).toBe(false)
})

test('renders the contents of the className prop if present', () => {
    [
        'test',
        'test another'
    ].forEach((name) => {
        const wrapper = shallow(<ProductItem title="I am product!" className={name} />)

        expect(wrapper.hasClass(name)).toBe(true)
    })
})

test('renders the category if it is passed in', () => {
    const wrapper = shallow(<ProductItem title="Title" category="Category!" />)

    const categoryTag = wrapper.find('.c-product-item__category')
    expect(categoryTag.length).toBe(1)
    expect(categoryTag.text()).toBe('Category!')
})

test('renders the price if it is passed in', () => {
    const wrapper = shallow(<ProductItem title="Title" price="$0.99" />)

    expect(wrapper.find('div').someWhere((div) => div.text() === '$0.99')).toBe(true)
})
