/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import {GRID_SETTINGS} from '../constants'
import * as selectors from '../selectors'
import {getEmailAddress} from '../../../store/checkout/selectors'

import {Grid, GridSpan} from 'progressive-web-sdk/dist/components/grid'
import Image from 'progressive-web-sdk/dist/components/image'
import Link from 'progressive-web-sdk/dist/components/link'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'

const CheckoutConfirmationSplash = (props) => {
    const {
        emailAddress,
        orderNumber,
        orderUrl
    } = props

    const OrderNumber = orderUrl
        ? <Link href={orderUrl}><strong>{orderNumber}</strong></Link>
        : <strong>{orderNumber}</strong>

    return (
        <div className="t-checkout-confirmation__splash u-bg-color-neutral-00 u-border-light-bottom">
            <Grid className="u-center-piece">
                <GridSpan
                    className="t-checkout-confirmation__splash-image"
                    {...GRID_SETTINGS}
                >
                    <div className="u-text-align-center u-padding-lg u-text-height-0">
                        <Image src={getAssetUrl('static/img/checkout/confirmed.png')} alt="Sparkling checkmark, signifying completion" height="57px" width="99px" />
                    </div>
                </GridSpan>

                <GridSpan
                    className="t-checkout-confirmation__splash-message"
                    {...GRID_SETTINGS}
                >
                    <div className="t-checkout-confirmation__thanks u-padding-bottom-lg">
                        <h1 className="u-margin-bottom-md u-text-weight-extra-light u-text-uppercase">
                            <span className="u-text-weight-regular">Thanks,</span> order confirmed
                        </h1>

                        <div className="u-text-content">
                            <p>We’ve sent you an email confirmation along with your order receipt.</p>
                            { orderNumber ?
                                <p>Your order # is: {OrderNumber}.</p>
                                :
                                <p>
                                    <SkeletonText width="60%" style={{lineHeight: '20px'}} />
                                </p>
                            }
                            <p>Email: <strong>{emailAddress}</strong></p>
                        </div>
                    </div>
                </GridSpan>
            </Grid>
        </div>
    )
}

CheckoutConfirmationSplash.propTypes = {
    emailAddress: PropTypes.string,
    orderNumber: PropTypes.string,
    orderUrl: PropTypes.string,
}

const mapStateToProps = createPropsSelector({
    emailAddress: getEmailAddress,
    orderNumber: selectors.getOrderNumber,
    orderUrl: selectors.getOrderUrl
})

export default connect(mapStateToProps)(CheckoutConfirmationSplash)
