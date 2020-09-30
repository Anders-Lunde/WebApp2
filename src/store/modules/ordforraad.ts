export default {
  namespaced: true,
  state: {
    ii: 0, // screens array index
    editMode: true,
    screens: [{}],
  },
  getters: {
    screens: (state) => state.screens,
    ii: (state) => state.ii,
    editMode: (state) => state.editMode,
  },
  mutations: {
    incrementII(state) {
      state.ii++;
    },
    decrementII(state) {
      state.ii--;
    },
    setII(state, n: number) {
      state.ii = n;
    },
    recordAnswer(state, payload) {
      state.screens[state.ii].userAnswer = payload.userAnswer;
    },
    toggleEditMode(state) {
      state.editMode = !state.editMode;
    },
  },
  actions: {
    playAudio: ({ commit, state }, payload) => {
      //Currently not used
      console.log(commit, state, payload); //To supress linting warnings of unused variables
    },
  },
  modules: {},
};
