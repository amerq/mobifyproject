/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import * as ReduxForm from 'redux-form'
import {createPropsSelector} from 'reselect-immutable-helpers'

import {validateFullName, validateCCExpiry, validateCCNumber} from '../../../utils/utils'

// Selectors
import {PAYMENT_FORM_NAME} from '../../../store/form/constants'
import {getBillingInitialValues} from '../../../store/checkout/billing/selectors'

// Actions
import {submitPayment} from '../actions'

// SDK Component
import {Grid, GridSpan} from 'progressive-web-sdk/dist/components/grid'

// Partials
import CreditCardForm from './credit-card-form'
import BillingAddressForm from './billing-address-form'
import OrderSummary from './order-summary'

const REQUIRED_TEXT = 'Required'
const INVALID_TEXT = 'Invalid Input'
const FIRST_LAST_NAME_TEXT = 'Please enter a first and last name'

const validate = (values) => {
    const errors = {}
    const requiredFieldNames = [
        'name',
        'addressLine1',
        'city',
        'countryId',
        'regionId',
        'postcode',
        'telephone',
        'ccexpiry',
        'ccname',
        'ccnumber',
        'cvv'
    ]

    if (values.name && !validateFullName(values.name)) {
        errors.name = FIRST_LAST_NAME_TEXT
    }

    if (values.ccnumber && !validateCCNumber(values.ccnumber)) {
        errors.ccnumber = INVALID_TEXT
    }

    if (values.ccexpiry && !validateCCExpiry(values.ccexpiry)) {
        errors.ccexpiry = INVALID_TEXT
    }


    if (values.cvv && values.cvv.length !== 3) {
        errors.cvv = INVALID_TEXT
    }

    requiredFieldNames.forEach((fieldName) => {
        if (!values[fieldName]) {
            errors[fieldName] = REQUIRED_TEXT
        }
    })

    return errors
}

class CheckoutPaymentForm extends React.Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(values) {
        return new Promise((resolve, reject) => {
            const errors = validate(values)
            if (!Object.keys(errors).length) {
                this.props.submitPayment()
                return resolve()
            }
            return reject(new ReduxForm.SubmissionError(errors))
        })
    }

    render() {
        const {
            handleSubmit
        } = this.props

        return (
            <Grid className="u-center-piece">
                <GridSpan tablet={{span: 6, pre: 1, post: 1}} desktop={{span: 7}}>
                    <form className="t-checkout-payment__form" onSubmit={handleSubmit(this.onSubmit)} noValidate>
                        <CreditCardForm />
                        <BillingAddressForm />
                    </form>
                </GridSpan>
                <GridSpan tablet={{span: 6, pre: 1, post: 1}} desktop={{span: 5}}>
                    <OrderSummary submitPayment={handleSubmit(this.onSubmit)} />
                </GridSpan>
            </Grid>
        )
    }
}

CheckoutPaymentForm.propTypes = {
    /**
     * Redux-form internal
     */
    handleSubmit: PropTypes.func,
    /**
    * Submits the payment form information to the server
    */
    submitPayment: PropTypes.func,
    /**
     * Redux-form internal
     */
    submitting: PropTypes.bool
}

const mapStateToProps = createPropsSelector({
    initialValues: getBillingInitialValues
})

const mapDispatchToProps = {
    submitPayment
}

const CheckoutPaymentReduxForm = ReduxForm.reduxForm({
    form: PAYMENT_FORM_NAME,
    keepDirtyOnReinitialize: true,
    enableReinitialize: true,
    validate
})(CheckoutPaymentForm)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckoutPaymentReduxForm)
