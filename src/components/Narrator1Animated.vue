<template>
  <img :src="narratorImageAnimated" />
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
}
</style>
