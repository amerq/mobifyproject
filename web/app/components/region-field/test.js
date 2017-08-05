/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

// import {mount, shallow} from 'enzyme'
/* eslint-env jest */
// import React from 'react'

import RegionField from './index.jsx'

test('RegionField exists', () => {
    expect(RegionField).toBeDefined()
})

// test('RegionField renders without errors', () => {
//     const wrapper = mount(<RegionField />)
//     expect(wrapper.length).toBe(1)
// })

// /* eslint-disable newline-per-chained-call */
// test('includes the component class name with no className prop', () => {
//     const wrapper = shallow(<RegionField />)

//     expect(wrapper.hasClass('c-region-field')).toBe(true)
// })

// test('does not render an \'undefined\' class with no className', () => {
//     const wrapper = shallow(<RegionField />)

//     expect(wrapper.hasClass('undefined')).toBe(false)
// })

// test('renders the contents of the className prop if present', () => {
//     [
//         'test',
//         'test another'
//     ].forEach((name) => {
//         const wrapper = shallow(<RegionField className={name} />)

//         expect(wrapper.hasClass(name)).toBe(true)
//     })
// })
