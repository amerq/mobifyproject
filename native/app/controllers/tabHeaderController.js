import HeaderBarPlugin from 'progressive-app-sdk/plugins/headerBarPlugin'
import CounterBadgeController from 'progressive-app-sdk/controllers/counterBadgeController'

import AppEvents from '../global/app-events'
import baseConfig from '../config/baseConfig'
import cartConfig from '../config/cartConfig'

const TabHeaderController = function(headerBar, counterBadgeController, cartModalController) {
    this.viewPlugin = headerBar
    this.counterBadgeController = counterBadgeController
    this.cartModalController = cartModalController

    headerBar.on(`click:${cartConfig.cartIcon.id}`, async () => {
        this.showCartModal()
    })

    AppEvents.on(AppEvents.updateCart, (data) => {
        this.updateCounter(data.count)
    })
}

TabHeaderController.init = async function(cartModalController) {
    const headerBar = await HeaderBarPlugin.init()
    const counterBadgeController = await CounterBadgeController.init(cartConfig.cartIcon.imageUrl, 'headerId', {})
    const counterBadgePlugin = await counterBadgeController.generatePlugin()

    await headerBar.setCenterIcon(baseConfig.logoUrl, 'logo')
    await headerBar.setRightPlugin(counterBadgePlugin, cartConfig.cartIcon.id)
    await headerBar.setTextColor(baseConfig.colors.whiteColor)
    await headerBar.setBackgroundColor(baseConfig.colors.primaryColor)
    await headerBar.setOpaque()

    return new TabHeaderController(headerBar, counterBadgeController, cartModalController)
}

TabHeaderController.prototype.updateCounter = function(count) {
    this.counterBadgeController.updateCounterValue(count)
}

TabHeaderController.prototype.showCartModal = function() {
    this.cartModalController.show()
}

export default TabHeaderController
