import * as getUserInfo from '../../../../commonSteps/getUserInfo.mdx'
import * as registerApp from '../../../../commonSteps/registerApp.mdx'
import { toSteps } from '../../../../utils'
import * as blockchainCalls from './blockchainCalls.mdx'
import * as jitpack from './jitpack.mdx'
import * as installation from './installation.mdx'
import * as login from './login.mdx'
import * as logout from './logout.mdx'
import * as androidQuickStart from './androidQuickStart.mdx'
import * as requirements from './requirements.mdx'
import * as enableInternetUsage from './enableInternetUsage.mdx'
import * as singleTop from './singleTop.mdx'
import * as configureDeepLink from './configureDeepLink.mdx'
import * as initialize from './initialize.mdx'

const STEPS = toSteps({
  androidQuickStart,
  requirements,
  installation,
  jitpack,
  enableInternetUsage,
  singleTop,
  configureDeepLink,
  registerApp,
  initialize,
  login,
  getUserInfo,
  blockchainCalls,
  logout,
})

export default STEPS
