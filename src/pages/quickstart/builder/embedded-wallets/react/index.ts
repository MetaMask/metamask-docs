import qsFileLinks from '../../../../../utils/qs-file-links.json'
import { ReplaceFileAggregator } from '../../../utils'
import getSteps from './steps'

const framework = {
  build({ filenames, files, steps, ...values }) {
    const replacementAggregator = new ReplaceFileAggregator()
    getSteps(steps, files, replacementAggregator, values)
    filenames.push(qsFileLinks.EW_REACT_WEB3AUTHCONTEXT_TSX)
    filenames.push(qsFileLinks.EW_REACT_MAIN_TSX)
    filenames.push(qsFileLinks.EW_REACT_APP_TSX)
    filenames.push(qsFileLinks.EW_REACT_PACKAGE_JSON)
    filenames.push(qsFileLinks.EW_REACT_INDEX_HTML)
    filenames.push(qsFileLinks.EW_REACT_GET_BALANCE_TSX)
    filenames.push(qsFileLinks.EW_REACT_SEND_TRANSACTION_TSX)
    filenames.push(qsFileLinks.EW_REACT_SWITCH_NETWORK_TSX)

    return { filenames, files, steps }
  },
}

export default framework
