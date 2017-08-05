/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import Immutable from 'immutable'
import React from 'react'
import ConnectedEstimateShippingReduxForm, {CartEstimateShippingModal} from './container.jsx'
import CountrySelect from '../../components/country-select'
import RegionField from '../../components/region-field'
import {Field} from 'redux-form'
import {Provider} from 'react-redux'
import {noop} from 'progressive-web-sdk/dist/utils/utils'
import {mount, shallow} from 'enzyme'

const regions = [{value: 'R1', label: 'region 1'}, {value: 'R2', label: 'region 2'}]
const store = {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => ({
        modals: Immutable.Map(),
        checkout: Immutable.fromJS({
            locations: {
                regions
            },
        }),
        form: {
            estimateShipping: {}
        },
        ui: {
            cart: Immutable.fromJS({})
        }
    })
}
const testProps = {
    stateProvinces: regions,
    onSubmit: noop,
    handleSubmit: noop,
    cart: {}
}

test('renders without errors', () => {
    const wrapper = mount(
        <Provider store={store}>
            <ConnectedEstimateShippingReduxForm onSubmit={noop} />
        </Provider>
    )

    expect(wrapper.length).toBe(1)
})

const ROOT_CLASS = 'm-cart__estimate-shipping-modal'

test('renders the component class correctly', () => {
    const wrapper = shallow(<CartEstimateShippingModal {...testProps} />)

    expect(wrapper.hasClass(ROOT_CLASS)).toBe(true)
})

test('renders the countries and state/provinces', () => {
    const wrapper = shallow(<CartEstimateShippingModal {...testProps} />)

    const countrySelect = wrapper.find(CountrySelect)
    expect(countrySelect.length).toBe(1)

    const regionFields = wrapper.find(RegionField)
    expect(regionFields.length).toBe(1)
    expect(regionFields.prop('regions')).toEqual(testProps.stateProvinces)


    const fields = wrapper.find(Field)

    expect(fields.length).toBe(1)
})
