/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import * as ReduxForm from 'redux-form'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getProductVariationCategories} from 'progressive-web-sdk/dist/store/products/selectors'
import {onVariationChange} from '../actions'

import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import Field from 'progressive-web-sdk/dist/components/field'

const ProductDetailsVariations = ({variations, onVariationChange}) => (
    <div className={variations.length > 0 && 'u-margin-top-lg'}>
        {variations.map(({id, label, values = []}) => (
            <FieldRow key={id}>
                <ReduxForm.Field
                    label={label}
                    name={id}
                    component={Field}
                    className="pw--has-select"
                    customEventHandlers={{onChange: onVariationChange}}
                >
                    <select name={id}>
                        <option disabled value="">{label}</option>

                        {values.map(({label, value}) =>
                            <option value={value} key={value}>
                                {label}
                            </option>
                        )}
                    </select>
                </ReduxForm.Field>
            </FieldRow>
        ))}
    </div>
)

ProductDetailsVariations.propTypes = {
    variations: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string
        }))
    })),
    onVariationChange: PropTypes.func
}

const mapStateToProps = createPropsSelector({
    variations: getProductVariationCategories
})

const mapDispatchToProps = {
    onVariationChange
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductDetailsVariations)
