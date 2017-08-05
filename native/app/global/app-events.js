import Astro from 'progressive-app-sdk/astro-full'
import BackboneEvents from 'vendor/backbone-events'

const AppEvents = Astro.Utils.extend({}, BackboneEvents)

AppEvents.signInShow = 'sign-in:show'
AppEvents.didSignIn = 'user:did-sign-in'
AppEvents.shopShow = 'shop:show'
AppEvents.updateCart = 'cart:updated'
AppEvents.cartNeedsUpdate = 'cart:needs-update'

export default AppEvents
