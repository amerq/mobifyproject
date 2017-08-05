/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getUi} from '../../store/selectors'
import {getNavigationChildren} from '../../modals/navigation/selectors'

export const getHome = createSelector(getUi, ({home}) => home)

export const getHomeBanners = createGetSelector(getHome, 'banners')
export const getHomeCategories = createSelector(
    getNavigationChildren,
    (children) => children.filter((navChild) => navChild.get('isCategoryLink'))
)
