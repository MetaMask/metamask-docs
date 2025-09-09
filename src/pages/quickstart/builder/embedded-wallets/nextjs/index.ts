import qsFileLinks from '../../../../../utils/qs-file-links.json'
import { ReplaceFileAggregator } from '../../../utils'
import getSteps from './steps'

const framework = {
  build({ filenames, files, steps, ...values }) {
    const replacementAggregator = new ReplaceFileAggregator()
    getSteps(steps, files, replacementAggregator, values)
    filenames.push(qsFileLinks.EW_NEXTJS_LAYOUT_TSX)
    filenames.push(qsFileLinks.EW_NEXTJS_PAGE_TSX)
    filenames.push(qsFileLinks.EW_NEXTJS_COMPONENTS_PROVIDER_TSX)
    filenames.push(qsFileLinks.EW_NEXTJS_COMPONENTS_APP_TSX)
    filenames.push(qsFileLinks.EW_NEXTJS_PACKAGE_JSON)
    filenames.push(qsFileLinks.EW_NEXTJS_GET_BALANCE_TSX)
    filenames.push(qsFileLinks.EW_NEXTJS_SEND_TRANSACTION_TSX)
    filenames.push(qsFileLinks.EW_NEXTJS_SWITCH_NETWORK_TSX)

    return { filenames, files, steps }
  },
}

export default framework
