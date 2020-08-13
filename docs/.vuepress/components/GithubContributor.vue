<template>
    <div class = "">
      <style>
        .float-container {
          padding: 2px;
        }

        .float-child-image {
          width: auto;
          float: left;
          padding: 15px;
        }
        .float-child-text {
          float: left;
          padding: 15px;
        }
      </style>
      <div class="float-container">
        <div v-for="contributor in contributorList">
          <div class="float-child-image">
            <img :src="contributor.avatar_url" width="100px"/>
          </div>

          <div class="float-child-text">
            <h4>{{contributor.login}}</h4>
            <p>Contributions: {{contributor.contributions}}</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
//get the list of contributors

//store the list in a variable

//render the list as list items on the page
export default {
  data() {
    return {
      contributorList: []
    }
  },
  methods: {
    fetchListOfContributors() {
      fetch('https://api.github.com/repos/MetaMask/metamask-docs/contributors')
        .then(response => response.json())
        .then(data => {
          this.contributorList = data;
        });
    }
  },
  created() {
    this.fetchListOfContributors();
  }
}
</script>

