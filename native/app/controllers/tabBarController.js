import AnchoredLayoutPlugin from 'progressive-app-sdk/plugins/anchoredLayoutPlugin'
import TabBarPlugin from 'progressive-app-sdk/plugins/tabBarPlugin'
import Application from 'progressive-app-sdk/application'

import {tabBarConfig} from '../config/tabBarConfig'
import baseConfig from '../config/baseConfig'

import CartModalController from './cartModalController'
import TabController from './tabController'
import AccountTabController from './accountTabController'
import AppEvents from '../global/app-events'

const TabBarController = function(tabBar, layout, tabControllers) {
    this.tabBar = tabBar
    this.viewPlugin = layout

    this.activeTabId = Object.keys(tabControllers).find((key) => {
        return tabControllers[key].isActive
    })

    this._tabControllers = tabControllers
    this.accountTabController = tabControllers.account

    this.tabBar.on('itemSelect', (data) => this._tabSelected(data.id))

    AppEvents.on(AppEvents.signInShow, () => this.showSignIn())

    AppEvents.on(AppEvents.shopShow, () => this.selectTab('shop'))
}

TabBarController.init = async function() {
    const tabBar = await TabBarPlugin.init()
    await tabBar.setColor(baseConfig.colors.primaryColor)
    const layout = await AnchoredLayoutPlugin.init()
    const cartModalController = await CartModalController.init()

    const tabControllers = {}

    const tabControllerPromises = tabBarConfig.items.map((item) => {
        if (item.type === 'custom') {
            if (item.id === 'account') {
                return AccountTabController.init(cartModalController).then((controller) => {
                    tabControllers[item.id] = controller
                })
            } else {
                return null
            }
        } else {
            return TabController.init(item, cartModalController).then((controller) => {
                tabControllers[item.id] = controller
            })
        }
    })

    await Promise.all(tabControllerPromises)

    await tabBar.setItems(tabBarConfig.items)
    await layout.addBottomView(tabBar)

    return new TabBarController(tabBar, layout, tabControllers)
}

TabBarController.prototype._tabSelected = function(tabId) {
    const newTabController = this._tabControllers[tabId]

    if (this.activeTabId !== tabId) {
        const oldTabController = this.getActiveController()
        if (oldTabController) {
            oldTabController.deactivate()
        }
        this.activeTabId = tabId
        this.viewPlugin.setContentView(newTabController.viewPlugin)
    }
    newTabController.activate()
}

TabBarController.prototype.selectTab = function(tabId) {
    return this.tabBar.selectItem(tabId)
}

TabBarController.prototype.getActiveController = function() {
    if (!this.activeTabId) {
        return null
    }
    return this._tabControllers[this.activeTabId]
}

TabBarController.prototype.showRegistration = function() {
    this.tabBar.selectItem('account')
    this.accountTabController.showRegistration()
}

TabBarController.prototype.showSignIn = function() {
    this.tabBar.selectItem('account')
    this.accountTabController.showSignIn()
}

TabBarController.prototype.backActiveItem = async function() {
    if (await this.canGoBack()) {
        const activeTab = this.getActiveController()
        activeTab.back()
    } else {
        Application.closeApp()
    }
}

TabBarController.prototype.canGoBack = async function() {
    const activeTab = this.getActiveController()
    return await activeTab.canGoBack()
}

export default TabBarController
