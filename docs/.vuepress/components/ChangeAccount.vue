<template>
  <div>
    <button type="button" class="btn primaryBtn" @click="getAccount()">
      Connect to MetaMask
    </button>
    <transition name="fade">
      <div class="feedback green-background" v-if="show_feedback">
        <strong>Current Account: </strong><span style="font-family: monospace;">{{ currentAccount }}</span><br>
        <strong>Account Changed to: </strong><span style="font-family: monospace;">{{ checkAddress }}</span>
      </div>
    </transition>
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
      ethereum.removeListener('accountsChanged', handler)
    })
  },
  data() {
    return {
      currentAccount: '',
      checkAddress: null,
      show_feedback: false,
    };
  },
  methods: {
    async getAccount() {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      this.currentAccount = accounts[0];
      // Present feedback
      this.show_feedback = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
