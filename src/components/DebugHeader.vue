<template>
  <div class="container">
    <h3>Screen type: {{moduleState.items[moduleState.ii].type}}</h3>
    <div>
      <ul>
        <li>ii = {{moduleState.ii}}</li>
        <li>editMode = {{moduleState.editMode}}</li>
      </ul>
      <h4>Item content:</h4>
      <ul>
        <li v-for="(value, name) in moduleState.items[moduleState.ii]" v-bind:key="name">
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
  methods: {}
});
</script>

<style scoped>
.container {
  background-color: pink;
}
</style>
