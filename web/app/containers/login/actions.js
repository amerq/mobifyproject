/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import isEmail from 'validator/lib/isEmail'
import {SubmissionError} from 'redux-form'

import {isRunningInAstro, jsRpcMethod} from '../../utils/astro-integration'
import {login, registerUser} from 'progressive-web-sdk/dist/integration-manager/account/commands'
import {browserHistory} from 'progressive-web-sdk/dist/routing'
import isReactRoute from 'progressive-web-sdk/dist/routing/is-react-route'

const validateSignInForm = (formValues) => {
    const errors = {
    }
    if (!formValues) {
        return {
            _error: 'Please fill in the form'
        }
    }

    const {
        username,
        password
    } = formValues

    if (!username) {
        errors.username = 'Email address is required'
    } else if (!isEmail(username)) {
        errors.username = 'Email address is invalid'
    }
    if (!password) {
        errors.password = 'Password is required'
    }
    return errors
}

const validateRegisterForm = (formValues) => {
    const errors = {}

    if (!Object.keys(formValues).length) {
        return {
            _error: 'Please fill in the form'
        }
    }

    const {
        firstname,
        lastname,
        email,
        password,
        password_confirmation: passwordConfirmation
    } = formValues

    if (!firstname) {
        errors.firstname = 'First name is required'
    }

    if (!lastname) {
        errors.lastname = 'Last name is required'
    }

    if (!email) {
        errors.email = 'Email address is required'
    } else if (!isEmail(email)) {
        errors.email = 'Email address is invalid'
    }

    if (!password) {
        errors.password = 'Password is required'
    }

    if (password !== passwordConfirmation) {
        errors.password_confirmation = 'Passwords are not the same'
    }

    if (password.length < 6) {
        errors.password = 'Please enter 6 or more characters'
    }

    return errors
}

const handleLoginSuccess = (href) => {
    if (isRunningInAstro) {
        jsRpcMethod('user:loggedIn', [])()
    }
    // This is only here because there is no account page in the PWA right now
    // Once we've added one we should user browserHistory to navigate to the account page after successfully logging in
    if (!href) {
        return
    }
    if (isReactRoute(href)) {
        browserHistory.push({pathname: href})
    } else {
        window.location.href = href
    }
}

export const submitSignInForm = (formValues) => (dispatch) => {
    const errors = validateSignInForm(formValues)
    if (errors._error || Object.keys(errors).length) {
        return Promise.reject(new SubmissionError(errors))
    }

    const {
        username,
        password,
        persistent_remember_me
    } = formValues

    return dispatch(login(username, password, persistent_remember_me))
        .then(handleLoginSuccess)
}

export const submitRegisterForm = (formValues) => (dispatch) => {
    const errors = validateRegisterForm(formValues)
    if (errors._error || Object.keys(errors).length) {
        return Promise.reject(new SubmissionError(errors))
    }

    const {
        firstname,
        lastname,
        email,
        password
    } = formValues

    return dispatch(registerUser(firstname, lastname, email, password))
        .then(handleLoginSuccess)
}
