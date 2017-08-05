/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'

import Button from 'progressive-web-sdk/dist/components/button'
import Sheet from 'progressive-web-sdk/dist/components/sheet'

import {OFFLINE_MODAL} from '../constants'
import {closeModal} from 'progressive-web-sdk/dist/store/modals/actions'
import {isModalOpen} from 'progressive-web-sdk/dist/store/modals/selectors'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'

const OfflineModal = (props, context) => {
    const {closeModal, isOpen, duration} = props
    const {reload} = context

    return (
        <Sheet
            open={isOpen}
            onDismiss={closeModal}
            duration={duration}
            maskOpacity={0.7}
            effect="modal-center"
            shrinkToContent
        >
            <div className="u-padding-md u-text-align-center">
                <div className="u-margin-top u-text-weight-bold">Offline mode</div>
                <p className="u-margin-top-md u-margin-bottom-lg">
                    Some content may not appear as expected. You can continue to navigate to pages
                    you have already visited, but in in order to load new content you must re-establish
                    your internet connection.
                </p>
                <Button
                    className="pw--secondary u-width-full u-text-uppercase u-margin-bottom"
                    onClick={reload}
                    data-analytics-name={UI_NAME.retryConnection}
                >
                    Retry connection
                </Button>
                <Button
                    className="pw--tertiary u-width-full u-text-uppercase"
                    onClick={closeModal}
                    data-analytics-name={UI_NAME.continueOffline}
                >
                    Continue offline
                </Button>
            </div>
        </Sheet>
    )
}

OfflineModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    /**
     * Duration will define the time the animation takes to complete.
     */
    duration: PropTypes.number
}

OfflineModal.contextTypes = {
    /**
     * Method that attempts to fetch the page again
     * context source: /web/app/containers/app/container  getChildContext()
     */
    reload: PropTypes.func
}

const mapStateToProps = createPropsSelector({
    isOpen: isModalOpen(OFFLINE_MODAL)
})

const mapDispatchToProps = {
    closeModal: () => closeModal(OFFLINE_MODAL, UI_NAME.offline)
}

export default connect(mapStateToProps, mapDispatchToProps)(OfflineModal)
