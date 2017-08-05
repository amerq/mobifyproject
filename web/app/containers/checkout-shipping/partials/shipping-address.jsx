/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import * as ReduxForm from 'redux-form'
import classNames from 'classnames'

import {setShowAddNewAddress} from '../actions'
import {ADD_NEW_ADDRESS_FIELD, SAVED_SHIPPING_ADDRESS_FIELD} from '../constants'
import {getIsLoggedIn} from '../../../store/user/selectors'
import {getShowAddNewAddress} from '../selectors'
import {getSavedAddresses} from '../../../store/checkout/shipping/selectors'

import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import ShippingAddressFields from './shipping-address-fields'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'

const ShippingAddressForm = ({
    handleShowAddNewAddress,
    isLoggedIn,
    savedAddresses,
    showAddNewAddress
}) => {

    const renderSavedAddresses = (address) => {
        const {
            city,
            countryId,
            firstname,
            id,
            lastname,
            postcode,
            regionCode,
            addressLine1,
            addressLine2
        } = address
        const street = [addressLine1, addressLine2].filter((item) => item).join(', ')
        const shippingAddress = (
            <div className="u-color-neutral-40">
                <p className="u-margin-bottom-sm">
                    {city}, {regionCode}, {countryId}, {postcode}
                </p>
                <p>{firstname} {lastname}</p>
            </div>
        )

        return (
            <FieldRow key={id}>
                <ReduxForm.Field
                    component={Field}
                    name={SAVED_SHIPPING_ADDRESS_FIELD}
                    label={
                        <strong className="u-text-weight-semi-bold">{street}</strong>
                    }
                    caption={shippingAddress}
                    type="radio"
                    value={id}
                    customEventHandlers={{
                        onChange: () => {
                            handleShowAddNewAddress(false)
                        }
                    }}
                >
                    <input
                        type="radio"
                        noValidate
                        value={id}
                        data-analytics-name={UI_NAME.savedAddress}
                    />
                </ReduxForm.Field>
            </FieldRow>
        )
    }

    const renderAddressFormOrSavedAddressesOrBoth = () => {
        if (isLoggedIn && !!savedAddresses.length) {
            const classes = classNames('t-checkout-payment__add-new-address', {
                'u-border-light u-padding-md': showAddNewAddress
            })

            return [
                savedAddresses.map(renderSavedAddresses),
                <FieldRow key={ADD_NEW_ADDRESS_FIELD} className={classes}>
                    <div className="u-flex">
                        <ReduxForm.Field
                            component={Field}
                            name={SAVED_SHIPPING_ADDRESS_FIELD}
                            label={
                                <strong className="u-text-weight-semi-bold">
                                    Add a new address
                                </strong>
                            }
                            type="radio"
                            value={ADD_NEW_ADDRESS_FIELD}
                            customEventHandlers={{
                                onChange: () => {
                                    handleShowAddNewAddress(true)
                                }
                            }}
                        >
                            <input
                                type="radio"
                                noValidate
                                value={ADD_NEW_ADDRESS_FIELD}
                                data-analytics-name={UI_NAME.addNewAddress}
                            />
                        </ReduxForm.Field>

                        {showAddNewAddress &&
                            <div className="t-checkout-payment__add-new-address-form">
                                <ShippingAddressFields />
                            </div>
                        }
                    </div>
                </FieldRow>
            ]
        } else {
            return <ShippingAddressFields />
        }
    }

    return (
        <div className="t-checkout-shipping__shipping-address">
            <div className="t-checkout-shipping__title u-padding-top-lg u-padding-bottom-md">
                <h2 className="u-h4 u-text-uppercase">Shipping Address</h2>
            </div>

            <div className="u-padding-md u-border-light-top u-border-light-bottom u-bg-color-neutral-00">
                {renderAddressFormOrSavedAddressesOrBoth()}
            </div>
        </div>
    )
}

ShippingAddressForm.propTypes = {
    /**
     * Whether the form is disabled or not
     */
    disabled: React.PropTypes.bool,

    /**
    * The title for the form
    */
    formTitle: React.PropTypes.string,

    /**
     * Handles whether or not to show the "Add New Address" form fields
     */
    handleShowAddNewAddress: React.PropTypes.func,

    /**
    * (Internal) added by redux form
    */
    invalid: React.PropTypes.bool,

    /**
     * Whether the user is logged in or not
     */
    isLoggedIn: React.PropTypes.bool,

    /**
    * Saved addresses from the user's account
    */
    savedAddresses: React.PropTypes.array,

    /**
    * Whether or not to show the "Add New Addres" form fields
    */
    showAddNewAddress: React.PropTypes.bool,

    /**
    * (Internal) Added by redux form
    */
    submitting: React.PropTypes.bool
}

const mapStateToProps = createPropsSelector({
    isLoggedIn: getIsLoggedIn,
    savedAddresses: getSavedAddresses,
    showAddNewAddress: getShowAddNewAddress
})

const mapDispatchToProps = {
    handleShowAddNewAddress: setShowAddNewAddress
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShippingAddressForm)
