import Vue from "vue";
import Vuex from "vuex";
import morfologi from "./modules/morfologi";
import ordforraad from "./modules/ordforraad";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    morfologi,
    ordforraad,
  },
  state: {},
});
