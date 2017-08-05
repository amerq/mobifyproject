/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'

// Add other actions here that are specific to this connector.
// Actions that are returned out of the connector and reduced
// by the app should go into ./results.js

export const exampleAction = createAction('Some connector-specific action')

export const receiveFormInfo = createAction('Receive Form Info')
