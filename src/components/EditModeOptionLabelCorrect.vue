<template>
  <div class="container">
    <div class="heading">RIKTIG SVAR:</div>
    <div>{{labelText}}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "EditModeOptionLabelCorrect",
  computed: {},
  props: ["labelText"],
  data() {
    return {};
  },

  methods: {}
});
</script>

<style scoped>
.heading {
  color: #00ff00;
  font-weight: bold;
}

.container {
  border: 0.1rem solid black;

  font-size: 1.5rem;
}
</style>
