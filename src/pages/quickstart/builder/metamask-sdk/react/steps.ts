import IBfileLinks from '../../../../../utils/IBfileLinks.json'
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
        IBfileLinks.MMSDK_REACT_WEB3AUTHCONTEXT_TSX,
        files[IBfileLinks.MMSDK_REACT_WEB3AUTHCONTEXT_TSX],
        'Quick Start'
      ),
    },
    {
      ...STEPS.installation,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.MMSDK_REACT_PACKAGE_JSON,
        files[IBfileLinks.MMSDK_REACT_PACKAGE_JSON],
        'Web3Auth Installation'
      ),
    },
    {
      ...STEPS.reactBundlerIssues,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.MMSDK_REACT_INDEX_HTML,
        files[IBfileLinks.MMSDK_REACT_INDEX_HTML],
        'Bundler Issues'
      ),
    },
    {
      ...STEPS.registerApp,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.MMSDK_REACT_WEB3AUTHCONTEXT_TSX,
        files[IBfileLinks.MMSDK_REACT_WEB3AUTHCONTEXT_TSX],
        'Dashboard Registration'
      ),
    },
    {
      ...STEPS.config,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.MMSDK_REACT_WEB3AUTHCONTEXT_TSX,
        files[IBfileLinks.MMSDK_REACT_WEB3AUTHCONTEXT_TSX],
        'Config'
      ),
    },
    {
      ...STEPS.setupWeb3AuthProvider,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.MMSDK_REACT_MAIN_TSX,
        files[IBfileLinks.MMSDK_REACT_MAIN_TSX],
        'Setup Web3Auth Provider'
      ),
    },
    {
      ...STEPS.setupWagmiProvider,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.MMSDK_REACT_MAIN_TSX,
        files[IBfileLinks.MMSDK_REACT_MAIN_TSX],
        'Setup Wagmi Provider'
      ),
    },
    {
      ...STEPS.login,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.MMSDK_REACT_APP_TSX,
        files[IBfileLinks.MMSDK_REACT_APP_TSX],
        'Login'
      ),
    },
    {
      ...STEPS.wagmiCalls,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.MMSDK_REACT_APP_TSX,
        files[IBfileLinks.MMSDK_REACT_APP_TSX],
        'Blockchain Calls'
      ),
    },
    {
      ...STEPS.logout,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.MMSDK_REACT_APP_TSX,
        files[IBfileLinks.MMSDK_REACT_APP_TSX],
        'Logout'
      ),
    }
  )
}
