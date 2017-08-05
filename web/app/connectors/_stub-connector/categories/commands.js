/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable no-unused-vars */

import {receiveCategoryContents} from 'progressive-web-sdk/dist/integration-manager/categories/results'
import {receiveProductListProductData} from 'progressive-web-sdk/dist/integration-manager/products/results'
import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'

export const initProductListPage = (url, routeName) => (dispatch) => {
    console.log('[Stub Connector] Called initProductListPage stub')

    const thumbnail = {
        src: '//via.placeholder.com/350x350',
        alt: 'Product Image'
    }

    const sharedData = {
        price: '$10.00',
        available: true,
        images: [thumbnail],
        thumbnail
    }

    const exampleProductData = {
        '1': { // eslint-disable-line
            id: '1',
            title: 'Product 1',
            href: '/product1.html',
            ...sharedData
        },
        '2': { // eslint-disable-line
            id: '2',
            title: 'Product 2',
            href: '/product2.html',
            ...sharedData
        },
        '3': { // eslint-disable-line
            id: '3',
            title: 'Product 3',
            href: '/product3.html',
            ...sharedData
        }
    }

    const exampleCategoryData = {
        itemCount: 3,
        products: [
            '1',
            '2',
            '3'
        ]
    }

    const pathKey = urlToPathKey(url)

    // For more information on the shape of the expected data, see ../../products/types
    dispatch(receiveProductListProductData(exampleProductData))
    // For more information on the shape of the expected data, see ../../categories/types
    dispatch(receiveCategoryContents(pathKey, exampleCategoryData))
    return Promise.resolve()
}
