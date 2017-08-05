/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */

import {mount, shallow} from 'enzyme'
import React from 'react'

import NavItem from 'progressive-web-sdk/dist/components/nav-item'
import Icon from 'progressive-web-sdk/dist/components/icon'

import {NavItemIcon, NavItemWithIcon, AccountNavItem} from './index.jsx'

describe('NavItemIcon', () => {
    test('renders without errors', () => {
        const wrapper = mount(<NavItemIcon name="plus" />)
        expect(wrapper.length).toBe(1)
    })

    test('has the appropriate class name', () => {
        const wrapper = shallow(<NavItemIcon name="plus" />)

        expect(wrapper.hasClass('c-nav-item__icon')).toBe(true)
    })

    test('renders the named icon', () => {
        const wrapper = shallow(<NavItemIcon name="plus" />)

        expect(wrapper.children.length).toBe(1)
        expect(wrapper.childAt(0).type()).toBe(Icon)
        expect(wrapper.childAt(0).prop('name')).toBe('plus')
    })
})

describe('NavItemWithIcon', () => {
    test('renders without errors', () => {
        const wrapper = mount(<NavItemWithIcon />)
        expect(wrapper.length).toBe(1)
    })

    test('has the appropriate class name', () => {
        const wrapper = shallow(<NavItemWithIcon />)

        expect(wrapper.hasClass('pw--with-icon')).toBe(true)
    })

    test('renders a NavItem', () => {
        const wrapper = shallow(<NavItemWithIcon />)

        expect(wrapper.type()).toBe(NavItem)
    })
})

describe('AccountNavItem', () => {
    test('renders without errors', () => {
        const wrapper = mount(<AccountNavItem />)
        expect(wrapper.length).toBe(1)
    })

    test('renders a NavItemWithIcon', () => {
        const wrapper = shallow(<AccountNavItem />)

        expect(wrapper.type()).toBe(NavItemWithIcon)
    })
})
