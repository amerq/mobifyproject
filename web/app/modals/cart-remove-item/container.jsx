/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import {CART_REMOVE_ITEM_MODAL} from '../constants'
import {removeItem} from '../../containers/cart/actions'
import {closeModal} from 'progressive-web-sdk/dist/store/modals/actions'
import {isModalOpen} from 'progressive-web-sdk/dist/store/modals/selectors'
import {getRemoveItemID} from '../../containers/cart/selectors'

import Sheet from 'progressive-web-sdk/dist/components/sheet'
import Button from 'progressive-web-sdk/dist/components/button'
import Image from 'progressive-web-sdk/dist/components/image'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'

const CartRemoveItemModal = ({closeModal, isOpen, removeItemID, removeItem, duration}) => {
    return (
        <Sheet
            className="pw--no-shadow m-cart__remove-item-confirmation-modal"
            open={isOpen}
            onDismiss={closeModal}
            duration={duration}
            maskOpacity={0.7}
            effect="modal-center"
            shrinkToContent={true}
            coverage="90%"
        >
            <div className="u-flexbox u-direction-column u-align-center u-padding-md u-padding-top-lg u-padding-bottom-lg u-text-align-center">
                <div className="u-padding-md">
                    <Image
                        src={getAssetUrl('static/img/cart/remove-item@2x.png')}
                        alt=""
                        height="75px"
                        width="95px"
                    />
                </div>

                <p className="u-h5 u-padding-top u-margin-bottom-md">
                    <strong>Remove Item</strong>
                </p>

                <p className="u-margin-bottom-lg u-padding-start-lg u-padding-end-lg">
                    Are you sure you want to remove this item from your cart?
                </p>

                <div className="u-flex u-flexbox">
                    <Button
                        className="pw--tertiary u-text-uppercase u-flex"
                        onClick={closeModal}
                        data-analytics-name={UI_NAME.cancelRemoveItem}
                    >
                        Cancel
                    </Button>

                    <Button
                        className="pw--secondary u-text-uppercase u-flex u-margin-start"
                        onClick={() => {
                            closeModal()
                            removeItem(removeItemID)
                        }}
                        data-analytics-name={UI_NAME.confirmRemoveItem}
                    >
                        Ok
                    </Button>
                </div>
            </div>
        </Sheet>
    )
}

CartRemoveItemModal.propTypes = {
    /**
     * A function used to set the navigation-sheet's state to closed
     */
    closeModal: React.PropTypes.func,
    /**
     * Duration will define the time the animation takes to complete.
     */
    duration: React.PropTypes.number,
    /**
     * Whether the modal is open or not
     */
    isOpen: React.PropTypes.bool,
    /**
    * Removes the item from the cart
    */
    removeItem: React.PropTypes.func,
    /**
    * The id of the item being deleted
    */
    removeItemID: React.PropTypes.string
}

const mapStateToProps = createPropsSelector({
    isOpen: isModalOpen(CART_REMOVE_ITEM_MODAL),
    removeItemID: getRemoveItemID
})

const mapDispatchToProps = {
    closeModal: () => closeModal(CART_REMOVE_ITEM_MODAL, UI_NAME.removeItem),
    removeItem
}
export default connect(mapStateToProps, mapDispatchToProps)(CartRemoveItemModal)
