/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {browserHistory} from 'progressive-web-sdk/dist/routing'
import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {getPaymentBillingFormValues} from '../../store/form/selectors'
import {getEmailAddress} from '../../store/checkout/selectors'
import {getShippingAddress} from '../../store/checkout/shipping/selectors'
import {submitPayment as submitPaymentCommand, initCheckoutPaymentPage} from 'progressive-web-sdk/dist/integration-manager/checkout/commands'
import {splitFullName} from '../../utils/utils'
import {handleCartExpiryError} from '../app/actions'
import {receiveBillingAddress, receiveBillingSameAsShipping} from 'progressive-web-sdk/dist/integration-manager/checkout/results'

export const receiveContents = createAction('Received CheckoutPayment Contents')
export const toggleLoadingState = createAction('Toggled the spinner inside of "Place Order" button', ['isLoading'])
export const toggleFixedPlaceOrder = createAction('Toggled the fixed "Place Order" container', ['isFixedPlaceOrderShown'])
export const toggleCardInputRadio = createAction('Toggled the card method radio input', ['isNewCardInputSelected'])
export const toggleCompanyAptField = createAction('Toggled the "Company" and "Apt #" fields (Payment)', ['isCompanyOrAptShown'])
export const toggleNewAddressFields = createAction('Toggled new address fields', ['newShippingAddressIsEnabled'])
export const setCvvType = createAction('Setting CVV type', ['cvvType'])

export const initPaymentPage = (url, routeName) => (dispatch) => (
    dispatch(initCheckoutPaymentPage(url, routeName))
        .catch((error) => dispatch(handleCartExpiryError(error)))
)

export const submitPayment = () => (dispatch, getState) => {
    dispatch(toggleLoadingState(true))
    const currentState = getState()
    const billingFormValues = getPaymentBillingFormValues(currentState)
    const billingSameAsShipping = billingFormValues.billingSameAsShipping

    // Remove the billingSameAsShipping value from our formValues object
    // so we don't store duplicate data in our app state
    delete billingFormValues.billingSameAsShipping

    // Careful. This get's completely overwritten below
    let address = null
    const email = getEmailAddress(currentState)
    const paymentInfo = {
        ccname: billingFormValues.ccname,
        ccnumber: billingFormValues.ccnumber,
        ccexpiry: billingFormValues.ccexpiry,
        cvv: billingFormValues.cvv
    }


    if (billingSameAsShipping) {
        address = {
            username: email,
            ...getShippingAddress(currentState).toJS(),
            sameAsShipping: true
        }
    } else {
        const {firstname, lastname} = splitFullName(billingFormValues.name)
        address = {
            firstname,
            lastname,
            username: email,
            ...billingFormValues,
        }
    }

    dispatch(receiveBillingSameAsShipping(billingSameAsShipping))
    dispatch(receiveBillingAddress(address))
    return dispatch(submitPaymentCommand({...address, ...paymentInfo, billingSameAsShipping}))
        .then((url) => {
            dispatch(toggleLoadingState(false))
            browserHistory.push({
                pathname: url
            })
        })
        .catch((error) => {
            dispatch(toggleLoadingState(false))
            return dispatch(handleCartExpiryError(error))
        })
}
