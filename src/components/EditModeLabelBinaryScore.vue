<template>
  <div :style="userStyle" class="container">
    <div class="unanswered" v-if="result === 'unanswered' ">UBESVART!</div>
    <div class="correct" v-else-if="result==='correct' ">RIKTIG!</div>
    <div class="wrong" v-else>FEIL!</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "EditModeLabelBinaryScore",
  computed: {
    userStyle() {
      return {
        fontSize: "calc(var(--vw) * " + this.fontSize + ")",
      };
    },
  },
  props: {
    result: {
      type: String,
      required: true,
      validator: function (value) {
        // The value must match one of these strings
        return ["correct", "wrong", "unanswered"].indexOf(value) !== -1;
      },
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
  border: calc(var(--vw) * 0.1) solid black;
  font-weight: bold;
}

.unanswered {
  background-color: rgb(218, 218, 218);
}
.wrong {
  background-color: rgb(223, 58, 58);
}
.correct {
  background-color: lawngreen;
}
</style>
