/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

var reportsPath = process.env.CIRCLE_TEST_REPORTS || './tests/reports';
var screenshotsPath = process.env.CIRCLE_ARTIFACTS || './tests/screenshots';

var notificationSettings = {
    ALLOW: 1,
    BLOCK: 2
};

require('babel-core/register');

module.exports = {
    'src_folders': ['./tests/system'],
    'output_folder': reportsPath,
    'custom_commands_path': './node_modules/nightwatch-commands/commands',
    'custom_assertions_path': './node_modules/nightwatch-commands/assertions',
    'selenium': {
        'start_process': true,
        'server_path': './node_modules/nightwatch-commands/selenium/selenium-server.jar',
        'log_path': './node_modules/nightwatch-commands/selenium/',
        'cli_args': {
            'webdriver.chrome.driver': './node_modules/nightwatch-commands/selenium/drivers/chromedriver'
        }
    },

    'test_settings': {
        'default': {
            'globals' : {
                'waitForConditionTimeout' : 10000,
                'waitForConditionPollInterval': 500,
            },
            'end_session_on_fail': false,
            'silent': true,
            'output': true,
            'exclude': ['page-objects', 'test-scripts', 'site.js'],
            'screenshots': {
                'enabled': true,
                'path': screenshotsPath,
                'on_failure': true,
            },
            'desiredCapabilities': {
                'browserName': 'chrome',
                'chromeOptions': {
                    'args': [
                        /**
                         * To facilitate testing of Push notifications, we need
                         * a user agent that is supported. Unfortunately, Selenium
                         * doesn't seem to have any emulated mobile devices that
                         * we support.
                         */
                        '--user-agent="Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Mobile Safari/537.36"',
                        'window-size=320,850',
                        '--allow-running-insecure-content',
                        '--test-type'
                    ],
                    prefs: {
                        'profile.default_content_setting_values.notifications': 1
                    }
                },
                'javascriptEnabled': true,
                'acceptSslCerts': true
            }
        },
        // For testing push messaging.
        // Always Allow browser notifications
        'subscribe': {
            'desiredCapabilities': {
                'chromeOptions': {
                    'prefs': {
                        'profile.default_content_setting_values.notifications': notificationSettings.ALLOW
                    }
                }
            },
            'filter': 'tests/system/workflows/push-subscribe.js'
        },
    }
};
