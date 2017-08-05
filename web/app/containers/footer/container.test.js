/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
/* eslint-disable import/namespace */

import {shallow} from 'enzyme'
import React from 'react'
import * as AstroIntegration from '../../utils/astro-integration'

import Footer from './container'

describe('The footer', () => {
    const originalIsRunningInAstro = AstroIntegration.isRunningInAstro

    afterEach(() => {
        // Value of `isRunningInAstro` might have been overwritten in test
        AstroIntegration.isRunningInAstro = originalIsRunningInAstro
    })

    test('Should not render footer at all if running in an Astro app', () => {
        AstroIntegration.isRunningInAstro = true
        const footer = shallow(<Footer />)
        expect(footer.children().length).toBe(0)
    })

    test('Should render footer if not running in an Astro app', () => {
        AstroIntegration.isRunningInAstro = false
        const footerData = {
            get: (key) => {
                return {key}
            }
        }

        const footer = shallow(<Footer footer={footerData} />)
        expect(footer.children().length).not.toBe(0)
    })
})
