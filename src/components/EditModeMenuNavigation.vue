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
     */
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
      const typeOrPracticeChangeIndexes = this.$store.getters[
        "utils/getTypeOrPracticeChangeIndexes"
      ](this.moduleState);
      //Looping backwards, set new global ii to the first change point with a lower index than
      //the current global ii (i.e. the previous screen change)
      for (let i = typeOrPracticeChangeIndexes.length - 1; i >= 0; i--) {
        const changeIndex = typeOrPracticeChangeIndexes[i];
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
      const typeOrPracticeChangeIndexes = this.$store.getters[
        "utils/getTypeOrPracticeChangeIndexes"
      ](this.moduleState);
      //Set new global ii to the first change point with a higher index than
      //the current global ii (i.e. the next screen change)
      for (let i = 0; i < typeOrPracticeChangeIndexes.length; i++) {
        if (typeOrPracticeChangeIndexes[i] > this.moduleState.ii) {
          this.moduleState.ii = typeOrPracticeChangeIndexes[i];
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
