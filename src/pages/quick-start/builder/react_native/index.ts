import IBfileLinks from '../../../../utils/IBfileLinks.json'
import { ReplaceFileAggregator } from '../../utils'
import getSteps from './steps'

const framework = {
  build({ filenames, files, steps }) {
    const replacementAggregator = new ReplaceFileAggregator()
    getSteps(steps, files, replacementAggregator)
    filenames.push(IBfileLinks.PNP_REACT_NATIVE_APP_TSX)
    filenames.push(IBfileLinks.PNP_REACT_NATIVE_PACKAGE_JSON)
    filenames.push(IBfileLinks.PNP_REACT_NATIVE_METRO_CONFIG_JS)
    filenames.push(IBfileLinks.PNP_REACT_NATIVE_GLOBALS_JS)
    filenames.push(IBfileLinks.PNP_REACT_NATIVE_INDEX_JS)
    filenames.push(IBfileLinks.PNP_REACT_NATIVE_BUILD_GRADLE)
    filenames.push(IBfileLinks.PNP_REACT_NATIVE_PODFILE)

    return { filenames, files, steps }
  },
}

export default framework
