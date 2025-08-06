import qsFileLinks from '../../../../../utils/qs-file-links.json'
import STEPS from './stepContent'

export default function getSteps(steps, files, replacementAggregator) {
  steps.push(
    {
      ...STEPS.videoDemo,
      // No pointer needed for media content
    },
    {
      ...STEPS.reactQuickStart,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.MMSDK_REACT_WEB3AUTHCONTEXT_TSX,
        files[qsFileLinks.MMSDK_REACT_WEB3AUTHCONTEXT_TSX],
        'Quick Start'
      ),
    },
    {
      ...STEPS.installation,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.MMSDK_REACT_PACKAGE_JSON,
        files[qsFileLinks.MMSDK_REACT_PACKAGE_JSON],
        'Web3Auth Installation'
      ),
    },
    {
      ...STEPS.reactBundlerIssues,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.MMSDK_REACT_INDEX_HTML,
        files[qsFileLinks.MMSDK_REACT_INDEX_HTML],
        'Bundler Issues'
      ),
    },
    {
      ...STEPS.registerApp,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.MMSDK_REACT_WEB3AUTHCONTEXT_TSX,
        files[qsFileLinks.MMSDK_REACT_WEB3AUTHCONTEXT_TSX],
        'Dashboard Registration'
      ),
    },
    {
      ...STEPS.config,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.MMSDK_REACT_WEB3AUTHCONTEXT_TSX,
        files[qsFileLinks.MMSDK_REACT_WEB3AUTHCONTEXT_TSX],
        'Config'
      ),
    },
    {
      ...STEPS.setupWeb3AuthProvider,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.MMSDK_REACT_MAIN_TSX,
        files[qsFileLinks.MMSDK_REACT_MAIN_TSX],
        'Setup Web3Auth Provider'
      ),
    },
    {
      ...STEPS.setupWagmiProvider,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.MMSDK_REACT_MAIN_TSX,
        files[qsFileLinks.MMSDK_REACT_MAIN_TSX],
        'Setup Wagmi Provider'
      ),
    },
    {
      ...STEPS.login,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.MMSDK_REACT_APP_TSX,
        files[qsFileLinks.MMSDK_REACT_APP_TSX],
        'Login'
      ),
    },
    {
      ...STEPS.wagmiCalls,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.MMSDK_REACT_APP_TSX,
        files[qsFileLinks.MMSDK_REACT_APP_TSX],
        'Blockchain Calls'
      ),
    },
    {
      ...STEPS.logout,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.MMSDK_REACT_APP_TSX,
        files[qsFileLinks.MMSDK_REACT_APP_TSX],
        'Logout'
      ),
    }
  )
}
