<template>
  <div class="container">
    <h3>Screen type: {{ tStore.screens[tStore.ii].type }}</h3>
    <div>
      <ul>
        <li>ii = {{ tStore.ii }}</li>
        <li>editMode = {{ tStore.editMode }}</li>
        <li>orientation = {{ $store.state.orientation }}</li>
      </ul>
      <h4>Screen content:</h4>
      <ul>
        <li
          v-for="(value, name) in tStore.screens[tStore.ii]"
          v-bind:key="name"
        >
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

  props: ["tStore"],
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
