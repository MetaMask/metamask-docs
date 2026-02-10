import * as reactQuickStart from './reactQuickStart.mdx'
import * as connect from './connect.mdx'
import * as disconnect from './terminate.mdx'
import * as installation from './installation.mdx'
import * as initialization from './initialization.mdx'
import { toSteps } from '../../../../utils'

const STEPS = toSteps({
  reactQuickStart,
  installation,
  initialization,
  connect,
  disconnect,
})

export default STEPS
