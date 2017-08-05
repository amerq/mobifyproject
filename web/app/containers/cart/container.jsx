/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import template from '../../template'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import classNames from 'classnames'

import Button from 'progressive-web-sdk/dist/components/button'
import {Grid, GridSpan} from 'progressive-web-sdk/dist/components/grid'
import Icon from 'progressive-web-sdk/dist/components/icon'
import Image from 'progressive-web-sdk/dist/components/image'

import {isRunningInAstro, trigger} from '../../utils/astro-integration'

import {getCartLoaded, getCartHasItems} from 'progressive-web-sdk/dist/store/cart/selectors'
import {getIsLoggedIn} from '../../store/user/selectors'

import {requestCartContent} from './actions'
import CartItems from './partials/cart-items'
import {browserHistory} from 'progressive-web-sdk/dist/routing'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'

export const openSignIn = () => {
    if (isRunningInAstro) {
        trigger('sign-in:clicked')
    } else {
        browserHistory.push('/customer/account/login/')
    }
}

export const continueShopping = () => {
    if (isRunningInAstro) {
        trigger('continue:clicked')
    } else {
        browserHistory.push('/')
    }
}

const EmptyCartContents = ({hide, isLoggedIn}) => {
    const emptyCartClassnames = classNames('t-cart__empty u-flexbox u-flex u-direction-column u-align-center u-justify-center u-padding-top-lg u-margin-top', {
        'u-visually-hidden': hide,
        't--hide': hide,
        't--viewport-height': isRunningInAstro
    })

    return (
        <GridSpan>
            <div className={emptyCartClassnames}>
                <Image
                    className="u-margin-bottom-md"
                    height="140px"
                    width="140px"
                    alt="Illustrated upside-down top hat with a bug flying out"
                    src={getAssetUrl(`static/img/cart/empty-cart@2x.png`)}
                    />

                <div className="u-padding-md">
                    <p className="u-padding-top u-padding-start-lg u-padding-end-lg u-text-align-center u-margin-bottom-lg">
                        Your shopping cart is empty. Sign in to retrieve saved items or continue shopping.
                    </p>

                    {!isLoggedIn &&
                        <Button
                            className="pw--primary u-text-uppercase u-h5 u-width-full u-margin-bottom-lg"
                            onClick={openSignIn}
                            data-analytics-name={UI_NAME.goToSignIn}
                        >
                            <Icon name="User" />
                            Sign In
                        </Button>
                    }

                    <Button
                        className="pw--tertiary u-text-uppercase u-h5 u-width-full"
                        onClick={continueShopping}
                        data-analytics-name={UI_NAME.continueShopping}
                    >
                        Continue Shopping
                    </Button>
                </div>
            </div>
        </GridSpan>
    )
}

EmptyCartContents.propTypes = {
    hide: PropTypes.bool,
    isLoggedIn: PropTypes.bool
}

class Cart extends React.Component {
    componentDidMount() {
        trigger('checkout:disable-alert')
        this.props.requestCartContent()
    }

    render() {
        const {
            cartLoaded,
            hasItems,
            isLoggedIn
        } = this.props
        const isCartEmptyAndLoaded = !hasItems && cartLoaded
        const templateClassnames = classNames('t-cart u-bg-color-neutral-10', {
            't--loaded': cartLoaded
        })

        return (
            <div className={templateClassnames}>
                <Grid className="u-center-piece">
                    {!isCartEmptyAndLoaded && <CartItems onContinueShopping={continueShopping} onOpenSignIn={openSignIn} />}

                    <EmptyCartContents hide={!isCartEmptyAndLoaded} isLoggedIn={isLoggedIn} />
                </Grid>
            </div>
        )
    }
}

Cart.propTypes = {
    cartLoaded: PropTypes.bool,
    hasItems: PropTypes.bool,
    isLoggedIn: PropTypes.bool,
    removeItemID: PropTypes.string,
    requestCartContent: PropTypes.func,
}

const mapStateToProps = createPropsSelector({
    cartLoaded: getCartLoaded,
    hasItems: getCartHasItems,
    isLoggedIn: getIsLoggedIn
})

const mapDispatchToProps = {
    requestCartContent
}

export default template(connect(mapStateToProps, mapDispatchToProps)(Cart))
