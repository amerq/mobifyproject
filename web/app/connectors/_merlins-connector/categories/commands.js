/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'
import {
    receiveCategoryContents,
    receiveCategoryInformation
} from 'progressive-web-sdk/dist/integration-manager/categories/results'
import {receiveProductListProductData} from 'progressive-web-sdk/dist/integration-manager/products/results'
import categoryProductsParser, {parseCategoryTitle, parseCategoryId, priceFilterParser} from './parser'
import {productListParser} from '../products/parsers'
import {getTextFrom} from '../../../utils/parser-utils'
import {fetchPageData} from '../app/commands'

export const initProductListPage = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then((res) => {
            const [$, $response] = res
            const pathKey = urlToPathKey(url)

            const title = parseCategoryTitle($, $response)
            const searchTermMatch = title.match(/'(.*)'/)

            // Receive page contents
            dispatch(receiveProductListProductData(productListParser($, $response)))
            dispatch(receiveCategoryInformation(pathKey, {
                id: parseCategoryId($, $response) || pathKey,
                href: pathKey,
                parentId: null,
                filters: priceFilterParser($, $response),
                title,
                searchTerm: searchTermMatch ? searchTermMatch[0] : null,
                description: getTextFrom($response, '#text, .category-description')
            }))
            dispatch(receiveCategoryContents(pathKey, categoryProductsParser($, $response)))
        })
}
