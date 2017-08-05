import {Connector} from './connectors/_merlins-connector'
import connectorExtension from './connector-extension'
import {registerConnector, registerConnectorExtension} from 'progressive-web-sdk/dist/integration-manager'

const initConnector = () => {
    registerConnector(Connector())
    registerConnectorExtension(connectorExtension)
}

export default initConnector
