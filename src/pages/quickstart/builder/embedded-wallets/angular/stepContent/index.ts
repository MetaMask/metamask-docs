import * as angularQuickStart from './angularQuickStart.mdx'
import * as angularBundlerIssues from './angularBundlerIssues.mdx'
import * as initialization from './initialize.mdx'
import * as signin from './signin.mdx'
import * as signout from './signout.mdx'
import * as blockchainCalls from './blockchainCalls.mdx'
import * as registerApp from '../../../../commonSteps/registerApp.mdx'
import * as walletAggregatorOnly from '../../../../commonSteps/walletAggregatorOnly.mdx'
import * as installation from './installation.mdx'
import * as config from './config.mdx'
import { toSteps } from '../../../../utils'

const STEPS = toSteps({
  angularQuickStart,
  angularBundlerIssues,
  installation,
  initialization,
  config,
  registerApp,
  walletAggregatorOnly,
  blockchainCalls,
  signin,
  signout,
})

export default STEPS
