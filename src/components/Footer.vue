<template>
  <div class="container">
    Toggle edit mode
    <input type="checkbox" v-on:click="toggleEditMode" />
    <div class="goto-next-buttons">
      <button v-on:click="decrementII">Go to previous</button>
      <button v-on:click="incrementII">Go to next</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "Footer",
  computed: mapGetters(["ii", "items"]),

  props: {},
  data() {
    return {};
  },

  methods: {
    incrementII: function() {
      this.$store.commit("incrementII");
    },
    decrementII: function() {
      this.$store.commit("decrementII");
    },
    toggleEditMode: function() {
      this.$store.commit("toggleEditMode");
    },
    //setII: function () {
    //  this.$store.commit("setII", payload)
    //}
    recordAnswer: function(userAnswer: object) {
      this.$store.commit("recordAnswer", { userAnswer: userAnswer });
    }
  }
});
</script>

<style scoped>
.container {
  background-color: pink;
}
.goto-next-buttons > * {
  font-size: 24px;
  margin: 10px;
  width: 40%;
}
</style>
