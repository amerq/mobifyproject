/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import React from 'react'
import CheckoutShippingReduxForm from './checkout-shipping-form'
import {mount} from 'enzyme'

const component = CheckoutShippingReduxForm.WrappedComponent

test('renders without errors', () => {
    const wrapper = mount(<component />)

    expect(wrapper.length).toBe(1)
})
