<template>
  <div class="container">
    <div>
      Toggle edit mode
      <input type="checkbox" @click="toggleEditMode" />
      Toggle header
      <input
        type="checkbox"
        @click="$store.state.showDebugHeader = !$store.state.showDebugHeader"
      />
      Toggle footer
      <input
        type="checkbox"
        @click="$store.state.showDebugFooter = !$store.state.showDebugFooter"
      />
      Toggle NavBar
      <input
        type="checkbox"
        @click="$store.state.showNavBar = !$store.state.showNavBar"
      />
    </div>

    <div>
      Production view
      <input type="checkbox" @click="productionView()" />
    </div>

    <div class="goto-next-buttons">
      <button @click="decrementII">Go to previous</button>
      <button @click="incrementII">Go to next</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "DebugFooter",
  computed: {},

  props: ["moduleState"],
  data() {
    return {};
  },

  methods: {
    incrementII: function() {
      this.moduleState.ii++;
    },
    decrementII: function() {
      this.moduleState.ii--;
    },
    toggleEditMode: function() {
      this.moduleState.editMode = !this.moduleState.editMode;
    },
    productionView: function() {
      this.moduleState.editMode = false;
      this.$store.state.showDebugHeader = false;
      this.$store.state.showDebugFooter = false;
      this.$store.state.showNavBar = false;
    }
  }
});
</script>

<style scoped>
.container {
  background-color: pink;
}
.goto-next-buttons > * {
  font-size: 1.5rem;
  margin: 1rem;
  width: 40%;
}
</style>
