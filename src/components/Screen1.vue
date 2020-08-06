<template>
  <div>
    <h1>Screen type 1</h1>

    <div class="question-area">
      <div class="left-img" @click="recordAnswer('left')">
        <img v-bind:src="items[ii].imgLeft" />
      </div>

      <div class="right-img" @click="recordAnswer('right')">
        <img v-bind:src="items[ii].imgRight" />
      </div>
    </div>

    <button v-on:click="incrementII">Go to next</button>
    <button v-on:click="decrementII">Go to previous</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "Screen1",
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
    //setII: funcion () {
    //  this.$store.commit("setII", payload)
    //}
    recordAnswer: function(userAnswer: object) {
      this.$store.commit("recordAnswer", { userAnswer: userAnswer });
    }
  }
});
</script>

<style scoped>
.question-area {
  display: grid;
  grid-column-gap: 5px;
  margin: 0 10px;
  padding: 40;
  background-color: darkorange;
}

.left-img {
  grid-column-start: 1;
  grid-column-end: 3;
}

.right-img {
  grid-column-start: 3;
  grid-column-end: 4;
}
</style>
