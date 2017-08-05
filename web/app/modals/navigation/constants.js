/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

export const SIGN_IN_LINK_TEXT = 'Sign In'
export const SIGN_OUT_LINK_TEXT = 'Sign Out'

export const SIGNED_IN_NAV_ITEM_TYPE = 'AccountLogoutNavItem'
export const GUEST_NAV_ITEM_TYPE = 'AccountNavItem'


export const LOGGED_IN_NAV = {
    type: SIGNED_IN_NAV_ITEM_TYPE,
    title: SIGN_OUT_LINK_TEXT
}

export const GUEST_NAV = {
    type: GUEST_NAV_ITEM_TYPE,
    title: SIGN_IN_LINK_TEXT
}
