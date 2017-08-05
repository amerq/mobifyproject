import HeaderBarPlugin from 'progressive-app-sdk/plugins/headerBarPlugin'
import cartConfig from '../config/cartConfig'
import BackboneEvents from 'vendor/backbone-events'
import Astro from 'progressive-app-sdk/astro-full'

const CartHeaderController = function(headerBar) {
    this.viewPlugin = headerBar
}

CartHeaderController.init = async function() {
    const headerBar = await HeaderBarPlugin.init()
    await headerBar.setRightIcon(cartConfig.closeIcon.imageUrl, cartConfig.closeIcon.id)
    await headerBar.setTextColor(cartConfig.colors.textColor)
    await headerBar.setBackgroundColor(cartConfig.colors.backgroundColor)
    await headerBar.setCenterIcon(cartConfig.shoppingCart.logoUrl, cartConfig.shoppingCart.id)
    await headerBar.setOpaque()

    let cartHeaderController = new CartHeaderController(headerBar)
    cartHeaderController = Astro.Utils.extend(cartHeaderController, BackboneEvents)

    headerBar.on(`click:${cartConfig.closeIcon.id}`, () => {
        cartHeaderController.close()
    })

    headerBar.on('click:back', () => {
        cartHeaderController.back()
    })

    return cartHeaderController
}

CartHeaderController.prototype.close = function() {
    this.trigger('close')
}

CartHeaderController.prototype.back = function() {
    this.trigger('back')
}

export default CartHeaderController
