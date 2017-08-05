/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {SubmissionError} from 'redux-form'
import {createBasket, handleCartData, requestCartData, createNewBasket, updateExpiredCart} from '../cart/utils'
import {makeApiRequest, makeApiJsonRequest, getAuthToken, getAuthTokenPayload, checkForResponseFault} from '../utils'
import {getOrderTotal} from 'progressive-web-sdk/dist/store/cart/selectors'
import {populateLocationsData, createOrderAddressObject} from './utils'
import {parseShippingAddressFromBasket} from './parsers'
import {getPaymentURL, getConfirmationURL} from '../config'
import {receiveOrderConfirmationContents} from 'progressive-web-sdk/dist/integration-manager/results'
import {getCardData} from 'progressive-web-sdk/dist/card-utils'
import {getSelectedShippingMethodValue} from '../../../store/checkout/shipping/selectors'
import {
    receiveShippingMethods,
    receiveShippingAddress,
    receiveBillingAddress,
    receiveSelectedShippingMethod,
    receiveBillingSameAsShipping
} from 'progressive-web-sdk/dist/integration-manager/checkout/results'

export const fetchShippingMethodsEstimate = (inputAddress = {}) => (dispatch, getState) => {
    const selectedShippingMethodId = getSelectedShippingMethodValue(getState())
    return createBasket()
        .then((basket) => makeApiRequest(`/baskets/${basket.basket_id}/shipments/me/shipping_methods`, {method: 'GET'}))
        .then((response) => response.json())
        .then((basket) => dispatch(updateExpiredCart(basket)))
        .then(({applicable_shipping_methods}) => {
            const shippingMethods = applicable_shipping_methods
                  .map(({name, description, price, id}) => ({
                      label: `${name} - ${description}`,
                      cost: `$${price.toFixed(2)}`,
                      id
                  }))

            dispatch(receiveShippingAddress({
                ...inputAddress
            })) // set initial values for the shipping form
            dispatch(receiveSelectedShippingMethod(selectedShippingMethodId || shippingMethods[0].id))
            return dispatch(receiveShippingMethods(shippingMethods))
        })
}

export const initCheckoutShippingPage = () => (dispatch) => {
    return requestCartData()
        .then((basket) => dispatch(updateExpiredCart(basket)))
        .then((basket) => {
            const {
                customer_info: {
                    email
                },
                shipments: [{
                    shipping_address,
                    shipping_method
                }]
            } = basket

            // Ensure required properties for Address runtype are present
            let initialValues = {
                countryId: 'us',
                name: '',
                firstname: '',
                lastname: '',
                addressLine1: '',
                postcode: '',
                telephone: '',
                city: ''
            }

            /* eslint-disable camelcase */
            if (shipping_address) {
                initialValues = {
                    ...initialValues,
                    username: email,
                    name: shipping_address.full_name,
                    firstname: shipping_address.first_name,
                    lastname: shipping_address.last_name,
                    company: shipping_address.company_name,
                    addressLine1: shipping_address.address1,
                    addressLine2: shipping_address.address2,
                    countryId: shipping_address.country_code,
                    city: shipping_address.city,
                    regionId: shipping_address.state_code,
                    postcode: shipping_address.postal_code,
                    telephone: shipping_address.phone
                }
            }

            dispatch(receiveSelectedShippingMethod(shipping_method ? shipping_method.id : undefined))
            /* eslint-enable camelcase */
            dispatch(receiveShippingAddress(initialValues))
            dispatch(populateLocationsData())
            return initialValues
        })
        .then((initialValues) => dispatch(fetchShippingMethodsEstimate(initialValues)))
}

// We don't need to fetch any data for this page
export const initCheckoutConfirmationPage = () => () => Promise.resolve()

export const initCheckoutPaymentPage = () => (dispatch) => {
    dispatch(populateLocationsData())
    return requestCartData()
        .then((basket) => dispatch(updateExpiredCart(basket)))
        .then((basket) => {
            const shippingMethod = basket.shipments[0].shipping_method
            const addressData = parseShippingAddressFromBasket(basket)

            dispatch(receiveSelectedShippingMethod(shippingMethod ? shippingMethod.id : undefined))
            dispatch(receiveShippingAddress(addressData))
            dispatch(receiveBillingSameAsShipping(true))
            dispatch(receiveBillingAddress(addressData))
        })
}

const setCustomerNameAndEmail = (formValues, basket) => () => {
    const authToken = getAuthTokenPayload(getAuthToken())
    const customerID = JSON.parse(authToken.sub).customer_info.customer_id
    const requestBody = {
        email: formValues.username,
        customer_name: formValues.name,
        customer_id: customerID
    }

    return makeApiJsonRequest(
        `/baskets/${basket.basket_id}/customer`,
        requestBody,
        {method: 'PUT'}
    )
}

const setShippingAddress = (formValues, basket) => () => (
    makeApiJsonRequest(
        `/baskets/${basket.basket_id}/shipments/me/shipping_address?use_as_billing=true`,
        createOrderAddressObject(formValues),
        {method: 'PUT'}
    )
    .then(checkForResponseFault)
)

const setShippingMethod = (formValues, basket) => () => (
    makeApiJsonRequest(
        `/baskets/${basket.basket_id}/shipments/me/shipping_method`,
        {id: formValues.shippingMethodId},
        {method: 'PUT'}
    )
    .then(checkForResponseFault)
)

export const submitShipping = (formValues) => (dispatch) => (
    createBasket()
        .then((basket) => dispatch(setCustomerNameAndEmail(formValues, basket)))
        .then((basket) => dispatch(updateExpiredCart(basket)))
        .then((basket) => dispatch(setShippingAddress(formValues, basket)))
        .then((basket) => dispatch(setShippingMethod(formValues, basket)))
        .catch((error) => {
            if (error.message.includes('expired')) {
                throw error
            }
            throw new SubmissionError({_error: 'Unable to save shipping data'})
        })
        .then((basket) => {
            dispatch(handleCartData(basket))
            return getPaymentURL()
        })
)

const addPaymentMethod = (formValues, basket) => (dispatch, getState) => {
    const orderTotal = getOrderTotal(getState())
    const type = getCardData(formValues.ccnumber).cardType
    const requestBody = {
        amount: parseFloat(orderTotal.replace('$', '')),
        payment_method_id: 'CREDIT_CARD',
        payment_card: {
            card_type: type
        }
    }

    return makeApiJsonRequest(
        `/baskets/${basket.basket_id}/payment_instruments`,
        requestBody,
        {method: 'POST'}
    )
}

const setBillingAddress = (formValues, basket) => () => {
    if (formValues.billingSameAsShipping) {
        // No change to the address is necessary
        return Promise.resolve(basket)
    }

    // set billing address
    return makeApiJsonRequest(
        `/baskets/${basket.basket_id}/billing_address?use_as_shipping=false`,
        createOrderAddressObject(formValues),
        {method: 'PUT'}
    )
    .then(checkForResponseFault)
}

const createOrder = (basket) => () => makeApiJsonRequest('/orders', basket, {method: 'POST'})

const setPaymentMethod = (formValues, order) => () => {
   // set payment method
    const type = getCardData(formValues.ccnumber).cardType
    const expiryMonth = /^\d\d/.exec(formValues.ccexpiry)[0]
    const expiryYear = /\d\d$/.exec(formValues.ccexpiry)[0]
    const paymentInstrumentID = order.payment_instruments[0].payment_instrument_id
    const requestBody = {
        payment_card: {
            card_type: type,
            expiration_month: parseInt(expiryMonth),
            expiration_year: 2000 + parseInt(expiryYear),
            holder: formValues.ccname,
            number: formValues.ccnumber,
            security_code: formValues.cvv
        },
        payment_method_id: 'CREDIT_CARD'
    }

    return makeApiJsonRequest(
        `/orders/${order.order_no}/payment_instruments/${paymentInstrumentID}`,
        requestBody,
        {method: 'PATCH'}
    )
}

export const submitPayment = (formValues) => (dispatch) => {
    return createBasket()
        .then((basket) => dispatch(addPaymentMethod(formValues, basket)))
        .then((basket) => dispatch(updateExpiredCart(basket)))
        .then((basket) => dispatch(setBillingAddress(formValues, basket)))
        .then((basket) => dispatch(createOrder(basket)))
        .then((order) => dispatch(setPaymentMethod(formValues, order)))
        .then((order) => {
            dispatch(receiveOrderConfirmationContents({
                orderNumber: order.order_no
            }))
            // The new basket data isn't required for the confirmation page,
            // so we can return the URL without waiting for this to complete
            dispatch(createNewBasket())

            return getConfirmationURL()
        })
}

export const updateShippingAndBilling = () => () => Promise.resolve()

export const fetchSavedShippingAddresses = () => () => Promise.resolve()
