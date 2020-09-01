<template>
  <div class="container round-button" @click="resetAnswer()"></div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "EditModeMenuResetAnswer",
  computed: {},
  props: {
    moduleState: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },

  methods: {
    /*
     *METHOD START: resetAnswer:
     */
    resetAnswer: function () {
      this.moduleState.items[this.moduleState.ii].userAnswer = null;
    },
  },
});
</script>

<style scoped>
.round-button {
  height: calc(var(--vw) * 5.5);
  width: calc(var(--vw) * 5.5);
  cursor: pointer;
  margin-left: 1%;
  margin-right: 1%;
  border: calc(var(--vw) * 0.4) solid black;
  border-radius: calc(var(--vw) * 100);
  background: url("~@/assets/reset-answer.png") no-repeat center;
  background-size: contain;
  align-self: center;
}
</style>
