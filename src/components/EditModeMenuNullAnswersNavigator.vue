<template>
  <div class="flex-container">
    <div class="heading">Ubesvarte: {{getNNullAnswersSubtest()}} ({{getNNullAnswersTotal()}} totalt)</div>
    <div class="next-label">Neste ubesvarte i:</div>

    <div class="button goto-next-null-subtest" @click="gotoNextNullSubtest()">Deltest</div>
    <div class="button goto-next-null-total" @click="gotoNextNullTotal()">Totalt</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "EditModeMenuNullAnswersNavigator",
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
     *METHOD START: gotoNextNullSubtest:
     */
    gotoNextNullSubtest: function () {
      const currentType = this.moduleState.items[this.moduleState.ii].type;
      let n = 0;
      for (const item of this.moduleState.items) {
        if (item.type === currentType) {
          if (item.userAnswer === null && item.isPractice == false) {
            n++;
          }
        }
      }
    },
    /*
     *METHOD START: gotoNextNullTotal:
     */
    gotoNextNullTotal: function () {
      const currentType = this.moduleState.items[this.moduleState.ii].type;
      let n = 0;
      for (const item of this.moduleState.items) {
        if (item.type === currentType) {
          if (item.userAnswer === null && item.isPractice == false) {
            n++;
          }
        }
      }
    },

    /*
     *METHOD START: getNNullAnswersSubtest:
     */
    getNNullAnswersSubtest: function () {
      return this.$store.getters["utils/getNNullAnswersSubtest"](
        this.moduleState
      );
    },

    /*
     *METHOD START: getNNullAnswersTotal:
     */
    getNNullAnswersTotal: function () {
      return this.$store.getters["utils/getNNullAnswersTotal"](
        this.moduleState
      );
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
  height: 35%;
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
