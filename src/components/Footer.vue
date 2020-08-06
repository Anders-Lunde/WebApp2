<template>
  <div class="container">
    Toggle edit mode
    <input type="checkbox" v-on:click="toggleEditMode" />
    <div class="goto-next-buttons">
      <button v-on:click="decrementII">Go to previous</button>
      <button v-on:click="incrementII">Go to next</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Footer",
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
    }
  }
});
</script>

<style scoped>
.container {
  background-color: pink;
}
.goto-next-buttons > * {
  font-size: 24px;
  margin: 10px;
  width: 40%;
}
</style>
