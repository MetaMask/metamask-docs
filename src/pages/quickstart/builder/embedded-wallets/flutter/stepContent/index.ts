import { toSteps } from '../../../../utils'
import * as flutterQuickStart from './flutterQuickStart.mdx'
import * as requirementsAndroid from './requirementsAndroid.mdx'
import * as requirementsIOS from './requirementsIOS.mdx'
import * as installation from './installation.mdx'
import * as allowlist from './allowlist.mdx'
import * as registerApp from '../../../../commonSteps/registerApp.mdx'
import * as initialization from './initialize.mdx'
import * as signin from './signin.mdx'
import * as getUserInfo from '../../../../commonSteps/getUserInfo.mdx'
import * as blockchainCalls from './blockchainCalls.mdx'
import * as signout from './signout.mdx'

const STEPS = toSteps({
  flutterQuickStart,
  requirementsAndroid,
  requirementsIOS,
  installation,
  registerApp,
  allowlist,
  initialization,
  signin,
  getUserInfo,
  blockchainCalls,
  signout,
})

export default STEPS
