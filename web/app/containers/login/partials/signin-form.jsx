/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {reduxForm} from 'redux-form'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {connect} from 'react-redux'
import {isSigninLoaded} from '../selectors'
import {submitSignInForm} from '../actions'

import Button from 'progressive-web-sdk/dist/components/button'
import FieldSet from 'progressive-web-sdk/dist/components/field-set'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'

import {LoginField} from './common'

const FORGOT_PASSWORD_PATH = '/customer/account/forgotpassword'

import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'

class SignInForm extends React.Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(values) {
        return this.props.submitForm(values)
    }

    render() {
        const {
            error,
            submitting,
            handleSubmit,
            isFormLoaded
        } = this.props

        return (
            <form noValidate={true} onSubmit={handleSubmit(this.onSubmit)}>
                {error &&
                    <div className="u-margin-bottom-md u-color-error">
                        {error}
                    </div>
                }

                <FieldSet className="t-login__signin-fieldset">
                    <LoginField
                        label="Email"
                        name="username"
                        type="email"
                        analyticsName={UI_NAME.email}
                        />

                    <LoginField
                        label="Password"
                        name="password"
                        type="password"
                        forgotPassword={{href: FORGOT_PASSWORD_PATH}}
                        analyticsName={UI_NAME.password}
                        isPassword
                        />
                    <FieldRow>
                        <Button
                            className="pw--primary u-width-full"
                            type="submit"
                            disabled={submitting || !isFormLoaded}
                            data-analytics-name={UI_NAME.login}
                        >
                            <span className="u-text-uppercase">Login</span>
                        </Button>
                    </FieldRow>
                </FieldSet>
            </form>
        )
    }
}

SignInForm.propTypes = {
    error: PropTypes.string,
    handleSubmit: PropTypes.func,
    isFormLoaded: PropTypes.bool,
    submitForm: PropTypes.func,
    submitting: PropTypes.bool,
}


const ReduxSignInForm = reduxForm({
    form: 'signin-form'
})(SignInForm)

const mapStateToProps = createPropsSelector({
    isFormLoaded: isSigninLoaded
})

const mapDispatchToProps = {
    submitForm: submitSignInForm
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxSignInForm)
