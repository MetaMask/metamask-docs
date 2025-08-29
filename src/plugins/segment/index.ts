import * as path from 'path'

const SegmentPlugin = () => {
  return {
    name: 'docusaurus-plugin-segment',
    getClientModules() {
      return [path.resolve(__dirname, './segment')]
    },
  }
}

export default SegmentPlugin
