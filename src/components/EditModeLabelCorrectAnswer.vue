<template>
  <div :style="userStyle" class="container">
    <div class="heading">RIKTIG SVAR:</div>
    <div>{{labelText}}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "EditModeLabelCorrectAnswer",
  computed: {
    userStyle() {
      return {
        fontSize: "calc(var(--vw) * " + this.fontSize + ")",
      };
    },
  },
  props: {
    labelText: {
      type: String,
      required: false,
    },
    fontSize: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },

  methods: {},
});
</script>

<style scoped>
.heading {
  color: #00ff00;
  font-weight: bold;
}

.container {
  border: calc(var(--vw) * 0.15) solid black;
}
</style>
