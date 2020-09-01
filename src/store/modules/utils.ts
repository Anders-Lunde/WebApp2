export default {
  namespaced: true,
  state: {},
  getters: {
    /*
     *METHOD START: getTypeOrPracticeChangeIndexes:
     *Returns an array of indexes that indicates where tests starts/stops,
     *including when going from practice item to normal item.
     *Usefule for navigating quickly between tests.
     */
    getTypeOrPracticeChangeIndexes: () => (moduleState) => {
      const itemArray = moduleState.items;
      const typeOrPracticeChangeIndexes: number[] = [];
      typeOrPracticeChangeIndexes.push(0);
      //Initialize:
      let previousPractiseState = moduleState.items[0].isPractice;
      let previousType = moduleState.items[0].type;
      //Find indexes where test type, or practice/non-practice, changes.
      //Push this info to the typeChangeIndexes array.
      for (let i = 1; i < itemArray.length; i++) {
        const type = moduleState.items[i].type;
        const isPractice = moduleState.items[i].isPractice;
        if (previousPractiseState !== isPractice || previousType !== type) {
          typeOrPracticeChangeIndexes.push(i);
        }
        previousPractiseState = moduleState.items[i].isPractice;
        previousType = moduleState.items[i].type;
      }
      //Add the last screen so we can jump to that also
      typeOrPracticeChangeIndexes.push(itemArray.length - 1);
      return typeOrPracticeChangeIndexes;
    },

    /*
     *METHOD START: getNNullAnswersSubtest:
     */
    getNNullAnswersSubtest: () => (moduleState) => {
      const currentType = moduleState.items[moduleState.ii].type;
      let n = 0;
      for (const item of moduleState.items) {
        if (item.type === currentType) {
          if (item.userAnswer === null && item.isPractice == false) {
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
        if (item.userAnswer === null && item.isPractice == false) {
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
