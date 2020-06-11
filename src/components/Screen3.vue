<template>
  <div class="question-area">
    <div class="left-area" :class="{run_animation: animateLeft===true}">
      <div class="character-area" :class="{ selectedCharacter: items[ii].userAnswer==='left' }">
        <div class="char-img left" @click="recordAnswer('left')">
          <img :src="imgLeft" />
        </div>
      </div>
    </div>

    <div class="middle-area">
      <div class="middle-img">
        <img :src="items[ii].img" />
      </div>
    </div>

    <div class="right-area" :class="{run_animation: animateRight===true}">
      <div class="character-area" :class="{ selectedCharacter: items[ii].userAnswer==='right' }">
        <div class="char-img right" @click="recordAnswer('right')">
          <img :src="imgRight" />
        </div>
      </div>
    </div>

    <div class="answer-key left" v-if="editMode===true">
      <div v-if="items[ii].answerKey==='left'" style="color:#00FF00">RIKTIG SVAR:</div>
      <div v-else style="color:#FF0000">FEIL SVAR:</div>
      <div>{{items[ii].sentenceLeft}}</div>
    </div>

    <div class="answer-key right" v-if="editMode===true">
      <div v-if="items[ii].answerKey==='right'" style="color:#00FF00">RIKTIG SVAR:</div>
      <div v-else style="color:#FF0000">FEIL SVAR:</div>
      <div>{{items[ii].sentenceRight}}</div>
    </div>

    <div class="score-indicator" v-if="editMode===true">
      <div class="unanswered" v-if="items[ii].userAnswer===null">UBESVART!</div>
      <div class="correct" v-else-if="items[ii].answerKey===items[ii].userAnswer">RIKTIG!</div>
      <div class="wrong" v-else>FEIL!</div>
    </div>

    <div class="button audio-button" @click="playAudio('1r.mp3')"></div>

    <div v-if="items[ii].userAnswer!==null" class="button goto-next-button" @click="incrementII"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "Screen3",
  computed: mapGetters([
    "ii",
    "items",
    "editMode",
    "sentenceRight",
    "sentenceLeft",
    "answerKey"
  ]),

  props: {},
  data() {
    return {
      animateRight: false,
      animateLeft: false,
      imgRight: require("@/assets/morfologi/epi_inflectional/rev.png"),
      imgLeft: require("@/assets/morfologi/epi_inflectional/elg.png")
    };
  },

  methods: {
    incrementII: function() {
      this.$store.commit("incrementII");
    },
    decrementII: function() {
      this.$store.commit("decrementII");
    },
    recordAnswer: function(userAnswer: object) {
      this.$store.commit("recordAnswer", { userAnswer: userAnswer });
    },
    playAudio: function(fileName: object) {
      /*
      Plays left first, then play right. Animate character while playing.
      */
      const audioLeft = new Audio(this.items[this.ii].audioLeft);
      const audioRight = new Audio(this.items[this.ii].audioRight);
      //Setup to animate start/stop during playback
      audioLeft.addEventListener("ended", () => {
        this.animateLeft = false;
      });
      audioRight.addEventListener("ended", () => {
        this.animateRight = false;
      });
      audioLeft.addEventListener("play", () => {
        this.animateLeft = true;
      });
      audioRight.addEventListener("play", () => {
        this.animateRight = true;
      });
      //Setup playback order
      audioLeft.addEventListener("ended", () => {
        audioRight.play();
      });
      audioLeft.play();
    }
  }
});
</script>

<style scoped>
.run_animation {
  animation: action 0.1s infinite alternate;
}

@keyframes action {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px);
  }
}

.char-img > * {
  height: 100%;
  width: 100%;
}

.question-area {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  grid-auto-rows: 5fr 5fr 1fr;
  column-gap: 5px;
  margin: 0px;
  padding: 10;
}

.left-area {
  grid-row: 2/2;
  grid-column: 1/2;
  margin: 5%;
}

.right-area {
  grid-row: 2/2;
  grid-column: 3/4;
  margin: 5%;
}

.middle-area {
  grid-row: 1/3;
  grid-column: 2/3;
  margin: 5%;
  border-radius: 5px;
  border: 3px solid black;
}

.middle-img > img {
  height: 100%;
  width: 100%;
}

.character-area.selectedCharacter {
  border: 5px dotted lightgreen;
}

.score-indicator {
  grid-row: 1/1;
  grid-column: 3/4;
  margin: 5%;
  font-size: 1.5rem;
  border: 1px solid black;
  align-self: start;
}

.score-indicator > .unanswered {
  background-color: rgb(218, 218, 218);
}
.score-indicator > .wrong {
  background-color: rgb(233, 29, 63);
}
.score-indicator > .correct {
  background-color: lawngreen;
}

.answer-key {
  font-size: 1.5rem;
  border: 1px solid black;
  align-self: end;
}

.answer-key.left {
  grid-row: 1/1;
  grid-column: 1/2;
  margin: 5%;
}

.answer-key.right {
  grid-row: 1/1;
  grid-column: 3/4;
  margin: 5%;
}

.button {
  height: 40px;
  width: 40px;
  cursor: pointer;
  padding: 6px 6px;
  grid-row: 3;
  grid-column: 2/3;
}

.button.audio-button {
  background: url("~@/assets/speaker.png") no-repeat center;
  background-size: cover;
  justify-self: center;
  border-radius: 10px;
  border: 2px solid black;
}

.button.goto-next-button {
  background: url("~@/assets/arrow-right.png") no-repeat center;
  background-size: cover;
  justify-self: end;
}
</style>
