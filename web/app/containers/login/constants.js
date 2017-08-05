/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

// a few constants to make refactoring easier in future
export const SIGN_IN_SECTION = 'signin'
export const REGISTER_SECTION = 'register'
export const SECTION_NAMES = {
    [SIGN_IN_SECTION]: 'Sign In',
    [REGISTER_SECTION]: 'Register'
}

export const INDEX_FOR_SECTION = {
    [SIGN_IN_SECTION]: 0,
    [REGISTER_SECTION]: 1
}

export const SECTION_FOR_INDEX = [
    SIGN_IN_SECTION,
    REGISTER_SECTION
]
