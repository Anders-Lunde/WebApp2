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
  height: 5rem;
  width: 5rem;
  cursor: pointer;
  padding: 0.6rem 0.6rem;
  background: url("~@/assets/speaker.png") no-repeat center;
  background-size: cover;
  border-radius: 1rem;
  border: 0.1rem solid black;
}
</style>
