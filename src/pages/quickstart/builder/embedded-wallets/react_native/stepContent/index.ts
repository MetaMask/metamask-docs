import * as getUserInfo from '../../../../commonSteps/getUserInfo.mdx'
import * as reactNativeBundlerIssues from './reactNativeBundlerIssues.mdx'
import * as registerApp from '../../../../commonSteps/registerApp.mdx'
import * as walletAggregatorOnly from '../../../../commonSteps/walletAggregatorOnly.mdx'
import { toSteps } from '../../../../utils'
import * as blockchainCalls from './blockchainCallsReactNative.mdx'
import * as initialization from './initializeReactNative.mdx'
import * as installation from './installationReactNative.mdx'
import * as signin from './signin.mdx'
import * as signout from './signout.mdx'
import * as rnQuickStart from './rnQuickStart.mdx'
import * as requirementsAndroid from './requirementsAndroid.mdx'
import * as requirementsIOS from './requirementsIOS.mdx'
import * as allowlist from './allowlist.mdx'

const STEPS = toSteps({
  rnQuickStart,
  reactNativeBundlerIssues,
  requirementsAndroid,
  requirementsIOS,
  allowlist,
  installation,
  registerApp,
  walletAggregatorOnly,
  initialization,
  signin,
  getUserInfo,
  blockchainCalls,
  signout,
})

export default STEPS
