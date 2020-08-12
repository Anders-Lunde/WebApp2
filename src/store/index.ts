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
  //state: { showDebugHeader: true, showDebugFooter: true, showNavBar: true },
  state: {
    showDebugHeader: false,
    showDebugFooter: true,
    showNavBar: false,
    screenHeight: 1536, //1536 iPad Air 2
    screenWidth: 5048, //2048 iPad Air 2
  },
});
