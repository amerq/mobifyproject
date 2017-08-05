/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {receiveFormInfo} from '../actions'

import {fetchPageData} from '../app/commands'
import {
    receiveProductDetailsProductData,
    receiveProductDetailsUIData
} from 'progressive-web-sdk/dist/integration-manager/products/results'
import {receiveCurrentProductId} from 'progressive-web-sdk/dist/integration-manager/results'
import {productDetailsParser, productDetailsUIParser, pdpAddToCartFormParser} from './parsers'

export const initProductDetailsPage = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then((res) => {
            const [$, $response] = res

            const productDetailsData = {
                ...productDetailsParser($, $response),
                href: url,
                variationCategories: [],
                variants: []
            }

            const {id} = productDetailsData

            dispatch(receiveCurrentProductId(id))
            dispatch(receiveProductDetailsUIData({[id]: productDetailsUIParser($, $response)}))
            dispatch(receiveProductDetailsProductData({[id]: productDetailsData}))
            dispatch(receiveFormInfo({[id]: pdpAddToCartFormParser($, $response)}))
        })
        .catch((error) => { console.info(error.message) })
}

export const getProductVariantData = () => (dispatch) => Promise.resolve()

