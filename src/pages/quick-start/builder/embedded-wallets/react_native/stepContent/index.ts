import * as getUserInfo from '../../../../commonSteps/getUserInfo.mdx'
import * as reactNativeBundlerIssues from './reactNativeBundlerIssues.mdx'
import * as registerApp from '../../../../commonSteps/registerApp.mdx'
import { toSteps } from '../../../../utils'
import * as blockchainCalls from './blockchainCallsReactNative.mdx'
import * as initialization from './initializeReactNative.mdx'
import * as installation from './installationReactNative.mdx'
import * as login from './login.mdx'
import * as logout from './logout.mdx'
import * as rnQuickStart from './rnQuickStart.mdx'
import * as requirementsAndroid from './requirementsAndroid.mdx'
import * as requirementsIOS from './requirementsIOS.mdx'
import * as whitelist from './whitelist.mdx'

const STEPS = toSteps({
  rnQuickStart,
  reactNativeBundlerIssues,
  requirementsAndroid,
  requirementsIOS,
  whitelist,
  installation,
  registerApp,
  initialization,
  login,
  getUserInfo,
  blockchainCalls,
  logout,
})

export default STEPS
