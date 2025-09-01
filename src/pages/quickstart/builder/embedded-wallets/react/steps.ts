import qsFileLinks from '../../../../../utils/qs-file-links.json'
import STEPS from './stepContent'
import { YES } from '../../choices'

export default function getSteps(steps, files, replacementAggregator, values = {}) {
  steps.push(
    {
      ...STEPS.reactQuickStart,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_REACT_WEB3AUTHCONTEXT_TSX,
        files[qsFileLinks.EW_REACT_WEB3AUTHCONTEXT_TSX],
        'Quick Start'
      ),
    },
    {
      ...STEPS.installation,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_REACT_PACKAGE_JSON,
        files[qsFileLinks.EW_REACT_PACKAGE_JSON],
        'Web3Auth Installation'
      ),
    },
    {
      ...STEPS.registerApp,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_REACT_WEB3AUTHCONTEXT_TSX,
        files[qsFileLinks.EW_REACT_WEB3AUTHCONTEXT_TSX],
        'Dashboard Registration'
      ),
    }
  )

  // Add wallet aggregator only step if enabled
  if (values.walletAggregatorOnly === YES) {
    steps.push({
      ...STEPS.walletAggregatorOnly,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_REACT_WEB3AUTHCONTEXT_TSX,
        files[qsFileLinks.EW_REACT_WEB3AUTHCONTEXT_TSX],
        'Wallet Aggregator Configuration'
      ),
    })
  }

  steps.push(
    {
      ...STEPS.config,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_REACT_WEB3AUTHCONTEXT_TSX,
        files[qsFileLinks.EW_REACT_WEB3AUTHCONTEXT_TSX],
        'Config'
      ),
    },
    {
      ...STEPS.setupWeb3AuthProvider,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_REACT_MAIN_TSX,
        files[qsFileLinks.EW_REACT_MAIN_TSX],
        'Setup Web3Auth Provider'
      ),
    },
    {
      ...STEPS.setupWagmiProvider,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_REACT_MAIN_TSX,
        files[qsFileLinks.EW_REACT_MAIN_TSX],
        'Setup Wagmi Provider'
      ),
    },
    {
      ...STEPS.login,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_REACT_APP_TSX,
        files[qsFileLinks.EW_REACT_APP_TSX],
        'Login'
      ),
    },
    {
      ...STEPS.wagmiCalls,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_REACT_APP_TSX,
        files[qsFileLinks.EW_REACT_APP_TSX],
        'Blockchain Calls'
      ),
    },
    {
      ...STEPS.logout,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_REACT_APP_TSX,
        files[qsFileLinks.EW_REACT_APP_TSX],
        'Logout'
      ),
    },
    {
      ...STEPS.reactBundlerIssues,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_REACT_INDEX_HTML,
        files[qsFileLinks.EW_REACT_INDEX_HTML],
        'Bundler Issues'
      ),
    }
  )
}
