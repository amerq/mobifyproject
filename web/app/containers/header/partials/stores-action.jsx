/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import Button from 'progressive-web-sdk/dist/components/button'
import IconLabel from 'progressive-web-sdk/dist/components/icon-label'
import {HeaderBarActions} from 'progressive-web-sdk/dist/components/header-bar'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'

import {LOCATION_URL} from '../../app/constants'

const StoresAction = ({innerButtonClassName}) => (
    <HeaderBarActions>
        <Button
            innerClassName={innerButtonClassName}
            className="t-header__link"
            href={LOCATION_URL}
            data-analytics-name={UI_NAME.showStoreLocator}
        >
            <IconLabel label="Stores" iconName="map" iconSize="medium" />
        </Button>
    </HeaderBarActions>
)

StoresAction.propTypes = {
    innerButtonClassName: PropTypes.string
}

export default StoresAction
