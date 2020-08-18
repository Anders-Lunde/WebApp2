<template>
  <div>
    <div class="button"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ButtonAudioPlay",
  computed: {},
  props: {},
  data() {
    return {};
  },

  methods: {}
});
</script>

<style scoped>
.button {
  height: calc(var(--vw) * 7.5);
  width: calc(var(--vw) * 7.5);
  cursor: pointer;
  background: url("~@/assets/speaker.png") no-repeat center;
  background-size: cover;
  border-radius: calc(var(--vw) * 2);
  border: calc(var(--vw) * 0.25) solid black;
}
</style>
