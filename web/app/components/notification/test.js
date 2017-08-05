/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import {shallow, mount} from 'enzyme'
import React from 'react'

import Button from 'progressive-web-sdk/dist/components/button'
import Icon from 'progressive-web-sdk/dist/components/icon'

import Notification from './index.jsx'

test('Notification renders without errors', () => {
    const wrapper = mount(<Notification content="Test" />)
    expect(wrapper.length).toBe(1)
})

/* eslint-disable newline-per-chained-call */
test('includes the component class name with no className prop', () => {
    const wrapper = shallow(<Notification content="Test" />)

    expect(wrapper.hasClass('c-notification')).toBe(true)
})

test('does not render an \'undefined\' class with no className', () => {
    const wrapper = shallow(<Notification content="Test" />)

    expect(wrapper.hasClass('undefined')).toBe(false)
})

test('renders the contents of the className prop if present', () => {
    [
        'test',
        'test another'
    ].forEach((name) => {
        const wrapper = shallow(<Notification content="Test" className={name} />)

        expect(wrapper.hasClass(name)).toBe(true)
    })
})

describe('Event listeners', () => {
    let addEventListener
    let removeEventListener
    beforeEach(() => {
        addEventListener = window.addEventListener
        window.addEventListener = jest.fn()

        removeEventListener = window.removeEventListener
        window.removeEventListener = jest.fn()
    })

    afterEach(() => {
        window.addEventListener = addEventListener
        window.removeEventListener = removeEventListener
    })

    test('registers a resize listener', () => {
        expect(window.addEventListener).not.toHaveBeenCalled()
        const wrapper = mount(<Notification content="Test" />)
        expect(window.addEventListener).toHaveBeenCalledWith('resize', wrapper.instance().recalculateHeight)
    })

    test('removes the resize listener on unmount if not visible', () => {
        const wrapper = mount(<Notification content="Test" />)
        const handler = wrapper.instance().recalculateHeight

        expect(window.removeEventListener).not.toHaveBeenCalled()
        wrapper.unmount()
        expect(window.removeEventListener).toHaveBeenCalledWith('resize', handler)
    })

})

test('updateHeight updates the notificationHeight', () => {
    const wrapper = mount(<Notification content="Test" />)

    expect(wrapper.state('notificationHeight')).not.toBe(200)
    Object.defineProperty(
        wrapper.instance()._notification,
        'clientHeight',
        {get: () => 200}
    )

    wrapper.instance().updateHeight()
    expect(wrapper.state('notificationHeight')).toBe(200)
})

test('recalculateHeight sets the height to `auto` then calls updateHeight', () => {
    const wrapper = mount(<Notification content="Test" />)
    wrapper.instance().updateHeight = jest.fn()

    wrapper.instance().recalculateHeight()
    expect(wrapper.state('notificationHeight')).toBe('auto')
    expect(wrapper.instance().updateHeight).toBeCalled()
})

describe('removeNotification', () => {
    test('does not call the callback if the notification is not dismissing', () => {
        const callback = jest.fn()
        const wrapper = mount(<Notification content="Test" removeNotification={callback} />)

        expect(wrapper.state('dismissing')).toBeFalsy()
        wrapper.instance().removeNotification({target: wrapper.instance()._notification})
        expect(callback).not.toBeCalled()
    })

    test('does not call the callback if the event is not on the notification', () => {
        const callback = jest.fn()
        const wrapper = mount(<Notification content="Test" removeNotification={callback} />)

        wrapper.setState({dismissing: true})
        wrapper.instance().removeNotification({target: null})
        expect(callback).not.toBeCalled()
    })

    test('calls the callback with the id if dismissing and correctly targeted', () => {
        const callback = jest.fn()
        const wrapper = mount(<Notification content="Test" id="5" removeNotification={callback} />)

        wrapper.setState({dismissing: true})
        wrapper.instance().removeNotification({target: wrapper.instance()._notification})
        expect(callback).toHaveBeenCalledWith('5')
    })
})


test('dismissNotification sets the dismissing state', () => {
    const wrapper = mount(<Notification content="Test" />)

    expect(wrapper.state('dismissing')).toBeFalsy()
    wrapper.instance().dismissNotification()
    expect(wrapper.state('dismissing')).toBe(true)
})

describe('Timeouts', () => {
    let setTimeout
    beforeEach(() => {
        setTimeout = window.setTimeout
        window.setTimeout = jest.fn()
    })
    afterEach(() => {
        window.setTimeout = setTimeout
    })

    test('if showRemoveButton is false, a dismiss timeout is set', () => {
        const wrapper = mount(<Notification content="Test" />)

        expect(window.setTimeout).toHaveBeenCalledWith(
            wrapper.instance().dismissNotification,
            Notification.defaultProps.timeout
        )
    })

    test('if showRemoveButton is true, no dismiss timeout is set', () => {
        mount(<Notification content="Test" showRemoveButton />)

        expect(window.setTimeout).not.toBeCalled()
    })
})

test('if showRemoveButton is true, we render a close button', () => {
    const wrapper = mount(<Notification content="Test" showRemoveButton />)

    const button = wrapper.find(Button)
    expect(button.length).toBe(1)
    expect(button.find('button').hasClass('pw--icon-only')).toBe(true)
    const icon = button.find(Icon)
    expect(icon.length).toBe(1)
    expect(icon.prop('name')).toBe('close')
    const label = button.find('.u-visually-hidden')
    expect(label.text()).toBe('Remove')
})
