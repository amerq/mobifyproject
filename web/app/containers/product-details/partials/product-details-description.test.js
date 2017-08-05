/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import React from 'react'
import ConnectedProductDetailsDescription from './product-details-description'
import {mount, shallow} from 'enzyme'
import {Accordion, AccordionItem} from 'progressive-web-sdk/dist/components/accordion'

const ProductDetailsDescription = ConnectedProductDetailsDescription.WrappedComponent

/* eslint-disable newline-per-chained-call */

// Mock the mutation observer used to update the accordion's height
// The tests don't use the mutation observer, so we can use a minimal mock
beforeAll(() => {
    window.MutationObserver = function() {
        this.observe = () => {}
    }
})

afterAll(() => {
    delete window.MutationObserver
})

test('renders without errors', () => {
    const wrapper = mount(<ProductDetailsDescription />)

    expect(wrapper.length).toBe(1)
})

const ROOT_CLASS = 't-product-details__description'

test('renders the component class correctly', () => {
    const wrapper = shallow(<ProductDetailsDescription />)

    expect(wrapper.hasClass(ROOT_CLASS)).toBe(true)
})

test('renders the Product Description AccordionItem Header correctly', () => {
    const wrapper = shallow(<ProductDetailsDescription />)
    const accordion = wrapper
    expect(accordion.type()).toBe(Accordion)

    expect(accordion.children().length).toBe(1)
    const accordionItem = accordion.children().first()
    expect(accordionItem.type()).toBe(AccordionItem)

    expect(accordionItem.prop('header')).toBe('Product Description')
})

test('renders the description in an AccordionItem when it is opened', () => {
    const wrapper = mount(<ProductDetailsDescription description="The text that we text is text" />)
    const accordionHeader = wrapper.find('.pw-accordion__header')

    accordionHeader.simulate('click')
    expect(wrapper.html().includes('The text that we text is text')).toBe(true)
})
