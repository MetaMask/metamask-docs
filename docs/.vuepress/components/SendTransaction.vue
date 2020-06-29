<template>
  <div>
    <eth-connect-button></eth-connect-button>
    <button class="btn greenBtn" @click="sendEthTransaction()">Send Eth</button>
  </div>
</template>

<script>
import EthConnectButton from "./EthConnectButton";
export default {
  components: {
    EthConnectButton,
  },
  data() {
    return {
      accounts: [],
    };
  },
  methods: {
    sendEthTransaction() {
      ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: this.accounts[0],
          to: "0x2f318C334780961FB129D2a6c30D0763d9a5C970",
          value: "0x29a2241af62c0000",
          gas: 21000,
          gasPrice: 20000000000,
        }]
      })
        .then((result) => {
          console.log(result);
        })
        .catch(console.error);
    },
  },
};
</script>
