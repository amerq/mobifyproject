/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import * as ReduxForm from 'redux-form'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import classNames from 'classnames'
import {PAYMENT_EXISTING_CARD, PAYMENT_NEW_CARD, AMEX_CARD, DEFAULT_CARD, NUMBER_FIELD} from '../constants'

// Selectors
import * as selectors from '../selectors'
import * as formSelectors from '../../../store/form/selectors'

// Actions
import * as checkoutPaymentActions from '../actions'

// SDK Components
import CardInput from 'progressive-web-sdk/dist/components/card-input'
import ExpiryDate from 'progressive-web-sdk/dist/components/expiry-date'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import CardVerification from 'progressive-web-sdk/dist/components/card-verification'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'

class CreditCardForm extends React.Component {
    constructor(props) {
        super(props)

        this.handleRadioChange = this.handleRadioChange.bind(this)
        this.handleCVV = this.handleCVV.bind(this)
    }

    handleRadioChange(e) {
        const value = e.currentTarget.value
        const isNewCard = value === PAYMENT_NEW_CARD

        this.props.toggleCardInputRadio(isNewCard)
    }

    handleCVV(e) {
        const input = e.target

        // Set the cvv type based on the card number
        if (input.name === NUMBER_FIELD) {
            const amexRegex = new RegExp('^3[47]')
            const value = input.value
            const currentType = this.props.cvvType

            // Don't trigger the actions unless things have changed
            if (value.match(amexRegex) && currentType !== AMEX_CARD) {
                this.props.setCvvType(AMEX_CARD)
            } else if (!value.match(amexRegex) && currentType !== DEFAULT_CARD) {
                this.props.setCvvType(DEFAULT_CARD)
            }
        }
    }

    render() {
        const {
            ccnumber,
            hasExistingCreditCard,
            isNewCardInputSelected
        } = this.props

        const creditCardForm = (
            <div onChange={this.handleCVV}>
                <FieldRow>
                    <ReduxForm.Field
                        component={Field}
                        name="ccname"
                        label="Cardholder Name"
                    >
                        <input type="text" noValidate data-analytics-name={UI_NAME.cardHolderName} />
                    </ReduxForm.Field>
                </FieldRow>

                <FieldRow>
                    <ReduxForm.Field
                        component={Field}
                        name={NUMBER_FIELD}
                        label="Card number"
                    >
                        <CardInput />
                    </ReduxForm.Field>
                </FieldRow>

                <FieldRow>
                    <ReduxForm.Field
                        component={Field}
                        name="ccexpiry"
                        label="Expiry"
                    >
                        <ExpiryDate placeholder="mm/yy" />
                    </ReduxForm.Field>

                    <ReduxForm.Field
                        component={Field}
                        name="cvv"
                        label="CVV"
                    >
                        <CardVerification cardNumber={ccnumber} />
                    </ReduxForm.Field>
                </FieldRow>
            </div>
        )

        return (
            <div>
                <div className="t-checkout-payment__title u-padding-top-lg u-padding-bottom-md">
                    <h2 className="u-h4 u-text-uppercase">Pay With Card</h2>
                </div>

                {hasExistingCreditCard ?
                    <div className="u-padding-md u-padding-top-lg u-padding-bottom-lg u-border-light-top u-border-light-bottom u-bg-color-neutral-00 t-checkout-payment__card">
                        <FieldRow>
                            <ReduxForm.Field
                                component={Field}
                                name="selectCreditCard"
                                label={<strong className="u-text-weight-regular">VISA **** **** **** 5678</strong>}
                                caption="John Appleseed"
                            >
                                <input type="radio" value={PAYMENT_EXISTING_CARD} onChange={this.handleRadioChange} defaultChecked noValidate data-analytics-name={UI_NAME.savedCard} />
                            </ReduxForm.Field>
                        </FieldRow>

                        <div className={classNames('u-margin-top-md t-checkout-payment__add-new-card', {'u-padding-md u-border-light': isNewCardInputSelected})}>
                            <FieldRow>
                                <ReduxForm.Field
                                    component={Field}
                                    name="selectCreditCard"
                                    label={<span className={isNewCardInputSelected && 'u-text-weight-medium'}>Add a new card</span>}
                                >
                                    <input type="radio" value={PAYMENT_NEW_CARD} onChange={this.handleRadioChange} noValidate data-analytics-name={UI_NAME.addNewCard} />
                                </ReduxForm.Field>
                            </FieldRow>

                            {isNewCardInputSelected &&
                                <div className="u-margin-top-lg u-padding-top t-checkout-payment__add-new-card-form">
                                    {creditCardForm}
                                </div>
                            }
                        </div>
                    </div>
                :
                    <div className="u-padding-md u-padding-top-lg u-padding-bottom-lg u-border-light-top u-border-light-bottom u-bg-color-neutral-00 t-checkout-payment__card">
                        {creditCardForm}
                    </div>
                }
            </div>
        )
    }
}

CreditCardForm.propTypes = {
    /**
     * CVV Number
     */
    ccnumber: PropTypes.string,

    /**
     * CVV type
     */
    cvvType: PropTypes.string,

    /**
     * Whether there's saved credit card data
     */
    hasExistingCreditCard: PropTypes.bool,

    /**
     * Whether 'add new card' option is selected
     */
    isNewCardInputSelected: PropTypes.bool,

    /**
     * Handle cvv type
     */
    setCvvType: PropTypes.func,

    /**
     * Handle card option selection to determine existing or new card option
     */
    toggleCardInputRadio: PropTypes.func,
}

const mapStateToProps = createPropsSelector({
    ccnumber: formSelectors.getPaymentBillingCCNumber,
    cvvType: selectors.getCvvType,
    hasExistingCreditCard: selectors.getHasExistingCreditCard,
    isNewCardInputSelected: selectors.getIsNewCardInputSelected
})

const mapDispatchToProps = {
    toggleCardInputRadio: checkoutPaymentActions.toggleCardInputRadio,
    setCvvType: checkoutPaymentActions.setCvvType,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreditCardForm)
