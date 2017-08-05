/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getCategories} from '../selectors'
import {getProducts} from 'progressive-web-sdk/dist/store/products/selectors'
import {getCurrentPathKey} from 'progressive-web-sdk/dist/store/app/selectors'
import {PLACEHOLDER} from '../../containers/app/constants'

export const getSelectedCategory = createGetSelector(
    getCategories,
    getCurrentPathKey,
    Immutable.Map()
)

const PLACEHOLDER_URLS = Immutable.List(new Array(5).fill(PLACEHOLDER))

export const getCategoryProductIds = createGetSelector(getSelectedCategory, 'products', PLACEHOLDER_URLS)
export const getCategoryItemCount = createGetSelector(getSelectedCategory, 'itemCount')
export const getCategoryTitle = createGetSelector(getSelectedCategory, 'title')
export const getCategoryParentID = createGetSelector(getSelectedCategory, 'parentId', null)
export const getCategorySearchTerm = createGetSelector(getSelectedCategory, 'searchTerm')
export const getCategoryCustomContent = createGetSelector(getSelectedCategory, 'custom', Immutable.Map())
export const getCategoryDescription = createGetSelector(getSelectedCategory, 'description')

export const getCategoryParent = createSelector(
    getCategories,
    getCategoryParentID,
    (categories, parentId) => {
        return (parentId && categories.find((category) => category.get('id') === parentId)) || Immutable.Map()
    }
)

export const getCategoryParentTitle = createGetSelector(
    getCategoryParent,
    'title',
    'Home'
)

export const getCategoryParentHref = createGetSelector(
    getCategoryParent,
    'href',
    '/'
)

export const getCategoryProducts = createSelector(
    getProducts,
    getCategoryProductIds,
    (products, productIds) => productIds.map((id) => products.get(id))
)
