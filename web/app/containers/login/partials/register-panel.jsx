/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React from 'react'

import RegisterForm from './register-form'

const RegisterPanel = () => (
    <div className="t-login__register-panel">
        <div className="u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg">
            <p>
                {'Creating an account has many benefits: check out faster, keep more than one address, track orders, and more'}
            </p>
        </div>

        <div className="u-padding-start-md u-padding-end-md u-padding-bottom-lg">
            <RegisterForm />
        </div>
    </div>
)

export default RegisterPanel
