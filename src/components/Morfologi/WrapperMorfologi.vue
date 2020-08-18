<template>
  <div>
    <DebugHeader v-if="$store.state.showDebugHeader === true" :module-state="currentTestState" />

    <!-- Grid layout if editMode, to make room for edit menu-->
    <div class="viewport-area" :style="cssVarsForWrapper">
      <div class="app-area" :class="{wrapper_grid_container: editMode===true}">
        <!-- Test area. Scaled and moved with CSS if editMode, to make room for edit menu-->
        <div :class="{test_area_edit_mode: editMode===true}">
          <EpiInflectional v-if="items[ii].type === 'EpiInflectional'" />
          <MetaInflectional v-if="items[ii].type === 'MetaInflectional' " />
        </div>

        <!-- Edit menu. Shown if editMode-->
        <div v-if="editMode" class="edit-menu right"></div>
        <div v-if="editMode" class="edit-menu bottom"></div>
        <div v-if="editMode" class="edit-menu corner"></div>
      </div>
    </div>
    <DebugFooter v-if="$store.state.showDebugFooter === true" :module-state="currentTestState" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import EpiInflectional from "@/components/Morfologi/EpiInflectional.vue";
import MetaInflectional from "@/components/Morfologi/MetaInflectional.vue";
import DebugFooter from "@/components/DebugFooter.vue";
import DebugHeader from "@/components/DebugHeader.vue";
import { createNamespacedHelpers } from "vuex";

const { mapState } = createNamespacedHelpers("morfologi"); //When repurposing test: Set module namespace here

export default Vue.extend({
  name: "WrapperMorfologi",
  components: {
    DebugHeader,
    DebugFooter,
    EpiInflectional,
    MetaInflectional
  },
  data() {
    return {
      currentTestState: this.$store.state.morfologi, //When repurposing test: Set module namespace here
      editMenuWidth: 0.12, //Set width of edit-menu. 0 to 1
      editMenuHeight: 0.12 //Set height of edit-menu. 0 to 1
    };
  },
  computed: {
    ...mapState(["ii", "items", "editMode"]),
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
          ")"
      };
    }
  },
  watch: {
    //Update global store value of 'orientation' according to test item preference  upon ii change.
    ii: function() {
      this.$store.state.orientation = this.items[this.ii].orientation;
      //TODO: Lock device screen orientation
    }
  },
  mounted() {
    //Update global store value of 'orientation' according to test item preference  upon ii change.
    this.$store.state.orientation = this.items[this.ii].orientation;
    //TODO: Lock device screen orientation
  },
  props: {},

  methods: {}
});
</script>

<style scoped>
.viewport-area {
  background: rgb(238, 238, 238);
  width: var(--canvasWidth);
  height: var(--canvasHeight);
  margin: auto;
}
.app-area {
  background: white;
  transform: scale(0.99); /*this gives some border around the viewport*/
}

/*Enabled only in editMode*/
.wrapper_grid_container {
  display: grid;
  grid-template-columns: var(--grid-column-setup);
  grid-auto-rows: var(--grid-row-setup);
  column-gap: 0;
  row-gap: 0;
}

/*Enabled only in editMode*/
.test_area_edit_mode {
  grid-row: 1/2;
  grid-column: 1/2;
  transform: var(--edit-menu-size); /*transform: scale(x, y); */
  transform-origin: top left;
  transition: transform 0.4s;
}

.edit-menu {
  background: pink;
  border: calc(var(--vw) * 0.1) solid black;
}
</style>
