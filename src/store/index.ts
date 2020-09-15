import Vue from "vue";
import Vuex from "vuex";
import morfologi from "./modules/morfologi";
import ordforraad from "./modules/ordforraad";
import tallforstaaelse from "./modules/tallforstaaelse";
import utils from "./modules/utils";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    morfologi,
    ordforraad,
    tallforstaaelse,
    utils,
  },
  //state: { showDebugHeader: true, showDebugFooter: true, showNavBar: true },
  state: {
    logoOsloSpell: require("@/assets/logo-oslo-spell.png"),
    showDebugHeader: false,
    showDebugFooter: false,
    showNavBar: false,
    //screenHeight: 150, //1536 iPad Air 2
    //screenWidth: 200, //2048 iPad Air 2
    orientation: null, //portraint | landscape
    //orientation: "portrait", //portraint | landscape
    //currentDevice: "PC",
  },
  getters: {
    //We force a 4:3 aspect ratio regardless of device, since that will fit on most/all devices,
    //and its the aspect for most iPads.
    //On non 4:3 screens, this requires leaving some of the viewport with white space.
    canvasHeight: (state) => {
      let shortSide = Math.min(window.innerHeight, window.innerWidth);
      let longSide = Math.max(window.innerHeight, window.innerWidth);
      /*
      if (state.currentDevice === "PC") {
        //No screen rotation on PC, so we shrink according to height
        return shortSide;
      }
      */
      const aspect = longSide / shortSide;
      if (aspect > 4 / 3) {
        longSide = Math.floor(shortSide * 1.333333);
      }
      if (aspect < 4 / 3) {
        shortSide = Math.floor(longSide / 1.333333);
      }
      if (state.orientation === "portrait") {
        return longSide;
      } else if (state.orientation === "landscape") {
        return shortSide;
      }
    },
    canvasWidth: (state) => {
      let shortSide = Math.min(window.innerHeight, window.innerWidth);
      let longSide = Math.max(window.innerHeight, window.innerWidth);
      /*
      if (state.currentDevice === "PC") {
        //No screen rotation on PC, so we shrink according to height
        if (state.orientation === "portrait") {
          return shortSide / 1.333333;
        } else {
          return longSide;
        }
      }
      */
      const aspect = longSide / shortSide;
      if (aspect > 4 / 3) {
        longSide = Math.floor(shortSide * 1.333333);
      }
      if (aspect < 4 / 3) {
        shortSide = Math.floor(longSide / 1.333333);
      }

      if (state.orientation === "portrait") {
        return shortSide;
      } else if (state.orientation === "landscape") {
        return longSide;
      }
    },
  },
});
