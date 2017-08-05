/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import {CART_WISHLIST_MODAL} from '../constants'
import {closeModal} from 'progressive-web-sdk/dist/store/modals/actions'
import {setIsWishlistComplete} from '../../containers/cart/actions'
import {isModalOpen} from 'progressive-web-sdk/dist/store/modals/selectors'
import {getIsLoggedIn} from '../../store/user/selectors'
import {getIsWishlistAddComplete} from '../../containers/cart/selectors'

import Sheet from 'progressive-web-sdk/dist/components/sheet'
import Button from 'progressive-web-sdk/dist/components/button'
import Image from 'progressive-web-sdk/dist/components/image'
import InlineLoader from 'progressive-web-sdk/dist/components/inline-loader'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'

const CartWishlistComplete = ({closeModal}) => (
    <div>
        <div className="u-padding-md">
            <Image
                src={getAssetUrl('static/img/cart/wishlist@2x.png')}
                alt="Arrow directed at heart implying wishlist"
                height="73px"
                width="104px"
            />
        </div>

        <p className="u-h5 u-padding-top u-margin-bottom-md">
            <strong>Item Moved to wishlist</strong>
        </p>

        <p className="u-margin-bottom-lg u-padding-start-lg u-padding-end-lg">
            You can find this in the My Account section.
        </p>

        <Button
            className="pw--tertiary u-width-full u-text-uppercase"
            onClick={closeModal}
            data-analytics-name={UI_NAME.confirmation}
        >
            Ok
        </Button>
    </div>
)

CartWishlistComplete.propTypes = {
    closeModal: PropTypes.func
}

const CartWishlistGuest = ({closeModal}) => (
    <div>
        <div className="u-padding-md">
            <Image
                src={getAssetUrl('static/img/cart/wishlist@2x.png')}
                alt="Arrow directed at heart implying wishlist"
                height="73px"
                width="104px"
            />
        </div>

        <p className="u-h5 u-padding-top u-margin-bottom-md">
            <strong>Please log in or sign up</strong>
        </p>

        <p className="u-margin-bottom-lg u-padding-start-lg u-padding-end-lg">
            In order to save items you must first be logged in to your account
        </p>

        <Button
            className="pw--secondary u-width-full u-text-uppercase u-margin-bottom-lg"
            href="/customer/account/login/"
            data-analytics-name={UI_NAME.goToSignIn}
        >
            Sign in or sign up
        </Button>

        <Button
            className="pw--tertiary u-width-full u-text-uppercase"
            onClick={closeModal}
            data-analytics-name={UI_NAME.cancel}
        >
            Cancel
        </Button>
    </div>
)

CartWishlistGuest.propTypes = {
    closeModal: PropTypes.func
}

const CartWishlistLoggedIn = ({isComplete, closeModal}) => {
    if (isComplete) {
        return (<CartWishlistComplete closeModal={closeModal} />)
    }
    return (<InlineLoader />)
}

CartWishlistLoggedIn.propTypes = {
    closeModal: PropTypes.func,
    isComplete: PropTypes.bool
}


const CartWishlistModal = ({closeModal, duration, isOpen, isComplete, isLoggedIn}) => {
    return (
        <Sheet
            className="pw--no-shadow m-cart__wishlist-modal"
            open={isOpen}
            onDismiss={() => {
                closeModal()
                setIsWishlistComplete(false)
            }}
            duration={duration}
            maskOpacity={0.7}
            effect="modal-center"
            shrinkToContent={true}
            coverage="90%"
        >
            <div className="u-flexbox u-direction-column u-align-center u-padding-md u-padding-top-lg u-padding-bottom-lg u-text-align-center">
                {isLoggedIn ?
                    <CartWishlistLoggedIn isComplete={isComplete} closeModal={closeModal} />
                    : <CartWishlistGuest closeModal={closeModal} />
                }
            </div>
        </Sheet>
    )
}

CartWishlistModal.propTypes = {
    /**
     * A function used to set the navigation-sheet's state to closed
     */
    closeModal: PropTypes.func,

    /**
     * Duration will define the time the animation takes to complete.
     */
    duration: PropTypes.number,

    isComplete: PropTypes.bool,
    isLoggedIn: PropTypes.bool,

    /**
     * Whether the modal is open or not
     */
    isOpen: PropTypes.bool,
}

const mapStateToProps = createPropsSelector({
    isOpen: isModalOpen(CART_WISHLIST_MODAL),
    isLoggedIn: getIsLoggedIn,
    isComplete: getIsWishlistAddComplete
})

const mapDispatchToProps = {
    closeModal: () => closeModal(CART_WISHLIST_MODAL, UI_NAME.wishlist),
    setIsWishlistComplete
}

export default connect(mapStateToProps, mapDispatchToProps)(CartWishlistModal)
