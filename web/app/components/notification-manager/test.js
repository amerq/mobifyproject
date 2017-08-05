/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import {mount, shallow} from 'enzyme'
import React from 'react'

import Notification from '../notification'

import NotificationManager from './index.jsx'

test('NotificationManager renders without errors', () => {
    const wrapper = mount(<NotificationManager />)

    expect(wrapper.length).toBe(1)
})

test('includes the component class name', () => {
    const wrapper = shallow(<NotificationManager />)

    expect(wrapper.hasClass('c-notification-manager')).toBe(true)
})

test('renders a Notification for each notification passed', () => {
    const notifications = [
        {id: 'one', content: 'One'},
        {id: 'two', content: 'Two'}
    ]

    const wrapper = shallow(<NotificationManager notifications={notifications} />)

    const renderedNotifications = wrapper.find(Notification)
    expect(renderedNotifications.length).toBe(notifications.length)
    for (let i = 0; i < notifications.length; i++) {
        expect(renderedNotifications.at(i).prop('id')).toBe(notifications[i].id)
        expect(renderedNotifications.at(i).prop('content')).toBe(notifications[i].content)

    }
})

test('passes on the contents of the actions object to each notification', () => {
    const notifications = [
        {id: 'one', content: 'One'},
        {id: 'two', content: 'Two'}
    ]

    const actions = {
        test: jest.fn()
    }

    const wrapper = shallow(<NotificationManager notifications={notifications} actions={actions} />)

    const renderedNotifications = wrapper.find(Notification)
    renderedNotifications.forEach((notification) => expect(notification.prop('test')).toBe(actions.test))
})
