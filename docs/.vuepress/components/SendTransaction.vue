<template>
  <div>
    <button type="button" class="btn primaryBtn" @click="getAccount()">
      Enable Ethereum
    </button>
    <button type="button" class="btn greenBtn" @click="sendEthTransaction()">Send Eth</button>
    <transition name="fade">
      <div class="feedback" v-if="show_feedback">
        <div v-if="show_account">
          <strong>Account: </strong><span style="font-family: monospace;">{{ ethAccount }}</span>
        </div>
        <div v-if="show_tx_result">
          <strong>Result: </strong><span style="font-family: monospace;">{{ tx_result }}</span>
        </div>
      </div>
    </transition>
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
      tx_result: null,
      show_feedback: false,
      show_account: false,
      show_tx_result: false,
    };
  },
  methods: {
    async getAccount() {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      // We currently only ever provide a single account,
      // but the array gives us some room to grow.
      this.ethAccount = accounts[0]
      // Present feedback
      this.show_tx_result = false;
      this.show_account = true;
      this.show_feedback = true;
    },
    sendEthTransaction() {
      ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: this.ethAccount,
          to: "0x2f318C334780961FB129D2a6c30D0763d9a5C970",
          value: "0x29a2241af62c0000",
          gas: '0x2710',
          gasPrice: '0x09184e72a000',
        }]
      })
      .then((result) => {
        console.log(result);
        this.tx_result = result;
        // Present feedback
        this.show_tx_result = true;
        this.show_account = false;
        this.show_feedback = true;
      })
      .catch(console.error);
    },
  },
};
</script>
