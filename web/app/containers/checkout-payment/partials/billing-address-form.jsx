/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import * as ReduxForm from 'redux-form'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'

// Selectors
import * as selectors from '../selectors'
import {getAvailableRegions} from '../../../store/checkout/selectors'
import {getShippingFullName, getAddressLineOne, getCity, getPostcode} from '../../../store/checkout/shipping/selectors'

// Actions
import {toggleNewAddressFields, toggleCompanyAptField} from '../actions'

// Local components
import CountrySelect from '../../../components/country-select'
import RegionField from '../../../components/region-field'

// SDK Components
import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import Icon from 'progressive-web-sdk/dist/components/icon'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'

import {PAYMENT_FORM_NAME} from '../../../store/form/constants'

class BillingAddressForm extends React.Component {
    constructor(props) {
        super(props)

        this.handleSavedAddress = this.handleSavedAddress.bind(this)
    }

    handleSavedAddress(e) {
        const isChecked = e.currentTarget.checked
        this.props.toggleNewAddressFields(!isChecked)
    }

    render() {
        const {
            city,
            isCompanyOrAptShown,
            name,
            postcode,
            regions,
            street,
            newShippingAddressIsEnabled,
            handleShowCompanyAndApt
        } = this.props

        const hasShippingAddress = !!(street || city || postcode || name)
        const shippingAddress = (
            <div>
                <p>{street}, {city}, {postcode}</p>
                <p>Name: {name}</p>
            </div>
        )

        const addDetails = (
            <Button
                className="pw--is-anchor"
                innerClassName="pw--no-min-height u-padding-0"
                onClick={handleShowCompanyAndApt}
                data-analytics-name={UI_NAME.additionalAddressInfo}
            >
                <span className="u-color-brand u-text-letter-spacing-normal u-text-size-small">
                    Add company, apt #, suite etc.
                </span>
                <Icon name="chevron-down" className="u-margin-start-sm u-color-brand" />
            </Button>
        )

        return (
            <div>
                <div className="t-checkout-payment__title u-padding-top-lg u-padding-bottom-md">
                    <h2 className="u-h4 u-text-uppercase">Billing Address</h2>
                </div>

                <div className="u-border-light-top u-border-light-bottom u-bg-color-neutral-00 t-checkout-payment__card">
                    {hasShippingAddress &&
                        <FieldRow className="u-padding-md">
                            <ReduxForm.Field
                                component={Field}
                                name="billingSameAsShipping"
                                type="checkbox"
                                label={<strong className="u-text-weight-medium">Same as shipping address</strong>}
                                caption={shippingAddress}
                                customEventHandlers={{
                                    onChange: this.handleSavedAddress
                                }}
                            >
                                <input type="checkbox" noValidate data-analytics-name={UI_NAME.sameAsShipping} />
                            </ReduxForm.Field>
                        </FieldRow>
                    }

                    {(newShippingAddressIsEnabled || !hasShippingAddress) &&
                        <div className="u-padding-md u-padding-top-lg u-padding-bottom-lg u-border-light-top">
                            <FieldRow>
                                <ReduxForm.Field component={Field} name="name" label="First & Last name">
                                    <input type="text" noValidate />
                                </ReduxForm.Field>
                            </FieldRow>

                            <FieldRow>
                                <ReduxForm.Field
                                    component={Field}
                                    name="addressLine1"
                                    label="Address"
                                    caption={!isCompanyOrAptShown && addDetails}
                                >
                                    <input type="text" noValidate data-analytics-name={UI_NAME.address} />
                                </ReduxForm.Field>
                            </FieldRow>

                            {isCompanyOrAptShown &&
                                <FieldRow>
                                    <ReduxForm.Field
                                        component={Field}
                                        name="company"
                                        label="Company"
                                    >
                                        <input type="text" noValidate placeholder="Optional" data-analytics-name={UI_NAME.company} />
                                    </ReduxForm.Field>

                                    <ReduxForm.Field
                                        component={Field}
                                        name="addressLine2"
                                        label="Apt #, suite etc."
                                    >
                                        <input type="text" noValidate placeholder="Optional" data-analytics-name={UI_NAME.additionalAddressInfo} />
                                    </ReduxForm.Field>
                                </FieldRow>
                            }

                            <FieldRow>
                                <ReduxForm.Field component={Field} name="city" label="City">
                                    <input type="text" noValidate data-analytics-name={UI_NAME.city} />
                                </ReduxForm.Field>
                            </FieldRow>

                            <FieldRow>
                                <CountrySelect />
                            </FieldRow>

                            <FieldRow>
                                <RegionField regions={regions} />
                            </FieldRow>

                            <FieldRow>
                                <ReduxForm.Field component={Field} name="postcode" label="Zip/Postal code">
                                    {/* @TODO: Set Type to text or tel based on country! */}
                                    <input type="text" noValidate data-analytics-name={UI_NAME.postcode} />
                                </ReduxForm.Field>
                            </FieldRow>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

BillingAddressForm.propTypes = {
    /**
    * City of saved shipping address
    */
    city: PropTypes.string,

    /**
     * Shows the "Company" and "Apt #" fields
     */
    handleShowCompanyAndApt: PropTypes.func,

    /**
     * Whether the "Company" and "Apt #" fields display
     */
    isCompanyOrAptShown: PropTypes.bool,

    /**
    * Name of saved shipping address
    */
    name: PropTypes.string,
    /**
    * Whether the new address fields display
    */
    newShippingAddressIsEnabled: PropTypes.bool,

    /**
    * Postcode of saved shipping address
    */
    postcode: PropTypes.string,

    /**
    * Regions available to ship to
    */
    regions: PropTypes.arrayOf(PropTypes.shape({
        country_id: PropTypes.string,
        label: PropTypes.string,
        title: PropTypes.string,
        value: PropTypes.string
    })),

    /**
    * Street of saved shipping address
    */
    street: PropTypes.string,

    /**
     * Toggle new address fields
     */
    toggleNewAddressFields: PropTypes.func,
}

const mapStateToProps = createPropsSelector({
    city: getCity,
    isCompanyOrAptShown: selectors.getIsCompanyOrAptShown,
    name: getShippingFullName,
    newShippingAddressIsEnabled: selectors.getNewShippingAddressIsEnabled,
    postcode: getPostcode,
    regions: getAvailableRegions(PAYMENT_FORM_NAME),
    street: getAddressLineOne,
})

const mapDispatchToProps = {
    toggleNewAddressFields,
    handleShowCompanyAndApt: () => toggleCompanyAptField(true)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BillingAddressForm)
