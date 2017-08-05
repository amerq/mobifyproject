/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable no-unused-vars */

import {receiveCartContents} from 'progressive-web-sdk/dist/integration-manager/cart/results'
import {receiveCartProductData} from 'progressive-web-sdk/dist/integration-manager/products/results'

export const initCartPage = (url, routeName) => (dispatch) => {
    console.log('[Stub Connector] Called initCartPage stub with arguments:', url, routeName)
    return Promise.resolve()
}

export const getCart = () => (dispatch) => {
    console.log('[Stub Connector] Called getCart stub')

    const exampleCartData = {
        items: [{
            id: '1',
            productId: '1',
            href: '/product1.html',
            quantity: 1,
            itemPrice: '$10.00',
            linePrice: '$10.00'
        }],
        subtotal: '$10.00',
        orderTotal: '$10.00'
    }

    const image = {
        src: '//via.placeholder.com/350x350',
        alt: 'Product 1'
    }
    const exampleCartProducts = {
        '1': { // eslint-disable-line
            price: '$10.00',
            available: true,
            href: '/product1.html',
            thumbnail: image,
            title: 'Product 1',
            id: '1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }
    }

    // For more information on the shape of the expected data, see progressive-web-sdk/integration-manager/cart/types
    dispatch(receiveCartContents(exampleCartData))
    dispatch(receiveCartProductData(exampleCartProducts))
    return Promise.resolve()
}

export const addToCart = (productId, quantity) => (dispatch) => {
    console.log('[Stub Connector] Called addToCart stub with arguments:', productId, quantity)
    return Promise.resolve()
}

export const removeFromCart = (itemID) => (dispatch) => {
    console.log('[Stub Connector] Called removeFromCart stub with arguments:', itemID)
    return Promise.resolve()
}

export const updateItemQuantity = (itemID, quantity) => (dispatch) => {
    console.log('[Stub Connector] Called updateItemQuantity stub with arguments:', itemID, quantity)
    return Promise.resolve()
}

export const addToWishlist = (productId, productURL) => (dispatch) => {
    console.log('[Stub Connector] Called addToWishlist stub with arguments:', productId, productURL)
    return Promise.resolve()
}

export const fetchTaxEstimate = (address, shippingMethod) => (dispatch) => {
    console.log('[Stub Connector] Called fetchTaxEstimate stub with arguments:', address, shippingMethod)
    return Promise.resolve()
}

export const putPromoCode = (couponCode) => (dispatch) => {
    console.log('[Stub Connector] Called putPromoCode stub with arguments:', couponCode)
    return Promise.resolve()
}

export const deletePromoCode = (couponCode) => (dispatch) => {
    console.log('[Stub Connector] Called deletePromoCode stub with arguments:', couponCode)
    return Promise.resolve()
}
