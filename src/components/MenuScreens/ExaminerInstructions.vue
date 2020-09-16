<template>
  <div class="grid-container">
    <div class="heading">
      {{ screenDataReadOnly.heading }}
    </div>

    <div class="body">
      {{ screenDataReadOnly.body }}
    </div>

    <img class="logo" :src="logoImg" />

    <div class="goto-next-button" @click="gotoNextButton()">
      <ButtonGotoNext />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ButtonGotoNext from "@/components/ButtonGotoNext.vue";

export default Vue.extend({
  name: "ExaminerInstructions",

  components: {
    ButtonGotoNext,
  },

  data() {
    return {
      screenDataReadOnly: this.tStore.screens[this.tStore.ii],
      deactivateAllButtons: false,
      logoImg: this.$store.state.logoOsloSpell,
    };
  },
  computed: {},
  props: ["tStore"],

  methods: {
    /*
     *METHOD START: gotoNextButton:
     */
    gotoNextButton: function() {
      if (this.deactivateAllButtons) {
        return;
      }
      this.tStore.ii++;
    },
  },
});
</script>

<style scoped>
.grid-container {
  display: grid;

  grid-template-columns:
    calc(var(--vw) * 25)
    calc(var(--vw) * 25)
    calc(var(--vw) * 25)
    calc(var(--vw) * 25);

  grid-template-rows: calc(var(--vh) * 15) calc(var(--vh) * 75) calc(
      var(--vh) * 10
    );

  margin: 0;
  padding: 0;
}

.heading {
  font-size: calc(var(--vh) * 6);
  grid-row: 1;
  grid-column: 1/-1;
  justify-self: center;
}

.body {
  white-space: pre;
  font-size: calc(var(--vh) * 3);
  grid-row: 2;
  grid-column: 1/-2;
  justify-self: left;
}

.logo {
  grid-row: 2;
  grid-column: 1/-1;
  width: calc(var(--vw) * 30);
  justify-self: center;
  align-self: end;
}

.goto-next-button {
  grid-row: 3;
  grid-column: 1/-1;
  justify-self: end;
  align-self: end;
}
</style>
