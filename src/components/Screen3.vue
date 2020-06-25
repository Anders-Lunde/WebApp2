<template>
  <div class="question-area">
    <div class="left-area" :class="{run_animation: animateLeft===true}">
      <div class="character-area" :class="{ selectedCharacter: items[ii].userAnswer==='left' }">
        <div class="char-img left" @click="characterSelected('left')">
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
        <div class="char-img right" @click="characterSelected('right')">
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

    <div class="narrator-container" v-if="editMode===false">
      <div class="narrator-img still" v-if="animateNarrator===false">
        <img :src="narratorImageStill" />
      </div>
      <div class="narrator-img animated" v-if="animateNarrator===true">
        <img :src="narratorImageAnimated" />
      </div>
    </div>

    <div class="button audio-button" @click="playAudio()"></div>

    <div v-if="items[ii].userAnswer!==null" class="button goto-next-button" @click="incrementII"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "Screen3",
  computed: mapGetters(["ii", "items", "editMode"]),
  props: {},
  data() {
    return {
      animateRight: false,
      animateLeft: false,
      animateNarrator: false,
      imgRight: require("@/assets/morfologi/epi_inflectional/rev.png"),
      imgLeft: require("@/assets/morfologi/epi_inflectional/elg.png"),
      narratorImageStill: require("@/assets/narratorImageStill.png"),
      narratorImageAnimated: require("@/assets/narratorImageAnimated.gif")
    };
  },

  methods: {
    incrementII: function() {
      this.$store.commit("incrementII");
    },
    decrementII: function() {
      this.$store.commit("decrementII");
    },
    characterSelected: function(userAnswer: object) {
      //Save answer to store ("left" or "right")
      this.$store.commit("recordAnswer", { userAnswer: userAnswer });
      //If practice screen, play audio feedback based on answer
      if (this.items[this.ii].isPractice === true) {
        //TODO: make cleaner. start/stop is repeated elsewher
        if (this.items[this.ii].answerKey === userAnswer) {
          const audio = new Audio(this.items[this.ii].feedbackCorrect);
          audio.addEventListener("ended", () => {
            this.animateNarrator = false;
          });
          audio.addEventListener("play", () => {
            this.animateNarrator = true;
          });
          audio.play();
        } else {
          const audio = new Audio(this.items[this.ii].feedbackWrong);

          audio.addEventListener("ended", () => {
            this.animateNarrator = false;
          });
          audio.addEventListener("play", () => {
            this.animateNarrator = true;
          });
          audio.play();
        }
      }
    },
    playAudio: function() {
      //Inactivate button during audio playback.
      if (this.animateLeft || this.animateRight) {
        return;
      }
      //Max 2 replays, except during edit mode.
      if (this.editMode === false) {
        if (this.items[this.ii].nPlaybackTimes >= 5) {
          return;
        }
        this.items[this.ii].nPlaybackTimes++;
      }

      /*
      Narrator audio and animation. Animate character during playback.
      Only runs if isInstruction === true.
      */
      const instructionAudio = new Audio(this.items[this.ii].instructionAudio);
      //Setup animation start/stop during playback
      instructionAudio.addEventListener("ended", () => {
        this.animateNarrator = false;
      });
      instructionAudio.addEventListener("play", () => {
        this.animateNarrator = true;
      });

      /*
      Characters audio and animation. 
      Plays left first, then right. Animate character during playback.
      */
      const audioLeft = new Audio(this.items[this.ii].audioLeft);
      const audioRight = new Audio(this.items[this.ii].audioRight);
      //Setup animation start/stop during playback
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
        audioRight.play(); //Start right character sound/animation after left ended
      });
      instructionAudio.addEventListener("ended", () => {
        audioLeft.play(); //Start left character sound/animation after narrator ended
      });
      //Excecute playback
      if (this.items[this.ii].isInstruction === true) {
        instructionAudio.play();
      } else {
        audioLeft.play();
      }
    }
  }
});
</script>

<style scoped>
.char-img > * {
  height: 100%;
  width: 100%;
  cursor: pointer;
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

.narrator-img > * {
  height: 100%;
  width: 100%;
}

.narrator-container {
  margin: 1%;
  align-self: start;
  grid-row: 1/1;
  grid-column: 3/4;
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

.run_animation {
  animation: character-animation 0.1s infinite alternate;
}

@keyframes character-animation {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px);
  }
}
</style>
