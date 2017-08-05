/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import * as ReduxForm from 'redux-form'
import {normalizePhone} from '../../../utils/normalize-utils'
import {stripEvent} from '../../../utils/utils'

import {showCompanyAndApt, fetchShippingMethods} from '../actions'
import {getIsCompanyOrAptShown} from '../selectors'
import {SHIPPING_FORM_NAME} from '../../../store/form/constants'
import {getAvailableRegions} from '../../../store/checkout/selectors'

import CountrySelect from '../../../components/country-select'
import RegionField from '../../../components/region-field'

import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import Icon from 'progressive-web-sdk/dist/components/icon'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'

const ShippingAddressFields = ({
    fetchShippingMethods,
    handleShowCompanyAndApt,
    isCompanyOrAptShown,
    regions
}) => {

    const addCompanyButton = (
        <Button
            className="pw--is-anchor"
            innerClassName="pw--no-min-height u-padding-0"
            onClick={handleShowCompanyAndApt}
            data-analytics-name={UI_NAME.showMoreAddressFields}
        >
            <span className="u-color-brand u-text-letter-spacing-normal u-text-size-small">
                Add company or apt #
            </span>
            <Icon name="chevron-down" className="u-margin-start-sm u-color-brand" />
        </Button>
    )

    return (
        <div className="t-checkout-shipping__fields u-margin-top-md">
            <FieldRow>
                <ReduxForm.Field
                    component={Field}
                    name="name"
                    label="First & Last Name"
                >
                    <input type="text" noValidate data-analytics-name={UI_NAME.customerName} />
                </ReduxForm.Field>
            </FieldRow>

            <FieldRow>
                <ReduxForm.Field
                    component={Field}
                    name="addressLine1"
                    label="Address"
                    caption={!isCompanyOrAptShown && addCompanyButton}
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
                        <input
                            type="text"
                            noValidate
                            placeholder="Optional"
                            data-analytics-name={UI_NAME.company}
                        />
                    </ReduxForm.Field>

                    <ReduxForm.Field
                        component={Field}
                        name="addressLine2"
                        label="Apt #, suite etc."
                    >
                        <input
                            type="text"
                            noValidate
                            placeholder="Optional"
                            data-analytics-name={UI_NAME.additionalAddressInfo}
                        />
                    </ReduxForm.Field>
                </FieldRow>
            }

            <FieldRow>
                <ReduxForm.Field
                    component={Field}
                    name="city"
                    label="City"
                >
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
                <ReduxForm.Field
                    component={Field}
                    name="postcode"
                    label="Zip/Postal Code"
                    customEventHandlers={{
                        onBlur: fetchShippingMethods
                    }}
                >
                    <input type="text" noValidate data-analytics-name={UI_NAME.postcode} />
                </ReduxForm.Field>
            </FieldRow>

            <FieldRow>
                <ReduxForm.Field
                    component={Field}
                    name="telephone"
                    label="Phone"
                    caption="In case we need to contact you about your order"
                    normalize={normalizePhone}
                >
                    <input type="tel" noValidate data-analytics-name={UI_NAME.phone} />
                </ReduxForm.Field>
            </FieldRow>
        </div>
    )
}

ShippingAddressFields.propTypes = {
    /**
    * Fetches the available shipping methods from the back end
    */
    fetchShippingMethods: React.PropTypes.func,

    /**
     * Shows the "Company" and "Apt #" fields
     */
    handleShowCompanyAndApt: React.PropTypes.func,

    /**
     * Whether the "Company" and "Apt #" fields display
     */
    isCompanyOrAptShown: React.PropTypes.bool,

    /**
    * Regions available to ship to
    */
    regions: React.PropTypes.arrayOf(React.PropTypes.shape({
        country_id: React.PropTypes.string,
        label: React.PropTypes.string,
        title: React.PropTypes.string,
        value: React.PropTypes.string
    })),
}

const mapStateToProps = createPropsSelector({
    isCompanyOrAptShown: getIsCompanyOrAptShown,
    regions: getAvailableRegions(SHIPPING_FORM_NAME),
})

const mapDispatchToProps = {
    handleShowCompanyAndApt: stripEvent(showCompanyAndApt),
    fetchShippingMethods
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShippingAddressFields)
