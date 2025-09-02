import * as nextjsQuickStart from './nextjsQuickStart.mdx'
import * as login from '../../react/stepContent/login.mdx'
import * as logout from '../../react/stepContent/logout.mdx'
import * as setupWeb3AuthProvider from '../../react/stepContent/setupWeb3AuthProvider.mdx'
import * as wagmiCalls from '../../react/stepContent/wagmiCalls.mdx'
import * as registerApp from '../../../../commonSteps/registerApp.mdx'
import * as walletAggregatorOnly from '../../../../commonSteps/walletAggregatorOnly.mdx'
import * as installation from '../../react/stepContent/installation.mdx'
import * as config from '../../react/stepContent/config.mdx'
import * as setupWagmiProvider from '../../react/stepContent/setupWagmiProvider.mdx'
import { toSteps } from '../../../../utils'

const STEPS = toSteps({
  nextjsQuickStart,
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
