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
    getScreenChangeIndexes: () => (moduleState) => {
      const itemArray = moduleState.items;
      const screenChangeIndexes: number[] = [];
      //Always include the first screen
      screenChangeIndexes.push(0);
      //Initialize:
      let previousState =
        String(moduleState.items[0].isPractice) +
        String(moduleState.items[0].type);
      //Find indexes where test type, or practice/non-practice, changes.
      //Push this info to the typeChangeIndexes array.
      for (let i = 1; i < itemArray.length; i++) {
        const thisState =
          String(moduleState.items[i].isPractice) +
          String(moduleState.items[i].type);
        if (thisState !== previousState) {
          screenChangeIndexes.push(i);
        }
        previousState =
          String(moduleState.items[i].isPractice) +
          String(moduleState.items[i].type);
      }
      //Always include the last screen
      screenChangeIndexes.push(itemArray.length - 1);
      return screenChangeIndexes;
    },

    /*
     *METHOD START: getNNullAnswersSubtest:
     */
    getNNullAnswersSubtest: () => (moduleState) => {
      const currentType = moduleState.items[moduleState.ii].type;
      let n = 0;
      for (const item of moduleState.items) {
        if (item.type === currentType) {
          if (item.userAnswer === null && item.isScored === true) {
            n++;
          }
        }
      }
      return n;
    },

    /*
     *METHOD START: getNNullAnswersTotal:
     */
    getNNullAnswersTotal: () => (moduleState) => {
      let n = 0;
      for (const item of moduleState.items) {
        if (item.userAnswer === null && item.isScored === true) {
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
