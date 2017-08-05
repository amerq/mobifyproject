/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable no-unused-vars */

export const initCheckoutShippingPage = (url, routeName) => (dispatch) => {
    console.log('[Stub Connector] Called initCheckoutShippingPage stub with arguments:', url, routeName)
    return Promise.resolve()
}

export const initCheckoutPaymentPage = (url, routeName) => (dispatch) => {
    console.log('[Stub Connector] Called initCheckoutPaymentPage stub with arguments:', url, routeName)
    return Promise.resolve()
}

export const initCheckoutConfirmationPage = (url, routeName) => (dispatch) => {
    console.log('[Stub Connector] Called initCheckoutConfirmationPage stub with arguments:', url, routeName)
    return Promise.resolve()
}

export const submitShipping = (formValues) => (dispatch) => {
    console.log('[Stub Connector] Called submitShipping stub with arguments:', formValues)
    // Should resolve to the payment page URL on success
    return Promise.resolve()
}

export const submitPayment = (formValues) => (dispatch) => {
    console.log('[Stub Connector] Called submitPayment stub with arguments:', formValues)
    // Should resolve to the confirmation page URL on success
    return Promise.resolve()
}

export const fetchShippingMethodsEstimate = (inputAddress) => (dispatch) => {
    console.log('[Stub Connector] Called fetchShippingMethodsEstimate stub with arguments:', inputAddress)
    return Promise.resolve()
}

export const updateShippingAndBilling = () => (dispatch) => {
    console.log('[Stub Connector] Called updateShippingAndBilling stub')
    return Promise.resolve()
}

export const fetchSavedShippingAddresses = () => (dispatch) => {
    console.log('[Stub Connector] Called fetchSavedShippingAddresses stub')
    return Promise.resolve()
}
