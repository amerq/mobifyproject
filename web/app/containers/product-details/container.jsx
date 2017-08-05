/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React from 'react'
import template from '../../template'

import ProductDetailsHeading from './partials/product-details-heading'
import ProductDetailsCarousel from './partials/product-details-carousel'
import ProductDetailsDescription from './partials/product-details-description'
import ProductDetailsAddToCart from './partials/product-details-add-to-cart'
import ProductNearestStores from './partials/product-nearest-stores'

const ProductDetails = ({route: {routeName}}) => {
    const isInCheckout = (routeName === 'cartEditPage')
    return (
        <div className="t-product-details">
            <ProductDetailsHeading isInCheckout={isInCheckout} />
            <ProductDetailsCarousel />
            <ProductDetailsAddToCart isInCheckout={isInCheckout} />
            <ProductDetailsDescription />
            <div className="u-padding-md u-bg-color-neutral-10">
                <ProductNearestStores title="The Product is sold in the store" viewAllStoresText="Check all stores" class="u-margin-all" />
            </div>
        </div>
    )
}


ProductDetails.propTypes = {
    /**
    * The route object passed down by the router
    */
    route: React.PropTypes.object,
}

export default template(ProductDetails)
