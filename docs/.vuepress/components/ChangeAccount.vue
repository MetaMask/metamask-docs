<template>
  <div>
    <button type="button" class="btn primaryBtn" @click="getAccount()">
      Connect to MetaMask
    </button>
    <h3>Current Account: {{ currentAccount }}</h3>
    <h3> Account Changed to:{{checkAddress}}</h3>
  </div>
</template>

<script>
export default {
  mounted() {
    const handler = (accounts) => {
      this.checkAddress = accounts[0]
    }
    ethereum.on('accountsChanged', handler)
    this.$on('hook:beforeDestroy', () => {
      ethereum.off('accountsChanged', handler)
    })
  },
  data() {
    return {
      currentAccount: '',
      checkAddress: null
    };
  },
  methods: {
    async getAccount() {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      this.currentAccount = accounts[0];
    },
  },
};
</script>

<style lang="scss" scoped></style>
