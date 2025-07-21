import IBfileLinks from '../../../../../utils/IBfileLinks.json'
import { ReplaceFileAggregator } from '../../../utils'
import getSteps from './steps'

const framework = {
  build({ filenames, files, steps }) {
    const replacementAggregator = new ReplaceFileAggregator()
    getSteps(steps, files, replacementAggregator)
    filenames.push(IBfileLinks.ANGULAR_APP_COMPONENT_TS)
    filenames.push(IBfileLinks.ANGULAR_PACKAGE_JSON)
    filenames.push(IBfileLinks.ANGULAR_APP_COMPONENT_HTML)
    filenames.push(IBfileLinks.ANGULAR_POLYFILL_TS)
    filenames.push(IBfileLinks.ANGULAR_TSCONFIG_JSON)
    filenames.push(IBfileLinks.ANGULAR_ETHERSRPC_TS)
    filenames.push(IBfileLinks.ANGULAR_VIEMRPC_TS)

    return { filenames, files, steps }
  },
}

export default framework
