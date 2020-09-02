<template>
  <div :style="userStyle" class="container">{{labelText}}</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "EditModeScreenIsPracticeIndicator",
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
.container {
  color: #ff9d00;
  font-weight: bold;
  border: calc(var(--vw) * 0.15) solid black;
}
</style>
