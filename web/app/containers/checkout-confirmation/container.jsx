/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React from 'react'

import template from '../../template'

import CheckoutConfirmationSplash from './partials/checkout-confirmation-splash'
import CheckoutConfirmationDetails from './partials/checkout-confirmation-details'
import CheckoutConfirmationQuestions from './partials/checkout-confirmation-questions'

import {trigger} from '../../utils/astro-integration'

class CheckoutConfirmation extends React.Component {
    componentDidMount() {
        trigger('checkout:completed')
    }

    render() {
        return (
            <div className="t-checkout-confirmation">
                <CheckoutConfirmationSplash />
                <CheckoutConfirmationDetails />
                <CheckoutConfirmationQuestions />
            </div>
        )
    }
}

export default template(CheckoutConfirmation)
