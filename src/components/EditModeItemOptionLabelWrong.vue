<template>
  <div :style="userStyle" class="container">
    <div class="heading">FEIL SVAR:</div>
    <div>{{labelText}}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "EditModeItemOptionLabelWrong",
  computed: {
    userStyle() {
      return {
        fontSize: this.fontSize + "rem"
      };
    }
  },
  props: {
    labelText: {
      type: String,
      required: false
    },
    fontSize: {
      type: Number,
      required: true
    }
  },
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
}
</style>
