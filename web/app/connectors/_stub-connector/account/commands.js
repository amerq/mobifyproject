/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {setRegisterLoaded, setSigninLoaded} from 'progressive-web-sdk/dist/integration-manager/account/results'
import {setLoggedIn} from 'progressive-web-sdk/dist/integration-manager/results'

/* eslint-disable no-unused-vars */

export const initLoginPage = (url, routeName) => (dispatch) => {
    console.log('[Stub Connector] Called initLoginPage stub with parameters:', url, routeName)
    dispatch(setSigninLoaded())
    return Promise.resolve()
}

export const initRegisterPage = (url, routeName) => (dispatch) => {
    console.log('[Stub Connector] Called initRegisterPage stub with parameters:', url, routeName)
    dispatch(setRegisterLoaded())
    return Promise.resolve()
}

export const navigateToSection = (router, routes, sectionName) => (dispatch) => {
    console.log('[Stub Connector] Called navigateToSection stub with parameters:', router, routes, sectionName)
    return Promise.resolve()
}

export const login = (username, password, rememberMe) => (dispatch) => {
    console.log('[Stub Connector] Called login stub with parameters:', username, password, rememberMe)
    dispatch(setLoggedIn(true))

    // This promise should resolve to the URL of the account page
    // to redirect the user to.
    return Promise.resolve()
}

export const logout = () => (dispatch) => {
    console.log('[Stub Connector] Called logout stub')
    dispatch(setLoggedIn(false))
    return Promise.resolve()
}

export const registerUser = (firstname, lastname, email, password) => (dispatch) => {
    console.log('[Stub Connector] Called registerUser stub with parameters:', firstname, lastname, email, password)

    // This promise should resolve to the URL of the account page
    // to redirect the user to.
    return Promise.resolve()
}

export const updateShippingAddress = (formValues) => (dispatch) => {
    console.log('[Stub Connector] Called updateShippingAddress stub with parameters:', formValues)
    return Promise.resolve()
}

export const updateBillingAddress = (formValues) => (dispatch) => {
    console.log('[Stub Connector] Called updateBillingAddress stub with parameters:', formValues)
    return Promise.resolve()
}
