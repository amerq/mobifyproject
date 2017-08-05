/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {makeApiRequest, getBasketID, storeBasketID, deleteBasketID} from '../utils'
import {getCartItems} from 'progressive-web-sdk/dist/store/cart/selectors'
import {receiveCartProductData} from 'progressive-web-sdk/dist/integration-manager/products/results'
import {receiveCartContents} from 'progressive-web-sdk/dist/integration-manager/cart/results'

import {getProductById, getProductThumbnailSrcById, getProductThumbnailById} from 'progressive-web-sdk/dist/store/products/selectors'
import {getProductHref} from '../parsers'
import {parseCartProducts, parseCartContents} from './parsers'

export const createBasket = (basketContents) => {
    const basketID = getBasketID()
    if (basketID && !basketContents) {
        return Promise.resolve({basket_id: basketID})
    }
    const options = {
        method: 'POST'
    }

    if (basketContents) {
        options.body = JSON.stringify(basketContents)
    }

    return makeApiRequest('/baskets', options)
        .then((response) => response.json())
        .then((basket) => {
            storeBasketID(basket.basket_id)
            return basket
        })
}

export const getProductImage = (item, currentState) => {
    const productImage = getProductThumbnailSrcById(item.product_id)(currentState)

    if (productImage) {
        // If we already have images for the item in our state, then just use those
        return Promise.resolve({
            src: productImage,
            alt: item.product_name
        })
    }

    // We have no images for the item in our state, fetch images using the Salseforce Commerce Cloud API
    return makeApiRequest(`/products/${item.product_id}/images?view_type=large`, {method: 'GET'})
        .then((response) => response.json())
        .then(({image_groups}) => ({
            src: image_groups[0].images[0].link,
            alt: item.product_name
        }))
}

const imageFromJson = (imageJson, name, description) => ({
    /* Image */
    src: imageJson.link,
    alt: `${name} - ${description}`,
    caption: imageJson.title
})

/**
 * Fetches product images for items that are in the cart and don't already
 * have them.
 */
export const fetchCartItemImages = () => (dispatch, getState) => {

    /* TODO: The `view_type` is configurable per instance. This is something that
    *       might have to be configurable in the connector to say what `view_type`
    *       is a thumbnail and which one is the large image type. */
    const thumbnailViewType = 'medium'
    const largeViewType = 'large'

    const currentState = getState()
    const items = getCartItems(currentState)
    const updatedProducts = {}

    // We use the .thumbnail as an indicator of whether the product has images already
    return Promise.all(
        items.filter((cartItem) => getProductThumbnailById(cartItem.get('productId'))(currentState).size === 0)
            .map((cartItem) => {
                const productId = cartItem.get('productId')

                return makeApiRequest(`/products/${productId}/images?all_images=false&view_type=${largeViewType},${thumbnailViewType}`, {method: 'GET'})
                    .then((response) => response.json())
                    .then(({image_groups, name, page_title, short_description}) => {
                        const productHref = getProductHref(productId)
                        const productState = getProductById(productId)(currentState).toJS()
                        const product = {
                            ...productState,
                            id: productId,
                            title: page_title,
                            available: true,
                            href: productHref,
                            price: productState.price || ''
                        }

                        const thumbnail = image_groups.find((group) => group.view_type === thumbnailViewType)
                        if (thumbnail) {
                            product.thumbnail = imageFromJson(thumbnail.images[0], name, short_description)
                        }
                        const largeGroup = image_groups.find((group) => group.view_type === largeViewType)
                        if (largeGroup) {
                            product.images = largeGroup.images.map((image) => imageFromJson(image, name, short_description))
                        }
                        updatedProducts[productHref] = product
                    })
            })
    )
    .then(() => {
        dispatch(receiveCartProductData(updatedProducts))
    })
}

export const requestCartData = (noRetry) => (
    createBasket()
        .then((basket) => makeApiRequest(`/baskets/${basket.basket_id}`, {method: 'GET'}))
        .then((response) => {
            if (response.status === 404) {
                if (noRetry) {
                    throw new Error('Cart not found')
                }
                // Our basket has expired, clear and start over
                deleteBasketID()
                return requestCartData(true)
            }
            return response
        })
        .then((response) => response.json())
)

export const handleCartData = (basket) => (dispatch) => {
    // Note: These need to be dispatched in this order, otherwise there's
    //       a chance we could try to render cart items and not have product
    //       data in the store for it.
    dispatch(receiveCartProductData(parseCartProducts(basket)))
    dispatch(receiveCartContents(parseCartContents(basket)))

    return dispatch(fetchCartItemImages())
}


export const createNewBasket = () => (dispatch) => {
    deleteBasketID()
    return requestCartData()
        .then((basket) => {
            dispatch(handleCartData(basket))
            return basket
        })
}

export const isCartExpired = ({fault}) => {
    if (fault) {
        if (fault.type === 'InvalidCustomerException') {
            return true
        }
        throw new Error(fault.message)
    }
    return false
}

// Check if the users cart has expired, if it has create a new one and throw an error
// otherwise return the cart object
export const updateExpiredCart = (basket) => (dispatch) => {
    if (isCartExpired(basket)) {
        return dispatch(createNewBasket())
            .then((basket) => dispatch(handleCartData(basket)))
            .then(() => { throw new Error('Your cart has expired.') })
    }
    return basket
}
