/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import * as selectors from '../selectors'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getCartURL} from '../../app/selectors'
import {getProductTitle, getProductPrice, getProductAvailability} from 'progressive-web-sdk/dist/store/products/selectors'

import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import Breadcrumbs from 'progressive-web-sdk/dist/components/breadcrumbs'

import {isRunningInAstro} from '../../../utils/astro-integration'


const ProductDetailsHeading = ({available, breadcrumbs, title, price, isInCheckout, cartURL}) => (
    <div className="t-product-details-heading u-padding-md u-box-shadow u-position-relative u-z-index-1">
        {!isRunningInAstro &&
            <div className="t-product-details__breadcrumbs u-margin-bottom-md">
                <Breadcrumbs items={!isInCheckout ? breadcrumbs : [{text: 'Cart', href: cartURL}]} />
            </div>
        }
        {title ?
            <h1 className="t-product-details-heading__title u-text-uppercase u-margin-bottom">{title}</h1>
        :
            <SkeletonBlock width="50%" height="32px" className="u-margin-bottom" />
        }

        {(available !== null && available !== undefined && price !== null && price !== undefined) ?
            (price.length > 0 &&
                <span className="t-product-details-heading__price t-product-details__price u-color-accent u-text-weight-regular u-text-family-header u-text-letter-spacing-small">{price}</span>)
        :
            <SkeletonBlock width="25%" height="32px" />
        }
    </div>
)

ProductDetailsHeading.propTypes = {
    available: PropTypes.bool,
    breadcrumbs: PropTypes.array,
    cartURL: PropTypes.string,
    isInCheckout: PropTypes.bool,
    price: PropTypes.string,
    title: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    available: getProductAvailability,
    breadcrumbs: selectors.getProductDetailsBreadcrumbs,
    cartURL: getCartURL,
    title: getProductTitle,
    price: getProductPrice
})

export default connect(mapStateToProps)(ProductDetailsHeading)
