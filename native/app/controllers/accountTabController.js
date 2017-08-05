import WebViewPlugin from 'progressive-app-sdk/plugins/webViewPlugin'
import AnchoredLayoutPlugin from 'progressive-app-sdk/plugins/anchoredLayoutPlugin'
import SegmentedPlugin from 'progressive-app-sdk/plugins/segmentedPlugin'

import Astro from 'progressive-app-sdk/astro-full'
import TabHeaderController from './tabHeaderController'
import accountConfig from '../config/accountConfig'

import AppEvents from '../global/app-events'
import AppRpc from '../global/app-rpc'

const AccountTabController = function(viewPlugin, headerController, layout, segmentedView, signInView, registerView) {
    this.viewPlugin = viewPlugin
    this.headerController = headerController
    this.layout = layout
    this.segmentedView = segmentedView
    this.signInView = signInView
    this.registerView = registerView
    this.isLoggedIn = false

    Astro.registerRpcMethod(AppRpc.names.loggedIn, [], () => {
        if (this.isLoggedIn) {
            return
        }
        this.reload()
        this.layout.hideTopViews()
        this.isLoggedIn = true
        this.layout.setContentView(signInView)
        AppEvents.trigger(AppEvents.didSignIn)
    })

    Astro.registerRpcMethod(AppRpc.names.guest, [], () => {
        if (!this.isLoggedIn) {
            return
        }
        this.reload()
        this.layout.showTopViews()
        this.isLoggedIn = false
    })
}

AccountTabController.init = async function(cartModalController) {
    const viewPlugin = await AnchoredLayoutPlugin.init()                            // has the header and the layout with the segmentedView
    const headerController = await TabHeaderController.init(cartModalController)    // header
    const layout = await AnchoredLayoutPlugin.init()                                // has  the segmented view and the web views
    const segmentedView = await SegmentedPlugin.init()
    const signInView = await WebViewPlugin.init()
    const registerView = await WebViewPlugin.init()

    await viewPlugin.addTopView(headerController.viewPlugin)
    await viewPlugin.setContentView(layout)

    await layout.setContentView(signInView)
    await layout.addTopView(segmentedView)

    signInView.navigate(accountConfig.signIn.url)
    registerView.navigate(accountConfig.register.url)

    await segmentedView.setItems([
        accountConfig.signIn,
        accountConfig.register
    ])

    await segmentedView.setColor(accountConfig.color)

    segmentedView.on('itemSelect', (params) => {
        layout.clearContentView()
        switch (params.key) {
            case accountConfig.signIn.key:
                layout.setContentView(signInView)
                break
            case accountConfig.register.key:
                layout.setContentView(registerView)
                break
        }
    })
    return new AccountTabController(viewPlugin, headerController, layout, segmentedView, signInView, registerView)
}

AccountTabController.prototype.showRegistration = async function() {
    await this.segmentedView.selectItem(accountConfig.register.key)
}

AccountTabController.prototype.showSignIn = async function() {
    await this.segmentedView.selectItem(accountConfig.signIn.key)
}

AccountTabController.prototype.reload = function() {
    this.signInView.navigate(accountConfig.signIn.url)
    this.registerView.navigate(accountConfig.register.url)
}

AccountTabController.prototype.activate = () => {} // noop, there is no popping to root in the account tab
AccountTabController.prototype.deactivate = () => {} // noop, there is no popping to root in the account tab

export default AccountTabController
