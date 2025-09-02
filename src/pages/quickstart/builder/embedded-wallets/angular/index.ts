import qsFileLinks from '../../../../../utils/qs-file-links.json'
import { ReplaceFileAggregator } from '../../../utils'
import getSteps from './steps'

const framework = {
  build({ filenames, files, steps, ...values }) {
    const replacementAggregator = new ReplaceFileAggregator()
    getSteps(steps, files, replacementAggregator, values)
    filenames.push(qsFileLinks.EW_ANGULAR_APP_COMPONENT_TS)
    filenames.push(qsFileLinks.EW_ANGULAR_PACKAGE_JSON)
    filenames.push(qsFileLinks.EW_ANGULAR_APP_COMPONENT_HTML)
    filenames.push(qsFileLinks.EW_ANGULAR_POLYFILL_TS)
    filenames.push(qsFileLinks.EW_ANGULAR_TSCONFIG_JSON)
    filenames.push(qsFileLinks.EW_ANGULAR_ETHERSRPC_TS)
    filenames.push(qsFileLinks.EW_ANGULAR_VIEMRPC_TS)

    return { filenames, files, steps }
  },
}

export default framework
