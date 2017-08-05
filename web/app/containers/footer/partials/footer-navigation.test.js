/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import {mount} from 'enzyme'
import React from 'react'

import FooterNavigation from './footer-navigation'

test('FooterNavigation renders without errors', () => {
    const wrapper = mount(<FooterNavigation />)
    expect(wrapper.length).toBe(1)
})
