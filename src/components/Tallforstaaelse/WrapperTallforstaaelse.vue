<template>
  <div>
    <DebugHeader
      v-if="$store.state.showDebugHeader === true"
      :t-store="tStore"
    />

    <!-- Grid layout if editMode, to make room for edit menu-->
    <div class="viewport-area" :style="cssVarsForWrapper">
      <div
        class="app-area"
        :class="{ wrapper_grid_container: editMode === true }"
      >
        <!-- Test area. Scaled and moved with CSS if editMode, to make room for edit menu-->
        <div :class="{ test_area_edit_mode: editMode === true }">
          <ExaminerInstructions
            v-if="screens[ii].type === 'ExaminerInstructions'"
            :t-store="tStore"
          />
          <ParticipantRegistration
            v-if="screens[ii].type === 'ParticipantRegistration'"
            :t-store="tStore"
          />
          <ParticipantIntroduction
            v-if="screens[ii].type === 'ParticipantIntroduction'"
            :t-store="tStore"
          />

          <ReadingNumbers v-if="screens[ii].type === 'ReadingNumbers'" />
          <NumberRecognition v-if="screens[ii].type === 'NumberRecognition'" />
          <DigitComparision v-if="screens[ii].type === 'DigitComparision'" />
          <DotsToDigits v-if="screens[ii].type === 'DotsToDigits'" />
          <ArithmeticOral v-if="screens[ii].type === 'ArithmeticOral'" />
          <ArithmeticWritten v-if="screens[ii].type === 'ArithmeticWritten'" />
        </div>

        <!-- Edit menu. Shown if editMode-->
        <div v-if="editMode" class="edit-menu right"></div>
        <div v-if="editMode" class="edit-menu bottom">
          <EditModeMenuNavigation :t-store="tStore" />
          <EditModeMenuResetAnswer :t-store="tStore" />
          <EditModeMenuNullAnswersNavigator :t-store="tStore" />
        </div>
        <div v-if="editMode" class="edit-menu corner"></div>
      </div>
    </div>
    <DebugFooter
      v-if="$store.state.showDebugFooter === true"
      :t-store="tStore"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ReadingNumbers from "@/components/Tallforstaaelse/ReadingNumbers.vue";
import NumberRecognition from "@/components/Tallforstaaelse/NumberRecognition.vue";
import DigitComparision from "@/components/Tallforstaaelse/DigitComparision.vue";
import DotsToDigits from "@/components/Tallforstaaelse/DotsToDigits.vue";
import ArithmeticOral from "@/components/Tallforstaaelse/ArithmeticOral.vue";
import ArithmeticWritten from "@/components/Tallforstaaelse/ArithmeticWritten.vue";
import DebugFooter from "@/components/DebugFooter.vue";
import DebugHeader from "@/components/DebugHeader.vue";
import EditModeMenuNavigation from "@/components/EditModeMenuNavigation.vue";
import EditModeMenuResetAnswer from "@/components/EditModeMenuResetAnswer.vue";
import EditModeMenuNullAnswersNavigator from "@/components/EditModeMenuNullAnswersNavigator.vue";
import ParticipantIntroduction from "@/components/MenuScreens/ParticipantIntroduction.vue";
import ParticipantRegistration from "@/components/MenuScreens/ParticipantRegistration.vue";
import ExaminerInstructions from "@/components/MenuScreens/ExaminerInstructions.vue";

import { createNamespacedHelpers } from "vuex";

const { mapState } = createNamespacedHelpers("tallforstaaelse"); //When repurposing test: Set module namespace here

export default Vue.extend({
  name: "WrapperTallforstaaelse",
  components: {
    DebugHeader,
    DebugFooter,
    ReadingNumbers,
    NumberRecognition,
    DigitComparision,
    DotsToDigits,
    ArithmeticOral,
    ArithmeticWritten,
    EditModeMenuNavigation,
    EditModeMenuResetAnswer,
    EditModeMenuNullAnswersNavigator,
    ParticipantIntroduction,
    ParticipantRegistration,
    ExaminerInstructions,
  },
  data() {
    return {
      tStore: this.$store.state.tallforstaaelse, //When repurposing test: Set module namespace here
      editMenuWidth: 0.135, //Set width of edit-menu. 0 to 1
      editMenuHeight: 0.135, //Set height of edit-menu. 0 to 1
    };
  },
  computed: {
    ...mapState(["ii", "screens", "editMode"]),
    cssVarsForWrapper(): Record<string, string> {
      return {
        //The following 3 css variables sets up proper
        //division of the screen into a 2x2 grid,
        //to make space for the edit menu.
        "--grid-column-setup":
          Math.round(
            this.$store.getters.canvasWidth * (1 - this.editMenuWidth)
          ) +
          "px " +
          Math.round(this.$store.getters.canvasWidth * this.editMenuWidth) +
          "px",

        "--grid-row-setup":
          Math.round(
            this.$store.getters.canvasHeight * (1 - this.editMenuHeight)
          ) +
          "px " +
          Math.round(this.$store.getters.canvasHeight * this.editMenuHeight) +
          "px",

        "--edit-menu-size":
          "scale(" +
          (1 - this.editMenuWidth) +
          "," +
          (1 - this.editMenuHeight) +
          ")",
      };
    },
  },
  watch: {
    //Update global store value of 'orientation' according to test screen preference  upon ii change.
    ii: function() {
      this.$store.state.orientation = this.screens[this.ii].orientation;
      /*
      if (this.$store.state.orientation === "portrait") {
        screen.orientation.lock("portrait");
      } else {
        screen.orientation.lock("landscape");
      }
      */

      //TODO: Lock device screen orientation
    },
  },
  mounted() {
    //Update global store value of 'orientation' according to test screen preference  upon ii change.
    this.$store.state.orientation = this.screens[this.ii].orientation;
    //TODO: Lock device screen orientation

    //If click top 10% of screen, toggle edit mode:
    window.addEventListener("mousedown", (e) => {
      if (e.pageY < window.innerHeight * 0.1) {
        this.tStore.editMode = !this.tStore.editMode;
      }
    });

    //Keyboard keys:
    window.addEventListener("keydown", (e) => {
      if (e.key === "e") {
        this.tStore.editMode = !this.tStore.editMode;
      }
      if (e.key === "ArrowLeft") {
        this.tStore.ii--;
      }
      if (e.key === "ArrowRight") {
        this.tStore.ii++;
      }
      if (e.key === "ArrowUp") {
        this.$store.state.showDebugHeader = !this.$store.state.showDebugHeader;
      }
      if (e.key === "ArrowDown") {
        this.$store.state.showDebugFooter = !this.$store.state.showDebugFooter;
      }
    });
  },
  props: {},

  methods: {},
});
</script>

<style scoped>
.viewport-area {
  /*the edge of this will be visible as a thin border around the app-area,
  because of the transform: scale() below*/
  background: rgb(238, 238, 238);
  width: var(--canvasWidth);
  height: var(--canvasHeight);
  margin: auto;
}
.app-area {
  background: white;
  transform: scale(
    0.99
  ); /*this gives some border/margin around the viewport, withouth enlarging viewport-area*/
}

.wrapper_grid_container {
  /*Enabled only in editMode*/
  display: grid;
  grid-template-columns: var(--grid-column-setup);
  grid-auto-rows: var(--grid-row-setup);
  column-gap: 0;
  row-gap: 0;
}

.test_area_edit_mode {
  /*Enabled only in editMode*/
  grid-row: 1/2;
  grid-column: 1/2;
  transform: var(--edit-menu-size);
  transform-origin: top left;
  transition: transform 0.4s;
}

.edit-menu {
  /*Enabled only in editMode*/
  background: rgb(221, 221, 221);
  border: calc(var(--vw) * 0.1) solid black;
  border-bottom: none;
  border-right: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
