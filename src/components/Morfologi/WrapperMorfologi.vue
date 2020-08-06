<template>
  <div>
    <!-- Set module namespace here-->
    <Header v-bind:moduleState="this.$store.state.morfologi" />

    <Screen1 v-if="items[ii].type === 'Screen1'" />
    <Screen2 v-if="items[ii].type === 'Screen2'" />
    <EpiInflectional v-if="items[ii].type === 'EpiInflectional'" />

    <!-- Set module namespace here-->
    <Footer v-bind:moduleState="this.$store.state.morfologi" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import EpiInflectional from "@/components/Morfologi/EpiInflectional.vue";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import { createNamespacedHelpers } from "vuex";

const { mapGetters } = createNamespacedHelpers("morfologi"); //Set module namespace here

export default Vue.extend({
  name: "WrapperMorfologi",
  components: {
    Header,
    Footer,
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
