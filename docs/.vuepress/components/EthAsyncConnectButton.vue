<template>
  <div>
    <button type="button" class="btn primaryBtn" @click="getAccount()">
      Enable Ethereum
    </button>
    <p>Account: {{ethAccount}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ethereum: null,
      ethAccount: ''
    };
  },
    mounted() {
    this.ethereum = window.ethereum
  },
  methods: {
    async getAccount() {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' }) // We currently only ever provide a single account,
      this.ethAccount = accounts[0] // but the array gives us some room to grow.
    },
  },
};
</script>
