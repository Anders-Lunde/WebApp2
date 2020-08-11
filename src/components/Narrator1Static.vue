<template>
  <div>
    <img :src="narratorImageStill" />
  </div>
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
  height: 100%;
  width: 100%;
}
</style>
