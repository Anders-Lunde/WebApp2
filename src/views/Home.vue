<template>
  <div class="home">
    <div class="heading">Oslo SPeLL digitale tester</div>
    <div class="button-container">
      <a href="/oslospell/#/morfologi">Morfo Logi</a>
      <a href="/oslospell/#/si">Si!</a>
      <a href="/oslospell/#/les">Les!</a>
      <a href="/oslospell/#/tallforstaaelse">Tallforståelse</a>
      <a href="/oslospell/#/ordforraad">Ordforråd</a>
    </div>

    <img class="logo" :src="logoImg" />
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";

export default Vue.extend({
  name: "Home",
  components: {},
  computed: {},
  props: {},
  data() {
    return {
      logoImg: this.$store.state.logoOsloSpell,
    };
  },

  methods: {},
});
</script>

<style scoped>
.heading {
  font-size: 5vw;
  text-align: center;
  margin: 3%;
  margin-bottom: 7%;
}

.logo {
  display: block;
  margin-top: 7%;
  margin-left: auto;
  margin-right: auto;
  width: 25%;
}

.button-container {
  display: flex;

  justify-content: space-evenly;
  flex-wrap: wrap;
}

a {
  padding: 1vw 1vw;
  margin: 1vw 1vw;
  border: 0.4vw solid rgba(255, 255, 255, 0);
  border-radius: 3vw;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  font-size: 4vw;
  color: #95e638;
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
  text-align: center;
  border-color: rgb(83, 156, 74);
}
</style>
