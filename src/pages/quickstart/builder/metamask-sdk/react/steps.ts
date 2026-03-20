import qsFileLinks from '../../../../../utils/qs-file-links.json'
import STEPS from './stepContent'

export default function getSteps(steps, files, replacementAggregator) {
  steps.push(
    {
      ...STEPS.reactQuickStart,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.MMCONNECT_REACT_APP_TSX,
        files[qsFileLinks.MMCONNECT_REACT_APP_TSX],
        'MetaMask Connect Import'
      ),
    },
    {
      ...STEPS.installation,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.MMCONNECT_REACT_PACKAGE_JSON,
        files[qsFileLinks.MMCONNECT_REACT_PACKAGE_JSON],
        'Install MetaMask Connect'
      ),
    },
    {
      ...STEPS.initialization,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.MMCONNECT_REACT_APP_TSX,
        files[qsFileLinks.MMCONNECT_REACT_APP_TSX],
        'Initialize MetaMask Connect'
      ),
    },
    {
      ...STEPS.connect,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.MMCONNECT_REACT_APP_TSX,
        files[qsFileLinks.MMCONNECT_REACT_APP_TSX],
        'Connect with MetaMask Wallet'
      ),
    },
    {
      ...STEPS.provider,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.MMCONNECT_REACT_APP_TSX,
        files[qsFileLinks.MMCONNECT_REACT_APP_TSX],
        'Get Provider'
      ),
    },

    {
      ...STEPS.signMessage,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.MMCONNECT_REACT_APP_TSX,
        files[qsFileLinks.MMCONNECT_REACT_APP_TSX],
        'Sign Message'
      ),
    },
    {
      ...STEPS.sendTransaction,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.MMCONNECT_REACT_APP_TSX,
        files[qsFileLinks.MMCONNECT_REACT_APP_TSX],
        'Send Transaction'
      ),
    },
    {
      ...STEPS.switchChain,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.MMCONNECT_REACT_APP_TSX,
        files[qsFileLinks.MMCONNECT_REACT_APP_TSX],
        'Switch Chain'
      ),
    },
    {
      ...STEPS.disconnect,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.MMCONNECT_REACT_APP_TSX,
        files[qsFileLinks.MMCONNECT_REACT_APP_TSX],
        'Disconnect from MetaMask Wallet'
      ),
    },
    {
      ...STEPS.connectAndSign,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.MMCONNECT_REACT_APP_TSX,
        files[qsFileLinks.MMCONNECT_REACT_APP_TSX],
        'Connect and Sign'
      ),
    },
    {
      ...STEPS.connectWith,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.MMCONNECT_REACT_APP_TSX,
        files[qsFileLinks.MMCONNECT_REACT_APP_TSX],
        'Connect With'
      ),
    }
  )
}
