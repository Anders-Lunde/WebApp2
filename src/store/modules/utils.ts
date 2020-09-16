export default {
  namespaced: true,
  state: {},
  getters: {
    /*
     *METHOD START: getScreenChangeIndexes:
     *Returns an array of indexes that indicates where screen type changes,
     *currently sensitive to changes of .isPractice and .type.
     *E.g. [0,4,16,24,40]
     *Useful for navigating between test type changes.
     */
    getScreenChangeIndexes: () => (tStore) => {
      const screenArray = tStore.screens;
      const screenChangeIndexes: number[] = [];
      //Always include the first screen
      screenChangeIndexes.push(0);
      //Initialize:
      let previousState =
        String(tStore.screens[0].isPractice) + String(tStore.screens[0].type);
      //Find indexes where test type, or practice/non-practice, changes.
      //Push this info to the typeChangeIndexes array.
      for (let i = 1; i < screenArray.length; i++) {
        const thisState =
          String(tStore.screens[i].isPractice) + String(tStore.screens[i].type);
        if (thisState !== previousState) {
          screenChangeIndexes.push(i);
        }
        previousState =
          String(tStore.screens[i].isPractice) + String(tStore.screens[i].type);
      }
      //Always include the last screen
      screenChangeIndexes.push(screenArray.length - 1);
      return screenChangeIndexes;
    },

    /*
     *METHOD START: getNNullAnswersSubtest:
     */
    getNNullAnswersSubtest: () => (tStore) => {
      const currentType = tStore.screens[tStore.ii].type;
      let n = 0;
      for (const screen of tStore.screens) {
        if (screen.type === currentType) {
          if (screen.userAnswer === null && screen.isScored === true) {
            n++;
          }
        }
      }
      return n;
    },

    /*
     *METHOD START: getNNullAnswersTotal:
     */
    getNNullAnswersTotal: () => (tStore) => {
      let n = 0;
      for (const screen of tStore.screens) {
        if (screen.userAnswer === null && screen.isScored === true) {
          n++;
        }
      }
      return n;
    },
  },

  mutations: {},
  actions: {},
  modules: {},
};
