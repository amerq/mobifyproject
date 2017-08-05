/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* global MESSAGING_ENABLED */
/* eslint-disable import/namespace */
/* eslint-disable import/named */
import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import classNames from 'classnames'
import WebFont from 'webfontloader'
import {isRunningInAstro} from '../../utils/astro-integration'

import {initApp} from 'progressive-web-sdk/dist/integration-manager/app/commands'

import {hidePreloader} from 'progressive-web-sdk/dist/preloader'
import DangerousHTML from 'progressive-web-sdk/dist/components/dangerous-html'
import SkipLinks from 'progressive-web-sdk/dist/components/skip-links'
import {removeNotification} from 'progressive-web-sdk/dist/store/notifications/actions'
import Header from '../../containers/header/container'
import Footer from '../../containers/footer/container'
import NativeConnector from '../native-connector/container'
import * as appActions from './actions'
import * as selectors from './selectors'
import {getNotifications} from '../../store/selectors'
import {getPageFetchError, hasFetchedCurrentPath} from 'progressive-web-sdk/dist/store/offline/selectors'
import {getModals} from 'progressive-web-sdk/dist/store/modals/selectors'

import PushMessagingController from 'progressive-web-sdk/dist/components/push-messaging-controller'
import DefaultAsk from 'progressive-web-sdk/dist/components/default-ask'

import ModalManager from '../../modals'
import NotificationManager from '../../components/notification-manager'

import {prefetchTemplateChunks} from '../templates'


// Offline support
import Offline from '../offline/container'
import OfflineBanner from '../offline/partials/offline-banner'


class App extends React.Component {
    constructor(props) {
        super(props)

        this.hidePreloaderWhenCSSIsLoaded = this.hidePreloaderWhenCSSIsLoaded.bind(this)
    }

    componentDidMount() {
        this.hidePreloaderWhenCSSIsLoaded()
        this.props.fetchSvgSprite()
        this.props.initApp()
        WebFont.load({
            google: {
                families: ['Oswald:200,400']
            }
        })

        // Prefetch & cache code-splitted chunks when the browser is
        // at the end of frame to allow for quick page transitions
        // and graceful failure when offline.
        prefetchTemplateChunks()
    }

    getChildContext() {
        // Expose reload func for offline modals
        const {children, fetchPage} = this.props
        const routeProps = children.props.route
        return {reload: () => fetchPage(routeProps.fetchAction, window.location.href, routeProps.routeName)}
    }

    hidePreloaderWhenCSSIsLoaded() {
        if (window.Progressive.stylesheetLoaded) {
            hidePreloader()

            // Only after we loaded the CSS can confidently unhide the app.
            // This is necessary, because showing the app by default might show
            // a flash of an ugly, unstyled app until the CSS finally loads.
            this.props.toggleHideApp(false)
        } else {
            setTimeout(this.hidePreloaderWhenCSSIsLoaded, 100)
        }
    }

    render() {
        const {
            children,
            fetchError,
            hasFetchedCurrentPath,
            notifications,
            removeNotification,
            sprite,
            hideApp,
            isModalOpen,
        } = this.props

        const routeProps = children.props.route
        const CurrentHeader = routeProps.Header || Header
        const CurrentFooter = routeProps.Footer || Footer

        const skipLinksItems = [
            // Customize your list of SkipLinks here. These are necessary to
            // achieve compliance with WCAG 2.0's guideline 2.4.1: "Bypass
            // Blocks". Compliance is required under some laws, such as the ADA
            // (Americans with Disabilities Act). For more details, see here:
            //
            // @URL: https://www.w3.org/TR/WCAG20-TECHS/G1.html
            {target: '#app-main', label: 'Skip to content'},
            {target: '#header-navigation', label: 'Skip to main navigation'},
            {target: '#app-footer', label: 'Skip to footer'},
        ]

        const appClassNames = classNames('t-app', `t-app--${routeProps.routeName}`)

        const messagingEnabled = MESSAGING_ENABLED  // replaced at build time

        let hideModalBackground = 'false'

        for (const modal in isModalOpen) {
            if (isModalOpen[modal]) {
                hideModalBackground = 'true'
            }
        }

        return (
            <div
                id="app"
                className={appClassNames}
                style={{display: hideApp ? 'none' : 'initial'}}
            >
                <DangerousHTML html={sprite}>
                    {(htmlObj) => <div hidden dangerouslySetInnerHTML={htmlObj} />}
                </DangerousHTML>

                <div aria-hidden={hideModalBackground}>
                    <SkipLinks items={skipLinksItems} />

                    <div id="app-wrap" className="t-app__wrapper u-flexbox u-direction-column">
                        {isRunningInAstro && <NativeConnector />}

                        {messagingEnabled && [
                            <PushMessagingController key="controller" dimScreenOnSystemAsk />,
                            <DefaultAsk key="ask" showOnPageCount={2} deferOnDismissal={1} />
                        ]}

                        <div id="app-header" className="u-flex-none" role="banner">
                            <CurrentHeader headerHasSignIn={routeProps.headerHasSignIn} />
                            {
                                // Only display banner when we are offline and have content to show
                                fetchError && hasFetchedCurrentPath && <OfflineBanner />
                            }

                            {notifications &&
                                <NotificationManager
                                    notifications={notifications}
                                    actions={{removeNotification}}
                                />
                            }

                        </div>

                        {
                            // Display main content if we have no network errors or
                            // if we've already got the content in the store
                            (!fetchError || hasFetchedCurrentPath) ?
                                <div className="u-flexbox u-flex u-direction-column">
                                    <main id="app-main" className="u-flex" role="main">
                                        {this.props.children}
                                    </main>

                                    <div id="app-footer" className="u-flex-none">
                                        <CurrentFooter />
                                    </div>
                                </div>
                            :
                                <Offline location={children.props.location} route={routeProps} />
                        }
                    </div>
                </div>

                <ModalManager />
            </div>
        )
    }
}

App.propTypes = {
    children: PropTypes.element.isRequired,
    fetchError: PropTypes.string,
    fetchPage: PropTypes.func,
    fetchSvgSprite: PropTypes.func,
    hasFetchedCurrentPath: PropTypes.bool,
    hideApp: PropTypes.bool,
    /**
     * The react-router history object
     */
    history: PropTypes.object,
    /**
    * Calls a command in the integration manager that initializes some app data
    */
    initApp: PropTypes.func,
    isModalOpen: PropTypes.object,
    notifications: PropTypes.array,
    removeNotification: PropTypes.func,
    /**
     * The SVG icon sprite needed in order for all Icons to work
     */
    sprite: PropTypes.string,
    toggleHideApp: PropTypes.func
}

App.childContextTypes = {
    reload: PropTypes.func
}

const mapStateToProps = createPropsSelector({
    notifications: getNotifications,
    fetchError: getPageFetchError,
    hasFetchedCurrentPath,
    isModalOpen: getModals,
    sprite: selectors.getSvgSprite,
    hideApp: selectors.getHideApp
})

const mapDispatchToProps = {
    removeNotification,
    fetchSvgSprite: appActions.fetchSvgSprite,
    toggleHideApp: appActions.toggleHideApp,
    fetchPage: (fetchAction, url, routeName) => fetchAction(url, routeName),
    initApp
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
