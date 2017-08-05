import {Connector} from './connectors/_stub-connector'
import {registerConnector} from 'progressive-web-sdk/dist/integration-manager'

const initConnector = () => {
    registerConnector(Connector())
}

export default initConnector
