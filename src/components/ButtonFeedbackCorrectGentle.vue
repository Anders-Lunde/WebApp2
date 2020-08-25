<template>
  <div class="button"></div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ButtonFeedbackCorrectGentle",
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
  /* background: url("~@/assets/correct-gentle.png") no-repeat center; */
  background-size: cover;
  border-radius: calc(var(--vw) * 2);
  border: calc(var(--vw) * 0.25) solid black;

  background: rgb(22, 255, 0);
  background: radial-gradient(
    circle,
    rgba(22, 255, 0, 1) 0%,
    rgba(255, 255, 255, 1) 39%
  );
}
</style>
