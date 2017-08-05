/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React from 'react'
import {CHECKOUT_CONFIRMATION_MODAL} from '../constants'
import {closeModal} from 'progressive-web-sdk/dist/store/modals/actions'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import {isModalOpen} from 'progressive-web-sdk/dist/store/modals/selectors'
import {stripEvent} from '../../utils/utils'

import Button from 'progressive-web-sdk/dist/components/button'
import Image from 'progressive-web-sdk/dist/components/image'
import Sheet from 'progressive-web-sdk/dist/components/sheet'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'

const CheckoutConfirmationModal = (props) => {
    const {
        closeCheckoutConfirmationModal,
        duration,
        isOpen,
    } = props

    return (
        <div className="m-checkout-confirmation__temp">
            <Sheet
                className="m-checkout-confirmation__account-created-modal pw--no-shadow"
                open={isOpen}
                onDismiss={closeCheckoutConfirmationModal}
                duration={duration}
                maskOpacity={0.7}
                coverage="90%"
                effect="modal-center"
                shrinkToContent={true}
            >
                <div className="u-padding-md u-text-align-center">
                    <div className="u-padding-top-lg u-padding-bottom-lg u-margin-bottom u-text-align-center">
                        <Image
                            src={getAssetUrl('static/img/checkout/account-created.png')}
                            alt="Sparkling user indicating account creation"
                            height="71px"
                            width="104px"
                        />
                    </div>

                    <p className="u-margin-bottom-lg u-h5">
                        <strong>Account Created Successfully</strong>
                    </p>

                    <p className="u-margin-bottom-lg">
                        Welcome to the family. You can now track this order in My Account.
                    </p>

                    <Button
                        className="pw--tertiary u-width-full u-text-uppercase"
                        onClick={closeCheckoutConfirmationModal}
                        data-analytics-name={UI_NAME.confirmation}
                    >
                        Ok
                    </Button>
                </div>
            </Sheet>
        </div>
    )
}

CheckoutConfirmationModal.propTypes = {
    /**
     * A function used to set the Confirmation page's "Save Your Details" modal
     * state to closed
     */
    closeCheckoutConfirmationModal: React.PropTypes.func,

    /**
     * Duration will define the time the animation takes to complete.
     */
    duration: React.PropTypes.number,

    /**
     * Whether the modal is open or not
     */
    isOpen: React.PropTypes.bool,
}

const mapStateToProps = createPropsSelector({
    isOpen: isModalOpen(CHECKOUT_CONFIRMATION_MODAL)
})

const mapDispatchToProps = {
    closeCheckoutConfirmationModal: stripEvent(() => closeModal(CHECKOUT_CONFIRMATION_MODAL, UI_NAME.createAccountConfirmation)),
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckoutConfirmationModal)
