/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector, createHasSelector} from 'reselect-immutable-helpers'
import {getUi, getCategories} from '../../store/selectors'
import {getSelectedCategory, getCategoryProducts} from '../../store/categories/selectors'
import {getCurrentPathKey} from 'progressive-web-sdk/dist/store/app/selectors'
import {byFilters} from '../../utils/filter-utils'
import {sortLib} from '../../utils/sort-utils'

export const getProductList = createSelector(getUi, ({productList}) => productList)

export const getCurrentProductList = createGetSelector(
    getProductList,
    getCurrentPathKey,
    Immutable.Map()
)

export const getCurrentSort = createGetSelector(getCurrentProductList, 'sort')

export const getProductListContentsLoaded = createHasSelector(
    getCategories,
    getCurrentPathKey
)

export const getFilters = createGetSelector(getSelectedCategory, 'filters', Immutable.List())
export const getActiveFilters = createSelector(
    getFilters,
    (filters) => (
        filters.reduce((activeFilters, filter) => activeFilters.concat(
            filter.get('kinds').filter((kind) => kind.get('active'))
        ), Immutable.List())
    )
)
export const getFilteredProductListProducts = createSelector(
    getCategoryProducts,
    getActiveFilters,
    (products, filters) => {
        return filters.size > 0 ? products.filter(byFilters(filters.toJS())) : products
    }
)

export const getFilteredAndSortedListProducts = createSelector(
    getFilteredProductListProducts,
    getCurrentSort,
    (products, sort) => {
        return sort ? products.sort(sortLib[sort]) : products
    }
)
