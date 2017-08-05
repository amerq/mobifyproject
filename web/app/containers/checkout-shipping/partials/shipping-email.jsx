/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import * as ReduxForm from 'redux-form'

import {isEmailAvailable, submitSignIn} from '../actions'
import {getCustomerEmailRecognized, getEmailError} from '../selectors'

import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import Icon from 'progressive-web-sdk/dist/components/icon'
import Link from 'progressive-web-sdk/dist/components/link'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'

const ShippingEmail = ({submitSignIn, customerEmailRecognized, isEmailAvailable}) => {
    const passwordHint = (
        <Link className="u-color-brand" href="/customer/account/forgotpassword/">
            Forgot password
        </Link>
    )

    return (
        <div>
            <div className="t-checkout-shipping__email-title" />

            <div className="u-padding-md u-border-light-top u-border-light-bottom u-bg-color-neutral-00">

                <FieldRow>
                    <ReduxForm.Field
                        component={Field}
                        className="pw--overlayed-hint"
                        name="username"
                        label="Email order confirmation to"
                        customEventHandlers={{
                            onBlur: isEmailAvailable
                        }}
                    >
                        <input type="email" noValidate placeholder="Email Address" data-analytics-name={UI_NAME.email} />
                    </ReduxForm.Field>
                </FieldRow>

                {customerEmailRecognized &&
                    <FieldRow>
                        <ReduxForm.Field component={Field} name="password" label="Password" hint={passwordHint}>
                            <input type="password" name="password" noValidate data-analytics-name={UI_NAME.password} />
                        </ReduxForm.Field>
                    </FieldRow>
                }

                {customerEmailRecognized &&
                    <FieldRow>
                        <Button
                            className="pw--secondary u-width-full u-text-uppercase qa-checkout__sign-in"
                            onClick={submitSignIn}
                            data-analytics-name={UI_NAME.login}>
                            <Icon name="user" className="u-margin-end" />
                            Sign In
                        </Button>
                    </FieldRow>
                }
            </div>
        </div>
    )
}

ShippingEmail.propTypes = {
    /**
    * True if the users email address has an account associated with it
    */
    customerEmailRecognized: React.PropTypes.bool,
    /**
    * Checks if the users email address has an account associated with it
    */
    isEmailAvailable: React.PropTypes.func,
    /**
    * Submits the sign in form data
    */
    submitSignIn: React.PropTypes.func
}

const mapStateToProps = createPropsSelector({
    customerEmailRecognized: getCustomerEmailRecognized,
    emailError: getEmailError
})

const mapDispatchToProps = {
    submitSignIn,
    isEmailAvailable
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingEmail)
