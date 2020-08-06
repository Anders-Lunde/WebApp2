<template>
  <div>
    <!-- Set module namespace here-->
    <Header v-bind:moduleState="this.$store.state.ordforraad" />

    <TestScreen v-if="items[ii].type === 'TestScreen'" />

    <!-- Set module namespace here-->
    <Footer v-bind:moduleState="this.$store.state.ordforraad" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TestScreen from "@/components/Ordforraad/TestScreen.vue";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import { createNamespacedHelpers } from "vuex";

const { mapGetters } = createNamespacedHelpers("ordforraad"); //Set module namespace here

export default Vue.extend({
  name: "WrapperOrdforraad",
  components: {
    Header,
    Footer,
    TestScreen
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
