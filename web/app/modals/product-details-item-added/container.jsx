/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import * as selectors from '../../containers/product-details/selectors'
import {stripEvent} from '../../utils/utils'
import {isModalOpen} from 'progressive-web-sdk/dist/store/modals/selectors'
import {getProductThumbnail, getProductTitle, getProductPrice} from 'progressive-web-sdk/dist/store/products/selectors'
import * as productDetailsActions from '../../containers/product-details/actions'
import {PRODUCT_DETAILS_ITEM_ADDED_MODAL} from '../constants'
import {closeModal} from 'progressive-web-sdk/dist/store/modals/actions'

import Button from 'progressive-web-sdk/dist/components/button'
import Icon from 'progressive-web-sdk/dist/components/icon'
import ProductItem from '../../components/product-item'
import Sheet from 'progressive-web-sdk/dist/components/sheet'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'

const ProductDetailsItemAddedModal = ({open, onDismiss, quantity, title, price, thumbnail, onGoToCheckout, duration}) => (
    <Sheet
        open={open}
        onDismiss={onDismiss}
        duration={duration}
        effect="slide-bottom"
        className="m-product-details__item-added-modal"
        coverage="50%"
        shrinkToContent
    >
        {/* Modal header */}
        <div className="u-flex-none u-border-bottom">
            <div className="u-flexbox u-align-center">
                <h1 className="u-flex u-padding-lg u-h4 u-text-uppercase">
                    Product Added to Cart
                </h1>

                <div className="m-product-details__item-added-modal-close u-flexbox u-flex-none u-align-center u-justify-center">
                    <Button
                        className="u-text-uppercase"
                        onClick={onDismiss}
                        data-analytics-name={UI_NAME.dismissModal}
                    >
                        <Icon name="close" title="Close" className="m-product-details__item-added-modal-icon" />
                    </Button>
                </div>
            </div>
        </div>

        <div className="u-flexbox u-direction-column u-flex u-padding-md">
            {/* Modal product information */}
            <div className="u-flex u-margin-bottom-md">
                <ProductItem customWidth="20%"
                    title={<h2 className="u-h5 u-text-family u-text-weight-medium">{title}</h2>}
                    image={<img role="presentation" src={thumbnail.src} alt={thumbnail.alt} width="60px" />}
                >
                    <div className="u-flexbox u-justify-between u-padding-top-sm">
                        <p>Qty: {quantity}</p>
                        <p className="u-text-weight-bold">{price}</p>
                    </div>
                </ProductItem>
            </div>

            {/* Buttons */}
            <div className="u-flex-none">
                <Button
                    onClick={onGoToCheckout}
                    className="pw--primary u-width-full u-margin-bottom-md u-text-uppercase"
                    innerClassName="u-text-align-center"
                    data-analytics-name={UI_NAME.checkout}
                >
                    Go To Checkout
                </Button>
                <Button
                    className="pw--tertiary u-width-full u-text-uppercase"
                    onClick={onDismiss}
                    data-analytics-name={UI_NAME.continueShopping}
                >
                    Continue Shopping
                </Button>
            </div>
        </div>
    </Sheet>
)

ProductDetailsItemAddedModal.propTypes = {
    /**
     * Duration will define the time the animation takes to complete.
     */
    duration: PropTypes.number,
    open: PropTypes.bool,
    price: PropTypes.string,
    quantity: PropTypes.number,
    thumbnail: PropTypes.shape({
        src: PropTypes.string,
        alt: PropTypes.string
    }),
    title: PropTypes.string,
    onDismiss: PropTypes.func,
    onGoToCheckout: PropTypes.func,
}

const mapStateToProps = createPropsSelector({
    thumbnail: getProductThumbnail,
    open: isModalOpen(PRODUCT_DETAILS_ITEM_ADDED_MODAL),
    quantity: selectors.getItemQuantity,
    title: getProductTitle,
    price: getProductPrice
})

const mapDispatchToProps = {
    onGoToCheckout: productDetailsActions.goToCheckout,
    onDismiss: stripEvent(() => closeModal(PRODUCT_DETAILS_ITEM_ADDED_MODAL, UI_NAME.addToCart))
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductDetailsItemAddedModal)
