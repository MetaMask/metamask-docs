import IBfileLinks from '../../../../../utils/IBfileLinks.json'
import STEPS from './stepContent'

export default function getSteps(steps, files, replacementAggregator) {
  steps.push(
    {
      ...STEPS.nextjsQuickStart,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.NEXTJS_LAYOUT_TSX,
        files[IBfileLinks.NEXTJS_LAYOUT_TSX],
        'Quick Start'
      ),
    },
    {
      ...STEPS.installation,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.NEXTJS_PACKAGE_JSON,
        files[IBfileLinks.NEXTJS_PACKAGE_JSON],
        'Web3Auth Installation'
      ),
    },
    {
      ...STEPS.registerApp,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.NEXTJS_COMPONENTS_PROVIDER_TSX,
        files[IBfileLinks.NEXTJS_COMPONENTS_PROVIDER_TSX],
        'Dashboard Registration'
      ),
    },
    {
      ...STEPS.config,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.NEXTJS_COMPONENTS_PROVIDER_TSX,
        files[IBfileLinks.NEXTJS_COMPONENTS_PROVIDER_TSX],
        'Config'
      ),
    },
    {
      ...STEPS.setupWeb3AuthProvider,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.NEXTJS_COMPONENTS_PROVIDER_TSX,
        files[IBfileLinks.NEXTJS_COMPONENTS_PROVIDER_TSX],
        'Setup Web3Auth Provider'
      ),
    },
    {
      ...STEPS.setupWagmiProvider,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.NEXTJS_COMPONENTS_PROVIDER_TSX,
        files[IBfileLinks.NEXTJS_COMPONENTS_PROVIDER_TSX],
        'Setup Wagmi Provider'
      ),
    },
    {
      ...STEPS.login,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.NEXTJS_COMPONENTS_APP_TSX,
        files[IBfileLinks.NEXTJS_COMPONENTS_APP_TSX],
        'Login'
      ),
    },
    {
      ...STEPS.wagmiCalls,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.NEXTJS_COMPONENTS_APP_TSX,
        files[IBfileLinks.NEXTJS_COMPONENTS_APP_TSX],
        'Blockchain Calls'
      ),
    },
    {
      ...STEPS.logout,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.NEXTJS_COMPONENTS_APP_TSX,
        files[IBfileLinks.NEXTJS_COMPONENTS_APP_TSX],
        'Logout'
      ),
    }
  )
}
