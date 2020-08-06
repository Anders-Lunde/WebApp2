<template>
  <div class="morfologi">
    <WrapperMorfologi />
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
import WrapperMorfologi from "@/components/Morfologi/WrapperMorfologi.vue";

export default Vue.extend({
  name: "Morfologi",
  components: {
    WrapperMorfologi
  },
  computed: {},
  props: {},
  data() {
    return {};
  },

  methods: {}
});
</script>
