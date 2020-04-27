<template>
    <button class="btn primaryBtn" @click="connectToEthereumNetwork()">
      Enable Ethereum
    </button>
</template>

<script>
export default {
  data() {
    return {
      ethereum: null,
    };
  },
  mounted() {
    this.ethereum = window.ethereum
  },
  methods: {
    connectToEthereumNetwork() {
      ethereum.enable();
    },
  },
};
</script>

