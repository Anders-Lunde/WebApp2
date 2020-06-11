<template>
  <div class="home">
    <Header />
    <Screen1 v-if="items[ii].type === 'Screen1'" />
    <Screen2 v-if="items[ii].type === 'Screen2'" />
    <Screen3 v-if="items[ii].type === 'Screen3'" />

    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
import Screen1 from "@/components/Screen1.vue";
import Screen2 from "@/components/Screen2.vue";
import Screen3 from "@/components/Screen3.vue";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "Home",
  components: {
    Screen1,
    Screen2,
    Screen3,
    Footer,
    Header
  },
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
    recordAnswer: function(userAnswer) {
      this.$store.commit("recordAnswer", { userAnswer: userAnswer });
    }
  }
});
</script>
