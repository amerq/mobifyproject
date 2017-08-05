/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {browserHistory} from 'progressive-web-sdk/dist/routing'
import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {SubmissionError} from 'redux-form'
import {createPropsSelector} from 'reselect-immutable-helpers'

import {getItemQuantity} from './selectors'
import {getCartURL} from '../app/selectors'
import {getCurrentPathKey} from 'progressive-web-sdk/dist/store/app/selectors'
import {getCurrentProductId, getProductVariants, getProductVariationCategories, getProductVariationCategoryIds} from 'progressive-web-sdk/dist/store/products/selectors'
import {getAddToCartFormValues} from '../../store/form/selectors'

import {addToCart, updateCartItem} from 'progressive-web-sdk/dist/integration-manager/cart/commands'
import {getProductVariantData} from 'progressive-web-sdk/dist/integration-manager/products/commands'
import {openModal, closeModal} from 'progressive-web-sdk/dist/store/modals/actions'
import {addNotification} from 'progressive-web-sdk/dist/store/notifications/actions'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'
import {PRODUCT_DETAILS_ITEM_ADDED_MODAL} from '../../modals/constants'

import {isRunningInAstro, trigger} from '../../utils/astro-integration'

export const receiveNewItemQuantity = createAction('Set item quantity')
export const setItemQuantity = (quantity) => (dispatch, getStore) => {
    dispatch(receiveNewItemQuantity({
        [getCurrentPathKey(getStore())]: {
            itemQuantity: quantity
        }
    }))
}

export const addToCartStarted = createAction('Add to cart started')
export const addToCartComplete = createAction('Add to cart complete')

export const goToCheckout = () => (dispatch, getState) => {
    dispatch(closeModal(PRODUCT_DETAILS_ITEM_ADDED_MODAL, UI_NAME.addToCart))
    if (isRunningInAstro) {
        // If we're running in Astro, we want to dismiss open the cart modal,
        // otherwise, navigating is taken care of by the button press
        trigger('open:cart-modal')
    } else {
        browserHistory.push(getCartURL(getState()))
    }
}

const submitCartFormSelector = createPropsSelector({
    productId: getCurrentProductId,
    qty: getItemQuantity,
    variations: getProductVariationCategories
})

export const submitCartForm = (formValues) => (dispatch, getStore) => {
    const {productId, qty, variations} = submitCartFormSelector(getStore())
    const path = window.location.pathname
    const itemIdMatch = path.match(/\/id\/(.*?)\/product_id\//)

    if (variations) {
        const errors = {}
        variations.forEach(({id, label}) => {
            if (!formValues[id]) {
                errors[id] = `Please select a ${label}`
            }
        })
        if (Object.keys(errors).length > 0) {
            return Promise.reject(new SubmissionError(errors))
        }
    }

    dispatch(addToCartStarted())

    return dispatch(itemIdMatch ? updateCartItem(itemIdMatch[1], qty, productId) : addToCart(productId, qty))
        .then(() => dispatch(openModal(PRODUCT_DETAILS_ITEM_ADDED_MODAL, UI_NAME.addToCart)))
        .catch((error) => {
            console.error('Error adding to cart', error)
            return dispatch(addNotification(
                'addToCartError',
                'Unable to add item to the cart.',
                true
            ))
        })
        .then(() => dispatch(addToCartComplete()))
}

const variationChangeSelector = createPropsSelector({
    variationSelections: getAddToCartFormValues,
    categoryIds: getProductVariationCategoryIds,
    variants: getProductVariants
})

export const onVariationChange = () => (dispatch, getStore) => {
    const {
        variationSelections,
        categoryIds,
        variants
    } = variationChangeSelector(getStore())

    return dispatch(getProductVariantData(variationSelections, variants, categoryIds))
}
