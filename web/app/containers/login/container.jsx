/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'progressive-web-sdk/dist/routing'
import template from '../../template'

import {navigateToSection} from 'progressive-web-sdk/dist/integration-manager/account/commands'

import SignInPanel from './partials/signin-panel'
import RegisterPanel from './partials/register-panel'

import {Tabs, TabsPanel} from 'progressive-web-sdk/dist/components/tabs'

import {
    SIGN_IN_SECTION,
    REGISTER_SECTION,
    SECTION_NAMES,
    INDEX_FOR_SECTION,
    SECTION_FOR_INDEX
} from './constants'

import * as AstroIntegration from '../../utils/astro-integration'

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.onChangeTab = this.onChangeTab.bind(this)
    }

    onChangeTab(index) {
        this.props.navigateToSection(
            this.props.router,
            this.props.routes,
            SECTION_FOR_INDEX[index]
        )
    }

    render() {
        const {
            route: {
                routeName
            }
        } = this.props

        if (!AstroIntegration.isRunningInAstro) {
            return (
                <div className="t-login">
                    <div className="u-bg-color-neutral-10 u-padding-md u-padding-top-lg u-padding-bottom-lg u-box-shadow-inset">
                        <h1 className="u-text-uppercase u-text-weight-medium">
                            Customer Login
                        </h1>
                    </div>

                    <Tabs activeIndex={INDEX_FOR_SECTION[routeName]} className="t-login__navigation" onChange={this.onChangeTab}>
                        <TabsPanel title={SECTION_NAMES[SIGN_IN_SECTION]}>
                            <SignInPanel />
                        </TabsPanel>
                        <TabsPanel title={SECTION_NAMES[REGISTER_SECTION]}>
                            <RegisterPanel />
                        </TabsPanel>
                    </Tabs>
                </div>
            )
        } else if (routeName === SIGN_IN_SECTION) {
            return (
                <div className="t-login">
                    <SignInPanel />
                </div>
            )
        } else if (routeName === REGISTER_SECTION) {
            return (
                <div className="t-login">
                    <RegisterPanel />
                </div>
            )
        } else {
            console.log('route unsupported: ', routeName)
            return null
        }
    }
}

const mapDispatchToProps = {
    navigateToSection
}

Login.propTypes = {
    navigateToSection: PropTypes.func,
    route: PropTypes.object,
    router: PropTypes.object,
    routes: PropTypes.array
}

export default template(connect(null, mapDispatchToProps)(withRouter(Login)))
