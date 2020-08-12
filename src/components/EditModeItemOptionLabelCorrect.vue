<template>
  <div :style="userStyle" class="container">
    <div class="heading">RIKTIG SVAR:</div>
    <div>{{labelText}}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "EditModeItemOptionLabelCorrect",
  computed: {
    userStyle() {
      return {
        fontSize: this.fontSize
      };
    }
  },
  props: {
    labelText: {
      type: String,
      required: false
    },
    fontSize: {
      type: String,
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
  color: #00ff00;
  font-weight: bold;
}

.container {
  border: 0.05rem solid black;
}
</style>
