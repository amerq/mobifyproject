/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'

import {Accordion, AccordionItem} from 'progressive-web-sdk/dist/components/accordion'
// import Button from 'progressive-web-sdk/dist/components/button'

const CartHelp = () => (
    <div className="t-cart__help">
        <div className="t-cart__help-title u-flexbox">
            <h2 className="u-h3 u-flex">
                Order Summary
            </h2>
        </div>

        <Accordion className="u-bg-color-neutral-00">
            <AccordionItem header="Returns and Exchange" closeIconName="close">
                <div>Lorem Ipsum dolor sit amet</div>
            </AccordionItem>

            <AccordionItem header="Contact Us" closeIconName="close">
                <div>Lorem Ipsum dolor sit amet</div>
            </AccordionItem>
        </Accordion>
    </div>
)

CartHelp.propTypes = {
    items: PropTypes.array
}

export default CartHelp
