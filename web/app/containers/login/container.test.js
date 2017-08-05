/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
/* eslint-disable import/namespace */

import {shallow} from 'enzyme'
import React from 'react'
import * as AstroIntegration from '../../utils/astro-integration'

import ConnectedLogin from './container'
const Login = ConnectedLogin.WrappedComponent.WrappedComponent

describe('The Login', () => {
    const originalIsRunningInAstro = AstroIntegration.isRunningInAstro

    afterEach(() => {
        // Value of `isRunningInAstro` might have been overwritten in test
        AstroIntegration.isRunningInAstro = originalIsRunningInAstro
    })

    test('Should render tab if not running in Astro', () => {
        AstroIntegration.isRunningInAstro = false
        const route = {
            route: 'register'
        }
        const login = shallow(<Login route={route} />)
        expect(login.find('TabsPanel')).toHaveLength(2)
    })

    test('Should not render tabs at all if running in an Astro app', () => {
        AstroIntegration.isRunningInAstro = true
        const route = {
            route: 'signin'
        }
        const login = shallow(<Login route={route} />)
        expect(login.find('TabsPanel')).toHaveLength(0)
    })
})
