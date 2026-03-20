import * as reactQuickStart from './reactQuickStart.mdx'
import * as connect from './connect.mdx'
import * as connectAndSign from './connect-and-sign.mdx'
import * as connectWith from './connect-with.mdx'
import * as installation from './installation.mdx'
import * as initialization from './initialization.mdx'
import * as provider from './provider.mdx'
import * as disconnect from './disconnect.mdx'
import * as sendTransaction from './send-transaction.mdx'
import * as signMessage from './sign-message.mdx'
import * as switchChain from './switch-chain.mdx'
import { toSteps } from '../../../../utils'

const STEPS = toSteps({
  reactQuickStart,
  installation,
  initialization,
  connect,
  connectAndSign,
  connectWith,
  provider,
  sendTransaction,
  signMessage,
  switchChain,
  disconnect,
})

export default STEPS
