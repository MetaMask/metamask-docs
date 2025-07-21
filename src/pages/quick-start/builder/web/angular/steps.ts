import IBfileLinks from '../../../../../utils/IBfileLinks.json'
import STEPS from './stepContent'

export default function getSteps(steps, files, replacementAggregator) {
  steps.push(
    {
      ...STEPS.angularQuickStart,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.ANGULAR_APP_COMPONENT_TS,
        files[IBfileLinks.ANGULAR_APP_COMPONENT_TS],
        'Quick Start'
      ),
    },
    {
      ...STEPS.installation,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.ANGULAR_PACKAGE_JSON,
        files[IBfileLinks.ANGULAR_PACKAGE_JSON],
        'Web3Auth Installation'
      ),
    },
    {
      ...STEPS.angularBundlerIssues,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.ANGULAR_POLYFILL_TS,
        files[IBfileLinks.ANGULAR_POLYFILL_TS],
        'Bundler Issues'
      ),
    },
    {
      ...STEPS.registerApp,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.ANGULAR_APP_COMPONENT_TS,
        files[IBfileLinks.ANGULAR_APP_COMPONENT_TS],
        'Dashboard Registration'
      ),
    },
    {
      ...STEPS.config,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.ANGULAR_APP_COMPONENT_TS,
        files[IBfileLinks.ANGULAR_APP_COMPONENT_TS],
        'Config'
      ),
    },
    {
      ...STEPS.initialization,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.ANGULAR_APP_COMPONENT_TS,
        files[IBfileLinks.ANGULAR_APP_COMPONENT_TS],
        'SDK Initialization'
      ),
    },
    {
      ...STEPS.login,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.ANGULAR_APP_COMPONENT_TS,
        files[IBfileLinks.ANGULAR_APP_COMPONENT_TS],
        'Login'
      ),
    },
    {
      ...STEPS.blockchainCalls,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.ANGULAR_APP_COMPONENT_TS,
        files[IBfileLinks.ANGULAR_APP_COMPONENT_TS],
        'Blockchain Calls'
      ),
    },
    {
      ...STEPS.logout,
      pointer: replacementAggregator.highlightRange(
        IBfileLinks.ANGULAR_APP_COMPONENT_TS,
        files[IBfileLinks.ANGULAR_APP_COMPONENT_TS],
        'Logout'
      ),
    }
  )
}
