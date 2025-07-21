import IBfileLinks from '../../../../utils/IBfileLinks.json'
import { ReplaceFileAggregator } from '../../utils'
import getSteps from './steps'

const framework = {
  build({ filenames, files, steps }) {
    const replacementAggregator = new ReplaceFileAggregator()
    getSteps(steps, files, replacementAggregator)
    filenames.push(IBfileLinks.PNP_ANDROID_MAINACTIVITY_KT)
    filenames.push(IBfileLinks.PNP_ANDROID_ANDROIDMANIFEST_XML)
    filenames.push(IBfileLinks.PNP_ANDROID_BUILD_GRADLE)
    filenames.push(IBfileLinks.PNP_ANDROID_SETTINGS_GRADLE)
    filenames.push(IBfileLinks.PNP_ANDROID_STRINGS_XML)
    filenames.push(IBfileLinks.PNP_ANDROID_ACTIVITY_MAIN_XML)

    return { filenames, files, steps }
  },
}

export default framework
