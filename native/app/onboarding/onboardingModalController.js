/* global AstroNative, MESSAGING_ENABLED */

import Promise from 'bluebird'
import Astro from 'progressive-app-sdk/astro-full'
import ModalViewPlugin from 'progressive-app-sdk/plugins/modalViewPlugin'
import SettingsStore from 'progressive-app-sdk/settings-store'
import OnboardingController from './onboardingController'
import AppRpc from '../global/app-rpc'
import AppEvents from '../global/app-events'
import Application from 'progressive-app-sdk/application'
import PushController from '../controllers/pushController'

const OnboardingModalEvents = {
    // raised when onboarding modal is hidden
    onboardingHidden: 'onboarding:hidden',
    // raised when onboarding modal is displayed
    onboardingShown: 'onboarding:shown',
}

const OnboardingModalController = function(modalView, onboardingController) {
    this.isShowing = false
    this.modalView = modalView
    this.onboardingController = onboardingController
}

OnboardingModalController.init = async function() {
    const [
        modalView,
        onboardingController,
        pushController
    ] = await Promise.all([
        ModalViewPlugin.init(),
        OnboardingController.init(),
        // If messaging is not enabled, pushController will become null
        MESSAGING_ENABLED ? PushController.init() : Promise.resolve(null)
    ])

    modalView.setContentView(onboardingController.viewPlugin)

    // This registers a close handler on the header bar to dismiss
    // the modal. Without a header bar, the developer is responsible
    // for implementing a way to dismiss the modal.
    const onboardingModalController = new OnboardingModalController(modalView, onboardingController)

    // Onboarding modal RPCs
    Astro.registerRpcMethod(AppRpc.names.onboardingShow, [], () => {
        onboardingModalController.show({forced: false})
    })

    Astro.registerRpcMethod(AppRpc.names.onboardingHide, [], () => {
        onboardingModalController.hide()
    })

    Astro.registerRpcMethod(AppRpc.names.pushEnable, [], () => {
        // If pushController wasn't initialized, this becomes a no-op
        if (pushController) {
            if (AstroNative.Configuration.DEBUG) {
                pushController.subscribeTest()
            } else {
                pushController.subscribe()
            }
        }
    })

    return onboardingModalController
}

OnboardingModalController.prototype.show = async function(params) {
    params = Astro.Utils.extend({forced: false}, params)
    const isFirstRunKey = 'isFirstRunKey'

    const isFirstRun = await SettingsStore.get(isFirstRunKey) === null

    // Onboarding modal should be triggered when the app first runs
    if (isFirstRun || params.forced) {
        this.isShowing = true
        await this.modalView.show({animated: true})
        await Application.setStatusBarDarkText()

        AppEvents.on(OnboardingModalEvents.onboardingHidden, async () => {
            SettingsStore.set(isFirstRunKey, 'false')
            await Application.setStatusBarLightText()
        })
        AppEvents.trigger(OnboardingModalEvents.onboardingShown)
    }
}

OnboardingModalController.prototype.hide = function(param) {
    this.isShowing = false
    this.modalView.hide({animated: true})

    AppEvents.trigger(OnboardingModalEvents.onboardingHidden, param)
}

OnboardingModalController.prototype.isActiveItem = function() {
    return this.isShowing
}

OnboardingModalController.prototype.canGoBack = async function() {
    return await this.onboardingController.canGoBack()
}

export {OnboardingModalEvents}

export default OnboardingModalController
