<template>
  <div>
    <!-- Show relevant state by setting :moduleState= to the relevant module namespace here-->
    <DebugHeader
      v-if="$store.state.showDebugHeader === true"
      :module-state="this.$store.state.morfologi"
    />

    <!-- Cycle through the tests:-->
    <EpiInflectional v-if="items[ii].type === 'EpiInflectional'" />

    <!-- Show relevant state by setting :moduleState= to the relevant module namespace here-->
    <DebugFooter
      v-if="$store.state.showDebugFooter === true"
      :module-state="this.$store.state.morfologi"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import EpiInflectional from "@/components/Morfologi/EpiInflectional.vue";
import DebugFooter from "@/components/DebugFooter.vue";
import DebugHeader from "@/components/DebugHeader.vue";
import { createNamespacedHelpers } from "vuex";

const { mapGetters } = createNamespacedHelpers("morfologi"); //Set module namespace here

export default Vue.extend({
  name: "WrapperMorfologi",
  components: {
    DebugHeader,
    DebugFooter,
    EpiInflectional
  },
  computed: mapGetters(["ii", "items", "editMode"]),
  props: {},
  data() {
    return {};
  },
  methods: {}
});
</script>

<style scoped>
</style>
