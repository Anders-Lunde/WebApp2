<template>
  <div>
    <img :src="narratorImageAnimated" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Narrator1Animated",
  computed: {},
  props: {},
  data() {
    return {
      narratorImageAnimated: require("@/assets/narratorImageAnimated.gif")
    };
  },

  methods: {}
});
</script>

<style scoped>
img {
  height: 100%;
  width: 100%;
}
</style>
