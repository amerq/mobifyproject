/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import React from 'react'
import ConnectedSignInForm from './signin-form'
import {shallow} from 'enzyme'

const SignInForm = ConnectedSignInForm.WrappedComponent

test('renders without errors', () => {
    const wrapper = shallow(<SignInForm />)
    expect(wrapper.length).toBe(1)
})
