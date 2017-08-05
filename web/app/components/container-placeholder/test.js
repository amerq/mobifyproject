/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import {mount, shallow} from 'enzyme'
import React from 'react'

import ContainerPlaceholder from './index.jsx'

test('ContainerPlaceholder renders without errors', () => {
    const wrapper = mount(<ContainerPlaceholder />)
    expect(wrapper.length).toBe(1)
})

/* eslint-disable newline-per-chained-call */
test('includes the component class name with no className prop', () => {
    const wrapper = shallow(<ContainerPlaceholder />)

    expect(wrapper.hasClass('c-container-placeholder')).toBe(true)
})

test('does not render an \'undefined\' class with no className', () => {
    const wrapper = shallow(<ContainerPlaceholder />)

    expect(wrapper.hasClass('undefined')).toBe(false)
})

test('renders the contents of the className prop if present', () => {
    [
        'test',
        'test another'
    ].forEach((name) => {
        const wrapper = shallow(<ContainerPlaceholder className={name} />)

        expect(wrapper.hasClass(name)).toBe(true)
    })
})
