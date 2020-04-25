<template>
    <button class="btn primaryBtn" @click="connectToEthereumNetwork()">
      Enable Ethereum
    </button>
</template>

<script>
export default {
  data() {
    return {
      ethereum: window.ethereum,
    };
  },
  methods: {
    connectToEthereumNetwork() {
      this.ethereum.enable();
    },
  },
};
</script>

