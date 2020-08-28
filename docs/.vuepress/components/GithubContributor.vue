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
  methods: {
    fetchContributorsList(repoName) {
      fetch(`https://api.github.com/repos/MetaMask/${repoName}/contributors`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.metaMaskContributorList = data;
        });
    },
  },
  created() {
    this.fetchContributorsList(this.repoName);
  },
};
</script>
