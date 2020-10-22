<template>
  <div>
    <div>
      <div v-for="contributor in metaMaskContributorList" class="card">
        <img :src="contributor.avatar_url" width="100px" />
        <h4>
          <a :href="contributor.html_url" target="_blank">
            {{ contributor.login }}
          </a>
        </h4>
      </div>
    </div>
  </div>
</template>
<style scoped>
.card {
  display: inline-block;
  min-width: 175px;
  text-align: center;
}
h4 {
  margin-top: 0;
}
</style>

<script>
export default {
  props: {
    repoName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      metaMaskContributorList: [],
    };
  },
  mounted() {
    fetch(`https://api.github.com/repos/MetaMask/${this.repoName}/contributors`)
      .then((response) => response.json())
      .then((data) => {
        this.metaMaskContributorList = data;
      });
  },
};
</script>
