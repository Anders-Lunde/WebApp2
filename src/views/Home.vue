<template>
  <div class="home">
    <h1>Home :)</h1>

    <a href="/#/morfologi">Morfologi</a>
    <a href="/#/tall">Tall</a>
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
    return {};
  },

  methods: {},
});
</script>


<style scoped>
a {
  display: inline-block;
  padding: 1vw 1vw;
  margin: 1vw 1vw;
  border: 0.4vw solid rgba(255, 255, 255, 0);
  border-radius: 3vw;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  font-weight: 100vw;
  font-size: 5vw;
  color: #95e638;
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
  text-align: center;
  border-color: rgb(83, 156, 74);
}
</style>

