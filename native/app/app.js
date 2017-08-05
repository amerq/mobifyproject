/* global AstroNative */

// Astro
import Application from 'progressive-app-sdk/application'
import MobifyPreviewPlugin from 'progressive-app-sdk/plugins/mobifyPreviewPlugin'
import PreviewController from 'progressive-app-sdk/controllers/previewController'
import Astro from 'progressive-app-sdk/astro-full'

// Local
import AppRpc from './global/app-rpc'
import baseConfig from './config/baseConfig'
import TabBarController from './controllers/tabBarController'
import {getInitialTabId} from './config/tabBarConfig'
import OnboardingModalController from './onboarding/onboardingModalController'

window.run = async function() {
    const runApp = async function() {
        const onboardingModalController = await OnboardingModalController.init()

        // The onboarding modal can be configured to show only once
        // (on first launch) by setting `{forced: false}` as the
        // parameter for onboardingModalController.show()
        onboardingModalController.show({forced: true})

        const tabBarController = await TabBarController.init()
        await Application.setMainViewPlugin(tabBarController.viewPlugin)

        const initialTabId = getInitialTabId()
        if (initialTabId) {
            tabBarController.selectTab(initialTabId)
        }

        Astro.registerRpcMethod(AppRpc.names.registerShow, [], () => {
            onboardingModalController.hide()
            tabBarController.showRegistration()
        })

        Astro.registerRpcMethod(AppRpc.names.signInShow, [], () => {
            onboardingModalController.hide()
            tabBarController.showSignIn()
        })

        // Android hardware back
        const setupHardwareBackButton = (alternativeBackFunction) => {
            Application.on('backButtonPressed', () => {
                alternativeBackFunction()
            })
        }

        setupHardwareBackButton(tabBarController.backActiveItem.bind(tabBarController))

        Application.dismissLaunchImage()
    }

    // Preview support
    const runAppPreview = async () => {
        const previewPlugin = await MobifyPreviewPlugin.init()
        await previewPlugin.preview(baseConfig.baseURL, baseConfig.previewBundle)
        runApp()
    }

    const initalizeAppWithAstroPreview = async () => {
        const previewController = await PreviewController.init()

        Application.on('previewToggled', () => {
            previewController.presentPreviewAlert()
        })

        const previewEnabled = await previewController.isPreviewEnabled()
        if (previewEnabled) {
            runAppPreview()
        } else {
            runApp()
        }
    }

    if (AstroNative.Configuration.ASTRO_PREVIEW) {
        initalizeAppWithAstroPreview()
    } else {
        runApp()
    }
}

// Comment out next line for JS debugging
window.run()
