import qsFileLinks from '../../../../../utils/qs-file-links.json'
import { ReplaceFileAggregator } from '../../../utils'
import getSteps from './steps'

const framework = {
  build({ filenames, files, steps, ...values }) {
    const replacementAggregator = new ReplaceFileAggregator()
    getSteps(steps, files, replacementAggregator, values)
    filenames.push(qsFileLinks.EW_VUE_WEB3AUTHCONTEXT_TS)
    filenames.push(qsFileLinks.EW_VUE_HOME_VUE)
    filenames.push(qsFileLinks.EW_VUE_APP_VUE)
    filenames.push(qsFileLinks.EW_VUE_INDEX_HTML)
    filenames.push(qsFileLinks.EW_VUE_PACKAGE_JSON)
    return { filenames, files, steps }
  },
}

export default framework
