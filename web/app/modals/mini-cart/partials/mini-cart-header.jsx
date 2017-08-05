/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'

import {HeaderBar, HeaderBarActions, HeaderBarTitle} from 'progressive-web-sdk/dist/components/header-bar'
import IconLabelButton from '../../../components/icon-label-button'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'

const MiniCartHeader = ({closeMiniCart}) => (
    <HeaderBar>
        <HeaderBarTitle className="u-flex u-padding-start u-text-align-start">
            <h2 className="u-text-family-header u-text-uppercase">
                <span className="u-text-weight-extra-light">Shopping</span> Cart
            </h2>
        </HeaderBarTitle>

        <HeaderBarActions>
            <IconLabelButton iconName="close" label="close" onClick={closeMiniCart} analyticsName={UI_NAME.dismissModal}>Close</IconLabelButton>
        </HeaderBarActions>
    </HeaderBar>
)

MiniCartHeader.propTypes = {
    closeMiniCart: PropTypes.func
}

export default MiniCartHeader
