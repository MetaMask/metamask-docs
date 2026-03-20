import qsFileLinks from '../../../../../utils/qs-file-links.json'
import { ReplaceFileAggregator } from '../../../utils'
import getSteps from './steps'

const framework = {
  build({ filenames, files, steps }) {
    const replacementAggregator = new ReplaceFileAggregator()
    getSteps(steps, files, replacementAggregator)
    filenames.push(qsFileLinks.MMCONNECT_REACT_APP_TSX)
    filenames.push(qsFileLinks.MMCONNECT_REACT_UTILS_TS)
    filenames.push(qsFileLinks.MMCONNECT_REACT_PACKAGE_JSON)
    return { filenames, files, steps }
  },
}

export default framework
