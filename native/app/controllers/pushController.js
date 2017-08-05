/* global MESSAGING_SITE_ID */

import Astro from 'progressive-app-sdk/astro-full'

import PushPlugin from 'progressive-app-sdk/plugins/pushPlugin'
import AlertViewPlugin from 'progressive-app-sdk/plugins/alertViewPlugin'
import EngagementController from 'progressive-app-sdk/controllers/engagementController'

import baseConfig from '../config/baseConfig'

const PushController = function(pushPlugin) {
    this.plugin = pushPlugin

    this.plugin.on('messageReceivedWhenAppIsOpen', (params) => {
        const config = {
            title: params.title,
            text: params.message,
            okButton: 'OK',
            cancelButton: 'Cancel'
        }

        AlertViewPlugin.alert(config).then((okButtonPressed) => {
            if (okButtonPressed) {
                this.plugin.messageClickedWhenAppIsOpen(params)
            }
        })
    })
}

PushController.init = async function() {
    const pushSiteId = MESSAGING_SITE_ID    // replaced at build time
    const mobifySlugName = 'progressive-web-scaffold'

    const engagementPromise = EngagementController.init(mobifySlugName, baseConfig.baseURL)
    const pushPlugin = await PushPlugin.init(pushSiteId, engagementPromise)

    if (Astro.isRunningInAndroidApp()) {
        const notificationIconPath = 'file:///push_notification_icon.png'
        await pushPlugin.setNotificationIconPath(notificationIconPath)
    }

    return new PushController(pushPlugin)
}

PushController.prototype.subscribeTest = async function() {
    const subscriptionStatus = await this.plugin.getSubscriptionStatus()
    if (subscriptionStatus.canSubscribe) {
        this.plugin.subscribeTest()
    }
}

PushController.prototype.subscribe = async function() {
    const subscriptionStatus = await this.plugin.getSubscriptionStatus()
    if (subscriptionStatus.canSubscribe) {
        this.plugin.subscribe()
    }
}

export default PushController
