/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable no-unused-vars */

import {
    receiveProductDetailsProductData,
    receiveProductDetailsUIData
} from 'progressive-web-sdk/dist/integration-manager/products/results'
import {receiveCurrentProductId} from 'progressive-web-sdk/dist/integration-manager/results'
import {receiveFormInfo} from '../actions'

export const initProductDetailsPage = (url, routeName) => (dispatch) => {
    console.log('[Stub Connector] Called initProductDetailsPage stub with arguments:', url, routeName)

    const id = '1'

    const image = {
        src: '//via.placeholder.com/350x350',
        alt: 'Product 1'
    }

    const exampleData = {
        [id]: {
            price: '$10.00',
            available: true,
            href: window.location.href,
            thumbnail: image,
            title: 'Product 1',
            images: [image, image],
            id: '1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }
    }

    const exampleUIData = {
        [id]: {
            breadcrumbs: [{
                href: '/',
                text: 'Home'
            }, {
                href: window.location.href,
                text: 'Product 1'
            }],
            itemQuantity: 1
        }
    }

    const exampleFormData = {
        [id]: {
            submitUrl: 'submit',
            method: 'POST',
            uenc: '',
            hiddenInputs: {}
        }
    }

    // For more information on the shape of the expected data, see ../../products/types
    dispatch(receiveCurrentProductId(id))
    dispatch(receiveProductDetailsProductData(exampleData))
    dispatch(receiveProductDetailsUIData(exampleUIData))
    dispatch(receiveFormInfo(exampleFormData))
    return Promise.resolve()
}

export const getProductVariantData = (variationSelections, variants, categoryIds) => (dispatch) => {
    console.log('[Stub Connector] Called getProductVariantData stub with arguments:', variationSelections, variants, categoryIds)
    return Promise.resolve()
}
