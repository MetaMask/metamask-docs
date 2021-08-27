<template>
  <div>
    <button class="btn primaryBtn" @click="connectToEthereumNetwork()">
      Enable Ethereum
    </button>
    <transition name="fade">
      <div class="feedback" v-if="show_feedback">
        <strong>Success! </strong>A pending promise for <span style="font-family: monospace;">ethereum.request()</span> was created.
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ethereum: null,
      show_feedback: false,
    };
  },
  mounted() {
    this.ethereum = window.ethereum
  },
  methods: {
    connectToEthereumNetwork() {
      const promise = ethereum.request({ method: 'eth_requestAccounts' });
      // Present feedback
      this.show_feedback = true;
      // Don't believe just the css feedback, see the console.
      console.log("We got a promise here: ", promise);
    },
  },
};
</script>

