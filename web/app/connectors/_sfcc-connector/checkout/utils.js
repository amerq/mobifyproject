/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {STATES} from './constants'
import {receiveCheckoutLocations} from 'progressive-web-sdk/dist/integration-manager/checkout/results'

export const populateLocationsData = () => receiveCheckoutLocations({
    countries: [{
        id: 'us',
        label: 'United States',
        regionRequired: true,
        postcodeRequired: true
    }],
    regions: STATES
})


export const createOrderAddressObject = (formValues) => {
    const {
        name,
        firstname,
        lastname,
        company,
        addressLine1,
        addressLine2,
        countryId,
        city,
        regionId,
        postcode,
        telephone
    } = formValues
    return {
        address1: addressLine1,
        address2: addressLine2,
        city,
        country_code: countryId,
        first_name: firstname,
        last_name: lastname,
        full_name: name,
        phone: telephone,
        postal_code: postcode,
        state_code: regionId,
        company_name: company
    }
}
