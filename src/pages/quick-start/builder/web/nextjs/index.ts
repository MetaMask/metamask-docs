import IBfileLinks from '../../../../../utils/IBfileLinks.json'
import { ReplaceFileAggregator } from '../../../utils'
import getSteps from './steps'

const framework = {
  build({ filenames, files, steps }) {
    const replacementAggregator = new ReplaceFileAggregator()
    getSteps(steps, files, replacementAggregator)
    filenames.push(IBfileLinks.NEXTJS_LAYOUT_TSX)
    filenames.push(IBfileLinks.NEXTJS_PAGE_TSX)
    filenames.push(IBfileLinks.NEXTJS_COMPONENTS_PROVIDER_TSX)
    filenames.push(IBfileLinks.NEXTJS_COMPONENTS_APP_TSX)
    filenames.push(IBfileLinks.NEXTJS_PACKAGE_JSON)
    filenames.push(IBfileLinks.NEXTJS_GET_BALANCE_TSX)
    filenames.push(IBfileLinks.NEXTJS_SEND_TRANSACTION_TSX)
    filenames.push(IBfileLinks.NEXTJS_SWITCH_NETWORK_TSX)

    return { filenames, files, steps }
  },
}

export default framework
