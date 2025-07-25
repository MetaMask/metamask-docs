import IBfileLinks from '../../../../../utils/IBfileLinks.json'
import { ReplaceFileAggregator } from '../../../utils'
import getSteps from './steps'

const framework = {
  build({ filenames, files, steps }) {
    const replacementAggregator = new ReplaceFileAggregator()
    getSteps(steps, files, replacementAggregator)
    filenames.push(IBfileLinks.EW_PNP_FLUTTER_MAIN_DART)
    filenames.push(IBfileLinks.EW_PNP_FLUTTER_BUILD_GRADLE)
    filenames.push(IBfileLinks.EW_PNP_FLUTTER_PODFILE)
    filenames.push(IBfileLinks.EW_PNP_FLUTTER_PUBSPEC_YAML)

    return { filenames, files, steps }
  },
}

export default framework
