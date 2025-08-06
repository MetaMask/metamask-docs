import qsFileLinks from '../../../../../utils/qs-file-links.json'
import STEPS from './stepContent'

export default function getSteps(steps, files, replacementAggregator) {
  steps.push(
    {
      ...STEPS.nextjsQuickStart,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.MMSDK_NEXTJS_LAYOUT_TSX,
        files[qsFileLinks.MMSDK_NEXTJS_LAYOUT_TSX],
        'Quick Start'
      ),
    },
    {
      ...STEPS.installation,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.MMSDK_NEXTJS_PACKAGE_JSON,
        files[qsFileLinks.MMSDK_NEXTJS_PACKAGE_JSON],
        'Web3Auth Installation'
      ),
    },
    {
      ...STEPS.registerApp,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.MMSDK_NEXTJS_COMPONENTS_PROVIDER_TSX,
        files[qsFileLinks.MMSDK_NEXTJS_COMPONENTS_PROVIDER_TSX],
        'Dashboard Registration'
      ),
    },
    {
      ...STEPS.config,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.MMSDK_NEXTJS_COMPONENTS_PROVIDER_TSX,
        files[qsFileLinks.MMSDK_NEXTJS_COMPONENTS_PROVIDER_TSX],
        'Config'
      ),
    },
    {
      ...STEPS.setupWeb3AuthProvider,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.MMSDK_NEXTJS_COMPONENTS_PROVIDER_TSX,
        files[qsFileLinks.MMSDK_NEXTJS_COMPONENTS_PROVIDER_TSX],
        'Setup Web3Auth Provider'
      ),
    },
    {
      ...STEPS.setupWagmiProvider,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.MMSDK_NEXTJS_COMPONENTS_PROVIDER_TSX,
        files[qsFileLinks.MMSDK_NEXTJS_COMPONENTS_PROVIDER_TSX],
        'Setup Wagmi Provider'
      ),
    },
    {
      ...STEPS.login,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.MMSDK_NEXTJS_COMPONENTS_APP_TSX,
        files[qsFileLinks.MMSDK_NEXTJS_COMPONENTS_APP_TSX],
        'Login'
      ),
    },
    {
      ...STEPS.wagmiCalls,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.MMSDK_NEXTJS_COMPONENTS_APP_TSX,
        files[qsFileLinks.MMSDK_NEXTJS_COMPONENTS_APP_TSX],
        'Blockchain Calls'
      ),
    },
    {
      ...STEPS.logout,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.MMSDK_NEXTJS_COMPONENTS_APP_TSX,
        files[qsFileLinks.MMSDK_NEXTJS_COMPONENTS_APP_TSX],
        'Logout'
      ),
    }
  )
}
