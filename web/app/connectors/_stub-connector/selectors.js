/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createGetSelector} from 'reselect-immutable-helpers'

export const getIntegrationManager = ({integrationManager}) => integrationManager

// You'll sometimes get forms from the backend that require certain data in order to be submitted
// Rather than exposing that data to the front end,
// that data can be kept inside the integrationManager branch in the Redux Store
// This selector can be used to access that data
export const getFormInfoByKey = (formKey) => createGetSelector(getIntegrationManager, formKey)
