/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {
    receiveProductDetailsProductData,
    receiveProductDetailsUIData
} from 'progressive-web-sdk/dist/integration-manager/products/results'
import {setCurrentURL, receiveCurrentProductId} from 'progressive-web-sdk/dist/integration-manager/results'
import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'
import {makeApiRequest} from '../utils'
import {parseProductDetails, getCurrentProductID, getProductHref, getInitialSelectedVariant} from '../parsers'

export const initProductDetailsPage = (url) => (dispatch) => {
    const productURL = `/products/${getCurrentProductID(url)}?expand=availability,prices,images,variations`
    const productPathKey = urlToPathKey(url)

    return makeApiRequest(productURL, {method: 'GET'})
        .then((response) => response.json())
        .then((responseJSON) => {
            const productDetailsData = {
                ...parseProductDetails(responseJSON),
                href: productPathKey
            }
            const {id} = productDetailsData

            const productDetailsMap = {
                [id]: productDetailsData
            }
            productDetailsData.variants.forEach(({id}) => {
                productDetailsMap[id] = productDetailsData
            })

            // need to dispatch this on PLP click of item
            // to fix page transition / request delay
            dispatch(receiveCurrentProductId(id))
            dispatch(receiveProductDetailsProductData(productDetailsMap))
            dispatch(receiveProductDetailsUIData({[id]: {itemQuantity: responseJSON.step_quantity}}))

            // since the pathname will always be master, the productHref will
            // only === pathname when landing on master page
            if (getProductHref(productDetailsData.id) === window.location.pathname && productDetailsData.variants.length) {
                const {variants, initialValues} = productDetailsData
                const defaultVariant = getInitialSelectedVariant(variants, initialValues)
                const currentProductHref = defaultVariant.id

                dispatch(setCurrentURL(getProductHref(currentProductHref)))
                dispatch(initProductDetailsPage(getProductHref(currentProductHref)))
            }
        })
}

export const getProductVariantData = (variationSelections, variants, categoryIds) => (dispatch) => {
    if (categoryIds.some((id) => !variationSelections[id])) {
        return Promise.resolve()
    }

    for (const {values, id} of variants) {
        if (categoryIds.every((id) => variationSelections[id] === values[id])) {
            const currentProductHref = getProductHref(id)
            dispatch(setCurrentURL(currentProductHref))

            return dispatch(initProductDetailsPage(currentProductHref))
        }
    }

    return Promise.resolve()
}
