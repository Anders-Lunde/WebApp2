<template>
  <div>
    <div class="button"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ButtonGotoNext",
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
  border-radius: calc(var(--vw) * 100);
  background: url("~@/assets/arrow-right.png") no-repeat center;
  background-size: cover;
}
</style>
