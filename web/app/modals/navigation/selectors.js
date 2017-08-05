/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getUi} from '../../store/selectors'

export const getNavigation = createSelector(getUi, ({navigation}) => navigation)

export const getPath = createGetSelector(getNavigation, 'path')
export const getNavigationRoot = createGetSelector(getNavigation, 'root')

export const getNavigationChildren = createGetSelector(getNavigationRoot, 'children', Immutable.List())
