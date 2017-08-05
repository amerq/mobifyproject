/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import throttle from 'lodash.throttle'
import {removePromoCode} from '../../cart/actions' // @TODO: figure out where this is coming from

// Selectors
import * as selectors from '../selectors'
import * as cartSelectors from 'progressive-web-sdk/dist/store/cart/selectors'
import {getSelectedShippingRate, getSelectedShippingLabel} from '../../../store/checkout/shipping/selectors'

// Actions
import * as checkoutPaymentActions from '../actions'

// Partials
import PaymentProductItem from './payment-product-item'
import CartPromoForm from '../../cart/partials/cart-promo-form'

// SDK Components
import {Accordion, AccordionItem} from 'progressive-web-sdk/dist/components/accordion'
import Button from 'progressive-web-sdk/dist/components/button'
import Icon from 'progressive-web-sdk/dist/components/icon'
import Image from 'progressive-web-sdk/dist/components/image'
import {Ledger, LedgerRow} from 'progressive-web-sdk/dist/components/ledger'
import List from 'progressive-web-sdk/dist/components/list'
import InlineLoader from 'progressive-web-sdk/dist/components/inline-loader'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'

class OrderSummary extends React.Component {
    constructor(props) {
        super(props)

        this.handleScroll = throttle(this.handleScroll.bind(this), 200)
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll() {
        const {isFixedPlaceOrderShown} = this.props
        const footerHeight = 200
        const scrollPosition = window.pageYOffset
        const windowSize = window.innerHeight
        const bodyHeight = document.body.offsetHeight
        const distanceFromBottom = Math.max(bodyHeight - (scrollPosition + windowSize), 0)
        const newIsFixedPlaceOrderShown = distanceFromBottom > footerHeight

        if (newIsFixedPlaceOrderShown !== isFixedPlaceOrderShown) {  // Saves triggering the action
            this.props.toggleFixedPlaceOrder(newIsFixedPlaceOrderShown)
        }
    }

    render() {
        const {
            cartItems,
            cartshippingRate,
            discountAmount,
            discountLabel,
            isLoading,
            isFixedPlaceOrderShown,
            orderTotal,
            subtotal,
            summaryCount,
            shippingRate,
            shippingLabel,
            taxAmount,
            removePromoCode,
            submitPayment
        } = this.props

        const removeButton = (
            <Button
                innerClassName="u-color-brand u-padding-start-0 u-text-letter-spacing-normal"
                onClick={removePromoCode}
                data-analytics-name={UI_NAME.removeDiscount}
            >
                Remove Discount
            </Button>
        )

        const PlaceOrderButton = (
            <Button
                className="pw--primary u-flex-none u-width-full u-text-uppercase qa-checkout__place-order"
                type="button"
                onClick={submitPayment}
                disabled={isLoading}
                data-analytics-name={UI_NAME.submitOrder}
            >
                {isLoading ?
                    <InlineLoader />
                :
                    [<Icon key="" name="lock" />, 'Place Your Order']
                }
            </Button>
        )

        return (
            <div className="t-checkout-payment__order-summary">
                <div className="t-checkout-payment__title u-padding-top-lg u-padding-bottom-md">
                    <h2 className="u-h4 u-text-uppercase">Order Summary</h2>
                </div>

                <div className="u-border-light-top u-border-light-bottom u-bg-color-neutral-00 t-checkout-payment__card">
                    <List>
                        {cartItems.map((item, idx) =>
                            <PaymentProductItem {...item} key={idx} />
                        )}
                    </List>

                    <Ledger className="u-border-light-top">
                        <LedgerRow
                            label={`Subtotal (${summaryCount} items)`}
                            value={subtotal}
                        />

                        {discountAmount ?
                            <LedgerRow
                                label={`Shipping (${shippingLabel})`}
                                value={cartshippingRate}
                            />
                        :
                            <LedgerRow
                                label={`Shipping (${shippingLabel})`}
                                value={shippingRate}
                            />
                        }

                        {taxAmount &&
                            <LedgerRow
                                className="u-flex-none u-border-0"
                                label="Taxes"
                                value={taxAmount}
                            />
                        }

                        {discountAmount && discountLabel &&
                            <LedgerRow
                                className="pw--sale"
                                label={`Discount: ${discountLabel}`}
                                labelAction={removeButton}
                                value={discountAmount}
                           />
                        }
                    </Ledger>

                    {(!discountAmount || !discountLabel) &&
                        <Accordion>
                            <AccordionItem header="Promo code">
                                <CartPromoForm />
                            </AccordionItem>
                        </Accordion>
                    }

                    <Ledger>
                        <LedgerRow
                            label="Total"
                            isTotal={true}
                            value={orderTotal}
                        />
                    </Ledger>

                    {/* This is the statically positioned "Place Your Order" container */}
                    <div className="u-padding-end-md u-padding-start-md">
                        {PlaceOrderButton}
                    </div>

                    {/* This is the FIXED positioned "Place Your Order" container */}
                    <div
                        className={`t-checkout-payment__fixed-place-order ${isFixedPlaceOrderShown && 't--show'}`}
                        tabIndex="-1"
                        aria-hidden="true"
                    >
                        <div className="u-padding-md u-bg-color-neutral-00 u-text-align-center">
                            {PlaceOrderButton}
                            <p className="u-margin-top-md">
                                Total: <strong>{orderTotal}</strong>
                            </p>
                        </div>
                    </div>

                    <div className="u-padding-top-lg u-padding-bottom-lg u-text-align-center">
                        <Image
                            src={getAssetUrl('static/img/checkout/verisign-mcafee-secure.png')}
                            alt="Verisign and McAfee Secure"
                            height="38px"
                            width="150px"
                        />
                    </div>
                </div>
            </div>
        )
    }
}

OrderSummary.propTypes = {
    /**
     * Cart item data
     */
    cartItems: PropTypes.array,

    /**
     * Shipping rate calculated in cart
     */
    cartshippingRate: PropTypes.string,

    /**
     * Amount of the discount
     */
    discountAmount: PropTypes.string,

    /**
     * Label of the discount
     */
    discountLabel: PropTypes.string,

    /**
     * Whether the fixed 'Place Order' container displays
     */
    isFixedPlaceOrderShown: PropTypes.bool,

    /**
     * Whether the spinner displays for 'Place Order' button
     */
    isLoading: PropTypes.bool,

    /**
     * The total cost of the order
     */
    orderTotal: PropTypes.string,

    /**
     * Removes applied promo code
     */
    removePromoCode: PropTypes.func,

    /**
     * Shipping rate label
     */
    shippingLabel: PropTypes.string,

    /**
     * Shipping rate amount calculated in shipping step
     */
    shippingRate: PropTypes.string,

    /**
     * Submits payment
     */
    submitPayment: PropTypes.func,

    /**
     * Total of all cart items (excluding shipping and taxes)
     */
    subtotal: PropTypes.string,

    /**
     * Total item count in cart
     */
    summaryCount: PropTypes.number,

    /**
     * Tax amount
     */
    taxAmount: PropTypes.string,

    /**
     * Handle scroll to toggle fixed 'Place Order' container
     */
    toggleFixedPlaceOrder: PropTypes.func
}

const mapStateToProps = createPropsSelector({
    cartItems: cartSelectors.getCartItems,
    cartshippingRate: cartSelectors.getShippingAmount,
    discountAmount: cartSelectors.getDiscountAmount,
    discountLabel: cartSelectors.getDiscountLabel,
    subtotal: cartSelectors.getSubtotal,
    orderTotal: cartSelectors.getOrderTotal,
    shippingRate: getSelectedShippingRate,
    shippingLabel: getSelectedShippingLabel,
    taxAmount: cartSelectors.getTax,
    summaryCount: cartSelectors.getCartSummaryCount,
    isFixedPlaceOrderShown: selectors.getIsFixedPlaceOrderShown,
    isLoading: selectors.getIsLoading
})

const mapDispatchToProps = {
    toggleFixedPlaceOrder: checkoutPaymentActions.toggleFixedPlaceOrder,
    removePromoCode,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderSummary)
