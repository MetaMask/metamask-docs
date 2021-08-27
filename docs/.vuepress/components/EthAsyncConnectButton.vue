<template>
  <div>
    <button type="button" class="btn primaryBtn" @click="getAccount()">
      Enable Ethereum
    </button>
    <transition name="fade">
      <div class="feedback green-background" v-if="show_feedback">
        <strong>Account: </strong><span style="font-family: monospace;">{{ethAccount}}</span>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ethereum: null,
      ethAccount: '',
      show_feedback: false,
    };
  },
    mounted() {
    this.ethereum = window.ethereum
  },
  methods: {
    async getAccount() {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      // We currently only ever provide a single account,
      // but the array gives us some room to grow.
      this.ethAccount = accounts[0]
      // Present feedback
      this.show_feedback = true;
    },
  },
};
</script>
