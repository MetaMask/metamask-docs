<template>
  <p class="demo">
    {{ msg }}
    {{testingScraps()}}
  </p>
</template>

<script>
import { Scraps } from '../../../src/js/helpers/scraps'
export default {
  data () {
    return {
      msg: 'Hello this is <demo-1>'
    }
  },
  methods: {
    testingScraps() {
      const scraps = new Scraps();
      console.log(scraps.executeStack(false));
    }
  }
}
</script>
