/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'

import Badge from 'progressive-web-sdk/dist/components/badge'
import Button from 'progressive-web-sdk/dist/components/button'
import IconLabel from 'progressive-web-sdk/dist/components/icon-label'
import {HeaderBarActions} from 'progressive-web-sdk/dist/components/header-bar'
import {getCartSummaryCount} from 'progressive-web-sdk/dist/store/cart/selectors'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'

const CartItemCounterBadge = ({itemCount}) => {
    // `undefined` is not greater than 0
    if (itemCount > 0) {
        return (
            <Badge className="t-header__badge" title={`${itemCount} items in the cart`}>
                {itemCount}
            </Badge>
        )
    } else {
        return (
            <p className="u-visually-hidden">No items in the cart.</p>
        )
    }
}

CartItemCounterBadge.propTypes = {
    itemCount: PropTypes.number
}

const CartAction = ({innerButtonClassName, onClick, itemCount}) => (
    <HeaderBarActions>
        <Button
            className="u-position-relative qa-header__cart"
            innerClassName={innerButtonClassName}
            onClick={onClick}
            data-analytics-name={UI_NAME.showMiniCart}
        >
            <IconLabel label="Cart" iconName="cart" iconSize="medium" />
            <CartItemCounterBadge itemCount={itemCount} />
        </Button>
    </HeaderBarActions>
)

CartAction.propTypes = {
    innerButtonClassName: PropTypes.string,
    itemCount: PropTypes.number,
    onClick: PropTypes.func
}

const mapStateToProps = createPropsSelector({
    itemCount: getCartSummaryCount
})

export default connect(mapStateToProps)(CartAction)
