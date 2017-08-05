/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import * as ReduxForm from 'redux-form'
import isEmail from 'validator/lib/isEmail'

import {validateFullName} from '../../../utils/utils'
import {getIsLoggedIn} from '../../../store/user/selectors'
import {getInitialShippingAddress} from '../../../store/checkout/shipping/selectors'

import {submitShipping} from '../actions'
import {SHIPPING_FORM_NAME} from '../../../store/form/constants'

import {Grid, GridSpan} from 'progressive-web-sdk/dist/components/grid'
import ShippingAddress from './shipping-address'
import ShippingEmail from './shipping-email'
import ShippingMethod from './shipping-method'

const REQUIRED_TEXT = 'Required'

const validate = (values, props) => {
    const errors = {}
    const requiredFieldNames = [
        'name',
        'addressLine1',
        'city',
        'countryId',
        'regionId',
        'postcode',
        'telephone'
    ]
    const isSavedAddressSelected = !!values.savedAddress

    if (isSavedAddressSelected) {
        // If user has chosen a saved address, no further validation necessary
        return errors
    }

    if (values.username && !isEmail(values.username)) {
        errors.username = 'Enter a valid email address'
    }

    if (values.name && !validateFullName(values.name)) {
        errors.name = 'Please enter a first and last name'
    }

    if (!props.isLoggedIn && !values.username) {
        errors.username = REQUIRED_TEXT
    }

    requiredFieldNames.forEach((fieldName) => {
        if (!values[fieldName]) {
            errors[fieldName] = REQUIRED_TEXT
        }
    })

    return errors
}

class CheckoutShippingForm extends React.Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(values) {
        return new Promise((resolve, reject) => {
            const errors = validate(values, this.props)
            if (!Object.keys(errors).length) {
                return this.props.submitShipping()
            }
            return reject(new ReduxForm.SubmissionError(errors))
        })
    }

    render() {
        const {
            handleSubmit,
            isLoggedIn
        } = this.props

        return (
            <form className="t-checkout-shipping__form" onSubmit={handleSubmit(this.onSubmit)} noValidate>
                <Grid className="u-center-piece">
                    <GridSpan tablet={{span: 6, pre: 1, post: 1}} desktop={{span: 7}}>
                        {!isLoggedIn && <ShippingEmail />}
                        <ShippingAddress />
                    </GridSpan>

                    <GridSpan tablet={{span: 6, pre: 1, post: 1}} desktop={{span: 5}}>
                        <ShippingMethod />
                    </GridSpan>
                </Grid>
            </form>
        )
    }
}

CheckoutShippingForm.propTypes = {
    /**
     * Whether the form is disabled or not
     */
    disabled: React.PropTypes.bool,
    /**
     * Redux-form internal
     */
    handleSubmit: React.PropTypes.func,
    /**
    * Is the user logged in or not
    */
    isLoggedIn: React.PropTypes.bool,
    /**
    * Submits the shipping form information to the server
    */
    submitShipping: React.PropTypes.func
}

const mapStateToProps = createPropsSelector({
    initialValues: getInitialShippingAddress,
    isLoggedIn: getIsLoggedIn
})

const mapDispatchToProps = {
    submitShipping
}


const CheckoutShippingReduxForm = ReduxForm.reduxForm({
    form: SHIPPING_FORM_NAME,
    validate,
    keepDirtyOnReinitialize: true,
    enableReinitialize: true
})(CheckoutShippingForm)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckoutShippingReduxForm)
