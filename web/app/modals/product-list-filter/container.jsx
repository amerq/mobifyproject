/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {PRODUCT_LIST_FILTER_MODAL} from '../constants'
import {closeModal, openModal} from 'progressive-web-sdk/dist/store/modals/actions'
import {changeFilterTo} from '../../store/categories/actions'
import {isModalOpen} from 'progressive-web-sdk/dist/store/modals/selectors'
import * as selectors from '../../containers/product-list/selectors'

import {Accordion, AccordionItem} from 'progressive-web-sdk/dist/components/accordion'
import Button from 'progressive-web-sdk/dist/components/button'
import Sheet from 'progressive-web-sdk/dist/components/sheet'
import {HeaderBar, HeaderBarActions, HeaderBarTitle} from 'progressive-web-sdk/dist/components/header-bar'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'
import IconLabelButton from '../../components/icon-label-button'

const FILTER_QUERY = 'filter_is_open'

class ProductListFilterModal extends React.Component {
    componentDidMount() {
        if (window.location.search.indexOf(FILTER_QUERY) > 0) {
            this.props.openModal()
        }
    }

    render() {
        const {closeModal, filters, isOpen, changeFilter, duration} = this.props

        return (
            <Sheet
                className="m-product-list__filter-modal"
                open={isOpen}
                onDismiss={closeModal}
                duration={duration}
                maskOpacity={0.7}
                effect="slide-right"
                shrinkToContent={false}
                coverage="85%"
            >
                <HeaderBar>
                    <HeaderBarTitle className="u-flex u-padding-start u-text-align-start">
                        <h1 className="u-h3 u-text-uppercase">
                            <span className="u-text-weight-extra-light">Filter Results By</span>
                        </h1>
                    </HeaderBarTitle>

                    <HeaderBarActions>
                        <IconLabelButton iconName="close" label="" onClick={closeModal} analyticsName={UI_NAME.dismissModal}>Close</IconLabelButton>
                    </HeaderBarActions>
                </HeaderBar>

                <Accordion initialOpenItems={[0]}>
                    {filters.map(({label, ruleset, kinds}) =>
                        <AccordionItem header={label} key={ruleset} className="u-padding-0">
                            {/* disabling a11y lints because the below handler is
                                for the bubbled events from the children button elements */}
                            {/* eslint-disable
                                jsx-a11y/click-events-have-key-events,
                                jsx-a11y/onclick-has-focus,
                                jsx-a11y/onclick-has-role,
                                jsx-a11y/no-static-element-interactions */}
                            <div
                                className="m-product-list__filter-modal-items"
                                role="presentation"
                            >
                                {kinds.map(({count, label, query}) =>
                                    <Button
                                        key={query}
                                        className="pw--link u-width-full u-text-letter-spacing-normal"
                                        innerClassName="u-justify-start"
                                        id={query}
                                        onClick={() => {
                                            changeFilter(query)
                                            closeModal()
                                        }}
                                        data-analytics-name={UI_NAME.showFilters}
                                    >
                                        <div>
                                            <span className="u-color-brand">{label}</span> <span className="u-color-neutral-40">({count})</span>
                                        </div>
                                    </Button>
                                )}
                            </div>
                        </AccordionItem>
                    )}
                </Accordion>
            </Sheet>
        )
    }
}

ProductListFilterModal.propTypes = {
    /**
     * Updates the current filter
     */
    changeFilter: PropTypes.func,

    /**
     * A function used to set the filter sheet's state to closed
     */
    closeModal: PropTypes.func,

    /**
     * Duration will define the time the animation takes to complete.
     */
    duration: PropTypes.number,

    /*
     * An array of filters
     */
    filters: PropTypes.array,

    /**
     * Whether the modal is open or not
     */
    isOpen: PropTypes.bool,

    /**
     * A function used to set the filter sheet's state to open
     */
    openModal: PropTypes.func,
}

const mapStateToProps = createPropsSelector({
    filters: selectors.getFilters,
    isOpen: isModalOpen(PRODUCT_LIST_FILTER_MODAL)
})

const mapDispatchToProps = {
    changeFilter: changeFilterTo,
    closeModal: () => closeModal(PRODUCT_LIST_FILTER_MODAL, UI_NAME.filters),
    openModal: () => openModal(PRODUCT_LIST_FILTER_MODAL, UI_NAME.filters)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductListFilterModal)
