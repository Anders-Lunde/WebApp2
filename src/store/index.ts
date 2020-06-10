import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ii: 0, // items array index
    editMode: true,
    items: [
      {
        id: 0,
        type: "Screen3",
        img: require("@/assets/morfologi/epi_inflectional/4.png"),
        audioRight: require("@/assets/morfologi/epi_inflectional/0r.mp3"),
        audioLeft: require("@/assets/morfologi/epi_inflectional/0l.mp3"),
        sentenceRight: "Skilpadden hilser på ådene",
        sentenceLeft: "Skilpadden hilser på åden",
        answerKey: "right",
        userAnswer: null,
      },
      {
        id: 0,
        type: "Screen3",
        img: require("@/assets/morfologi/epi_inflectional/5.png"),
        audioRight: require("@/assets/morfologi/epi_inflectional/1r.mp3"),
        audioLeft: require("@/assets/morfologi/epi_inflectional/1l.mp3"),
        sentenceRight: "Skilpaddene går ombord i jægen",
        sentenceLeft: "Skilpaddene går ombord i jægene",
        answerKey: "left",
        userAnswer: null,
      },
      {
        id: 1,
        type: "Screen1",
        question: "Hvem er president i USA?",
        answer: "Donald Trump",
        imgLeft: require("@/assets/1l.png"),
        imgRight: require("@/assets/1r.png"),
        userAnswer: null,
      },
      {
        id: 2,
        type: "Screen2",
        question: "Hvem er ordfører i Andeby?",
        answer: "Bavian Slang",
        imgLeft: require("@/assets/2l.png"),
        imgRight: require("@/assets/2r.png"),
        userAnswer: null,
      },
      {
        id: 3,
        type: "Screen2",
        imgLeft: require("@/assets/3l.png"),
        imgRight: require("@/assets/3r.png"),
        userAnswer: null,
      },
      {
        id: 4,
        type: "Screen1",
        question: "Hvem er statsminister i Norge?",
        answer: "Erna Solberg",
        imgLeft: require("@/assets/0l.png"),
        imgRight: require("@/assets/0r.png"),
        userAnswer: null,
      },
    ],
  },
  getters: {
    items: (state) => state.items,
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
      state.items[state.ii].userAnswer = payload.userAnswer;
    },
    toggleEditMode(state) {
      state.editMode = !state.editMode;
    },
  },
  actions: {
    playAudio: ({ commit, state }, payload) => {
      console.log("asd");
    },
  },
  modules: {},
});
