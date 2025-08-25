import qsFileLinks from '../../../../../utils/qs-file-links.json'
import { ReplaceFileAggregator } from '../../../utils'
import getSteps from './steps'

const framework = {
  build({ filenames, files, steps }) {
    const replacementAggregator = new ReplaceFileAggregator()
    getSteps(steps, files, replacementAggregator)
    filenames.push(qsFileLinks.EW_VUE_WEB3AUTHCONTEXT_TSX)
    filenames.push(qsFileLinks.EW_VUE_HOME_VUE)
    filenames.push(qsFileLinks.EW_VUE_APP_VUE)
    filenames.push(qsFileLinks.EW_VUE_CONFIG_JS)
    filenames.push(qsFileLinks.EW_VUE_PACKAGE_JSON)
    return { filenames, files, steps }
  },
}

export default framework
