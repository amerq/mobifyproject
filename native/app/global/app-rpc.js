import Astro from 'progressive-app-sdk/astro-full'
import rpcMethodNames from './app-rpc-method-names'

const AppRpc = {}

AppRpc.names = rpcMethodNames

AppRpc.onboardingShow = Astro.jsRpcMethod(AppRpc.names.onboardingShow, [])
AppRpc.onboardingHide = Astro.jsRpcMethod(AppRpc.names.onboardingHide, [])
AppRpc.onboardingHasHeader = Astro.jsRpcMethod(AppRpc.names.onboardingHasHeader, [])
AppRpc.registerShow = Astro.jsRpcMethod(AppRpc.names.registerShow, [])
AppRpc.signInShow = Astro.jsRpcMethod(AppRpc.names.signInShow, [])

export default AppRpc
