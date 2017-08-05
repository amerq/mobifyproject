/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */


import {createAction, createActionWithAnalytics} from 'progressive-web-sdk/dist/utils/action-creation'
import {getSearchSuggestions, searchProducts} from 'progressive-web-sdk/dist/integration-manager/app/commands'
import {EVENT_ACTION} from 'progressive-web-sdk/dist/analytics/data-objects/'

const searchAnalytics = createActionWithAnalytics(
    'Send search analytics', [],
    EVENT_ACTION.search,
    (query) => ({query})
)

export const toggleHeader = createAction('Toggled the header', ['isCollapsed'])

export const openSearch = createAction('Open header search')
export const closeSearch = createAction('Close header search')
export const clearSuggestions = createAction('Clear search suggestion')

export const searchQueryChanged = (query) => (dispatch) => (
    dispatch(getSearchSuggestions(query))
)

export const searchSubmit = (query) => (dispatch) => {
    dispatch(searchAnalytics(query))
    dispatch(searchProducts(query))
}
