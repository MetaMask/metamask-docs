import IBfileLinks from '../../../../utils/IBfileLinks.json'
import STEPS from './stepContent'

export default function getSteps(steps, files, replacementAggregator) {
  steps.push(
    {
      ...STEPS.androidQuickStart,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.PNP_ANDROID_MAINACTIVITY_KT,
        files[IBfileLinks.PNP_ANDROID_MAINACTIVITY_KT],
        'Quick Start'
      ),
    },
    {
      ...STEPS.requirements,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.PNP_ANDROID_BUILD_GRADLE,
        files[IBfileLinks.PNP_ANDROID_BUILD_GRADLE],
        'Requirements'
      ),
    },
    {
      ...STEPS.installation,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.PNP_ANDROID_BUILD_GRADLE,
        files[IBfileLinks.PNP_ANDROID_BUILD_GRADLE],
        'Installation'
      ),
    },
    {
      ...STEPS.jitpack,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.PNP_ANDROID_SETTINGS_GRADLE,
        files[IBfileLinks.PNP_ANDROID_SETTINGS_GRADLE],
        'Add JitPack URL'
      ),
    },
    {
      ...STEPS.enableInternetUsage,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.PNP_ANDROID_ANDROIDMANIFEST_XML,
        files[IBfileLinks.PNP_ANDROID_ANDROIDMANIFEST_XML],
        'Enable Internet Usage'
      ),
    },
    {
      ...STEPS.singleTop,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.PNP_ANDROID_ANDROIDMANIFEST_XML,
        files[IBfileLinks.PNP_ANDROID_ANDROIDMANIFEST_XML],
        'Enable Single Top'
      ),
    },
    {
      ...STEPS.registerApp,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.PNP_ANDROID_STRINGS_XML,
        files[IBfileLinks.PNP_ANDROID_STRINGS_XML],
        'Get your Web3Auth Client ID from Dashboard'
      ),
    },
    {
      ...STEPS.configureDeepLink,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.PNP_ANDROID_ANDROIDMANIFEST_XML,
        files[IBfileLinks.PNP_ANDROID_ANDROIDMANIFEST_XML],
        'Configure Deep Link'
      ),
    },
    {
      ...STEPS.initialize,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.PNP_ANDROID_MAINACTIVITY_KT,
        files[IBfileLinks.PNP_ANDROID_MAINACTIVITY_KT],
        'Initialize Web3Auth'
      ),
    },
    {
      ...STEPS.login,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.PNP_ANDROID_MAINACTIVITY_KT,
        files[IBfileLinks.PNP_ANDROID_MAINACTIVITY_KT],
        'Login'
      ),
    },
    {
      ...STEPS.getUserInfo,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.PNP_ANDROID_MAINACTIVITY_KT,
        files[IBfileLinks.PNP_ANDROID_MAINACTIVITY_KT],
        'Get User Info'
      ),
    },
    {
      ...STEPS.blockchainCalls,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.PNP_ANDROID_MAINACTIVITY_KT,
        files[IBfileLinks.PNP_ANDROID_MAINACTIVITY_KT],
        'Blockchain Calls'
      ),
    },
    {
      ...STEPS.logout,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.PNP_ANDROID_MAINACTIVITY_KT,
        files[IBfileLinks.PNP_ANDROID_MAINACTIVITY_KT],
        'Logout'
      ),
    }
  )
}
