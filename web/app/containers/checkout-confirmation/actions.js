/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {CHECKOUT_CONFIRMATION_REGISTRATION_FAILED} from './constants'
import {CHECKOUT_CONFIRMATION_MODAL} from '../../modals/constants'
import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {createSelector} from 'reselect'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {addNotification, removeAllNotifications} from 'progressive-web-sdk/dist/store/notifications/actions'
import {openModal} from 'progressive-web-sdk/dist/store/modals/actions'
import * as shippingSelectors from '../../store/checkout/shipping/selectors'
import * as formSelectors from '../../store/form/selectors'
import {getBillingAddress} from '../../store/checkout/billing/selectors'
import {getEmailAddress} from '../../store/checkout/selectors'
import {
    updateShippingAddress,
    updateBillingAddress,
    registerUser
} from 'progressive-web-sdk/dist/integration-manager/account/commands'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'

export const hideRegistrationForm = createAction('Hiding Registration Form (Save Your Address Details)')

const registrationFormSelector = createPropsSelector({
    firstname: shippingSelectors.getShippingFirstName,
    lastname: shippingSelectors.getShippingLastName,
    email: getEmailAddress,
    password: createSelector(
        formSelectors.getConfirmationFormValues,
        ({password}) => password
    ),
    shippingData: shippingSelectors.getShippingAddress,
    billingAddressData: getBillingAddress
})

export const submitRegisterForm = () => {
    return (dispatch, getState) => {
        dispatch(removeAllNotifications())
        const {
            firstname,
            lastname,
            email,
            password,
            shippingData,
            billingAddressData
        } = registrationFormSelector(getState())

        return dispatch(registerUser(firstname, lastname, email, password))
            .then(() => {
                dispatch(openModal(CHECKOUT_CONFIRMATION_MODAL, UI_NAME.createAccountConfirmation))
                return dispatch(updateShippingAddress(shippingData))
                    .then(() => {
                        if (!billingAddressData.sameAsShipping) {
                            return dispatch(updateBillingAddress(billingAddressData))
                        }

                        return Promise.resolve()
                    })
            })
            .then(() => dispatch(hideRegistrationForm()))
            .catch((error) => {
                if (error.name !== 'SubmissionError') {
                    dispatch(addNotification(
                        CHECKOUT_CONFIRMATION_REGISTRATION_FAILED,
                        `Sorry, registration failed. Contact us for assistance. ${error.message}`,
                        true
                    ))
                } else if (error.message.includes('Unable to save')) {
                    dispatch(addNotification(
                        CHECKOUT_CONFIRMATION_REGISTRATION_FAILED,
                        error.message,
                        true
                    ))
                } else {
                    dispatch(addNotification(
                        CHECKOUT_CONFIRMATION_REGISTRATION_FAILED,
                        'Could not complete registration. The email you provided may already be in use.',
                        true
                    ))
                }
            })
    }
}
