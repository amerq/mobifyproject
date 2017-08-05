/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getModals} from 'progressive-web-sdk/dist/store/modals/selectors'

import * as MODAL from './constants'
import Navigation from './navigation/container'
import MiniCart from './mini-cart/container'
import ProductDetailsItemAddedModal from './product-details-item-added/container'
import CartEstimateShippingModal from './cart-estimate-shipping/container'
import CartWishlistModal from './cart-wishlist/container'
import CartRemoveItemModal from './cart-remove-item/container'
import CheckoutConfirmationModal from './checkout-confirmation/container'
import OfflineModal from './offline/container'
import ProductListFilterModal from './product-list-filter/container'

const modals = {
    // You can set transition duration for individual modal:
    // [MODAL.NAVIGATION_MODAL]: {content: <Navigation />, customDuration: 2000},

    [MODAL.NAVIGATION_MODAL]: {content: <Navigation />},
    [MODAL.OFFLINE_MODAL]: {content: <OfflineModal />},
    [MODAL.MINI_CART_MODAL]: {content: <MiniCart />},
    [MODAL.PRODUCT_DETAILS_ITEM_ADDED_MODAL]: {content: <ProductDetailsItemAddedModal />},
    [MODAL.PRODUCT_LIST_FILTER_MODAL]: {content: <ProductListFilterModal />},
    [MODAL.CART_ESTIMATE_SHIPPING_MODAL]: {content: <CartEstimateShippingModal />},
    [MODAL.CART_WISHLIST_MODAL]: {content: <CartWishlistModal />},
    [MODAL.CART_REMOVE_ITEM_MODAL]: {content: <CartRemoveItemModal />},
    [MODAL.CHECKOUT_CONFIRMATION_MODAL]: {content: <CheckoutConfirmationModal />}
}

class ModalManager extends React.Component {
    shouldComponentUpdate(nextProps) {
        const nextIsOpen = nextProps.isOpen
        const {isOpen, duration} = this.props

        for (const nextModal in nextIsOpen) {
            // Open Modal
            if (nextIsOpen[nextModal] === true) {
                return true
            }

            // Close Modal
            // Set a delay for modal close animation
            if (isOpen[nextModal] !== nextIsOpen[nextModal]) {
                const delay = modals[nextModal].customDuration || duration
                setTimeout(() => this.forceUpdate(), delay)
                return false
            }
        }
        return true
    }

    onModalChange() {
        const {isOpen, duration} = this.props
        let openModal
        for (const modal in isOpen) {
            if (isOpen[modal]) {
                openModal = React.cloneElement(
                    modals[modal].content,
                    {duration: modals[modal].customDuration || duration}
                )
            }
        }
        return openModal
    }

    render() {
        const openModal = this.onModalChange()
        return (
            <div className="m-modal-manager">
                {openModal}
            </div>
        )
    }
}

ModalManager.propTypes = {
    /**
     * Duration will define the time animation takes to complete.
     * It is the default value for all modals in the project.
     * You can also pass duration to individual modals.
     */
    duration: PropTypes.number,

    /**
     * The object that contains the open/closed flag of all modals.
     */
    isOpen: PropTypes.object,
}

ModalManager.defaultProps = {
    duration: 200
}

const mapStateToProps = createPropsSelector({
    isOpen: getModals
})

export default connect(
    mapStateToProps
)(ModalManager)
