<template>
  <div>
    <button type="button" class="btn primaryBtn" @click="getAccount()">
      Enable Ethereum
    </button>
    <h3>Current Account: {{ currentAccount }}</h3>
    <h3> Account Changed to:{{checkAddress}}</h3>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log('heyy')
    const handler = (accounts) => {
      this.checkAddress = accounts[0]
    }
    window.ethereum.on('accountsChanged', handler)
    this.$on('hook:beforeDestroy', () => {
      window.ethereum.off('accountsChanged', handler)
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
      const accounts = await window.ethereum.enable();
      this.currentAccount = accounts[0];
    },
  },
};
</script>

<style lang="scss" scoped></style>
