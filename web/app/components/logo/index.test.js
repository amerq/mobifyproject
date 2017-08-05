/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import {mount} from 'enzyme'
import React from 'react'

import Logo from './index'
import Icon from 'progressive-web-sdk/dist/components/icon'

/* eslint-disable newline-per-chained-call */

test('Logo renders without errors', () => {
    const wrapper = mount(<Logo />)
    expect(wrapper.length).toBe(1)
})

test('Icon renders without errors', () => {
    const wrapper = mount(<Icon />)
    expect(wrapper.length).toBe(1)
})
