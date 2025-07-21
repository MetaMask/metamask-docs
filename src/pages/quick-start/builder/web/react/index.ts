import IBfileLinks from '../../../../../utils/IBfileLinks.json'
import { ReplaceFileAggregator } from '../../../utils'
import getSteps from './steps'

const framework = {
  build({ filenames, files, steps }) {
    const replacementAggregator = new ReplaceFileAggregator()
    getSteps(steps, files, replacementAggregator)
    filenames.push(IBfileLinks.REACT_WEB3AUTHCONTEXT_TSX)
    filenames.push(IBfileLinks.REACT_MAIN_TSX)
    filenames.push(IBfileLinks.REACT_APP_TSX)
    filenames.push(IBfileLinks.REACT_PACKAGE_JSON)
    filenames.push(IBfileLinks.REACT_INDEX_HTML)
    filenames.push(IBfileLinks.REACT_GET_BALANCE_TSX)
    filenames.push(IBfileLinks.REACT_SEND_TRANSACTION_TSX)
    filenames.push(IBfileLinks.REACT_SWITCH_NETWORK_TSX)

    return { filenames, files, steps }
  },
}

export default framework
