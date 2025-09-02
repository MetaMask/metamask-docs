import qsFileLinks from '../../../../../utils/qs-file-links.json'
import { ReplaceFileAggregator } from '../../../utils'
import getSteps from './steps'

const framework = {
  build({ filenames, files, steps }) {
    const replacementAggregator = new ReplaceFileAggregator()
    getSteps(steps, files, replacementAggregator)
    filenames.push(qsFileLinks.EW_PNP_IOS_VIEWMODEL_SWIFT)
    filenames.push(qsFileLinks.EW_PNP_IOS_CONTENTVIEW_SWIFT)
    filenames.push(qsFileLinks.EW_PNP_IOS_LOGINVIEW_SWIFT)
    filenames.push(qsFileLinks.EW_PNP_IOS_WEB3RPC_SWIFT)
    filenames.push(qsFileLinks.EW_PNP_IOS_USERDETAILVIEW_SWIFT)

    return { filenames, files, steps }
  },
}

export default framework
