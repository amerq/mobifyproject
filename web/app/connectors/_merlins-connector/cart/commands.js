/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {makeRequest, makeJsonEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'
import {removeNotification} from 'progressive-web-sdk/dist/store/notifications/actions'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getUenc, getCartBaseUrl, getFormInfoByProductId} from '../selectors'
import {receiveEntityID} from '../actions'
import {getSelectedShippingMethod, getShippingAddress} from '../../../store/checkout/shipping/selectors'
import {receiveCartContents, receiveCartTotals} from 'progressive-web-sdk/dist/integration-manager/cart/results'
import {receiveCartProductData} from 'progressive-web-sdk/dist/integration-manager/products/results'
import {submitForm, textFromFragment, prepareEstimateAddress} from '../utils'
import {parseLocations} from '../checkout/parsers'
import {receiveCheckoutLocations} from 'progressive-web-sdk/dist/integration-manager/checkout/results'
import {fetchShippingMethodsEstimate} from 'progressive-web-sdk/dist/integration-manager/checkout/commands'
import {fetchPageData} from '../app/commands'
import {parseCart, parseCartProducts, parseCartTotals} from './parser'
import {parseCheckoutEntityID, extractMagentoJson} from '../../../utils/magento-utils'
import {ADD_TO_WISHLIST_URL, PROMO_ERROR} from '../../../containers/cart/constants'

const LOAD_CART_SECTION_URL = '/customer/section/load/?sections=cart%2Cmessages&update_section_id=true'
const REMOVE_CART_ITEM_URL = '/checkout/sidebar/removeItem/'
const UPDATE_ITEM_URL = '/checkout/sidebar/updateItemQty/'
const BASE_HEADERS = {
    Accept: 'application/json',
}

/**
 * Get the contents of the users cart
 */
export const getCart = () => (dispatch) => {
    const opts = {
        headers: BASE_HEADERS
    }
    dispatch(removeNotification('cartUpdateError'))
    const currentTimeMs = new Date().getTime()
    return makeRequest(`${LOAD_CART_SECTION_URL}&_=${currentTimeMs}`, opts)
        .then((response) => response.json())
        .then(({cart}) => {
            cart.items.forEach((item) => {
                item.product_price = textFromFragment(item.product_price)
            })

            if (cart.items.length > 0) {
                dispatch(receiveCartProductData(parseCartProducts(cart)))
            }

            dispatch(receiveCartContents(parseCart(cart)))
        })
}

export const addToCart = (productId, quantity) => (dispatch, getState) => {
    const formInfo = getFormInfoByProductId(productId)(getState())
    const hiddenInputs = formInfo.get('hiddenInputs')

    if (hiddenInputs === undefined) {
        return Promise.reject('Add to cart failed, form info missing')
    }

    const formValues = {
        ...formInfo.get('hiddenInputs').toJS(),
        qty: quantity
    }

    return submitForm(
            formInfo.get('submitUrl'),
            formValues,
            {method: formInfo.get('method')}
        )
        .then(() => dispatch(getCart()))
}


export const updateCartItem = (itemId, quantity, productId) => (dispatch) => (
    // merlin's uses the standard addToCart to update cart items
    dispatch(addToCart(productId, quantity))
)

/**
 * Remove an item from the users cart
 *
 * Notes:
 *
 * - The `item_id` present in the data returned from getCart.
 * - Response is 200 with JSON: `{"success":true}` on success
 * - Response is 200 with JSON: `{"success":false,"error_message":"We can't find the quote item."}` if item not in cart
 * - Important: The cart contents rendered in the main HTML is *not* updated until `getCart()` has been called which
 *   busts a cache. removeFromCart() will call getCart() once the request to remove the item has completed
 */
export const removeFromCart = (itemId) => (dispatch) => (
    submitForm(REMOVE_CART_ITEM_URL, {item_id: itemId}, {method: 'POST'})
        .then((response) => response.json())
        .then(({success}) => {
            if (success) {
                return dispatch(getCart())
            }
            throw new Error('Unable to remove item')
        })
)

/**
 * Update the quantity of an item in the users cart
 *
 * Notes:
 *
 * - Response is 200 with JSON: `{"success":true}` on success
 * - Response is 200 with JSON: `{"success":false,"error_message":"We can't find the quote item."}` if item not in cart
 */
export const updateItemQuantity = (itemId, itemQuantity) => (dispatch) => {
    const requestData = {
        item_id: itemId,
        item_qty: itemQuantity
    }

    return submitForm(UPDATE_ITEM_URL, requestData, {method: 'POST'})
        .then((response) => response.json())
        .then(({success}) => {
            if (success) {
                return dispatch(getCart())
            }
            throw new Error('Unable to update Quantity')
        })
}

const ESTIMATE_FIELD_PATH = ['#block-summary', 'Magento_Ui/js/core/app', 'components', 'block-summary', 'children', 'block-shipping', 'children', 'address-fieldsets', 'children']

export const initCartPage = (url) => (dispatch, getState) => {
    return dispatch(fetchPageData(url))
        .then(([$, $response]) => { // eslint-disable-line no-unused-vars
            const shippingAddress = getShippingAddress(getState()).toJS()
            const magentoFieldData = extractMagentoJson($response).getIn(ESTIMATE_FIELD_PATH)

            dispatch(receiveEntityID(parseCheckoutEntityID($response)))
            dispatch(receiveCheckoutLocations(parseLocations(magentoFieldData)))

            return dispatch(fetchShippingMethodsEstimate(shippingAddress || {}))
        })
}

export const addToWishlist = (productId, productURL) => (dispatch, getState) => {
    const currentState = getState()
    const payload = {
        product: productId,
        // This won't always be defined, but add to wishlist will still work
        // if it's missing
        uenc: getUenc(urlToPathKey(productURL))(currentState)
    }

    return submitForm(ADD_TO_WISHLIST_URL, payload, {method: 'POST'})
        .then(jqueryResponse)
        .then(([$, $response]) => { // eslint-disable-line no-unused-vars
            // The response is the HTML of the wishlist page, so check for the item we added
            if (!$response.find(`.product-item-link[href="${productURL}"]`).length) {
                throw new Error('Add Request Failed')
            }
        })
}

const getCartTotals = (address, shippingMethod) => (dispatch, getState) => {
    const cartBaseUrl = getCartBaseUrl(getState())

    const shippingMethodParts = shippingMethod.split('_')

    const requestData = {
        addressInformation: {
            address: prepareEstimateAddress(address),
            shipping_carrier_code: shippingMethodParts[0],
            shipping_method_code: shippingMethodParts[1]
        }
    }

    return makeJsonEncodedRequest(`${cartBaseUrl}/totals-information`, requestData, {method: 'POST'})
        .then((response) => response.json())
        .then((responseJSON) => {
            const {
                shipping,
                discount,
                subtotal,
                tax,
                orderTotal
            } = parseCartTotals(responseJSON)
            return dispatch(receiveCartTotals(shipping, discount, subtotal, tax, orderTotal))
        })
}

export const fetchTaxEstimate = getCartTotals

const getCartTotalsSelector = createPropsSelector({
    address: getShippingAddress,
    shippingMethod: getSelectedShippingMethod
})

export const getCartTotalsInfo = () => (dispatch, getState) => {
    const {address, shippingMethod} = getCartTotalsSelector(getState())
    const shippingMethodId = shippingMethod.id || ''

    return dispatch(fetchTaxEstimate(address, shippingMethodId))
}

export const putPromoCode = (couponCode) => (dispatch, getState) => {
    const currentState = getState()
    const cartBaseUrl = getCartBaseUrl(currentState)

    return makeRequest(`${cartBaseUrl}/coupons/${couponCode}`, {method: 'PUT'})
        .then((response) => {
            // Check if coupon is valid
            if (response.status === 404) {
                throw Error(`${PROMO_ERROR}, code is invalid`)
            }
        })
        .then(() => dispatch(getCartTotalsInfo()))
}

export const deletePromoCode = (couponCode) => (dispatch, getState) => {
    const currentState = getState()
    const cartBaseUrl = getCartBaseUrl(currentState)

    const deletePromoUrl = `${cartBaseUrl}/coupons/`
    return makeJsonEncodedRequest(deletePromoUrl, couponCode, {method: 'DELETE'})
        .then((response) => response.text())
        .then((responseText) => {
            if (!/true/i.test(responseText)) {
                throw new Error('Failed to remove promo code')
            }
        })
        .then(() => dispatch(getCartTotalsInfo()))
}
