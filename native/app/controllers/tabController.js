import Promise from 'bluebird'

import AnchoredLayoutPlugin from 'progressive-app-sdk/plugins/anchoredLayoutPlugin'
import NavigationPlugin from 'progressive-app-sdk/plugins/navigationPlugin'

import AppEvents from '../global/app-events'
import TabHeaderController from './tabHeaderController'

const TabController = function(tabItem, layout, navigationView, headerController) {
    this.tabItem = tabItem
    this.id = tabItem.id
    this.viewPlugin = layout
    this.navigationView = navigationView
    this.headerController = headerController

    this.isActive = false
    this.navigationView.navigateToUrl(tabItem.rootUrl)
}

TabController.init = async function(tabItem, cartModalController) {
    const [
        layout,
        navigationView,
        headerController,
    ] = await Promise.all([
        AnchoredLayoutPlugin.init(),
        NavigationPlugin.init(),
        TabHeaderController.init(cartModalController)
    ])

    await layout.addTopView(headerController.viewPlugin)
    await layout.setContentView(navigationView)
    await navigationView.setHeaderBar(headerController.viewPlugin)

    navigationView.defaultWebViewPluginOptions = {
        disableLoader: []
    }

    headerController.viewPlugin.on('click:back', () => {
        navigationView.back()
    })

    navigationView.on('cart:count-updated', (data) => {
        AppEvents.trigger(AppEvents.updateCart, data)
    })

    navigationView.on('open:cart-modal', () => {
        headerController.showCartModal()
    })

    AppEvents.on(AppEvents.cartNeedsUpdate, () => {
        navigationView.trigger('cart:needs-update')
    })

    AppEvents.on(AppEvents.didSignIn, async () => {
        navigationView.trigger('cart:needs-update')
    })

    return new TabController(tabItem, layout, navigationView, headerController)
}

TabController.prototype.reload = async function() {
    const tabCanGoBack = await this.navigationView.canGoBack()
    const topPlugin = await this.navigationView.getTopPlugin()

    // In the case where this tab failed its initial navigation
    // a reload is insufficient so instead, we navigate to
    // our root URL.
    if (!tabCanGoBack) {
        // If we have never even tried to navigate, we might not
        // even have a top plugin...
        if (topPlugin && typeof topPlugin.navigate === 'function') {
            topPlugin.navigate(this.tabItem.rootUrl)
        } else {
            this.navigationView.navigateToUrl(this.tabItem.rootUrl)
        }
    } else if (typeof topPlugin.reload === 'function') {
        topPlugin.reload()
    } else {
        console.log(`Top plugin on ${this.tabItem.title} tab does not support reload!`)
    }
}

TabController.prototype.activate = function() {
    if (this.isActive) {
        this.navigationView.popToRoot({animated: true})
    } else {
        this.isActive = true
    }
}

TabController.prototype.deactivate = function() {
    this.isActive = false
}

TabController.prototype.canGoBack = async function() {
    return await this.navigationView.canGoBack()
}

TabController.prototype.back = function() {
    this.navigationView.back()
}

export default TabController
