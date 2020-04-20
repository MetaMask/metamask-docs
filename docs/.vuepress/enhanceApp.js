import EthConnectButton from './components/EthConnectButton';
import EthAsyncConnectButton from './components/EthAsyncConnectButton';
import ChangeAccount from './components/ChangeAccount';

export default ({ Vue, isServer }) => {
  if (!isServer) {
    import('vue-toasted' /* webpackChunkName: "notification" */).then((module) => {
      Vue.use(module.default)
    })
  }
 Vue.component('EthConnectButton', EthConnectButton);
 Vue.component('EthAsyncConnectButton', EthAsyncConnectButton);
 Vue.component('ChangeAccount', ChangeAccount);
}
