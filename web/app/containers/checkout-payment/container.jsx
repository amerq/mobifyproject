/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import template from '../../template'

import {getCartURL, getCheckoutShippingURL} from '../app/selectors'

// Partials
import CheckoutPaymentReduxForm from './partials/checkout-payment-form'

// SDK Components
import {ProgressSteps, ProgressStepsItem} from 'progressive-web-sdk/dist/components/progress-steps'

const CheckoutPayment = ({cartURL, checkoutShippingURL}) => {
    return (
        <div className="t-checkout-payment">
            <div className="u-bg-color-neutral-00 u-border-light-bottom">
                <div className="t-checkout-payment__progress">
                    <ProgressSteps>
                        <ProgressStepsItem icon="cart-full" title="Cart" href={cartURL} />
                        <ProgressStepsItem icon="shipping" title="Shipping" href={checkoutShippingURL} />
                        <ProgressStepsItem icon="payment-full" title="Payment" current />
                        <ProgressStepsItem icon="done" title="Done" />
                    </ProgressSteps>
                </div>
            </div>

            <CheckoutPaymentReduxForm />
        </div>
    )
}


CheckoutPayment.propTypes = {
    /**
    * The relative URL for the cart page
    */
    cartURL: React.PropTypes.string,
    /**
    * The relative URL for the checkout shipping page
    */
    checkoutShippingURL: React.PropTypes.string
}

const mapStateToProps = createPropsSelector({
    cartURL: getCartURL,
    checkoutShippingURL: getCheckoutShippingURL
})

export default template(connect(mapStateToProps)(CheckoutPayment))
