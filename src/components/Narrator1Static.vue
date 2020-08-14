<template>
    <img :src="narratorImageStill" />
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Narrator1Static",
  computed: {},
  props: {},
  data() {
    return {
      narratorImageStill: require("@/assets/narratorImageStill.png")
    };
  },

  methods: {}
});
</script>

<style scoped>
img {
}
</style>
