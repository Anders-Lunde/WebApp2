<template>
  <div id="app" :style="cssVarsForApp">
    <div v-if="$store.state.showNavBar === true" id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/oslospell/#/morfologi">Morfologi</router-link>|
      <router-link to="/oslospell/#/ordforraad">Ordforraad</router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
  components: {},
  data() {
    return {};
  },
  computed: {
    cssVarsForApp(): Record<string, string> {
      return {
        "--canvasWidth": this.$store.getters.canvasWidth + "px",
        "--canvasHeight": this.$store.getters.canvasHeight + "px",
        "--vw": this.$store.getters.canvasWidth / 100 + "px",
        "--vh": this.$store.getters.canvasHeight / 100 + "px",
        "--testvar": "10px",
      };
    },
  },
  props: {},

  methods: {},
});
</script>

<style>
html,
body {
  margin: 0px !important;
  padding: 0px !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 0.1rem;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
