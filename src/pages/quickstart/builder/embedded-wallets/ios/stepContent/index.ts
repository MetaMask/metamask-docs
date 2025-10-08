import * as getUserInfo from '../../../../commonSteps/getUserInfo.mdx'
import * as registerApp from '../../../../commonSteps/registerApp.mdx'
import * as whitelist from './whitelist.mdx'
import { toSteps } from '../../../../utils'
import * as blockchainCalls from './blockchainCalls.mdx'
import * as initialization from './initialize.mdx'
import * as installation from './installation.mdx'
import * as login from './login.mdx'
import * as logout from './logout.mdx'

import * as iOSQuickStart from './iOSQuickStart.mdx'

const STEPS = toSteps({
  iOSQuickStart,
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
