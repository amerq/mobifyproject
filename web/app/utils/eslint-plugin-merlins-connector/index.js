/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

module.exports.rules = { // eslint-disable-line
    'use-merlins': (context) => {
        return {
            ImportDeclaration: (node) => {
                const specifiers = node.specifiers[0] // always array of length 1
                let ruleName

                if (specifiers.local) {
                    ruleName = specifiers.local.name
                }

                if (ruleName === 'initConnector' && !/merlins/.test(node.source.value)) {
                    context.report(node, 'Merlin\'s Connector should be left uncommented')
                }
            }
        }
    }
}
