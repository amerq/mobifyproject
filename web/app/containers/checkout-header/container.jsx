/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {isRunningInAstro} from '../../utils/astro-integration'

import {getIsLoggedIn} from '../../store/user/selectors'

import Button from 'progressive-web-sdk/dist/components/button'
import {HeaderBar, HeaderBarTitle} from 'progressive-web-sdk/dist/components/header-bar'
import Icon from 'progressive-web-sdk/dist/components/icon'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'

const CheckoutHeader = function({headerHasSignIn, isLoggedIn}) {
    if (isRunningInAstro) {
        return null
    }

    return (
        <header className="t-checkout-header">
            <HeaderBar className="t-checkout-header__bar">
                <HeaderBarTitle className="u-flex-none u-padding-start u-text-align-start">
                    <h2 className="u-align-center u-text-family-header u-text-uppercase">
                        <span className="u-text-weight-extra-light">SECURE</span> CHECKOUT
                    </h2>
                </HeaderBarTitle>

                <Icon name="lock" size="medium" className="u-flex-none" />

                {(!isLoggedIn && headerHasSignIn) &&
                    <div className="u-flex u-text-align-end">
                        <Button
                            className="u-text-letter-spacing-normal"
                            href="/customer/account/login/"
                            innerClassName="u-color-neutral-10"
                            data-analytics-name={UI_NAME.goToSignIn}
                            >
                            <Icon name="user" className="u-margin-end-sm" />
                            <span>Sign in</span>
                        </Button>
                    </div>
                }
            </HeaderBar>
        </header>
    )
}

CheckoutHeader.propTypes = {
    /**
    * Whether the header has sign in
    */
    headerHasSignIn: React.PropTypes.bool,
    /**
    * Is the user logged in or not
    */
    isLoggedIn: React.PropTypes.bool,
}

const mapStateToProps = createPropsSelector({
    isLoggedIn: getIsLoggedIn
})

export default connect(mapStateToProps)(CheckoutHeader)
