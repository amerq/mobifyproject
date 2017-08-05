/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React from 'react'
import {connect} from 'react-redux'
import * as ReduxForm from 'redux-form'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {CART_ESTIMATE_SHIPPING_MODAL} from '../constants'
import {ESTIMATE_FORM_NAME} from '../../store/form/constants'

import {closeModal} from 'progressive-web-sdk/dist/store/modals/actions'
import {isModalOpen} from 'progressive-web-sdk/dist/store/modals/selectors'
import {getAvailableRegions} from '../../store/checkout/selectors'
import {submitEstimateShipping} from '../../containers/cart/actions'
import {isTaxRequestPending} from '../../containers/cart/selectors'

import Sheet from 'progressive-web-sdk/dist/components/sheet'
import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import CountrySelect from '../../components/country-select'
import IconLabelButton from '../../components/icon-label-button'
import RegionField from '../../components/region-field'
import {HeaderBar, HeaderBarActions, HeaderBarTitle} from 'progressive-web-sdk/dist/components/header-bar'
import InlineLoader from 'progressive-web-sdk/dist/components/inline-loader'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'

const REQUIRED_TEXT = 'Required'

const validate = (values) => {
    const errors = {}
    const requiredFieldNames = [
        'countryId',
        'postcode'
    ]
    if (!(values.region || values.regionId)) {
        errors.region = REQUIRED_TEXT
        errors.regionId = REQUIRED_TEXT
    }
    requiredFieldNames.forEach((fieldName) => {
        if (!values[fieldName]) {
            errors[fieldName] = REQUIRED_TEXT
        }
    })

    return errors
}

class CartEstimateShippingModal extends React.Component {

    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(values) {
        return new Promise((resolve, reject) => {
            const errors = validate(values)

            if (!Object.keys(errors).length) {
                this.props.submitEstimateShipping()
                return resolve()
            }
            return reject(new ReduxForm.SubmissionError(errors))
        })
    }

    render() {
        const {
            closeModal,
            duration,
            handleSubmit,
            isOpen,
            isTaxRequestPending,
            stateProvinces
        } = this.props

        return (
            <Sheet className="m-cart__estimate-shipping-modal"
                open={isOpen}
                onDismiss={closeModal}
                duration={duration}
                maskOpacity={0.7}
                effect="slide-right"
                coverage="85%"
            >
                <HeaderBar>
                    <HeaderBarTitle className="u-flex u-padding-start u-text-align-start">
                        <h1 className="u-h4 u-text-family-header u-text-uppercase">
                            <span className="u-text-weight-extra-light">Estimate Shipping</span>
                        </h1>
                    </HeaderBarTitle>

                    <HeaderBarActions>
                        <IconLabelButton iconName="close" label="" onClick={closeModal} analyticsName={UI_NAME.dismissModal} />
                        <span className="u-visually-hidden">Close</span>
                    </HeaderBarActions>
                </HeaderBar>

                <div className="u-padding-md">
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <FieldRow>
                            <CountrySelect />
                        </FieldRow>

                        <FieldRow>
                            <RegionField regions={stateProvinces} />
                        </FieldRow>

                        <FieldRow>
                            <ReduxForm.Field component={Field} name="postcode" label="Zip/Postal Code">
                                <input type="text" noValidate data-analytics-name={UI_NAME.postcode} />
                            </ReduxForm.Field>
                        </FieldRow>

                        <FieldRow>
                            {isTaxRequestPending ?
                                <Button className="pw--secondary u-width-full">
                                    <InlineLoader className="pw--white" title="Estimating" />
                                </Button>
                            :
                                <Button
                                    className="pw--secondary u-width-full u-text-uppercase"
                                    type="submit"
                                    data-analytics-name={UI_NAME.estimateShipping}
                                >
                                    Get Estimate
                                </Button>
                            }
                        </FieldRow>
                    </form>
                </div>
            </Sheet>
        )
    }
}


CartEstimateShippingModal.propTypes = {
    /**
     * A function used to set the navigation-sheet's state to closed
     */
    closeModal: React.PropTypes.func,

    /**
     * Duration will define the time the animation takes to complete.
     */
    duration: React.PropTypes.number,

    /**
    * (Internal) Added by Redux form
    */
    handleSubmit: React.PropTypes.func,

    /**
     * Whether the modal is open or not
     */
    isOpen: React.PropTypes.bool,

    isTaxRequestPending: React.PropTypes.bool,

    stateProvinces: React.PropTypes.array,
    /**
    * fetches the shipping estimate
    */
    submitEstimateShipping: React.PropTypes.func,
}

const mapStateToProps = createPropsSelector({
    isTaxRequestPending,
    isOpen: isModalOpen(CART_ESTIMATE_SHIPPING_MODAL),
    stateProvinces: getAvailableRegions(ESTIMATE_FORM_NAME)
})

const mapDispatchToProps = {
    closeModal: () => closeModal(CART_ESTIMATE_SHIPPING_MODAL, UI_NAME.estimateShipping),
    submitEstimateShipping
}

const EstimateShippingReduxForm = ReduxForm.reduxForm({
    form: ESTIMATE_FORM_NAME
})(CartEstimateShippingModal)

export {CartEstimateShippingModal}
export default connect(mapStateToProps, mapDispatchToProps)(EstimateShippingReduxForm)
