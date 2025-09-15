import qsFileLinks from '../../../../../utils/qs-file-links.json'
import STEPS from './stepContent'
import { YES } from '../../choices'

export default function getSteps(
  steps,
  files,
  replacementAggregator,
  values: Record<string, string> = {}
) {
  steps.push(
    {
      ...STEPS.angularQuickStart,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_ANGULAR_APP_COMPONENT_TS,
        files[qsFileLinks.EW_ANGULAR_APP_COMPONENT_TS],
        'Quick Start'
      ),
    },
    {
      ...STEPS.installation,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_ANGULAR_PACKAGE_JSON,
        files[qsFileLinks.EW_ANGULAR_PACKAGE_JSON],
        'Web3Auth Installation'
      ),
    },
    {
      ...STEPS.angularBundlerIssues,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_ANGULAR_POLYFILL_TS,
        files[qsFileLinks.EW_ANGULAR_POLYFILL_TS],
        'Bundler Issues'
      ),
    },
    {
      ...STEPS.registerApp,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_ANGULAR_APP_COMPONENT_TS,
        files[qsFileLinks.EW_ANGULAR_APP_COMPONENT_TS],
        'Dashboard Registration'
      ),
    }
  )

  // Add wallet aggregator only step if enabled
  if (values.walletAggregatorOnly === YES) {
    steps.push({
      ...STEPS.walletAggregatorOnly,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_ANGULAR_APP_COMPONENT_TS,
        files[qsFileLinks.EW_ANGULAR_APP_COMPONENT_TS],
        'Wallet Aggregator Configuration'
      ),
    })
  }

  steps.push(
    {
      ...STEPS.config,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_ANGULAR_APP_COMPONENT_TS,
        files[qsFileLinks.EW_ANGULAR_APP_COMPONENT_TS],
        'Config'
      ),
    },
    {
      ...STEPS.initialization,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_ANGULAR_APP_COMPONENT_TS,
        files[qsFileLinks.EW_ANGULAR_APP_COMPONENT_TS],
        'SDK Initialization'
      ),
    },
    {
      ...STEPS.login,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_ANGULAR_APP_COMPONENT_TS,
        files[qsFileLinks.EW_ANGULAR_APP_COMPONENT_TS],
        'Login'
      ),
    },
    {
      ...STEPS.blockchainCalls,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_ANGULAR_APP_COMPONENT_TS,
        files[qsFileLinks.EW_ANGULAR_APP_COMPONENT_TS],
        'Blockchain Calls'
      ),
    },
    {
      ...STEPS.logout,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.EW_ANGULAR_APP_COMPONENT_TS,
        files[qsFileLinks.EW_ANGULAR_APP_COMPONENT_TS],
        'Logout'
      ),
    }
  )
}
