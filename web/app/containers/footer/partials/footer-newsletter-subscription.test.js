/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import {shallow} from 'enzyme'
import React from 'react'

import ConnectedFooterNewsletterSubscription from './footer-newsletter-subscription'

const FooterNewsletterSubscription = ConnectedFooterNewsletterSubscription.WrappedComponent

test('FooterNewsletterSubscription renders without errors', () => {
    const wrapper = shallow(<FooterNewsletterSubscription />)
    expect(wrapper.length).toBe(1)
})
