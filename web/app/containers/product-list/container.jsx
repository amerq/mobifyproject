/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React from 'react'
import template from '../../template'
import {isRunningInAstro} from '../../utils/astro-integration'
import ProductListHeader from './partials/product-list-header'
import SearchResultHeader from './partials/search-result-header'
import ProductListContents from './partials/product-list-contents'

const ProductList = ({route: {routeName}}) => {
    return (
        <div className="t-product-list">
            {!isRunningInAstro &&
                <div>
                    {routeName === 'searchResultPage' ?
                        <SearchResultHeader />
                    :
                        <ProductListHeader />
                    }
                </div>
            }
            <ProductListContents routeName={routeName} />
        </div>
    )
}

ProductList.propTypes = {
    // Route object added by react router
    route: React.PropTypes.object
}

export default template(ProductList)
