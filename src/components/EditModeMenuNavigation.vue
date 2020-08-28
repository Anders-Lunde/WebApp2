<template>
  <div class="flex-container">
    <div @click="gotoPrevSubtest()" class="round-button goto-prev-subtest"></div>
    <div @click="decrementII()" class="round-button decrement-ii"></div>
    <div @click="incrementII()" class="round-button increment-ii"></div>
    <div @click="gotoNextSubtest()" class="round-button goto-next-subtest"></div>

    <div class="ii-label">Skjerm: {{moduleState.ii}} / {{itemsLength()}}</div>
    <div class="test-type-label">asdass{{itemType()}}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ButtonAudioPlay",
  computed: {},
  props: ["moduleState"],
  data() {
    return {};
  },

  methods: {
    /*
     *METHOD START: buttonShowFeedback:
     */
    ii: function () {
      return this.moduleState.ii;
    },
    itemsLength: function () {
      return this.moduleState.items.length;
    },
    itemType: function () {
      return this.moduleState.items[this.ii()].type;
    },
    incrementII: function () {
      this.moduleState.ii++;
    },
    decrementII: function () {
      this.moduleState.ii--;
    },
    gotoPrevSubtest: function () {
      this.moduleState.ii = 20;
    },
    gotoNextSubtest: function () {
      this.moduleState.ii = 0;
    },
  },
});
</script>

<style scoped>
.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: calc(var(--vw) * 40);
}

.ii-label {
  font-size: calc(var(--vw) * 2);
  margin-left: 1%;
  margin-right: 1%;
  padding: 0.2%;
  padding-bottom: none;
  border: calc(var(--vw) * 0.3) solid black;
  border-bottom: none;
}

.test-type-label {
  font-size: calc(var(--vw) * 2);
  margin-left: 1%;
  margin-right: 1%;
  border: calc(var(--vw) * 0.3) solid black;
  border-bottom: none;
  max-width: calc(var(--vw) * 4);
  text-overflow: ellipsis;
}

.round-button {
  height: calc(var(--vw) * 6);
  width: calc(var(--vw) * 6);
  cursor: pointer;
  margin-left: 1%;
  margin-right: 1%;
  border-radius: calc(var(--vw) * 100);
}
.increment-ii {
  background: url("~@/assets/arrow-right.png") no-repeat center;
  background-size: contain;
}
.decrement-ii {
  background: url("~@/assets/arrow-left.png") no-repeat center;
  background-size: contain;
}
.goto-prev-subtest {
  background: url("~@/assets/arrow-double-left.png") no-repeat center;
  background-size: contain;
}
.goto-next-subtest {
  background: url("~@/assets/arrow-double-right.png") no-repeat center;
  background-size: contain;
}
</style>
