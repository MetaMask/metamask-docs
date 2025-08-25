import qsFileLinks from '../../../../../utils/qs-file-links.json'
import { ReplaceFileAggregator } from '../../../utils'
import getSteps from './steps'

const framework = {
  build({ filenames, files, steps }) {
    const replacementAggregator = new ReplaceFileAggregator()
    getSteps(steps, files, replacementAggregator)
    filenames.push(qsFileLinks.MMSDK_REACT_APP_TSX)
    filenames.push(qsFileLinks.MMSDK_REACT_PACKAGE_JSON)
    return { filenames, files, steps }
  },
}

export default framework
