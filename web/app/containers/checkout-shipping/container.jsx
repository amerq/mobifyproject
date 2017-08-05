/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React from 'react'
import {connect} from 'react-redux'
import template from '../../template'
import {createPropsSelector} from 'reselect-immutable-helpers'
import classNames from 'classnames'
import {getCartURL} from '../app/selectors'

import {isRunningInAstro, trigger} from '../../utils/astro-integration'
import CheckoutShippingReduxForm from './partials/checkout-shipping-form'
import {ProgressSteps, ProgressStepsItem} from 'progressive-web-sdk/dist/components/progress-steps'


const CheckoutShipping = ({cartURL}) => {
    if (isRunningInAstro) {
        trigger('checkout:enable-alert')
    }

    const templateClassnames = classNames('t-checkout-shipping u-bg-color-neutral-10 t--loaded')

    return (
        <div className={templateClassnames}>
            <div className="u-bg-color-neutral-00 u-border-light-bottom">
                <div className="t-checkout-shipping__progress">
                    <ProgressSteps>
                        <ProgressStepsItem icon="cart-full" title="Cart" href={cartURL} />
                        <ProgressStepsItem icon="shipping" title="Shipping" current />
                        <ProgressStepsItem icon="payment-full" title="Payment" />
                        <ProgressStepsItem icon="done" title="Done" />
                    </ProgressSteps>
                </div>
            </div>

            <CheckoutShippingReduxForm />
        </div>
    )
}

CheckoutShipping.propTypes = {
    /**
    * The relative URL for the cart page
    */
    cartURL: React.PropTypes.string
}

const mapStateToProps = createPropsSelector({
    cartURL: getCartURL
})

export default template(connect(mapStateToProps)(CheckoutShipping))
