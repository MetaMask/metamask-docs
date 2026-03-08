import qsFileLinks from '../../../../../utils/qs-file-links.json'
import STEPS from './stepContent'
import { YES } from '../../choices'

export default function getSteps(
  steps,
  files,
  replacementAggregator,
  values: Record<string, string> = {}
) {
  steps.push(
    {
      ...STEPS.rnQuickStart,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_PNP_REACT_NATIVE_APP_TSX,
        files[qsFileLinks.EW_PNP_REACT_NATIVE_APP_TSX],
        'Quick Start'
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
        qsFileLinks.EW_PNP_REACT_NATIVE_APP_TSX,
        files[qsFileLinks.EW_PNP_REACT_NATIVE_APP_TSX],
        'Dashboard Registration'
      ),
    }
  )

  // Add wallet aggregator only step if enabled
  if (values.walletAggregatorOnly === YES) {
    steps.push({
      ...STEPS.walletAggregatorOnly,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_PNP_REACT_NATIVE_APP_TSX,
        files[qsFileLinks.EW_PNP_REACT_NATIVE_APP_TSX],
        'Wallet Aggregator Configuration'
      ),
    })
  }

  steps.push(
    {
      ...STEPS.allowlist,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_PNP_REACT_NATIVE_APP_TSX,
        files[qsFileLinks.EW_PNP_REACT_NATIVE_APP_TSX],
        'Allowlist bundle ID'
      ),
    },
    {
      ...STEPS.initialization,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_PNP_REACT_NATIVE_APP_TSX,
        files[qsFileLinks.EW_PNP_REACT_NATIVE_APP_TSX],
        'SDK Initialization'
      ),
    },
    {
      ...STEPS.login,
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
      ...STEPS.logout,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_PNP_REACT_NATIVE_APP_TSX,
        files[qsFileLinks.EW_PNP_REACT_NATIVE_APP_TSX],
        'Logout'
      ),
    }
  )
}
