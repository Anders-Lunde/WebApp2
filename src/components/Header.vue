<template>
  <div class="container">
    <div class="heading">
      <h3>Screen type: {{items[ii].type}}</h3>
      <div>ii = {{ii }}, editMode = {{editMode}}, item = {{items[ii]}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "Header",
  computed: mapGetters(["ii", "items", "editMode"]),

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

.heading {
  text-align: center;
}
</style>
