<template>
  <div>
    <button class="enableEthereumButton" @click="connectToEthereumNetwork()">
      Enable Ethereum
    </button>
  </div>
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

