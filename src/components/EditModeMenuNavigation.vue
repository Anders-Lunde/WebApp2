<template>
  <div class="flex-container">
    <div @click="decrementII()" class="round-button decrement-ii"></div>
    <div @click="incrementII()" class="round-button increment-ii"></div>
    <div @click="gotoPrevSubtest()" class="round-button goto-prev-subtest"></div>
    <div @click="gotoNextSubtest()" class="round-button goto-next-subtest"></div>
    <div @click="setII()" class="round-button set-ii"></div>

    <div class="test-type-label">{{getFormatedItemType()}}</div>
    <div class="screen-index-label">{{getScreenIndexString()}}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "EditModeMenuNavigation",
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
     *METHOD START: getScreenIndexString:
     *Returns e.g. "Øvelse 1 / 4"
     *or "Test 14 / 16"
     */
    getScreenIndexString: function () {
      const currentType = this.moduleState.items[this.moduleState.ii].type;
      const itemArray = this.moduleState.items;
      let nTestItems = 0;
      let nPracticeItems = 0;
      let displayString = "";
      let currectScreenIsPractice = false;
      let currectScreenIsTest = false;
      let screenIndex = -1;
      //Count n practice items and test items, for current test.
      //In the middle of the loop, take note of which screen we currently are in:
      //(if (this.moduleState.ii == i)
      for (let i = 0; i < itemArray.length; i++) {
        const item = this.moduleState.items[i];
        if (item.type === currentType) {
          if (item.isPractice === true) {
            nPracticeItems++;
          } else if (item.isScored === true) {
            nTestItems++;
          }
        }
        //Find out what the current screen is.
        //nPracticeItems and nTestItems will at this point in the loop
        //reflect which screenIndex we are on
        if (this.moduleState.ii == i) {
          if (item.isPractice === true) {
            currectScreenIsPractice = true;
            screenIndex = nPracticeItems;
          } else if (item.isScored === true) {
            currectScreenIsTest = true;
            screenIndex = nTestItems;
          }
        }
      }
      //Construct info-string
      if (currectScreenIsPractice) {
        displayString = "Øvelse " + screenIndex + " / " + nPracticeItems;
      } else if (currectScreenIsTest) {
        displayString = "Test " + screenIndex + " / " + nTestItems;
      } else {
        //It's neither practice nor test
        displayString = "";
      }
      return displayString;
    },

    /*
     *METHOD START: getFormatedItemType:
     */
    getFormatedItemType: function () {
      const type = this.moduleState.items[this.moduleState.ii].type;
      // 1) insert a space before all caps
      // 2) uppercase the first character
      return type.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
        return str.toUpperCase();
      });
    },
    /*
     *METHOD START: incrementII:
     */
    incrementII: function () {
      //Avoid overflowing item array
      this.moduleState.ii = Math.min(
        this.moduleState.ii + 1,
        this.moduleState.items.length - 1
      );
    },
    /*
     *METHOD START: decrementII:
     */
    decrementII: function () {
      //Avoid undeflowing item array
      this.moduleState.ii = Math.max(this.moduleState.ii - 1, 0);
    },
    /*
     *METHOD START: setII:
     */
    setII: function () {
      //TODO: popup
      console.log("Not implemented yet");
    },
    /*
     *METHOD START: gotoPrevSubtest:
     */
    gotoPrevSubtest: function () {
      const screenChangeIndexes = this.$store.getters[
        "utils/getScreenChangeIndexes"
      ](this.moduleState);
      //Looping backwards, set new global ii to the first change point with a lower index than
      //the current global ii (i.e. the previous screen change)
      for (let i = screenChangeIndexes.length - 1; i >= 0; i--) {
        const changeIndex = screenChangeIndexes[i];
        if (changeIndex < this.moduleState.ii) {
          this.moduleState.ii = changeIndex;
          break;
        }
      }
    },
    /*
     *METHOD START: gotoNextSubtest:
     */
    gotoNextSubtest: function () {
      const screenChangeIndexes = this.$store.getters[
        "utils/getScreenChangeIndexes"
      ](this.moduleState);
      //Set new global ii to the first change point with a higher index than
      //the current global ii (i.e. the next screen change)
      for (let i = 0; i < screenChangeIndexes.length; i++) {
        if (screenChangeIndexes[i] > this.moduleState.ii) {
          this.moduleState.ii = screenChangeIndexes[i];
          break;
        }
      }
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
  border: calc(var(--vw) * 0.2) solid black;
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
