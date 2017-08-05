/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React from 'react'
import logo from '../../static/svg/logo.svg'
import DangerousHTML from 'progressive-web-sdk/dist/components/dangerous-html'

const CheckoutFooter = function(props) {
    return (
        <footer className="t-checkout-footer">
            <div className="t-checkout-footer__inner u-padding u-text-align-center">
                <div className="u-flex">
                    <div className="t-checkout-footer__logo-wrapper u-flexbox u-justify-center u-align-center u-padding-top u-padding-bottom">
                        <DangerousHTML html={logo}>
                            {(htmlObj) => <div className="t-checkout-footer__logo" dangerouslySetInnerHTML={htmlObj} />}
                        </DangerousHTML>
                    </div>
                </div>
                <div className="t-checkout-footer__copyright u-padding-top u-padding-bottom u-margin-0">
                    <p>© 2017 Mobify Research & Development Inc.</p>
                </div>
            </div>
        </footer>
    )
}

export default CheckoutFooter
