/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import React from 'react'
import ConnectedRegisterForm from './register-form'
import {shallow} from 'enzyme'

const RegisterForm = ConnectedRegisterForm.WrappedComponent

test('renders without errors', () => {
    const wrapper = shallow(<RegisterForm />)
    expect(wrapper.length).toBe(1)
})
