/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React from 'react'
import {isRunningInAstro} from '../../utils/astro-integration'

import FooterNewsletterSubscription from './partials/footer-newsletter-subscription'
import FooterNavigation from './partials/footer-navigation'

const Footer = () => {
    if (isRunningInAstro) {
        return null
    }

    return (
        <footer className="t-footer">
            <FooterNewsletterSubscription />
            <FooterNavigation />
        </footer>
    )
}

export default Footer
