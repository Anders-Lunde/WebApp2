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
  height: 5rem;
  width: 5rem;
  cursor: pointer;
  background: url("~@/assets/speaker.png") no-repeat center;
  background-size: cover;
  padding: 0.6rem 0.6rem;
  background: url("~@/assets/arrow-right.png") no-repeat center;
  background-size: cover;
}
</style>
