<template>
  <div class="flex-container">
    <div class="heading">
      Ubesv. her: {{ getNNullAnswersSubtest() }} ({{ getNNullAnswersTotal() }}
      totalt)
    </div>
    <div class="next-label">Neste ubesv. i:</div>

    <div
      class="button goto-next-null-subtest"
      @click="gotoNextNullAnswerSubtest()"
    >
      Deltest
    </div>
    <div class="button goto-next-null-total" @click="gotoNextNullAnswerTotal()">
      Totalt
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "EditModeMenuNullAnswersNavigator",
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
     *METHOD START: gotoNextNullSubtest:
     */
    gotoNextNullAnswerSubtest: function() {
      const currentType = this.tStore.screens[this.tStore.ii].type;
      const screenArray = this.tStore.screens;
      //Check if there is at least 1 null answer
      let hasNull = false;
      for (let i = 0; i < screenArray.length; i++) {
        if (
          screenArray[i].userAnswer === null &&
          screenArray[i].isScored === true &&
          screenArray[i].type === currentType
        ) {
          hasNull = true;
          break;
        }
      }
      //Go to next null (set this.tStore.ii to next null)
      let i = this.tStore.ii; //start in the current screen
      if (hasNull === true) {
        /*eslint-disable no-constant-condition*/ //NB! Do not remove this!!!
        while (true) {
          i++;
          //Start from beginning when end is reached
          if (i > screenArray.length - 1) {
            i = 0;
          }

          if (
            screenArray[i].userAnswer === null &&
            screenArray[i].isScored === true &&
            screenArray[i].type === currentType
          ) {
            //We found the next null screen
            this.tStore.ii = i;
            break;
          }
        }
      }
    },
    /*
     *METHOD START: gotoNextNullTotal:
     */
    gotoNextNullAnswerTotal: function() {
      const screenArray = this.tStore.screens;
      //Check if there is at least 1 null answer
      let hasNull = false;
      for (let i = 0; i < screenArray.length; i++) {
        if (
          screenArray[i].userAnswer === null &&
          screenArray[i].isScored === true
        ) {
          hasNull = true;
          break;
        }
      }
      //Go to next null (set this.tStore.ii to next null)
      let i = this.tStore.ii; //start in the current screen
      if (hasNull === true) {
        /*eslint-disable no-constant-condition*/ //NB! Do not remove this!!!
        while (true) {
          i++;
          //Start from beginning when end is reached
          if (i > screenArray.length - 1) {
            i = 0;
          }

          if (
            screenArray[i].userAnswer === null &&
            screenArray[i].isScored === true
          ) {
            //We found the next null screen
            this.tStore.ii = i;
            break;
          }
        }
      }
    },

    /*
     *METHOD START: getNNullAnswersSubtest:
     */
    getNNullAnswersSubtest: function() {
      return this.$store.getters["utils/getNNullAnswersSubtest"](this.tStore);
    },

    /*
     *METHOD START: getNNullAnswersTotal:
     */
    getNNullAnswersTotal: function() {
      return this.$store.getters["utils/getNNullAnswersTotal"](this.tStore);
    },
  },
});
</script>

<style scoped>
.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: calc(var(--vw) * 23);
  max-height: 100%;
  font-size: calc(var(--vw) * 2);
  padding: 0%;
  border: calc(var(--vw) * 0.2) solid black;
}
.heading {
  width: 100%;
  text-align: center;
  text-overflow: clip;
  overflow: hidden;
  white-space: nowrap;
}

.next-label {
  width: 100%;
  text-align: center;
}

.button {
  background: white;
  text-align: center;
  display: inline;
  cursor: pointer;
  margin-left: 1%;
  margin-right: 1%;
  padding: 2%;
  border: calc(var(--vw) * 0.4) solid black;
  border-radius: calc(var(--vw) * 1);
  height: 25%;
}

.goto-next-null-subtest {
  margin-left: 2%;
  margin-right: auto;
}

.goto-next-null-total {
  margin-left: auto;
  margin-right: 2%;
}
</style>
