/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import classNames from 'classnames'
import Button from 'progressive-web-sdk/dist/components/button'
import {noop} from 'progressive-web-sdk/dist/utils/utils'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'

class Notification extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dismissing: false
        }

        this.dismissNotification = this.dismissNotification.bind(this)
        this.removeNotification = this.removeNotification.bind(this)
        this.recalculateHeight = this.recalculateHeight.bind(this)
    }

    componentDidMount() {
        const {
            showRemoveButton,
            timeout
        } = this.props

        // Set notification height for CSS animations
        this.updateHeight()

        window.addEventListener('resize', this.recalculateHeight)

        if (!showRemoveButton) {
            setTimeout(this.dismissNotification, timeout)
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.recalculateHeight)
    }

    recalculateHeight() {
        this.setState({
            notificationHeight: 'auto'
        })

        this.updateHeight()
    }

    updateHeight() {
        // Don't do anything if height didn't change.
        // Avoid infinite loop with componentDidMount
        if (this.state.notificationHeight === this._notification.clientHeight) {
            return
        }

        this.setState({
            notificationHeight: this._notification.clientHeight
        })
    }

    dismissNotification() {
        this.setState({
            dismissing: true
        })
    }

    removeNotification(e) {
        if (this.state.dismissing && e.target === this._notification) {
            this.props.removeNotification(this.props.id)
        }
    }

    render() {
        const {
            content,
            className,
            showRemoveButton,
        } = this.props

        const baseClass = 'c-notification'

        const classes = classNames(baseClass, 'u-align-center u-flexbox u-margin-bottom-sm u-color-neutral-10', className, {
            'c--dismissing': this.state.dismissing
        })

        const notificationStyle = this.state.notificationHeight ? {
            height: this.state.notificationHeight
        } : {}

        return (
            <div className={classes} onTransitionEnd={this.removeNotification} style={notificationStyle} ref={(el) => { this._notification = el }}>
                <div className={`${baseClass}__content u-flex u-padding-lg`}>
                    {content}
                </div>

                {showRemoveButton &&
                    <div className={`${baseClass}__action u-flex-none u-padding`}>
                        <Button
                            icon="close"
                            title="Remove"
                            onClick={this.dismissNotification}
                            data-analytics-name={UI_NAME.dismissNotification}
                        />
                    </div>
                }
            </div>
        )
    }
}


Notification.defaultProps = {
    removeNotification: noop,
    timeout: 1500
}


Notification.propTypes = {
    /**
     * The content to be displayed inside the notification
     */
    content: PropTypes.node.isRequired,

    /**
     * Any additional classes to be added to the component
     */
    className: PropTypes.string,

    /**
     * The id for this notification. Must be unique.
     */
    id: PropTypes.string,

    /**
     * The function used to remove Notifications. From containers/app/actions.
     */
    removeNotification: PropTypes.func,

    /**
     * If true, a button will be rendered which can be used to remove the notification.
     * If setting both remove button and timeout, remove button will prevent notification from
     * auto dismissing.
     */
    showRemoveButton: PropTypes.bool,

    /**
     * If this is provided, the Notification will be automatically removed after this timeout (ms).
     * Exception: If remove button is also set to true, will not auto dismiss itself
     */
    timeout: PropTypes.number
}

export default Notification
