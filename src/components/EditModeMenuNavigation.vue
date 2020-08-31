<template>
  <div class="flex-container">
    <div @click="decrementII()" class="round-button decrement-ii"></div>
    <div @click="incrementII()" class="round-button increment-ii"></div>
    <div @click="gotoPrevSubtest()" class="round-button goto-prev-subtest"></div>
    <div @click="gotoNextSubtest()" class="round-button goto-next-subtest"></div>
    <div @click="setII()" class="round-button set-ii"></div>

    <div class="test-type-label">{{itemType()}}</div>
    <div class="screen-index-label">{{getScreenIndexString()}}</div>
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
    getScreenIndexString: function () {
      const currentType = this.moduleState.items[this.moduleState.ii].type;
      const itemArray = this.moduleState.items;
      let nTestItems = 0;
      let nPracticeItems = 0;
      let displayString = "";
      let currectScreenIsPractice = false;
      let screenIndex = -1;
      for (let i = 0; i < itemArray.length; i++) {
        const item = this.moduleState.items[i];
        //Count n practice items and test items, for current test
        if (item.type === currentType) {
          if (item.isPractice === true) {
            nPracticeItems++;
          } else {
            nTestItems++;
          }
        }
        if (this.moduleState.ii == i) {
          //Find out what the current screen is.
          //nPracticeItems and nTestItems will at this point in the loop
          //reflect which screenIndex we are on
          if (item.isPractice === true) {
            currectScreenIsPractice = true;
            screenIndex = nPracticeItems;
          } else {
            screenIndex = nTestItems;
          }
        }
      }
      if (currectScreenIsPractice) {
        displayString = "Øvelse " + screenIndex + " / " + nPracticeItems;
      } else {
        displayString = "Test " + screenIndex + " / " + nTestItems;
      }
      return displayString;
    },

    ii: function () {
      return this.moduleState.ii;
    },
    itemsLength: function () {
      return this.moduleState.items.length;
    },
    itemType: function () {
      const type = this.moduleState.items[this.ii()].type;
      // 1) insert a space before all caps
      // 2) uppercase the first character
      return type.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
        return str.toUpperCase();
      });
    },
    incrementII: function () {
      this.moduleState.ii++;
    },
    decrementII: function () {
      this.moduleState.ii--;
    },
    setII: function () {
      //TODO: popup
      this.moduleState.ii++;
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
  width: calc(var(--vw) * 35);
  max-height: 100%;
}

.screen-index-label {
  width: calc(var(--vw) * 12);
  font-size: calc(var(--vw) * 2);
  margin-left: 0%;
  margin-right: 1%;
  padding: 0.5%;
  padding-bottom: none;
  border: calc(var(--vw) * 0.2) solid black;
  border-bottom: none;
}

.test-type-label {
  width: calc(var(--vw) * 20);
  font-size: calc(var(--vw) * 2);
  margin-left: 0%;
  margin-right: 1%;
  padding: 0.5%;
  padding-bottom: none;
  border: calc(var(--vw) * 0.2) solid black;
  border-bottom: none;
  border-left: none;
  text-overflow: clip;
  overflow: hidden;
  white-space: nowrap;
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
.set-ii {
  background: url("~@/assets/arrow-up.png") no-repeat center;
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
