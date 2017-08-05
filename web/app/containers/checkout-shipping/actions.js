/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable import/namespace */
/* eslint-disable import/named */
import {createPropsSelector} from 'reselect-immutable-helpers'
import {browserHistory} from 'progressive-web-sdk/dist/routing'
import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'

import {splitFullName} from '../../utils/utils'
import {receiveUserEmail, receiveShippingAddress, receiveSelectedShippingMethod, setDefaultShippingAddressId} from 'progressive-web-sdk/dist/integration-manager/checkout/results'

import {
    submitShipping as submitShippingCommand,
    fetchShippingMethodsEstimate,
    initCheckoutShippingPage
} from 'progressive-web-sdk/dist/integration-manager/checkout/commands'
import {customCommands} from 'progressive-web-sdk/dist/integration-manager/custom/commands'
import {login} from 'progressive-web-sdk/dist/integration-manager/account/commands'
import {handleCartExpiryError} from '../app/actions'

import {getShippingFormValues, getShippingEstimateAddress} from '../../store/form/selectors'
import {getSelectedSavedShippingAddress} from '../../store/checkout/shipping/selectors'
import {addNotification, removeNotification} from 'progressive-web-sdk/dist/store/notifications/actions'

export const showCompanyAndApt = createAction('Showing the "Company" and "Apt #" fields (Shipping)')
export const setCustomerEmailRecognized = createAction('Set Customer email Recognized', ['customerEmailRecognized'])
export const setShowAddNewAddress = createAction('Setting the "Saved/New Address" field', ['showAddNewAddress'])
export const receiveData = createAction('Receive Checkout Shipping Data')

const WELCOME_BACK_NOTIFICATION_ID = 'shippingWelcomeBackMessage'

export const initShippingPage = (url, routeName) => (dispatch) => (
    dispatch(initCheckoutShippingPage(url, routeName))
        .catch((error) => dispatch(handleCartExpiryError(error)))
)

const onShippingEmailRecognized = () => (dispatch) => {
    dispatch(setCustomerEmailRecognized(true))
    dispatch(addNotification(
        WELCOME_BACK_NOTIFICATION_ID,
        'Welcome back! Sign in for a faster checkout or continue as a guest.',
        true
    ))
}

const onShippingEmailAvailable = () => (dispatch) => {
    dispatch(removeNotification(WELCOME_BACK_NOTIFICATION_ID))
    return dispatch(setCustomerEmailRecognized(false))
}

export const onShippingLoginError = (errorMessage) =>
    addNotification(
        'shippingEmailError',
        errorMessage,
        true
    )

export const submitSignIn = () => (dispatch, getState) => {
    const {
        username,
        password
    } = getShippingFormValues(getState())
    return dispatch(login(username, password, 'on'))
        .catch((error) => dispatch(onShippingLoginError(error.message)))
}

const submitShippingSelector = createPropsSelector({
    address: getSelectedSavedShippingAddress,
    formValues: getShippingFormValues
})

export const submitShipping = () => (dispatch, getState) => {
    const shippingSelections = submitShippingSelector(getState())
    let formValues = shippingSelections.formValues
    const savedAddress = shippingSelections.address
    if (savedAddress) {
        // Merge form values with the values we have for the selected saved address
        formValues = {
            ...formValues,
            ...savedAddress
        }
        dispatch(setDefaultShippingAddressId(formValues.savedAddress))
    }
    const {
        name,
        company,
        addressLine1,
        addressLine2,
        countryId,
        city,
        regionId,
        postcode,
        telephone,
        shippingMethodId,
        username
    } = formValues
    const {firstname, lastname} = splitFullName(name)
    const address = {
        firstname,
        lastname,
        name,
        company,
        addressLine1,
        addressLine2,
        countryId,
        city,
        regionId,
        postcode,
        telephone,
    }

    if (username) {
        dispatch(receiveUserEmail(username))
    }
    dispatch(receiveSelectedShippingMethod(shippingMethodId))
    dispatch(receiveShippingAddress(address))
    return dispatch(submitShippingCommand({...address, shippingMethodId, savedAddress}))
        .then((paymentURL) => {
            browserHistory.push({
                pathname: paymentURL
            })
        })
        .catch((error) => dispatch(handleCartExpiryError(error)))
        // second catch block is to catch any non-cart
        // expiry error messages that handleCartExpiryError might throw
        .catch(() => (
            dispatch(addNotification(
                'submitShippingError',
                `Unable to save shipping information. Please, check input data.`,
                true
            ))))
}

export const isEmailAvailable = () => (dispatch, getState) => {
    const formValues = getShippingFormValues(getState())

    if (customCommands.isEmailAvailable && formValues.username) {
        return dispatch(customCommands.isEmailAvailable(formValues.username))
        .then((emailAvailable) => {
            if (emailAvailable) {
                return dispatch(onShippingEmailAvailable())
            }
            return dispatch(onShippingEmailRecognized())
        })
    }

    return dispatch(onShippingEmailAvailable())
}

export const fetchShippingMethods = () => (dispatch, getState) => (
    dispatch(
        fetchShippingMethodsEstimate(getShippingEstimateAddress(getState()))
    )
    .catch((error) => dispatch(handleCartExpiryError(error)))
)
