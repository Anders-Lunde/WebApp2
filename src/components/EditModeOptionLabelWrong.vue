<template>
  <div class="container">
    <div class="heading">FEIL SVAR:</div>
    <div>{{labelText}}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "EditModeOptionLabelWrong",
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
  color: #ff0000;
  font-weight: bold;
}

.container {
  border: 0.1rem solid black;

  font-size: 1.5rem;
}
</style>
