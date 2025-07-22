import IBfileLinks from '../../../../../utils/IBfileLinks.json'
import { ReplaceFileAggregator } from '../../../utils'
import getSteps from './steps'

const framework = {
  build({ filenames, files, steps }) {
    const replacementAggregator = new ReplaceFileAggregator()
    getSteps(steps, files, replacementAggregator)
    filenames.push(IBfileLinks.EW_VUE_WEB3AUTHCONTEXT_TSX)
    filenames.push(IBfileLinks.EW_VUE_HOME_VUE)
    filenames.push(IBfileLinks.EW_VUE_APP_VUE)
    filenames.push(IBfileLinks.EW_VUE_CONFIG_JS)
    filenames.push(IBfileLinks.EW_VUE_PACKAGE_JSON)
    return { filenames, files, steps }
  },
}

export default framework
