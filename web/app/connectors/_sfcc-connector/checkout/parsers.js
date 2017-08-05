/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

export const parseShippingAddressFromBasket = (basketData) => {
    const {
        customer_info: {
            email
        },
        shipments: [{
            shipping_address
        }]
    } = basketData

    let initialValues = {
        countryId: 'us',
        firstname: '',
        lastname: '',
        addressLine1: '',
        city: '',
        postcode: '',
        telephone: ''
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
    /* eslint-enable camelcase */

    return initialValues
}
