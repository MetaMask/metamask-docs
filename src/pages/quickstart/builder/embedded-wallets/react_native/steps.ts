import qsFileLinks from '../../../../../utils/qs-file-links.json'
import STEPS from './stepContent'

export default function getSteps(
  steps,
  files,
  replacementAggregator,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  values: Record<string, string> = {}
) {
  steps.push(
    {
      ...STEPS.rnQuickStart,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_PNP_REACT_NATIVE_INDEX_JS,
        files[qsFileLinks.EW_PNP_REACT_NATIVE_INDEX_JS],
        'Web3Auth Setup'
      ),
    },
    {
      ...STEPS.requirementsAndroid,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_PNP_REACT_NATIVE_BUILD_GRADLE,
        files[qsFileLinks.EW_PNP_REACT_NATIVE_BUILD_GRADLE],
        'Requirements Android'
      ),
    },
    {
      ...STEPS.requirementsIOS,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_PNP_REACT_NATIVE_PODFILE,
        files[qsFileLinks.EW_PNP_REACT_NATIVE_PODFILE],
        'Requirements iOS'
      ),
    },
    {
      ...STEPS.installation,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_PNP_REACT_NATIVE_PACKAGE_JSON,
        files[qsFileLinks.EW_PNP_REACT_NATIVE_PACKAGE_JSON],
        'Web3Auth Installation'
      ),
    },
    {
      ...STEPS.reactNativeBundlerIssues,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_PNP_REACT_NATIVE_METRO_CONFIG_JS,
        files[qsFileLinks.EW_PNP_REACT_NATIVE_METRO_CONFIG_JS],
        'Bundler Issues'
      ),
    },
    {
      ...STEPS.registerApp,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_PNP_REACT_NATIVE_WEB3AUTH_CONFIG_TS,
        files[qsFileLinks.EW_PNP_REACT_NATIVE_WEB3AUTH_CONFIG_TS],
        'Dashboard Registration'
      ),
    }
  )

  steps.push(
    {
      ...STEPS.allowlist,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_PNP_REACT_NATIVE_WEB3AUTH_CONFIG_TS,
        files[qsFileLinks.EW_PNP_REACT_NATIVE_WEB3AUTH_CONFIG_TS],
        'SDK Initialization'
      ),
    },
    {
      ...STEPS.initialization,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_PNP_REACT_NATIVE_APP_TSX,
        files[qsFileLinks.EW_PNP_REACT_NATIVE_APP_TSX],
        'Setup Web3Auth Provider'
      ),
    },
    {
      ...STEPS.signin,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_PNP_REACT_NATIVE_APP_TSX,
        files[qsFileLinks.EW_PNP_REACT_NATIVE_APP_TSX],
        'Login'
      ),
    },
    {
      ...STEPS.blockchainCalls,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_PNP_REACT_NATIVE_APP_TSX,
        files[qsFileLinks.EW_PNP_REACT_NATIVE_APP_TSX],
        'Blockchain Calls'
      ),
    },
    {
      ...STEPS.signout,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_PNP_REACT_NATIVE_APP_TSX,
        files[qsFileLinks.EW_PNP_REACT_NATIVE_APP_TSX],
        'Logout'
      ),
    }
  )
}
