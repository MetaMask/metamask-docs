import * as reactQuickStart from './reactQuickStart.mdx'
import * as reactBundlerIssues from './reactBundlerIssues.mdx'
import * as login from './login.mdx'
import * as logout from './logout.mdx'
import * as setupWeb3AuthProvider from './setupWeb3AuthProvider.mdx'
import * as wagmiCalls from './wagmiCalls.mdx'
import * as registerApp from '../../../../commonSteps/registerApp.mdx'
import * as walletAggregatorOnly from '../../../../commonSteps/walletAggregatorOnly.mdx'
import * as installation from './installation.mdx'
import * as config from './config.mdx'
import * as setupWagmiProvider from './setupWagmiProvider.mdx'
import { toSteps } from '../../../../utils'

const STEPS = toSteps({
  reactQuickStart,
  reactBundlerIssues,
  installation,
  config,
  setupWagmiProvider,
  registerApp,
  walletAggregatorOnly,
  wagmiCalls,
  login,
  logout,
  setupWeb3AuthProvider,
})

export default STEPS
