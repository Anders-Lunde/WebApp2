<template>
  <div>
    <div class="button"></div>
  </div>
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
  height: calc(var(--vw) * 7.5);
  width: calc(var(--vw) * 7.5);
  cursor: pointer;
  background: url("~@/assets/correct-gentle.png") no-repeat center;
  background-size: cover;
  border-radius: calc(var(--vw) * 2);
  border: calc(var(--vw) * 0.25) solid black;
}
</style>
