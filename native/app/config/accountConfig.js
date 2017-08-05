import baseConfig from './baseConfig'

const baseAccountURL = `${baseConfig.baseURL}/customer/account`

const color = '#4E439B'

const register = {
    key: 'register',
    text: 'Register',
    url: `${baseAccountURL}/create/`
}

const signIn = {
    key: 'signIn',
    text: 'Sign In',
    url: `${baseAccountURL}/login/`
}

export default {register, signIn, color}
