<template>
  <div class="container">
    <h3>Screen type: {{moduleState.screens[moduleState.ii].type}}</h3>
    <div>
      <ul>
        <li>ii = {{moduleState.ii}}</li>
        <li>editMode = {{moduleState.editMode}}</li>
        <li>orientation = {{$store.state.orientation}}</li>
      </ul>
      <h4>Screen content:</h4>
      <ul>
        <li v-for="(value, name) in moduleState.screens[moduleState.ii]" v-bind:key="name">
          <b>{{ name }}:</b>
          {{ value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "DebugHeader",
  computed: {},

  props: ["moduleState"],
  data() {
    return {};
  },
  methods: {},
});
</script>

<style scoped>
.container {
  background-color: pink;
}
</style>
