/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

// import {mount, shallow} from 'enzyme'
/* eslint-env jest */
// import React from 'react'

import CountrySelect from './index.jsx'

test('CountrySelect exists', () => {
    expect(CountrySelect).toBeDefined()
})

// test('CountrySelect renders without errors', () => {
//     const wrapper = mount(<CountrySelect />)
//     expect(wrapper.length).toBe(1)
// })

// /* eslint-disable newline-per-chained-call */
// test('includes the component class name with no className prop', () => {
//     const wrapper = shallow(<CountrySelect />)

//     expect(wrapper.hasClass('c-country-select')).toBe(true)
// })

// test('does not render an \'undefined\' class with no className', () => {
//     const wrapper = shallow(<CountrySelect />)

//     expect(wrapper.hasClass('undefined')).toBe(false)
// })

// test('renders the contents of the className prop if present', () => {
//     [
//         'test',
//         'test another'
//     ].forEach((name) => {
//         const wrapper = shallow(<CountrySelect className={name} />)

//         expect(wrapper.hasClass(name)).toBe(true)
//     })
// })
