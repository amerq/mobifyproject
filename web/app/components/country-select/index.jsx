/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import classNames from 'classnames'
import * as ReduxForm from 'redux-form'
import Field from 'progressive-web-sdk/dist/components/field'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {connect} from 'react-redux'

import {getCountries} from '../../store/checkout/selectors'

import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'

/**
 * A field for selecting a country.
 */

const CountrySelect = ({
    className,
    countries
}) => {
    const classes = classNames('c-country-select', 'pw--has-select', className)

    return (
        <ReduxForm.Field
            className={classes}
            component={Field}
            name="countryId"
            label="Country"
        >
            <select data-analytics-name={UI_NAME.country}>
                {countries.map(({label, id}) => (
                    <option value={id} key={id}>
                        {label}
                    </option>
                ))}
            </select>
        </ReduxForm.Field>
    )
}


CountrySelect.defaultProps = {
    countries: []
}

CountrySelect.propTypes = {
    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

    /**
     * A list of the countries to be included
     */
    countries: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        id: PropTypes.string
    }))
}

const mapStateToProps = createPropsSelector({
    countries: getCountries
})

export default connect(mapStateToProps)(CountrySelect)
