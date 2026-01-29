import qsFileLinks from '../../../../../utils/qs-file-links.json'
import STEPS from './stepContent'

export default function getSteps(steps, files, replacementAggregator) {
  steps.push(
    // {
    //   ...STEPS.videoDemo,
    //   // No pointer needed for media content
    // },
    {
      ...STEPS.reactQuickStart,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.MMSDK_REACT_APP_TSX,
        files[qsFileLinks.MMSDK_REACT_APP_TSX],
        'MetaMask Connect Import'
      ),
    },
    {
      ...STEPS.installation,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.MMSDK_REACT_PACKAGE_JSON,
        files[qsFileLinks.MMSDK_REACT_PACKAGE_JSON],
        'Install MetaMask Connect'
      ),
    },
    {
      ...STEPS.initialization,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.MMSDK_REACT_APP_TSX,
        files[qsFileLinks.MMSDK_REACT_APP_TSX],
        'Initialize MetaMask Connect'
      ),
    },
    {
      ...STEPS.connect,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.MMSDK_REACT_APP_TSX,
        files[qsFileLinks.MMSDK_REACT_APP_TSX],
        'Connect with MetaMask Wallet'
      ),
    },
    {
      ...STEPS.disconnect,
      pointer: replacementAggregator.highlightRange(
        qsFileLinks.MMSDK_REACT_APP_TSX,
        files[qsFileLinks.MMSDK_REACT_APP_TSX],
        'Disconnect from MetaMask Wallet'
      ),
    }
  )
}
