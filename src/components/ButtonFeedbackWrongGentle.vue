<template>
  <div class="button"></div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ButtonFeedbackWrongGentle",
  computed: {},
  props: {},
  data() {
    return {};
  },

  methods: {},
});
</script>

<style scoped>
.button {
  height: calc(var(--vw) * 5.5);
  width: calc(var(--vw) * 5.5);
  cursor: pointer;
  /* background: url("~@/assets/wrong-gentle.png") no-repeat center; */
  background-size: cover;
  border-radius: calc(var(--vw) * 2);
  border: calc(var(--vw) * 0.25) solid black;
  background: rgb(251, 255, 0);
  background: radial-gradient(
    circle,
    rgba(251, 255, 0, 1) 0%,
    rgba(255, 255, 255, 1) 39%
  );
}
</style>
