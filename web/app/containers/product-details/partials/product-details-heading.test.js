/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
/* eslint-disable import/namespace */

import React from 'react'
import ConnectedProductDetailsHeading from './product-details-heading'
import {mount, shallow} from 'enzyme'

import * as AstroIntegration from '../../../utils/astro-integration'

const ProductDetailsHeading = ConnectedProductDetailsHeading.WrappedComponent

test('renders without errors', () => {
    const wrapper = mount(<ProductDetailsHeading />)

    expect(wrapper.length).toBe(1)
})

const ROOT_CLASS = 't-product-details-heading'

test('renders the component class correctly', () => {
    const wrapper = shallow(<ProductDetailsHeading />)

    expect(wrapper.hasClass(ROOT_CLASS)).toBe(true)
})

test('renders the title and price', () => {
    const wrapper = shallow(<ProductDetailsHeading title="Potion of Healing" price="10gp" available="true" />)

    const titleElement = wrapper.find(`.${ROOT_CLASS}__title`)
    expect(titleElement.length).toBe(1)
    expect(titleElement.text()).toBe('Potion of Healing')

    const priceElement = wrapper.find(`.${ROOT_CLASS}__price`)
    expect(priceElement.length).toBe(1)
    expect(priceElement.text()).toBe('10gp')
})

test('doesnt render the breadcrumbs if running in Astro', () => {
    AstroIntegration.isRunningInAstro = true

    const wrapper = shallow(<ProductDetailsHeading />)
    const breadcrumbs = wrapper.find(`.t-product-details__breadcrumbs`)
    expect(breadcrumbs.length).toBe(0)
})

test('renders the breadcrumbs if not running in Astro', () => {
    AstroIntegration.isRunningInAstro = false

    const wrapper = shallow(<ProductDetailsHeading />)
    const breadcrumbs = wrapper.find(`.t-product-details__breadcrumbs`)
    expect(breadcrumbs.length).toBe(1)
})
