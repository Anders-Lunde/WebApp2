<template>
  <div class="ordforraad">
    <WrapperOrdforraad />
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
import WrapperOrdforraad from "@/components/Ordforraad/WrapperOrdforraad.vue";

export default Vue.extend({
  name: "Ordforraad",
  components: {
    WrapperOrdforraad
  },
  computed: {},
  props: {},
  data() {
    return {};
  },

  methods: {}
});
</script>
