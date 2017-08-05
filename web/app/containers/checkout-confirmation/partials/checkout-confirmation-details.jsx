/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {GRID_SETTINGS} from '../constants'
import {getIsLoggedIn} from '../../../store/user/selectors'
import * as selectors from '../selectors'

import {Grid, GridSpan} from 'progressive-web-sdk/dist/components/grid'
import Icon from 'progressive-web-sdk/dist/components/icon'
import CheckoutConfirmationForm from './checkout-confirmation-form'

/* eslint-disable react/prop-types */
const Checklist = ({children}) => (
    <div className="u-flexbox u-align-center u-padding-bottom">
        <Icon name="check" className="u-flex-none u-margin-end-md u-color-brand" />
        <div className="u-flex">{children}</div>
    </div>
)
/* eslint-enable react/prop-types */

const CheckoutConfirmationDetails = (props) => {
    const {
        isLoggedIn,
        isRegistrationFormHidden,
    } = props

    return (!isLoggedIn && !isRegistrationFormHidden) && (
        <Grid className="u-center-piece">
            <GridSpan {...GRID_SETTINGS}>
                <div className="t-checkout-confirmation__heading u-padding-md u-padding-top-lg">
                    <h2 className="u-h4 u-text-uppercase">Save Your Address Details</h2>
                </div>
            </GridSpan>

            <GridSpan {...GRID_SETTINGS}>
                <div className="t-checkout-confirmation__card u-bg-color-neutral-00 u-border-light-top u-border-light-bottom u-padding-md u-padding-top-lg u-padding-bottom-lg">
                    <div className="u-margin-bottom-lg">
                        <Checklist>
                            <strong>Check out faster</strong> next time
                        </Checklist>

                        <Checklist>
                            <strong>Track progress</strong> of your orders
                        </Checklist>

                        <Checklist>
                            Access your <strong>order history</strong>
                        </Checklist>
                    </div>

                    <CheckoutConfirmationForm />
                </div>
            </GridSpan>
        </Grid>
    )
}

CheckoutConfirmationDetails.propTypes = {
    isLoggedIn: PropTypes.bool,
    isRegistrationFormHidden: PropTypes.bool
}

const mapStateToProps = createPropsSelector({
    isLoggedIn: getIsLoggedIn,
    isRegistrationFormHidden: selectors.getIsRegistrationFormHidden
})

export default connect(mapStateToProps)(CheckoutConfirmationDetails)
