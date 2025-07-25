import { toSteps } from '../../../../utils'
import * as flutterQuickStart from './flutterQuickStart.mdx'
import * as requirementsAndroid from './requirementsAndroid.mdx'
import * as requirementsIOS from './requirementsIOS.mdx'
import * as installation from './installation.mdx'
import * as whitelist from './whitelist.mdx'
import * as registerApp from '../../../../commonSteps/registerApp.mdx'
import * as initialization from './initialize.mdx'
import * as login from './login.mdx'
import * as getUserInfo from '../../../../commonSteps/getUserInfo.mdx'
import * as blockchainCalls from './blockchainCalls.mdx'
import * as logout from './logout.mdx'

const STEPS = toSteps({
  flutterQuickStart,
  requirementsAndroid,
  requirementsIOS,
  installation,
  registerApp,
  whitelist,
  initialization,
  login,
  getUserInfo,
  blockchainCalls,
  logout,
})

export default STEPS
