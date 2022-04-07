import EthConnectButton from './components/EthConnectButton';
import EthAsyncConnectButton from './components/EthAsyncConnectButton';
import ChangeAccount from './components/ChangeAccount';
import SendTransaction from './components/SendTransaction';

export default ({ Vue, isServer }) => {
  if (!isServer) {
    import('vue-toasted' /* webpackChunkName: "notification" */).then(
      (module) => {
        Vue.use(module.default);
      }
    );
  }

  Vue.component('EthConnectButton', EthConnectButton);
  Vue.component('EthAsyncConnectButton', EthAsyncConnectButton);
  Vue.component('ChangeAccount', ChangeAccount);
  Vue.component('SendTransaction', SendTransaction);
};
