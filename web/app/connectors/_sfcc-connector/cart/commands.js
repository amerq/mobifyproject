/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {makeApiRequest, makeApiJsonRequest, getAuthTokenPayload, checkForResponseFault} from '../utils'
import {populateLocationsData} from '../checkout/utils'
import {requestCartData, createBasket, handleCartData, createNewBasket, isCartExpired, updateExpiredCart} from './utils'

export const getCart = () => (dispatch) =>
    requestCartData().then((basket) => dispatch(handleCartData(basket)))


const addToCartRequest = (productId, quantity, basketId) => {
    const requestBody = [{
        product_id: productId,
        quantity
    }]
    return makeApiJsonRequest(`/baskets/${basketId}/items`, requestBody, {method: 'POST'})
}

export const addToCart = (productId, quantity) => (dispatch) => (
    createBasket()
        .then((basket) => addToCartRequest(productId, quantity, basket.basket_id))
        .then((basket) => {
            if (isCartExpired(basket)) {
                // the basket has expired create a new one and try adding to cart again
                return dispatch(createNewBasket())
                    .then((basket) => addToCartRequest(productId, quantity, basket.basket_id))
            }
            return basket
        })
        .then((basket) => dispatch(handleCartData(basket)))
        .catch(() => { throw new Error('Unable to add item to cart') })
)


export const removeFromCart = (itemId) => (dispatch) => (
    createBasket()
        .then((basket) => makeApiRequest(`/baskets/${basket.basket_id}/items/${itemId}`, {method: 'DELETE'}))
        .then((response) => response.json())
        .then((basket) => dispatch(updateExpiredCart(basket)))
        .then((basket) => dispatch(handleCartData(basket)))
)


export const updateCartItem = (itemId, quantity, productId) => (dispatch) => {
    const requestBody = {
        quantity
    }

    if (productId) {
        requestBody.product_id = productId
    }

    return createBasket()
            .then((basket) => makeApiJsonRequest(`/baskets/${basket.basket_id}/items/${itemId}`, requestBody, {method: 'PATCH'}))
            .then((basket) => {
                if (isCartExpired(basket)) {
                    // the basket has expired create a new one and try adding to cart again
                    return dispatch(createNewBasket())
                        .then(() => addToCart(productId, quantity))
                }
                return basket
            })
            .catch(() => { throw new Error('Unable to update item') })
            .then((basket) => dispatch(handleCartData(basket)))
}


export const updateItemQuantity = (itemId, quantity) => (dispatch) => dispatch(updateCartItem(itemId, quantity))

export const initCartPage = () => (dispatch) => Promise.resolve(dispatch(populateLocationsData()))

const NEW_WISHILIST_PAYLOAD = {
    type: 'wish_list',
    name: 'Saved for Later'
}

export const addToWishlist = (productId) => (dispatch) => {
    const {sub} = getAuthTokenPayload()
    const customerID = JSON.parse(sub).customer_info.customer_id

    return makeApiRequest(`/customers/${customerID}/product_lists`, {method: 'GET'})
        .then((response) => response.json())
        .then(({count, data}) => {
            if (count) {
                return data[0]
            }
            // create a list if one doesn't exist
            return makeApiJsonRequest(
                `/customers/${customerID}/product_lists`,
                NEW_WISHILIST_PAYLOAD,
                {method: 'POST'}
            )
            .then(checkForResponseFault)
        })
        .then(({id}) => {
            const requestBody = {
                type: 'product',
                product_id: productId,
                quantity: 1
            }

            return makeApiJsonRequest(
                `/customers/${customerID}/product_lists/${id}/items`,
                requestBody,
                {method: 'POST'}
            )
            .then(checkForResponseFault)
        })
        .catch(() => { throw new Error('Unable to add item to wishlist.') })
}

export const fetchTaxEstimate = () => Promise.reject('Method not implemented')
