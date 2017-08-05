/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

const removeUndefinedAddressKeys = (addressData) => {
    for (const item in addressData) {
        if (!addressData[item]) {
            delete addressData[item]
        }
    }

    return addressData
}

export const getNameValue = (firstname, lastname) =>
      [firstname, lastname].filter((item) => item).join(' ')

export const parseShippingInitialValues = (shippingFieldData) => {
    const fieldData = shippingFieldData.toJS()
    const streetFields = fieldData.street.children
    const initialValues = {
        countryId: 'us',
        name: '',
        firstname: '',
        lastname: '',
        addressLine1: '',
        postcode: '',
        telephone: '',
        city: ''
    }

    const addressData = {
        name: getNameValue(fieldData.firstname.value, fieldData.lastname.value),
        addressLine1: streetFields[0].value,
        company: fieldData.company.value,
        addressLine2: streetFields[1].value,
        city: fieldData.city.value,
        countryId: fieldData.country_id.value,
        regionId: fieldData.region_id.value,
        postcode: fieldData.postcode.value,
        telephone: fieldData.telephone.value,
        isInitialized: true
    }

    return {...initialValues, ...removeUndefinedAddressKeys(addressData)}
}

/* eslint-disable camelcase */
export const parseLocations = (shippingStepData) => {
    if (!shippingStepData) {
        return {}
    }

    return {
        countries: shippingStepData
            .getIn(['country_id', 'options'])
            .toJS()
            .map(({value, label, is_region_required, is_zipcode_optional}) => ({
                id: value,
                label,
                regionRequired: !!is_region_required,
                postcodeRequired: !is_zipcode_optional
            })),
        regions: shippingStepData
            .getIn(['region_id', 'options'])
            // Skip the first option, since it's a placeholder.
            .slice(1)
            .toJS()
            .map(({label, value, country_id}) => ({
                id: value,
                label,
                countryId: country_id
            }))
    }
}
/* eslint-enable camelcase */

export const parseShippingMethods = (shippingMethods) => {
    if (!shippingMethods || !shippingMethods.map) {
        return []
    }
    return shippingMethods.map((method) => ({
        label: `${method.method_title} - ${method.carrier_title}`,
        cost: `$${method.price_incl_tax.toFixed(2)}`,
        id: `${method.carrier_code}_${method.method_code}`
    }))
}

export const checkoutConfirmationParser = ($, $html) => {
    const $checkoutSuccess = $html.find('.checkout-success')
    const $orderInSpan = $checkoutSuccess.find('p span')
    const $orderInAnchor = $checkoutSuccess.find('p a')

    return {
        orderNumber: $orderInSpan.length ? $orderInSpan.text() : $orderInAnchor.text(),
        orderUrl: $orderInAnchor.length ? $orderInAnchor.attr('href') : ''
    }
}
