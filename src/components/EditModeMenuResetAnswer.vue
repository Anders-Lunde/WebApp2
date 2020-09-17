<template>
  <div class="container">
    <div class="round-button" @click="resetAnswer()"></div>
    <div class="text">Ubesvart</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "EditModeMenuResetAnswer",
  computed: {},
  props: {
    tStore: {
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
    resetAnswer: function() {
      this.tStore.screens[this.tStore.ii].userAnswer = null;
    },
  },
});
</script>

<style scoped>
.container {
  margin-left: 0.5%;
  margin-right: 0.5%;
  padding: 0.3%;
  border: calc(var(--vw) * 0.2) solid black;
}

.text {
  font-size: calc(var(--vw) * 2);
  width: 100%;
  text-align: center;
  text-overflow: clip;
  overflow: hidden;
  white-space: nowrap;
}

.round-button {
  margin-left: auto;
  margin-right: auto;
  height: calc(var(--vw) * 5.5);
  width: calc(var(--vw) * 5.5);
  cursor: pointer;
  border: calc(var(--vw) * 0.4) solid black;
  border-radius: calc(var(--vw) * 100);
  background: url("~@/assets/reset-answer.png") no-repeat center;
  background-size: contain;
  align-self: top;
}
</style>
