/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
/* eslint-disable import/namespace */

import {shallow} from 'enzyme'
import React from 'react'
import * as AstroIntegration from '../../utils/astro-integration'

import ConnectedHeader from './container'
const Header = ConnectedHeader.WrappedComponent

describe('The header', () => {
    const originalIsRunningInAstro = AstroIntegration.isRunningInAstro

    afterEach(() => {
        // Value of `isRunningInAstro` might have been overwritten in test
        AstroIntegration.isRunningInAstro = originalIsRunningInAstro
    })

    test('Should not render header at all if running in an Astro app', () => {
        AstroIntegration.isRunningInAstro = true
        const header = shallow(<Header />)
        expect(header.children().length).toBe(0)
    })

    test('Should render header if not running in an Astro app', () => {
        AstroIntegration.isRunningInAstro = false
        const header = shallow(<Header />)
        expect(header.children().length).not.toBe(0)
    })
})
