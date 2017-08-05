/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'
import {makeApiRequest} from '../utils'
import {
    receiveCategoryContents,
    receiveCategoryInformation
} from 'progressive-web-sdk/dist/integration-manager/categories/results'
import {receiveProductListProductData} from 'progressive-web-sdk/dist/integration-manager/products/results'
import {parseProductListData} from '../parsers'

import {getCategoryPath, SEARCH_URL} from '../config'

const makeCategoryURL = (id) => `/categories/${id}`
const makeCategorySearchURL = (id, query = '') => `/product_search?expand=availability,images,prices&q=${query}&refine_1=cgid=${id}`

/* eslint-disable camelcase, no-use-before-define */
const processCategory = (dispatch) => ({parent_category_id, id, name}) => {
    const parentId = parent_category_id !== 'root' ? parent_category_id : null
    const path = getCategoryPath(id)

    dispatch(receiveCategoryInformation(id, {
        id,
        title: name,
        href: path,
        parentId
    }))

    if (parentId) {
        dispatch(fetchCategoryInfo(parentId))
    }
}
/* eslint-enable camelcase, no-use-before-define */

const buildSearchTerm = (query) => query.replace(/\+/g, ' ').trim()

const fetchCategoryInfo = (id) => (dispatch) => {
    if (id) {
        return makeApiRequest(makeCategoryURL(id), {method: 'GET'})
            .then((response) => response.json())
            .then(processCategory(dispatch))
    }
    return Promise.resolve()
}

const extractCategoryId = (url) => {
    const categoryIDMatch = /\/([^/]+)$/.exec(url)
    return categoryIDMatch ? categoryIDMatch[1] : ''
}

export const initProductListPage = (url) => (dispatch) => {
    let searchUrl
    const path = urlToPathKey(url)
    const categoryID = extractCategoryId(url)
    const isSearch = path.includes(SEARCH_URL)

    if (isSearch) {
        const searchQueryMatch = path.match(/\?q=\+(.*)/)
        const searchQuery = searchQueryMatch ? searchQueryMatch[1] : ''
        const searchTerm = buildSearchTerm(searchQuery)

        searchUrl = makeCategorySearchURL('', encodeURIComponent(searchQuery).replace(/%2B/g, '+'))

        dispatch(receiveCategoryInformation(path, {
            id: searchQuery,
            href: path,
            searchTerm,
            title: `Search results for ${searchTerm}`,
            parentId: null
        }))
    } else {
        searchUrl = makeCategorySearchURL(categoryID)
    }

    return dispatch(fetchCategoryInfo(isSearch ? null : categoryID))
        .then(() => makeApiRequest(searchUrl, {method: 'GET'}))
        .then((response) => response.json())
        .then(({hits, total}) => {
            if (total === 0) {
                dispatch(receiveCategoryContents(urlToPathKey(url), {
                    products: [],
                    itemCount: total
                }))
                return
            }

            const productListData = parseProductListData(hits)
            const products = Object.keys(productListData)

            dispatch(receiveProductListProductData(productListData))
            dispatch(receiveCategoryContents(urlToPathKey(url), {
                products,
                itemCount: total
            }))
        })
}
