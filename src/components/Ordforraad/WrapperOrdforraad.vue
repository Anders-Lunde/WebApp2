<template>
  <div>
    <!-- Show relevant state by setting :tStore= to the relevant module namespace here-->
    <DebugHeader
      v-if="$store.state.showDebugHeader === true"
      v-bind:t-store="this.$store.state.ordforraad"
    />

    <!-- Cycle through the tests:-->
    <TestScreen v-if="screens[ii].type === 'TestScreen'" />

    <!-- Show relevant state by setting :tStore= to the relevant module namespace here-->
    <DebugFooter
      v-if="$store.state.showDebugFooter === true"
      v-bind:t-store="this.$store.state.ordforraad"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TestScreen from "@/components/Ordforraad/TestScreen.vue";
import DebugFooter from "@/components/DebugFooter.vue";
import DebugHeader from "@/components/DebugHeader.vue";
import { createNamespacedHelpers } from "vuex";

const { mapGetters } = createNamespacedHelpers("ordforraad"); //Set module namespace here

export default Vue.extend({
  name: "WrapperOrdforraad",
  components: {
    DebugHeader,
    DebugFooter,
    TestScreen,
  },
  computed: mapGetters(["ii", "screens", "editMode"]),
  props: {},
  data() {
    return {};
  },
  methods: {},
});
</script>

<style scoped></style>
