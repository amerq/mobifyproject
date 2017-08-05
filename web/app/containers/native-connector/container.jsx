/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {createPropsSelector} from 'reselect-immutable-helpers'

import {connect} from 'react-redux'

import {onAstroEvent, disableAstroEvent, jsRpcMethod} from '../../utils/astro-integration'

import {getIsLoggedIn} from '../../store/user/selectors'

import {getCart} from 'progressive-web-sdk/dist/integration-manager/cart/commands'

const needsUpdateEvent = 'cart:needs-update'

/**
 * Provides a relay with the Native (Astro) part of the app This class can
 * safely assume it's running within an Astro app and does not need to check
 * `isRunningInAstro` ever.
 */
class NativeConnector extends React.Component {
    componentDidMount() {
        onAstroEvent(needsUpdateEvent, () => {
            this.props.refreshCart()
        })
    }

    componentWillUnmount() {
        disableAstroEvent(needsUpdateEvent)
    }

    render() {
        const {isLoggedIn} = this.props

        if (isLoggedIn) {
            jsRpcMethod('user:loggedIn', [])()
        } else {
            jsRpcMethod('user:guest', [])()
        }

        return <span className="nativeConnector" />
    }
}

NativeConnector.propTypes = {
    /**
     * Tracks if the user is logged in, or not.
     */
    isLoggedIn: PropTypes.bool,
    refreshCart: PropTypes.func
}

const mapStateToProps = createPropsSelector({
    isLoggedIn: getIsLoggedIn
})

const mapDispatchToProps = {
    refreshCart: getCart
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NativeConnector)
