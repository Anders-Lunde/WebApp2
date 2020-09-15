<template>
  <div class="tallforstaaelse">
    <WrapperTallforstaaelse />
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
import WrapperTallforstaaelse from "@/components/Tallforstaaelse/WrapperTallforstaaelse.vue";

export default Vue.extend({
  name: "Tallforstaaelse",
  components: {
    WrapperTallforstaaelse,
  },
  computed: {},
  props: {},
  data() {
    return {};
  },

  methods: {},
});
</script>
